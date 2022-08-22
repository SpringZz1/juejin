## 前言
消息队列是存储数据的一个中间件，可以理解为一个容器。生产者生产消息投递 到队列中，消费者可以拉取消息进行消费，如果消费者目前没有消费的打算，则消息队列会保留消息，直到消费者有消费的打算。
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df001e0ce7ca4a3e9851d9181e11e232~tplv-k3u1fbpfcp-zoom-1.image)
## 设计思路
### 生产者

- 连接 redis
- 向指定通道 通过 lpush 消息
### 消费者 

- 连接 redis
- 死循环通过 brpop 阻塞式获取消息
- 拿到消息进行消费
- 循环拿去下一个消息

## Redis
### 安装及启动
> 此步骤各位道友随意就好，不一定要用docker 。只要保证自己能连接到redis 服务即可。

```shell
# 使用docker 拉取redis 镜像
docker pull redis:latest

# 启动redis服务 
# --name 后面是容器名字方便后续维护和管理 
# -p 后面是指映射容器服务的 6379 端口到宿主机的 6379 端口
docker run -itd --name redis-mq -p 6379:6379 redis


# ============ docker 常用基本操作(题外话) =================

# 拉取镜像
docker pull 镜像名称 

# 查看镜像
docker images

# 删除镜像
docker rmi 镜像名称

# 查看运行容器(仅为启动中的)
docker ps 

# 查看运行容器(包含未启动)
docker ps -a

# 启动容器
docker start 容器名称/容器id

# 停止容器
docker stop 容器名称/容器id

```
### Nodejs连接
初始化工程
```shell
# 创建文件夹并进入
mkdir queue-node-redis && cd queue-node-redis

# yarn 初始化
yarn init -y

# 下载redis包，
# 指定版本的原因是尽量减少道友们的失败几率 毕竟前端的工具迭代太快了
yarn add redis@4.2.0   
```
创建 lib 与 utils 目录
```shell
├── .gitignore
├── lib
├── package.json
├── utils
│   └── redis.js
└── yarn.lock
```
utils/redis.js
```javascript
const redis = require("redis");

const redisCreateClient = async (config) => {
  try {
    const client = redis.createClient({
      url: `redis://${config.host}:${config.port}`,
    });
    await client.connect();
    await client.select(config.db);
    console.log("redis connect success");
    return client;
  } catch (err) {
    console.log("redis connect error");
    throw err;
  }
};

module.exports = {
  redisCreateClient,
};
```
index.js
> 在项目根目录下创建此文件，测试redis连接是否成功

```shell
const { redisCreateClient } = require("./utils/redis");
const test = async () => {
  const client = await redisCreateClient({
    host: "127.0.0.1",
    port: 6379,
    db: 0,
  });
};
test();

```
出现如下图所示即可
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4cd4fd6271a14fe98ba31f3115a5d996~tplv-k3u1fbpfcp-zoom-1.image)
[01-redis GitHub地址](https://github.com/a20070322/queue-node-redis/tree/01-redis)
## minimist
轻量级的命令行参数解析引擎。
```shell
# 安装 minimist
yarn add minimist@1.2.6
```
### 使用方法
```javascript
const systemArg = require("minimist")(process.argv.slice(2));
console.log(systemArg);

```
```bash
# 运行 
node index.js --name test

# 输出
{ _: [], name: 'test' }
```
[02-minimist GitHub地址](https://github.com/a20070322/queue-node-redis/tree/02-minimist)
## 正文开始
> 从目录结构及文件创建，手把手教程

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/200491f468f24a4f924719b1b80abeca~tplv-k3u1fbpfcp-zoom-1.image)
### 目录结构变更
```bash
├── config.js  	 # 配置文件
├── lib
│   └── index.js # 主目录入口文件
├── package.json 
├── utils				 # 工具函数库
│   └── redis.js
└── yarn.lock
```
### config.js
> 配置文件思路的重要性大于代码的实现

```javascript
module.exports = {
  // redis 配置
  redis: {
    default: {
      host: "127.0.0.1",
      port: 6379,
      password: "",
      db: 0,
    },
  },
  // 消息队列频道设置
  mqList: [
    {
      // 消息频道名称
      name: "QUEUE_MY_MQ",
      // 阻塞式取值超时配置
      brPopTimeout: 100,
      // 开启任务数 此配置需要 PM 启动生效
      instances: 1,
      // redis 配置key
      redis: "default",
    },
  ],
};
```
### lib/index.js
> 针对配置做程序异常处理

```javascript
const systemArg = require("minimist")(process.argv.slice(2));
const config = require("../config");
const { bootstrap } = require("./core");

