# 前言

本文基于Dubbo2.6.x版本，中文注释版源码已上传github：[xiaoguyu/dubbo](https://github.com/xiaoguyu/dubbo/tree/2.6.x)

负载均衡，英文名称为Load Balance，其含义就是指将负载（工作任务）进行平衡、分摊到多个操作单元上进行运行。

例如：在Dubbo中，同一个服务有多个服务提供者，每个服务提供者所在的机器性能不一致。如果流量均匀分摊，则会导致有些服务提供者负载过高，有些则轻轻松松，导致资源浪费。负载均衡就解决这个问题。

# 源码

`LoadBalance`就是负载均衡的接口，咱们先看看类图

![Untitled](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92c492128ccc4bab999f892c7233ec82~tplv-k3u1fbpfcp-zoom-1.image)

Dubbo提供了4中内置的负载均衡实现：

1. RandomLoadBalance：基于权重随机算法
2. LeastActiveLoadBalance：基于最少活跃调用数算法
3. ConsistentHashLoadBalance：基于 hash 一致性算法
4. RoundRobinLoadBalance：基于加权轮询算法

那么负载均衡是在哪里被用的的呢？

`AbstractClusterInvoker`的`select`和`reselect`方法。不熟悉这两个方法的，可以去看[《Dubbo集群》](https://www.javaedit.com/archives/140)

## AbstractLoadBalance

抽象类封装了一些公共的逻辑，在看具体实现类之前，我们先看看抽象类AbstractLoadBalance中的方法

```java
public <T> Invoker<T> select(List<Invoker<T>> invokers, URL url, Invocation invocation) {
    if (invokers == null || invokers.isEmpty())
        return null;
    // 如果 invokers 列表中仅有一个 Invoker，直接返回即可，无需进行负载均衡
    if (invokers.size() == 1)
        return invokers.get(0);
    // 调用 doSelect 方法进行负载均衡，该方法为抽象方法，由子类实现
    return doSelect(invokers, url, invocation);
}
```

`LoadBalance`接口只有一个方法，那就是 select 方法，这是负载均衡的入口。根据 invoker 数量判断是否需要进行负载均衡。这里的 doSelect 是个抽象方法，由子类实现。

```java
protected int getWeight(Invoker<?> invoker, Invocation invocation) {
    int weight = invoker.getUrl().getMethodParameter(invocation.getMethodName(), Constants.WEIGHT_KEY, Constants.DEFAULT_WEIGHT);
    if (weight > 0) {
        // 获取服务提供者启动时间戳
        long timestamp = invoker.getUrl().getParameter(Constants.REMOTE_TIMESTAMP_KEY, 0L);
        if (timestamp > 0L) {
            // 计算服务提供者运行时长
            int uptime = (int) (System.currentTimeMillis() - timestamp);
            // 获取服务预热时间，默认为10分钟
            int warmup = invoker.getUrl().getParameter(Constants.WARMUP_KEY, Constants.DEFAULT_WARMUP);
            // 如果服务运行时间小于预热时间，则重新计算服务权重，即降权
            if (uptime > 0 && uptime < warmup) {
                // 重新计算服务权重
                weight = calculateWarmupWeight(uptime, warmup, weight);
            }
        }
    }
    return weight;
}

static int calculateWarmupWeight(int uptime, int warmup, int weight) {
    // 计算权重，下面代码逻辑上形似于 (uptime / warmup) * weight。
    // 随着服务运行时间 uptime 增大，权重计算值 ww 会慢慢接近配置值 weight
    int ww = (int) ((float) uptime / ((float) warmup / (float) weight));
    return ww < 1 ? 1 : (ww > weight ? weight : ww);
}
```

getWeight 是获取权重的方法，默认权重为100，这里有个服务预热的操作，当服务的启动时间小于预热时间，权重会减少，这个权重由 calculateWarmupWeight 方法计算。

预热的目的是让服务启动后“低功率”运行一段时间，使其效率慢慢提升至最佳状态。

以上就是抽象类的全部方法。下面我们看实现类的。

## RandomLoadBalance

RandomLoadBalance 是加权随机算法的具体实现，是Dubbo默认的负载均衡策略。

假设我们有一组服务器 servers = [A, B, C]，他们对应的权重为 weights = [5, 3, 2]，权重总和为10。

![Untitled](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9cdb0f3336f4ebfbcfbcf1e004c97dc~tplv-k3u1fbpfcp-zoom-1.image)

我们取一个大于等于0，小于10的随机数，计算随机数落在哪个区间。例如4在A区间，7在B区间。

权重越大，落在该区间的概率就越大。这就是加权随机算法。

下面看具体代码实现

```java
public class RandomLoadBalance extends AbstractLoadBalance {

    public static final String NAME = "random";

    private final Random random = new Random();

    @Override
    protected <T> Invoker<T> doSelect(List<Invoker<T>> invokers, URL url, Invocation invocation) {
        int length = invokers.size(); // Number of invokers
        int totalWeight = 0; // The sum of weights
        boolean sameWeight = true; // Every invoker has the same weight?
        // 下面这个循环有两个作用，第一是计算总权重 totalWeight，
        // 第二是检测每个服务提供者的权重是否相同
        for (int i = 0; i < length; i++) {
            int weight = getWeight(invokers.get(i), invocation);
            totalWeight += weight; // Sum
            // 检测当前服务提供者的权重与上一个服务提供者的权重是否相同，
            // 不相同的话，则将 sameWeight 置为 false。
            if (sameWeight && i > 0
                    && weight != getWeight(invokers.get(i - 1), invocation)) {
                sameWeight = false;
            }
        }
        if (totalWeight > 0 && !sameWeight) {
            // 随机获取一个 [0, totalWeight) 区间内的数字
            int offset = random.nextInt(totalWeight);
            // Return a invoker based on the random value.
            // 循环让 offset 数减去服务提供者权重值，当 offset 小于0时，返回相应的 Invoker。
            // 举例说明一下，我们有 servers = [A, B, C]，weights = [5, 3, 2]，offset = 7。
            // 第一次循环，offset - 5 = 2 > 0，即 offset > 5，
            // 表明其不会落在服务器 A 对应的区间上。
            // 第二次循环，offset - 3 = -1 < 0，即 5 < offset < 8，
            // 表明其会落在服务器 B 对应的区间上
            for (int i = 0; i < length; i++) {
                // 让随机值 offset 减去权重值
                offset -= getWeight(invokers.get(i), invocation);
                if (offset < 0) {
                    // 返回相应的 Invoker
                    return invokers.get(i);
                }
            }
        }
        // 如果所有服务提供者权重值相同，此时直接随机返回一个即可
        return invokers.get(random.nextInt(length));
    }
}
```

如果权重一致，就随机选择一个。如果权重不同，则根据权重分配。

## LeastActiveLoadBalance

最小活跃数负载均衡。这个活跃数表示执行中的请求数量。每个服务提供者对应一个活跃数 active。初始情况下，所有服务提供者活跃数均为0。每收到一个请求，活跃数加1，完成请求后则将活跃数减1。

在流量均匀的情况下，活跃数越低的服务提供者，其性能越好。

```java
protected <T> Invoker<T> doSelect(List<Invoker<T>> invokers, URL url, Invocation invocation) {
    int length = invokers.size(); // Number of invokers
    // 最小的活跃数
    int leastActive = -1; // The least active value of all invokers
    // 具有相同“最小活跃数”的服务者提供者（以下用 Invoker 代称）数量
    int leastCount = 0; // The number of invokers having the same least active value (leastActive)
    // leastIndexs 用于记录具有相同“最小活跃数”的 Invoker 在 invokers 列表中的下标信息
    int[] leastIndexs = new int[length]; // The index of invokers having the same least active value (leastActive)
    int totalWeight = 0; // The sum of with warmup weights
    // 第一个最小活跃数的 Invoker 权重值，用于与其他具有相同最小活跃数的 Invoker 的权重进行对比，
    // 以检测是否“所有具有相同最小活跃数的 Invoker 的权重”均相等
    int firstWeight = 0; // Initial value, used for comparision
    boolean sameWeight = true; // Every invoker has the same weight value?

    // 遍历 invokers 列表
    for (int i = 0; i < length; i++) {
        Invoker<T> invoker = invokers.get(i);
        // 获取 Invoker 对应的活跃数
        int active = RpcStatus.getStatus(invoker.getUrl(), invocation.getMethodName()).getActive(); // Active number
        // 获取权重
        int afterWarmup = getWeight(invoker, invocation); // Weight
        // 发现更小的活跃数，重新开始
        if (leastActive == -1 || active < leastActive) { // Restart, when find a invoker having smaller least active value.
            // 使用当前活跃数 active 更新最小活跃数 leastActive
            leastActive = active; // Record the current least active value
            // 更新 leastCount 为 1
            leastCount = 1; // Reset leastCount, count again based on current leastCount
            // 记录当前下标值到 leastIndexs 中
            leastIndexs[0] = i; // Reset
            totalWeight = afterWarmup; // Reset
            firstWeight = afterWarmup; // Record the weight the first invoker
            sameWeight = true; // Reset, every invoker has the same weight value?
        // 当前 Invoker 的活跃数 active 与最小活跃数 leastActive 相同
        } else if (active == leastActive) { // If current invoker's active value equals with leaseActive, then accumulating.
            // 在 leastIndexs 中记录下当前 Invoker 在 invokers 集合中的下标
            leastIndexs[leastCount++] = i; // Record index number of this invoker
            // 累加权重
            totalWeight += afterWarmup; // Add this invoker's weight to totalWeight.
            // If every invoker has the same weight?
            // 检测当前 Invoker 的权重与 firstWeight 是否相等，
            // 不相等则将 sameWeight 置为 false
            if (sameWeight && i > 0
                    && afterWarmup != firstWeight) {
                sameWeight = false;
            }
        }
    }
    // assert(leastCount > 0)
    // 当只有一个 Invoker 具有最小活跃数，此时直接返回该 Invoker 即可
    if (leastCount == 1) {
        // If we got exactly one invoker having the least active value, return this invoker directly.
        return invokers.get(leastIndexs[0]);
    }
    // 有多个 Invoker 具有相同的最小活跃数，但它们之间的权重不同
    if (!sameWeight && totalWeight > 0) {
        // If (not every invoker has the same weight & at least one invoker's weight>0), select randomly based on totalWeight.
        // 随机生成一个 [0, totalWeight) 之间的数字
        int offsetWeight = random.nextInt(totalWeight) + 1;
        // Return a invoker based on the random value.
        // 循环让随机数减去具有最小活跃数的 Invoker 的权重值，
        // 当 offset 小于等于0时，返回相应的 Invoker
        for (int i = 0; i < leastCount; i++) {
            int leastIndex = leastIndexs[i];
            // 获取权重值，并让随机数减去权重值
            offsetWeight -= getWeight(invokers.get(leastIndex), invocation);
            if (offsetWeight <= 0)
                return invokers.get(leastIndex);
        }
    }
    // If all invokers have the same weight value or totalWeight=0, return evenly.
    // 如果权重相同或权重为0时，随机返回一个 Invoker
    return invokers.get(leastIndexs[random.nextInt(leastCount)]);
}
```

代码比较多，不过都有注释，耐心看即可。这里大体做了几件事：

1. 遍历 invokers 集合，找出活跃数最小的 invoker
2. 如果只有一个 invoker 有最小活跃数，则返回
3. 如果有多个 invoker 有相同的最小活跃数，则这些 invoker 进行加权随机算法处理（也就是对这几个最小活跃数 invoker 进行 RandomLoadBalance 的逻辑）

这里有个点想扩展说下，就是获取活跃数的方法

RpcStatus.getStatus(invoker.getUrl(), invocation.getMethodName()).getActive();

`RpcStatus`记录着当前调用次数、总数、失败数、调用间隔等状态信息。

这些信息，在服务消费者端由`ActiveLimitFilter`记录，在服务提供者端由`ExecuteLimitFilter`记录。也就是，想要拿到正确的活跃数，需要`ActiveLimitFilter`生效才行。

```java
@Activate(group = Constants.CONSUMER, value = Constants.ACTIVES_KEY)
public class ActiveLimitFilter implements Filter
```

`ActiveLimitFilter`生效需要满足两个条件，消费者端以及URL中携带`actives`参数。`actives`可在消费者端或生产者端配置，含义为：每服务消费者每服务每方法最大并发调用数

```xml
<dubbo:service interface="com.alibaba.dubbo.demo.DemoService" ref="demoService" registry="remoteRegistry" actives="5" />
<dubbo:reference id="demoService" interface="com.alibaba.dubbo.demo.DemoService" loadbalance="leastactive" actives="5" />
```

当然，也能给消费者接口指定过滤器的方法来启用`ActiveLimitFilter`

```xml
<dubbo:reference id="demoService" interface="com.alibaba.dubbo.demo.DemoService" filter="activelimit" />
```

## RoundRobinLoadBalance

RoundRobinLoadBalance是加权轮询负载均衡的实现。加权轮询的原理步骤如下：

假设服务 [A, B, C] 的权重为 [5, 1, 1] ，即总权重为 7， 当前权重currentWeight初始为[0, 0, 0]

1. 当前权重加上每个服务各自的权重，跳转步骤2
   
    此时currentWeight为 [0+5, 0+1, 0+1] = [5, 1, 1]
    
2. 返回currentWeight中最高的服务，跳转步骤3
   
    currentWeight为 [5, 1, 1] ，返回服务A
    
3. 将第2步中的那个最高权重在currentWeight对应的值减去总权重，跳转步骤4
   
    currentWeight为 [5 - 7, 1, 1] = [-2, 1, 1]
    
4. 重复步骤1

下面的GIF图为了好表示柱状图，所以我将currentWeight初始权重变为10

![Untitled](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ee33b7c85ea48d4b2263b37c1b00108~tplv-k3u1fbpfcp-zoom-1.image)

经过一定循环次数，最终currentWeight又会回归初始值。而这个循环次数计算如下：

次数 = 服务A的权重 + 服务B的权重 + …

每个服务的调用次数也等于它的权重

看完原理，我们继续看源码

```java
protected <T> Invoker<T> doSelect(List<Invoker<T>> invokers, URL url, Invocation invocation) {
    // key = 全限定类名 + "." + 方法名，比如 com.xxx.DemoService.sayHello
    String key = invokers.get(0).getUrl().getServiceKey() + "." + invocation.getMethodName();
    // 获取 url 到 WeightedRoundRobin 映射表，如果为空，则创建一个新的
    ConcurrentMap<String, WeightedRoundRobin> map = methodWeightMap.get(key);
    if (map == null) {
        methodWeightMap.putIfAbsent(key, new ConcurrentHashMap<String, WeightedRoundRobin>());
        map = methodWeightMap.get(key);
    }
    // 权重总和
    int totalWeight = 0;
    // 最大权重
    long maxCurrent = Long.MIN_VALUE;
    long now = System.currentTimeMillis();
    Invoker<T> selectedInvoker = null;
    WeightedRoundRobin selectedWRR = null;

    // 下面这个循环主要做了这样几件事情：
    //   1. 遍历 Invoker 列表，检测当前 Invoker 是否有
    //      相应的 WeightedRoundRobin，没有则创建
    //   2. 检测 Invoker 权重是否发生了变化，若变化了，
    //      则更新 WeightedRoundRobin 的 weight 字段
    //   3. 让 current 字段加上自身权重，等价于 current += weight
    //   4. 设置 lastUpdate 字段，即 lastUpdate = now
    //   5. 寻找具有最大 current 的 Invoker，以及 Invoker 对应的 WeightedRoundRobin，
    //      暂存起来，留作后用
    //   6. 计算权重总和
    for (Invoker<T> invoker : invokers) {
        String identifyString = invoker.getUrl().toIdentityString();
        WeightedRoundRobin weightedRoundRobin = map.get(identifyString);
        int weight = getWeight(invoker, invocation);
        if (weight < 0) {
            weight = 0;
        }
        // 检测当前 Invoker 是否有对应的 WeightedRoundRobin，没有则创建
        if (weightedRoundRobin == null) {
            weightedRoundRobin = new WeightedRoundRobin();
            // 设置 Invoker 权重
            weightedRoundRobin.setWeight(weight);
            // 存储 url 唯一标识 identifyString 到 weightedRoundRobin 的映射关系
            map.putIfAbsent(identifyString, weightedRoundRobin);
            weightedRoundRobin = map.get(identifyString);
        }
        // Invoker 权重不等于 WeightedRoundRobin 中保存的权重，说明权重变化了，此时进行更新
        if (weight != weightedRoundRobin.getWeight()) {
            //weight changed
            weightedRoundRobin.setWeight(weight);
        }
        // 让 current 加上自身权重，等价于 current += weight
        long cur = weightedRoundRobin.increaseCurrent();
        // 设置 lastUpdate，表示近期更新过
        weightedRoundRobin.setLastUpdate(now);
        if (cur > maxCurrent) {
            maxCurrent = cur;
            // 将具有最大 current 权重的 Invoker 赋值给 selectedInvoker
            selectedInvoker = invoker;
            // 将 Invoker 对应的 weightedRoundRobin 赋值给 selectedWRR，留作后用
            selectedWRR = weightedRoundRobin;
        }
        // 计算权重总和
        totalWeight += weight;
    }
    // 对 <identifyString, WeightedRoundRobin> 进行检查，过滤掉长时间未被更新的节点。
    // 该节点可能挂了，invokers 中不包含该节点，所以该节点的 lastUpdate 长时间无法被更新。
    // 若未更新时长超过阈值后，就会被移除掉，默认阈值为60秒。
    if (!updateLock.get() && invokers.size() != map.size()) {
        if (updateLock.compareAndSet(false, true)) {
            try {
                // copy -> modify -> update reference
                ConcurrentMap<String, WeightedRoundRobin> newMap = new ConcurrentHashMap<String, WeightedRoundRobin>();
                // 拷贝
                newMap.putAll(map);

                // 遍历修改，即移除过期记录
                Iterator<Entry<String, WeightedRoundRobin>> it = newMap.entrySet().iterator();
                while (it.hasNext()) {
                    Entry<String, WeightedRoundRobin> item = it.next();
                    if (now - item.getValue().getLastUpdate() > RECYCLE_PERIOD) {
                        it.remove();
                    }
                }
                // 更新引用
                methodWeightMap.put(key, newMap);
            } finally {
                updateLock.set(false);
            }
        }
    }
    if (selectedInvoker != null) {
        // 让 current 减去权重总和，等价于 current -= totalWeight
        selectedWRR.sel(totalWeight);
        // 返回具有最大 current 的 Invoker
        return selectedInvoker;
    }
    // should not happen here
    return invokers.get(0);
}
```

注释写的很详细了，和原理步骤差不多，源码中多个对长时间未更新 invoker 的处理。 

## ConsistentHashLoadBalance

一致性Hash算法。

其原理简单讲，就是假定有一个圆环，每个服务根据其 hash 值，在圆环上有个位置（如图的cache-1、cache-2等）。当有请求过来的，同样根据请求的 hash 值确定请求的位置，并根据请求的位置去获取最近的下一个服务的位置。如下图：

![Untitled](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bad081fd9e7c4fd78e03320876b9b9b9~tplv-k3u1fbpfcp-zoom-1.image)

当请求落在 cache-2 和 cache-3 之间时，下一个最近的是 cache-3，如果 cache-3 服务不可用，那么最近的下个服务就是 cache-4

这时，又引入了一个资源倾斜的问题，那就是大量请求集中在同一个服务中。由于服务在圆环上分布不均，导致大部分请求都落在cache-2中，如下图：

![Untitled](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5fbc983575244b2bd9f308377cfdc88~tplv-k3u1fbpfcp-zoom-1.image)

那么该如何处理资源倾斜的问题？引入虚拟节点，就是一个服务有多个多个位置，这样就能使请求更均匀，如下图：

![Untitled](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19b1e0dc1a3d41d78fdea3121dff0d26~tplv-k3u1fbpfcp-zoom-1.image)

以上就是一致性hash算法的原理。下面讲讲Dubbo的源码

```java
public class ConsistentHashLoadBalance extends AbstractLoadBalance {

    private final ConcurrentMap<String, ConsistentHashSelector<?>> selectors = new ConcurrentHashMap<String, ConsistentHashSelector<?>>();

    @Override
    protected <T> Invoker<T> doSelect(List<Invoker<T>> invokers, URL url, Invocation invocation) {
        String methodName = RpcUtils.getMethodName(invocation);
        String key = invokers.get(0).getUrl().getServiceKey() + "." + methodName;

        // 获取 invokers 原始的 hashcode
        int identityHashCode = System.identityHashCode(invokers);
        ConsistentHashSelector<T> selector = (ConsistentHashSelector<T>) selectors.get(key);
        // 如果 invokers 是一个新的 List 对象，意味着服务提供者数量发生了变化，可能新增也可能减少了。
        // 此时 selector.identityHashCode != identityHashCode 条件成立
        if (selector == null || selector.identityHashCode != identityHashCode) {
            // 创建新的 ConsistentHashSelector
            selectors.put(key, new ConsistentHashSelector<T>(invokers, methodName, identityHashCode));
            selector = (ConsistentHashSelector<T>) selectors.get(key);
        }
        // 调用 ConsistentHashSelector 的 select 方法选择 Invoker
        return selector.select(invocation);
    }

    private static final class ConsistentHashSelector<T> {...}
}
```

doSelect 方法先从缓存获取 selector ，如果缓存没有，则创建并放入缓存。然后调用 selector.select 方法获取 invoker 。所以一致性 hash 的实现，在ConsistentHashSelector中。我们先看其构造方法

```java
ConsistentHashSelector(List<Invoker<T>> invokers, String methodName, int identityHashCode) {
    // 可以认为virtualInvokers组成了hash环
    this.virtualInvokers = new TreeMap<Long, Invoker<T>>();
    this.identityHashCode = identityHashCode;
    URL url = invokers.get(0).getUrl();
    // 获取虚拟节点数，默认为160
    this.replicaNumber = url.getMethodParameter(methodName, "hash.nodes", 160);
    // 获取参与 hash 计算的参数下标值，默认对第一个参数进行 hash 运算
    String[] index = Constants.COMMA_SPLIT_PATTERN.split(url.getMethodParameter(methodName, "hash.arguments", "0"));
    argumentIndex = new int[index.length];
    for (int i = 0; i < index.length; i++) {
        argumentIndex[i] = Integer.parseInt(index[i]);
    }
    for (Invoker<T> invoker : invokers) {
        String address = invoker.getUrl().getAddress();
        for (int i = 0; i < replicaNumber / 4; i++) {
            // 对 address + i 进行 md5 运算，得到一个长度为16的字节数组
            byte[] digest = md5(address + i);
            // 对 digest 部分字节进行4次 hash 运算，得到四个不同的 long 型正整数
            for (int h = 0; h < 4; h++) {
                // h = 0 时，取 digest 中下标为 0 ~ 3 的4个字节进行位运算
                // h = 1 时，取 digest 中下标为 4 ~ 7 的4个字节进行位运算
                // h = 2, h = 3 时过程同上
                long m = hash(digest, h);
                // 将 hash 到 invoker 的映射关系存储到 virtualInvokers 中，
                // virtualInvokers 需要提供高效的查询操作，因此选用 TreeMap 作为存储结构
                virtualInvokers.put(m, invoker);
            }
        }
    }
}
```

ConsistentHashSelector的构造方法，主要是计算 invokers 的每一个 invoker 的hash，并将其放入 virtualInvokers 中。从这里可以看到，Dubbo默认的虚拟节点为160个。对比一致性 hash 算法中，virtualInvokers 就是 hash 环，invoker 就是节点。

我们继续看如何从 hash 环中找到最近的节点

```java
public Invoker<T> select(Invocation invocation) {
    // 将参数转为 key
    String key = toKey(invocation.getArguments());
    // 对参数 key 进行 md5 运算
    byte[] digest = md5(key);
    // 取 digest 数组的前四个字节进行 hash 运算，再将 hash 值传给 selectForKey 方法，
    // 寻找合适的 Invoker
    return selectForKey(hash(digest, 0));
}

private Invoker<T> selectForKey(long hash) {
    // 到 TreeMap 中查找第一个节点值大于或等于当前 hash 的 Invoker
    Map.Entry<Long, Invoker<T>> entry = virtualInvokers.tailMap(hash, true).firstEntry();
    // 如果 hash 大于 Invoker 在圆环上最大的位置，此时 entry = null，
    // 需要将 TreeMap 的头节点赋值给 entry
    if (entry == null) {
        entry = virtualInvokers.firstEntry();
    }
    return entry.getValue();
}
```

选择的过程也很简单，依赖的是 TreeMap 的 tailMap 方法。

# 总结

本文介绍了Dubbo内置的4中负载均衡实现。至此，Dubbo的集群容错的四个部分，也就是服务目录 Directory、服务路由 Router、集群 Cluster 和负载均衡 LoadBalance 都已全部讲完。

---

**参考资料**

[Dubbo开发指南](https://dubbo.apache.org/zh/docsv2.7/dev/)