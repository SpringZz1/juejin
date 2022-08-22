## ǰ��
��Ϣ�����Ǵ洢���ݵ�һ���м�����������Ϊһ��������������������ϢͶ�� �������У������߿�����ȡ��Ϣ�������ѣ����������Ŀǰû�����ѵĴ��㣬����Ϣ���лᱣ����Ϣ��ֱ�������������ѵĴ��㡣
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df001e0ce7ca4a3e9851d9181e11e232~tplv-k3u1fbpfcp-zoom-1.image)
## ���˼·
### ������

- ���� redis
- ��ָ��ͨ�� ͨ�� lpush ��Ϣ
### ������ 

- ���� redis
- ��ѭ��ͨ�� brpop ����ʽ��ȡ��Ϣ
- �õ���Ϣ��������
- ѭ����ȥ��һ����Ϣ

## Redis
### ��װ������
> �˲����λ��������ͺã���һ��Ҫ��docker ��ֻҪ��֤�Լ������ӵ�redis ���񼴿ɡ�

```shell
# ʹ��docker ��ȡredis ����
docker pull redis:latest

# ����redis���� 
# --name �������������ַ������ά���͹��� 
# -p ������ָӳ����������� 6379 �˿ڵ��������� 6379 �˿�
docker run -itd --name redis-mq -p 6379:6379 redis


# ============ docker ���û�������(���⻰) =================

# ��ȡ����
docker pull �������� 

# �鿴����
docker images

# ɾ������
docker rmi ��������

# �鿴��������(��Ϊ�����е�)
docker ps 

# �鿴��������(����δ����)
docker ps -a

# ��������
docker start ��������/����id

# ֹͣ����
docker stop ��������/����id

```
### Nodejs����
��ʼ������
```shell
# �����ļ��в�����
mkdir queue-node-redis && cd queue-node-redis

# yarn ��ʼ��
yarn init -y

# ����redis����
# ָ���汾��ԭ���Ǿ������ٵ����ǵ�ʧ�ܼ��� �Ͼ�ǰ�˵Ĺ��ߵ���̫����
yarn add redis@4.2.0   
```
���� lib �� utils Ŀ¼
```shell
������ .gitignore
������ lib
������ package.json
������ utils
��   ������ redis.js
������ yarn.lock
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
> ����Ŀ��Ŀ¼�´������ļ�������redis�����Ƿ�ɹ�

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
��������ͼ��ʾ����
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4cd4fd6271a14fe98ba31f3115a5d996~tplv-k3u1fbpfcp-zoom-1.image)
[01-redis GitHub��ַ](https://github.com/a20070322/queue-node-redis/tree/01-redis)
## minimist
�������������в����������档
```shell
# ��װ minimist
yarn add minimist@1.2.6
```
### ʹ�÷���
```javascript
const systemArg = require("minimist")(process.argv.slice(2));
console.log(systemArg);

```
```bash
# ���� 
node index.js --name test

# ���
{ _: [], name: 'test' }
```
[02-minimist GitHub��ַ](https://github.com/a20070322/queue-node-redis/tree/02-minimist)
## ���Ŀ�ʼ
> ��Ŀ¼�ṹ���ļ��������ְ��ֽ̳�

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/200491f468f24a4f924719b1b80abeca~tplv-k3u1fbpfcp-zoom-1.image)
### Ŀ¼�ṹ���
```bash
������ config.js  	 # �����ļ�
������ lib
��   ������ index.js # ��Ŀ¼����ļ�
������ package.json 
������ utils				 # ���ߺ�����
��   ������ redis.js
������ yarn.lock
```
### config.js
> �����ļ�˼·����Ҫ�Դ��ڴ����ʵ��

```javascript
module.exports = {
  // redis ����
  redis: {
    default: {
      host: "127.0.0.1",
      port: 6379,
      password: "",
      db: 0,
    },
  },
  // ��Ϣ����Ƶ������
  mqList: [
    {
      // ��ϢƵ������
      name: "QUEUE_MY_MQ",
      // ����ʽȡֵ��ʱ����
      brPopTimeout: 100,
      // ���������� ��������Ҫ PM ������Ч
      instances: 1,
      // redis ����key
      redis: "default",
    },
  ],
};
```
### lib/index.js
> ��������������쳣����

```javascript
const systemArg = require("minimist")(process.argv.slice(2));
const config = require("../config");
const { bootstrap } = require("./core");