// 程序自检

// 判断是否输入了 频道名称
if (!systemArg.name) {
  console.error("ERROR: channel name cannot be empty");
  process.exit(99);
}

// 频道队列配置
const mqConfig =
  config.mqList.find((item) => item.name === systemArg.name) ?? false;

// 如果config不存在
if (!mqConfig) {
  console.error("ERROR:  configuration not obtained");
  process.exit(99);
}

// redis 配置
const redisConfig = config.redis[mqConfig.redis];
if (!redisConfig) {
  console.error("ERROR: redis configuration not obtained");
  process.exit(99);
}

// node index.js --name QUEUE_MY_MQ
bootstrap(mqConfig, redisConfig);

```
### lib/core.js
> 后面的核心逻辑写在此处

```javascript
async function bootstrap(config) {
  console.log(config);
}

module.exports = {
  bootstrap,
};

```
[03-config GitHub地址](https://github.com/a20070322/queue-node-redis/tree/03-config)
## 核心逻辑
### lib/core.js
```javascript
const { redisCreateClient } = require("../utils/redis");
async function bootstrap(mqConfig, redisConfig) {
  try {
    // 创建redis连接
    const client = await redisCreateClient(redisConfig);
    // 通过死循环阻塞程序
    while (true) {
      let res = null;
      console.log("队列执行");
      try {
        // 从队列中获取任务, 采用阻塞式获取任务 最大阻塞时间为config.queue.timeout
        res = await client.brPop(mqConfig.name, mqConfig.brPopTimeout);
        if (res === null) {
          continue;
        }
        console.log("TODO:: Task processing", res);
      } catch (error) {
        console.log("ERROR: redis brPop error", error);
        continue;
      }
    }
  } catch (err) {
    // 处理程序异常
    console.log("ERROR: ", err);
    process.exit(1);
  }
}
module.exports = {
  bootstrap,
};

```
### 生成测试数据
> 为了接下来的测试，我们先生成一些测试数据

test/mockMq.js
```javascript
const { redisCreateClient } = require("../utils/redis");
const config = require("../config");

/** 生成 1000 条测试消息 */
const mockMq = async (key) => {
  const client = await redisCreateClient(config.redis.default);
  for (let i = 0; i < 1000; i++) {
    // 向队列中 push 消息
    await client.lPush(key, "test" + i);
  }
  // 获取队列长度
  const count = await client.lLen(key);
  console.log(`生成1000条测试消息完成,目前共有${count}条消息`);
  // 关闭redis连接
  client.quit();
};

mockMq("QUEUE_MY_MQ");
```
### 验证脚本有效性
```shell
# 执行消息生成命令
node ./test/mockMq.js

# 程序输出
# redis connect success
# 生成 1000 条测试消息 完成，目前共有 1000 条消息

# 执行开启消费者
node ./lib/index.js --name QUEUE_MY_MQ 
# TODO:: Task processing { key: 'QUEUE_MY_MQ', element: 'test0' }
# TODO:: Task processing .......
# TODO:: Task processing { key: 'QUEUE_MY_MQ', element: 'test999' }
```
[04-core GitHub地址](https://github.com/a20070322/queue-node-redis/tree/04-core)
## 定义Job
## 后记
到此为止建议队列就实现完成了，当然后面还有一些优化。例如通过配置文件 动态引入 Job  和如何使用 Pm2 启动消费队列并且可配置启动个数、启停控制。(ps：此处的坑会很快补上)

当然除了这些，目前这个简易队列还有很多不足。例如任务执行失败如何处理，消费后如何ack , 没有用成熟的topic 协议，没有实现延时队列。这些坑因为个人水平以及redis本身的特性 可能很长一段时间都不会填了。建议生产用成熟的套件 例如 Kafka RabbitMq 以及一些其他更适合当前语言的套件。
