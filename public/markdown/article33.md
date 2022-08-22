# ǰ��

���Ļ���Dubbo2.6.x�汾������ע�Ͱ�Դ�����ϴ�github��[xiaoguyu/dubbo](https://github.com/xiaoguyu/dubbo/tree/2.6.x)

���ؾ��⣬Ӣ������ΪLoad Balance���京�����ָ�����أ��������񣩽���ƽ�⡢��̯�����������Ԫ�Ͻ������С�

���磺��Dubbo�У�ͬһ�������ж�������ṩ�ߣ�ÿ�������ṩ�����ڵĻ������ܲ�һ�¡�����������ȷ�̯����ᵼ����Щ�����ṩ�߸��ع��ߣ���Щ���������ɣ�������Դ�˷ѡ����ؾ���ͽ��������⡣

# Դ��

`LoadBalance`���Ǹ��ؾ���Ľӿڣ������ȿ�����ͼ

![Untitled](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92c492128ccc4bab999f892c7233ec82~tplv-k3u1fbpfcp-zoom-1.image)

Dubbo�ṩ��4�����õĸ��ؾ���ʵ�֣�

1. RandomLoadBalance������Ȩ������㷨
2. LeastActiveLoadBalance���������ٻ�Ծ�������㷨
3. ConsistentHashLoadBalance������ hash һ�����㷨
4. RoundRobinLoadBalance�����ڼ�Ȩ��ѯ�㷨

��ô���ؾ����������ﱻ�õĵ��أ�

`AbstractClusterInvoker`��`select`��`reselect`����������Ϥ�����������ģ�����ȥ��[��Dubbo��Ⱥ��](https://www.javaedit.com/archives/140)

## AbstractLoadBalance

�������װ��һЩ�������߼����ڿ�����ʵ����֮ǰ�������ȿ���������AbstractLoadBalance�еķ���

```java
public <T> Invoker<T> select(List<Invoker<T>> invokers, URL url, Invocation invocation) {
    if (invokers == null || invokers.isEmpty())
        return null;
    // ��� invokers �б��н���һ�� Invoker��ֱ�ӷ��ؼ��ɣ�������и��ؾ���
    if (invokers.size() == 1)
        return invokers.get(0);
    // ���� doSelect �������и��ؾ��⣬�÷���Ϊ���󷽷���������ʵ��
    return doSelect(invokers, url, invocation);
}
```

`LoadBalance`�ӿ�ֻ��һ���������Ǿ��� select ���������Ǹ��ؾ������ڡ����� invoker �����ж��Ƿ���Ҫ���и��ؾ��⡣����� doSelect �Ǹ����󷽷���������ʵ�֡�

```java
protected int getWeight(Invoker<?> invoker, Invocation invocation) {
    int weight = invoker.getUrl().getMethodParameter(invocation.getMethodName(), Constants.WEIGHT_KEY, Constants.DEFAULT_WEIGHT);
    if (weight > 0) {
        // ��ȡ�����ṩ������ʱ���
        long timestamp = invoker.getUrl().getParameter(Constants.REMOTE_TIMESTAMP_KEY, 0L);
        if (timestamp > 0L) {
            // ��������ṩ������ʱ��
            int uptime = (int) (System.currentTimeMillis() - timestamp);
            // ��ȡ����Ԥ��ʱ�䣬Ĭ��Ϊ10����
            int warmup = invoker.getUrl().getParameter(Constants.WARMUP_KEY, Constants.DEFAULT_WARMUP);
            // �����������ʱ��С��Ԥ��ʱ�䣬�����¼������Ȩ�أ�����Ȩ
            if (uptime > 0 && uptime < warmup) {
                // ���¼������Ȩ��
                weight = calculateWarmupWeight(uptime, warmup, weight);
            }
        }
    }
    return weight;
}

static int calculateWarmupWeight(int uptime, int warmup, int weight) {
    // ����Ȩ�أ���������߼��������� (uptime / warmup) * weight��
    // ���ŷ�������ʱ�� uptime ����Ȩ�ؼ���ֵ ww �������ӽ�����ֵ weight
    int ww = (int) ((float) uptime / ((float) warmup / (float) weight));
    return ww < 1 ? 1 : (ww > weight ? weight : ww);
}
```

getWeight �ǻ�ȡȨ�صķ�����Ĭ��Ȩ��Ϊ100�������и�����Ԥ�ȵĲ����������������ʱ��С��Ԥ��ʱ�䣬Ȩ�ػ���٣����Ȩ���� calculateWarmupWeight �������㡣

Ԥ�ȵ�Ŀ�����÷��������󡰵͹��ʡ�����һ��ʱ�䣬ʹ��Ч���������������״̬��

���Ͼ��ǳ������ȫ���������������ǿ�ʵ����ġ�

## RandomLoadBalance

RandomLoadBalance �Ǽ�Ȩ����㷨�ľ���ʵ�֣���DubboĬ�ϵĸ��ؾ�����ԡ�

����������һ������� servers = [A, B, C]�����Ƕ�Ӧ��Ȩ��Ϊ weights = [5, 3, 2]��Ȩ���ܺ�Ϊ10��

![Untitled](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9cdb0f3336f4ebfbcfbcf1e004c97dc~tplv-k3u1fbpfcp-zoom-1.image)

����ȡһ�����ڵ���0��С��10�����������������������ĸ����䡣����4��A���䣬7��B���䡣

Ȩ��Խ�����ڸ�����ĸ��ʾ�Խ������Ǽ�Ȩ����㷨��

���濴�������ʵ��

```java
public class RandomLoadBalance extends AbstractLoadBalance {

    public static final String NAME = "random";

    private final Random random = new Random();

    @Override
    protected <T> Invoker<T> doSelect(List<Invoker<T>> invokers, URL url, Invocation invocation) {
        int length = invokers.size(); // Number of invokers
        int totalWeight = 0; // The sum of weights
        boolean sameWeight = true; // Every invoker has the same weight?
        // �������ѭ�����������ã���һ�Ǽ�����Ȩ�� totalWeight��
        // �ڶ��Ǽ��ÿ�������ṩ�ߵ�Ȩ���Ƿ���ͬ
        for (int i = 0; i < length; i++) {
            int weight = getWeight(invokers.get(i), invocation);
            totalWeight += weight; // Sum
            // ��⵱ǰ�����ṩ�ߵ�Ȩ������һ�������ṩ�ߵ�Ȩ���Ƿ���ͬ��
            // ����ͬ�Ļ����� sameWeight ��Ϊ false��
            if (sameWeight && i > 0
                    && weight != getWeight(invokers.get(i - 1), invocation)) {
                sameWeight = false;
            }
        }
        if (totalWeight > 0 && !sameWeight) {
            // �����ȡһ�� [0, totalWeight) �����ڵ�����
            int offset = random.nextInt(totalWeight);
            // Return a invoker based on the random value.
            // ѭ���� offset ����ȥ�����ṩ��Ȩ��ֵ���� offset С��0ʱ��������Ӧ�� Invoker��
            // ����˵��һ�£������� servers = [A, B, C]��weights = [5, 3, 2]��offset = 7��
            // ��һ��ѭ����offset - 5 = 2 > 0���� offset > 5��
            // �����䲻�����ڷ����� A ��Ӧ�������ϡ�
            // �ڶ���ѭ����offset - 3 = -1 < 0���� 5 < offset < 8��
            // ����������ڷ����� B ��Ӧ��������
            for (int i = 0; i < length; i++) {
                // �����ֵ offset ��ȥȨ��ֵ
                offset -= getWeight(invokers.get(i), invocation);
                if (offset < 0) {
                    // ������Ӧ�� Invoker
                    return invokers.get(i);
                }
            }
        }
        // ������з����ṩ��Ȩ��ֵ��ͬ����ʱֱ���������һ������
        return invokers.get(random.nextInt(length));
    }
}
```

���Ȩ��һ�£������ѡ��һ�������Ȩ�ز�ͬ�������Ȩ�ط��䡣

## LeastActiveLoadBalance

��С��Ծ�����ؾ��⡣�����Ծ����ʾִ���е�����������ÿ�������ṩ�߶�Ӧһ����Ծ�� active����ʼ����£����з����ṩ�߻�Ծ����Ϊ0��ÿ�յ�һ�����󣬻�Ծ����1�����������򽫻�Ծ����1��

���������ȵ�����£���Ծ��Խ�͵ķ����ṩ�ߣ�������Խ�á�

```java
protected <T> Invoker<T> doSelect(List<Invoker<T>> invokers, URL url, Invocation invocation) {
    int length = invokers.size(); // Number of invokers
    // ��С�Ļ�Ծ��
    int leastActive = -1; // The least active value of all invokers
    // ������ͬ����С��Ծ�����ķ������ṩ�ߣ������� Invoker ���ƣ�����
    int leastCount = 0; // The number of invokers having the same least active value (leastActive)
    // leastIndexs ���ڼ�¼������ͬ����С��Ծ������ Invoker �� invokers �б��е��±���Ϣ
    int[] leastIndexs = new int[length]; // The index of invokers having the same least active value (leastActive)
    int totalWeight = 0; // The sum of with warmup weights
    // ��һ����С��Ծ���� Invoker Ȩ��ֵ������������������ͬ��С��Ծ���� Invoker ��Ȩ�ؽ��жԱȣ�
    // �Լ���Ƿ����о�����ͬ��С��Ծ���� Invoker ��Ȩ�ء������
    int firstWeight = 0; // Initial value, used for comparision
    boolean sameWeight = true; // Every invoker has the same weight value?

    // ���� invokers �б�
    for (int i = 0; i < length; i++) {
        Invoker<T> invoker = invokers.get(i);
        // ��ȡ Invoker ��Ӧ�Ļ�Ծ��
        int active = RpcStatus.getStatus(invoker.getUrl(), invocation.getMethodName()).getActive(); // Active number
        // ��ȡȨ��
        int afterWarmup = getWeight(invoker, invocation); // Weight
        // ���ָ�С�Ļ�Ծ�������¿�ʼ
        if (leastActive == -1 || active < leastActive) { // Restart, when find a invoker having smaller least active value.
            // ʹ�õ�ǰ��Ծ�� active ������С��Ծ�� leastActive
            leastActive = active; // Record the current least active value
            // ���� leastCount Ϊ 1
            leastCount = 1; // Reset leastCount, count again based on current leastCount
            // ��¼��ǰ�±�ֵ�� leastIndexs ��
            leastIndexs[0] = i; // Reset
            totalWeight = afterWarmup; // Reset
            firstWeight = afterWarmup; // Record the weight the first invoker
            sameWeight = true; // Reset, every invoker has the same weight value?
        // ��ǰ Invoker �Ļ�Ծ�� active ����С��Ծ�� leastActive ��ͬ
        } else if (active == leastActive) { // If current invoker's active value equals with leaseActive, then accumulating.
            // �� leastIndexs �м�¼�µ�ǰ Invoker �� invokers �����е��±�
            leastIndexs[leastCount++] = i; // Record index number of this invoker
            // �ۼ�Ȩ��
            totalWeight += afterWarmup; // Add this invoker's weight to totalWeight.
            // If every invoker has the same weight?
            // ��⵱ǰ Invoker ��Ȩ���� firstWeight �Ƿ���ȣ�
            // ������� sameWeight ��Ϊ false
            if (sameWeight && i > 0
                    && afterWarmup != firstWeight) {
                sameWeight = false;
            }
        }
    }
    // assert(leastCount > 0)
    // ��ֻ��һ�� Invoker ������С��Ծ������ʱֱ�ӷ��ظ� Invoker ����
    if (leastCount == 1) {
        // If we got exactly one invoker having the least active value, return this invoker directly.
        return invokers.get(leastIndexs[0]);
    }
    // �ж�� Invoker ������ͬ����С��Ծ����������֮���Ȩ�ز�ͬ
    if (!sameWeight && totalWeight > 0) {
        // If (not every invoker has the same weight & at least one invoker's weight>0), select randomly based on totalWeight.
        // �������һ�� [0, totalWeight) ֮�������
        int offsetWeight = random.nextInt(totalWeight) + 1;
        // Return a invoker based on the random value.
        // ѭ�����������ȥ������С��Ծ���� Invoker ��Ȩ��ֵ��
        // �� offset С�ڵ���0ʱ��������Ӧ�� Invoker
        for (int i = 0; i < leastCount; i++) {
            int leastIndex = leastIndexs[i];
            // ��ȡȨ��ֵ�������������ȥȨ��ֵ
            offsetWeight -= getWeight(invokers.get(leastIndex), invocation);
            if (offsetWeight <= 0)
                return invokers.get(leastIndex);
        }
    }
    // If all invokers have the same weight value or totalWeight=0, return evenly.
    // ���Ȩ����ͬ��Ȩ��Ϊ0ʱ���������һ�� Invoker
    return invokers.get(leastIndexs[random.nextInt(leastCount)]);
}
```

����Ƚ϶࣬��������ע�ͣ����Ŀ����ɡ�����������˼����£�

1. ���� invokers ���ϣ��ҳ���Ծ����С�� invoker
2. ���ֻ��һ�� invoker ����С��Ծ�����򷵻�
3. ����ж�� invoker ����ͬ����С��Ծ��������Щ invoker ���м�Ȩ����㷨����Ҳ���Ƕ��⼸����С��Ծ�� invoker ���� RandomLoadBalance ���߼���

�����и�������չ˵�£����ǻ�ȡ��Ծ���ķ���

RpcStatus.getStatus(invoker.getUrl(), invocation.getMethodName()).getActive();

`RpcStatus`��¼�ŵ�ǰ���ô�����������ʧ���������ü����״̬��Ϣ��

��Щ��Ϣ���ڷ��������߶���`ActiveLimitFilter`��¼���ڷ����ṩ�߶���`ExecuteLimitFilter`��¼��Ҳ���ǣ���Ҫ�õ���ȷ�Ļ�Ծ������Ҫ`ActiveLimitFilter`��Ч���С�

```java
@Activate(group = Constants.CONSUMER, value = Constants.ACTIVES_KEY)
public class ActiveLimitFilter implements Filter
```

`ActiveLimitFilter`��Ч��Ҫ�������������������߶��Լ�URL��Я��`actives`������`actives`���������߶˻������߶����ã�����Ϊ��ÿ����������ÿ����ÿ������󲢷�������

```xml
<dubbo:service interface="com.alibaba.dubbo.demo.DemoService" ref="demoService" registry="remoteRegistry" actives="5" />
<dubbo:reference id="demoService" interface="com.alibaba.dubbo.demo.DemoService" loadbalance="leastactive" actives="5" />
```

��Ȼ��Ҳ�ܸ������߽ӿ�ָ���������ķ���������`ActiveLimitFilter`

```xml
<dubbo:reference id="demoService" interface="com.alibaba.dubbo.demo.DemoService" filter="activelimit" />
```

## RoundRobinLoadBalance

RoundRobinLoadBalance�Ǽ�Ȩ��ѯ���ؾ����ʵ�֡���Ȩ��ѯ��ԭ�������£�

������� [A, B, C] ��Ȩ��Ϊ [5, 1, 1] ������Ȩ��Ϊ 7�� ��ǰȨ��currentWeight��ʼΪ[0, 0, 0]

1. ��ǰȨ�ؼ���ÿ��������Ե�Ȩ�أ���ת����2
   
    ��ʱcurrentWeightΪ [0+5, 0+1, 0+1] = [5, 1, 1]
    
2. ����currentWeight����ߵķ�����ת����3
   
    currentWeightΪ [5, 1, 1] �����ط���A
    
3. ����2���е��Ǹ����Ȩ����currentWeight��Ӧ��ֵ��ȥ��Ȩ�أ���ת����4
   
    currentWeightΪ [5 - 7, 1, 1] = [-2, 1, 1]
    
4. �ظ�����1

�����GIFͼΪ�˺ñ�ʾ��״ͼ�������ҽ�currentWeight��ʼȨ�ر�Ϊ10

![Untitled](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ee33b7c85ea48d4b2263b37c1b00108~tplv-k3u1fbpfcp-zoom-1.image)

����һ��ѭ������������currentWeight�ֻ�ع��ʼֵ�������ѭ�������������£�

���� = ����A��Ȩ�� + ����B��Ȩ�� + ��

ÿ������ĵ��ô���Ҳ��������Ȩ��

����ԭ�����Ǽ�����Դ��

```java
protected <T> Invoker<T> doSelect(List<Invoker<T>> invokers, URL url, Invocation invocation) {
    // key = ȫ�޶����� + "." + ������������ com.xxx.DemoService.sayHello
    String key = invokers.get(0).getUrl().getServiceKey() + "." + invocation.getMethodName();
    // ��ȡ url �� WeightedRoundRobin ӳ������Ϊ�գ��򴴽�һ���µ�
    ConcurrentMap<String, WeightedRoundRobin> map = methodWeightMap.get(key);
    if (map == null) {
        methodWeightMap.putIfAbsent(key, new ConcurrentHashMap<String, WeightedRoundRobin>());
        map = methodWeightMap.get(key);
    }
    // Ȩ���ܺ�
    int totalWeight = 0;
    // ���Ȩ��
    long maxCurrent = Long.MIN_VALUE;
    long now = System.currentTimeMillis();
    Invoker<T> selectedInvoker = null;
    WeightedRoundRobin selectedWRR = null;

    // �������ѭ����Ҫ���������������飺
    //   1. ���� Invoker �б���⵱ǰ Invoker �Ƿ���
    //      ��Ӧ�� WeightedRoundRobin��û���򴴽�
    //   2. ��� Invoker Ȩ���Ƿ����˱仯�����仯�ˣ�
    //      ����� WeightedRoundRobin �� weight �ֶ�
    //   3. �� current �ֶμ�������Ȩ�أ��ȼ��� current += weight
    //   4. ���� lastUpdate �ֶΣ��� lastUpdate = now
    //   5. Ѱ�Ҿ������ current �� Invoker���Լ� Invoker ��Ӧ�� WeightedRoundRobin��
    //      �ݴ���������������
    //   6. ����Ȩ���ܺ�
    for (Invoker<T> invoker : invokers) {
        String identifyString = invoker.getUrl().toIdentityString();
        WeightedRoundRobin weightedRoundRobin = map.get(identifyString);
        int weight = getWeight(invoker, invocation);
        if (weight < 0) {
            weight = 0;
        }
        // ��⵱ǰ Invoker �Ƿ��ж�Ӧ�� WeightedRoundRobin��û���򴴽�
        if (weightedRoundRobin == null) {
            weightedRoundRobin = new WeightedRoundRobin();
            // ���� Invoker Ȩ��
            weightedRoundRobin.setWeight(weight);
            // �洢 url Ψһ��ʶ identifyString �� weightedRoundRobin ��ӳ���ϵ
            map.putIfAbsent(identifyString, weightedRoundRobin);
            weightedRoundRobin = map.get(identifyString);
        }
        // Invoker Ȩ�ز����� WeightedRoundRobin �б����Ȩ�أ�˵��Ȩ�ر仯�ˣ���ʱ���и���
        if (weight != weightedRoundRobin.getWeight()) {
            //weight changed
            weightedRoundRobin.setWeight(weight);
        }
        // �� current ��������Ȩ�أ��ȼ��� current += weight
        long cur = weightedRoundRobin.increaseCurrent();
        // ���� lastUpdate����ʾ���ڸ��¹�
        weightedRoundRobin.setLastUpdate(now);
        if (cur > maxCurrent) {
            maxCurrent = cur;
            // ��������� current Ȩ�ص� Invoker ��ֵ�� selectedInvoker
            selectedInvoker = invoker;
            // �� Invoker ��Ӧ�� weightedRoundRobin ��ֵ�� selectedWRR����������
            selectedWRR = weightedRoundRobin;
        }
        // ����Ȩ���ܺ�
        totalWeight += weight;
    }
    // �� <identifyString, WeightedRoundRobin> ���м�飬���˵���ʱ��δ�����µĽڵ㡣
    // �ýڵ���ܹ��ˣ�invokers �в������ýڵ㣬���Ըýڵ�� lastUpdate ��ʱ���޷������¡�
    // ��δ����ʱ��������ֵ�󣬾ͻᱻ�Ƴ�����Ĭ����ֵΪ60�롣
    if (!updateLock.get() && invokers.size() != map.size()) {
        if (updateLock.compareAndSet(false, true)) {
            try {
                // copy -> modify -> update reference
                ConcurrentMap<String, WeightedRoundRobin> newMap = new ConcurrentHashMap<String, WeightedRoundRobin>();
                // ����
                newMap.putAll(map);

                // �����޸ģ����Ƴ����ڼ�¼
                Iterator<Entry<String, WeightedRoundRobin>> it = newMap.entrySet().iterator();
                while (it.hasNext()) {
                    Entry<String, WeightedRoundRobin> item = it.next();
                    if (now - item.getValue().getLastUpdate() > RECYCLE_PERIOD) {
                        it.remove();
                    }
                }
                // ��������
                methodWeightMap.put(key, newMap);
            } finally {
                updateLock.set(false);
            }
        }
    }
    if (selectedInvoker != null) {
        // �� current ��ȥȨ���ܺͣ��ȼ��� current -= totalWeight
        selectedWRR.sel(totalWeight);
        // ���ؾ������ current �� Invoker
        return selectedInvoker;
    }
    // should not happen here
    return invokers.get(0);
}
```

ע��д�ĺ���ϸ�ˣ���ԭ�����࣬Դ���ж���Գ�ʱ��δ���� invoker �Ĵ��� 

## ConsistentHashLoadBalance

һ����Hash�㷨��

��ԭ��򵥽������Ǽٶ���һ��Բ����ÿ����������� hash ֵ����Բ�����и�λ�ã���ͼ��cache-1��cache-2�ȣ���������������ģ�ͬ����������� hash ֵȷ�������λ�ã������������λ��ȥ��ȡ�������һ�������λ�á�����ͼ��

![Untitled](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bad081fd9e7c4fd78e03320876b9b9b9~tplv-k3u1fbpfcp-zoom-1.image)

���������� cache-2 �� cache-3 ֮��ʱ����һ��������� cache-3����� cache-3 ���񲻿��ã���ô������¸�������� cache-4

��ʱ����������һ����Դ��б�����⣬�Ǿ��Ǵ�����������ͬһ�������С����ڷ�����Բ���Ϸֲ����������´󲿷���������cache-2�У�����ͼ��

![Untitled](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5fbc983575244b2bd9f308377cfdc88~tplv-k3u1fbpfcp-zoom-1.image)

��ô����δ�����Դ��б�����⣿��������ڵ㣬����һ�������ж�����λ�ã���������ʹ��������ȣ�����ͼ��

![Untitled](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19b1e0dc1a3d41d78fdea3121dff0d26~tplv-k3u1fbpfcp-zoom-1.image)

���Ͼ���һ����hash�㷨��ԭ�����潲��Dubbo��Դ��

```java
public class ConsistentHashLoadBalance extends AbstractLoadBalance {

    private final ConcurrentMap<String, ConsistentHashSelector<?>> selectors = new ConcurrentHashMap<String, ConsistentHashSelector<?>>();

    @Override
    protected <T> Invoker<T> doSelect(List<Invoker<T>> invokers, URL url, Invocation invocation) {
        String methodName = RpcUtils.getMethodName(invocation);
        String key = invokers.get(0).getUrl().getServiceKey() + "." + methodName;

        // ��ȡ invokers ԭʼ�� hashcode
        int identityHashCode = System.identityHashCode(invokers);
        ConsistentHashSelector<T> selector = (ConsistentHashSelector<T>) selectors.get(key);
        // ��� invokers ��һ���µ� List ������ζ�ŷ����ṩ�����������˱仯����������Ҳ���ܼ����ˡ�
        // ��ʱ selector.identityHashCode != identityHashCode ��������
        if (selector == null || selector.identityHashCode != identityHashCode) {
            // �����µ� ConsistentHashSelector
            selectors.put(key, new ConsistentHashSelector<T>(invokers, methodName, identityHashCode));
            selector = (ConsistentHashSelector<T>) selectors.get(key);
        }
        // ���� ConsistentHashSelector �� select ����ѡ�� Invoker
        return selector.select(invocation);
    }

    private static final class ConsistentHashSelector<T> {...}
}
```

doSelect �����ȴӻ����ȡ selector ���������û�У��򴴽������뻺�档Ȼ����� selector.select ������ȡ invoker ������һ���� hash ��ʵ�֣���ConsistentHashSelector�С������ȿ��乹�췽��

```java
ConsistentHashSelector(List<Invoker<T>> invokers, String methodName, int identityHashCode) {
    // ������ΪvirtualInvokers�����hash��
    this.virtualInvokers = new TreeMap<Long, Invoker<T>>();
    this.identityHashCode = identityHashCode;
    URL url = invokers.get(0).getUrl();
    // ��ȡ����ڵ�����Ĭ��Ϊ160
    this.replicaNumber = url.getMethodParameter(methodName, "hash.nodes", 160);
    // ��ȡ���� hash ����Ĳ����±�ֵ��Ĭ�϶Ե�һ���������� hash ����
    String[] index = Constants.COMMA_SPLIT_PATTERN.split(url.getMethodParameter(methodName, "hash.arguments", "0"));
    argumentIndex = new int[index.length];
    for (int i = 0; i < index.length; i++) {
        argumentIndex[i] = Integer.parseInt(index[i]);
    }
    for (Invoker<T> invoker : invokers) {
        String address = invoker.getUrl().getAddress();
        for (int i = 0; i < replicaNumber / 4; i++) {
            // �� address + i ���� md5 ���㣬�õ�һ������Ϊ16���ֽ�����
            byte[] digest = md5(address + i);
            // �� digest �����ֽڽ���4�� hash ���㣬�õ��ĸ���ͬ�� long ��������
            for (int h = 0; h < 4; h++) {
                // h = 0 ʱ��ȡ digest ���±�Ϊ 0 ~ 3 ��4���ֽڽ���λ����
                // h = 1 ʱ��ȡ digest ���±�Ϊ 4 ~ 7 ��4���ֽڽ���λ����
                // h = 2, h = 3 ʱ����ͬ��
                long m = hash(digest, h);
                // �� hash �� invoker ��ӳ���ϵ�洢�� virtualInvokers �У�
                // virtualInvokers ��Ҫ�ṩ��Ч�Ĳ�ѯ���������ѡ�� TreeMap ��Ϊ�洢�ṹ
                virtualInvokers.put(m, invoker);
            }
        }
    }
}
```

ConsistentHashSelector�Ĺ��췽������Ҫ�Ǽ��� invokers ��ÿһ�� invoker ��hash����������� virtualInvokers �С���������Կ�����DubboĬ�ϵ�����ڵ�Ϊ160�����Ա�һ���� hash �㷨�У�virtualInvokers ���� hash ����invoker ���ǽڵ㡣

���Ǽ�������δ� hash �����ҵ�����Ľڵ�

```java
public Invoker<T> select(Invocation invocation) {
    // ������תΪ key
    String key = toKey(invocation.getArguments());
    // �Բ��� key ���� md5 ����
    byte[] digest = md5(key);
    // ȡ digest �����ǰ�ĸ��ֽڽ��� hash ���㣬�ٽ� hash ֵ���� selectForKey ������
    // Ѱ�Һ��ʵ� Invoker
    return selectForKey(hash(digest, 0));
}

private Invoker<T> selectForKey(long hash) {
    // �� TreeMap �в��ҵ�һ���ڵ�ֵ���ڻ���ڵ�ǰ hash �� Invoker
    Map.Entry<Long, Invoker<T>> entry = virtualInvokers.tailMap(hash, true).firstEntry();
    // ��� hash ���� Invoker ��Բ��������λ�ã���ʱ entry = null��
    // ��Ҫ�� TreeMap ��ͷ�ڵ㸳ֵ�� entry
    if (entry == null) {
        entry = virtualInvokers.firstEntry();
    }
    return entry.getValue();
}
```

ѡ��Ĺ���Ҳ�ܼ򵥣��������� TreeMap �� tailMap ������

# �ܽ�

���Ľ�����Dubbo���õ�4�и��ؾ���ʵ�֡����ˣ�Dubbo�ļ�Ⱥ�ݴ���ĸ����֣�Ҳ���Ƿ���Ŀ¼ Directory������·�� Router����Ⱥ Cluster �͸��ؾ��� LoadBalance ����ȫ�����ꡣ

---

**�ο�����**

[Dubbo����ָ��](https://dubbo.apache.org/zh/docsv2.7/dev/)