// �����Լ�

// �ж��Ƿ������� Ƶ������
if (!systemArg.name) {
  console.error("ERROR: channel name cannot be empty");
  process.exit(99);
}

// Ƶ����������
const mqConfig =
  config.mqList.find((item) => item.name === systemArg.name) ?? false;

// ���config������
if (!mqConfig) {
  console.error("ERROR:  configuration not obtained");
  process.exit(99);
}

// redis ����
const redisConfig = config.redis[mqConfig.redis];
if (!redisConfig) {
  console.error("ERROR: redis configuration not obtained");
  process.exit(99);
}

// node index.js --name QUEUE_MY_MQ
bootstrap(mqConfig, redisConfig);

```
### lib/core.js
> ����ĺ����߼�д�ڴ˴�

```javascript
async function bootstrap(config) {
  console.log(config);
}

module.exports = {
  bootstrap,
};

```
[03-config GitHub��ַ](https://github.com/a20070322/queue-node-redis/tree/03-config)
## �����߼�
### lib/core.js
```javascript
const { redisCreateClient } = require("../utils/redis");
async function bootstrap(mqConfig, redisConfig) {
  try {
    // ����redis����
    const client = await redisCreateClient(redisConfig);
    // ͨ����ѭ����������
    while (true) {
      let res = null;
      console.log("����ִ��");
      try {
        // �Ӷ����л�ȡ����, ��������ʽ��ȡ���� �������ʱ��Ϊconfig.queue.timeout
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
    // ��������쳣
    console.log("ERROR: ", err);
    process.exit(1);
  }
}
module.exports = {
  bootstrap,
};

```
### ���ɲ�������
> Ϊ�˽������Ĳ��ԣ�����������һЩ��������

test/mockMq.js
```javascript
const { redisCreateClient } = require("../utils/redis");
const config = require("../config");

/** ���� 1000 ��������Ϣ */
const mockMq = async (key) => {
  const client = await redisCreateClient(config.redis.default);
  for (let i = 0; i < 1000; i++) {
    // ������� push ��Ϣ
    await client.lPush(key, "test" + i);
  }
  // ��ȡ���г���
  const count = await client.lLen(key);
  console.log(`����1000��������Ϣ���,Ŀǰ����${count}����Ϣ`);
  // �ر�redis����
  client.quit();
};

mockMq("QUEUE_MY_MQ");
```
### ��֤�ű���Ч��
```shell
# ִ����Ϣ��������
node ./test/mockMq.js

# �������
# redis connect success
# ���� 1000 ��������Ϣ ��ɣ�Ŀǰ���� 1000 ����Ϣ

# ִ�п���������
node ./lib/index.js --name QUEUE_MY_MQ 
# TODO:: Task processing { key: 'QUEUE_MY_MQ', element: 'test0' }
# TODO:: Task processing .......
# TODO:: Task processing { key: 'QUEUE_MY_MQ', element: 'test999' }
```
[04-core GitHub��ַ](https://github.com/a20070322/queue-node-redis/tree/04-core)
## ����Job
## ���
����Ϊֹ������о�ʵ������ˣ���Ȼ���滹��һЩ�Ż�������ͨ�������ļ� ��̬���� Job  �����ʹ�� Pm2 �������Ѷ��в��ҿ�����������������ͣ���ơ�(ps���˴��Ŀӻ�ܿ첹��)

��Ȼ������Щ��Ŀǰ������׶��л��кܶ಻�㡣��������ִ��ʧ����δ������Ѻ����ack , û���ó����topic Э�飬û��ʵ����ʱ���С���Щ����Ϊ����ˮƽ�Լ�redis��������� ���ܺܳ�һ��ʱ�䶼�������ˡ����������ó�����׼� ���� Kafka RabbitMq �Լ�һЩ�������ʺϵ�ǰ���Ե��׼���
