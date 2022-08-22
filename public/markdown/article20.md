日志是软件工程中的一个重要概念。通过写出应用程序中发生的事件的审计，日志在试图了解应用程序的代码实际上做什么时，为开发人员提供了洞察力。

在这篇文章中，我们将比较Node.js的不同日志工具，包括:

*   [Bunyan](https://blog.logrocket.com/comparing-node-js-logging-tools/#bunyan)
*   [Winston](https://blog.logrocket.com/comparing-node-js-logging-tools/#winston)
*   [Pino](https://blog.logrocket.com/comparing-node-js-logging-tools/#pino)
*   [Morgan](https://blog.logrocket.com/comparing-node-js-logging-tools/#morgan)
*   [npmlog](https://blog.logrocket.com/comparing-node-js-logging-tools/#npmlog)

但在我们看比较之前，让我们深入了解一下日志的要素。

我们为什么要写日志？
----------

在任何应用程序中处理日志时，理解日志级别是很重要的。日志级别是对日志文件中的条目按照紧急程度和如何显示它们进行分类的一种方式。

每个定义的日志消息都有一个相关的日志级别，它对消息的重要性和紧迫性提供了一个粗略的指导。Nodejs中最常见的日志级别是:

*   `ERROR`
*   `INFO`
*   `DEBUG`
*   `WARN`
*   `FATAL`

每一个日志级别都有自己的使用情况以及如何应用它们。

### `ERROR` 日志级别

`ERROR` 级别表示一个必须处理的严重问题。它指定了可能仍然允许应用程序继续运行的错误事件。

### `INFO` 日志级别

这个日志级别记录了一个已经发生的事件。这些警报通常可以被忽略，假设系统的其他部分继续正常运行。

它基本上表明了信息性的消息，在一个细微的层面上突出了应用程序的进展。

### `DEBUG` 日志级别

`DEBUG` 日志级别包含的信息只在调试阶段有用，在生产阶段可能没有什么价值。它们基本上是信息性事件，在调试应用程序时最有用。

### `WARN` 日志级别

`WARN` 日志级别比错误情况略低，因为它们表示潜在的有害情况。该信息表明在一个应用程序中发生了一个意外事件，可能会扰乱或延迟其他进程。

### `FATAL` 日志级别

这个日志级别表示非常严重的错误事件，估计会导致应用程序中止。

Node.js的日志库
-----------

现在我们了解了不同的日志级别，我们可以深入了解Node.js中不同的日志工具以及如何在我们的应用程序中使用它们。

### Bunyan

[Bunyan是Node](https://www.npmjs.com/package/bunyan).[js](https://www.npmjs.com/package/bunyan)[中一个非常流行的日志工具](https://www.npmjs.com/package/bunyan)。它是一个简单而快速的Node.js服务的JSON日志库，提供了一个漂亮的日志CLI视图，用不同的颜色描述不同的日志级别。

![](https://blog.logrocket.com/wp-content/uploads/2021/10/Bunyan-interface.png)
#### 安装Bunyan

要安装Bunyan，请在你的终端添加以下内容:

```
npm i bunyan
```

#### 使用Bunyan

要开始使用Bunyan进行日志记录，请创建一个`test.js` 文件并添加这段代码用于测试:

```
const bunyan = require('bunyan');
```

在需要该包后，我们必须使用`createLogger` 方法定义一个记录器的实例:

```
var log = bunyan.createLogger({
  name: '<name of application',
  stream: process.stdout
});
```

然后我们可以使用Bunyan来记录数据:

```
log.info('hi');
```

如果我们运行我们的`test.js` 文件，我们会在控制台得到这样的输出:

```
{"name":"myapp","hostname":"banana.local","pid":40161,"level":30,"msg":"hi","time":"2013-01-04T18:46:23.851Z","v":0}
```

这里很明显，Bunyan主张日志应该是JSON格式的，而且每条日志都带有日志发生的日期。在Node.js中，一个常见的做法是将这些日志实体存储在一个文件中，以供参考。

#### Bunyan的好处

[Bunyan除了支持](https://github.com/trentm/node-bunyan#runtime-environments)Node.js之外，还[支持多种运行时](https://github.com/trentm/node-bunyan#runtime-environments)，如[Webpack](https://blog.logrocket.com/changes-coming-to-webpack-in-2021/)、Browserify和NW.js。

Bunyan也有序列化的概念，其中函数从一个JavaScript对象产生一个JSON-able对象。在这里，一个特定的记录器实例可以有一个`serializer` ，将一个日志记录字段名映射到一个序列化函数。

而通过子日志，开发者可以为应用程序的某个子组件专门设计一个日志器，比如创建一个新的日志器，并在其日志记录中包含额外的绑定字段。

### Winston

Winston是一个顶级的Node.js日志库，由于其庞大的社区和功能，在写这篇文章时，[GitHub上有超过17k颗星](https://github.com/winstonjs/winston)。

Winston对日志的部分内容进行了解耦，并通过大量的配置使其具有可扩展性和灵活性，使开发变得无缝。

#### 安装Winston

要安装Winston，请在你的终端添加以下内容。

```
npm i winston
```

#### 使用Winston

安装完库后，我们必须在我们的根文件中要求该库并创建一个实例:

```
const winston = require('winston');
const logger = winston.createLogger({})
```

`createLogger` 方法可以容纳大量的配置，如日志级别、格式和元描述:

```
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: '<service>' },
});
```

此外，我们还可以通过在`transport` 数组中包括文件来指定一个文件，将所有日志写入其中:

```
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

这里我们设置所有日志级别为错误的日志必须写入`error.log` 文件，而所有其他的日志必须写入`combined.log` 文件。

我们也可以通过在`transport` 数组中使用这个配置，选择只在控制台中显示我们的日志:

```
new winston.transports.Console()
```

要获得Winston提供的所有方法，[你可以参考文档](https://www.npmjs.com/package/winston)。

#### Winston的好处

Winston给出了将日志发送到其他云日志服务的能力，如[logz.io](http://logz.io)和[AWS Cloudwatch](https://www.npmjs.com/package/winston-cloudwatch)，而不是将日志存储在静态文件中或在控制台中记录。

由于每个日志都有一个时间戳和一个日志级别，所以可以根据任何发生的情况轻松追踪日志。

### Pino

Pino吹嘘自己是一个 "非常低开销 "的Node.js日志记录器，因为它使用最小的资源来记录。使用Pino，记录的信息会随着时间的推移而增加，从而导致对应用程序的节流效果，如每秒请求的减少。

节流是一种方法，无论用户发射多少次事件，所附函数在给定的时间间隔内只执行一次。

#### 安装Pino

要安装Pino，请在你的终端添加以下内容:

```
npm i pino
```

#### 使用Pino

使用这个库是非常容易和直接的。你所要做的就是需要这个库并初始化它:

```
const logger = require('pino')()

logger.info('hello world')
```

运行这个脚本在控制台产生以下内容:

```
{"level":30,"time":1531171074631,"msg":"hello world","pid":657,"hostname":"Davids-MBP-3.fritz.box"}
```

控制台上的这些日志数据包括：日志级别、数据被记录的时间、日志的实际信息、日志的`id` 、以及主机。

#### 在Express.js中使用Pino

你也可以通过安装这个包在你的Express.js应用程序中使用Pino:

```
npm install pino-http
```

安装这个库后，你可以像这样在你的Express.js应用程序中使用它:

```
const express = require('express')
const pino = require('pino-http')

const app = express();
const pinoInstance = pino()

app.use(pinoInstance);

app.post('/do-stuff', (req,res) => {
  req.log.info('Something done');
  res.send('Say hello to Pino')
})

app.listen(5500)
```

#### Pino的好处

Pino有一个模块，提供了一个基本的NDJSON格式化器，叫做`pino-pretty` 。

新线分隔的JSON，或称NDJSON，是一种方便的存储或流式结构化数据的格式，可以一次处理一条记录。所有的日志数据都通过考虑日志级别和时间戳等事项应用额外的格式化。

你可以在你的项目上或在你的本地机器上全局安装`pino-pretty` 。

要安装`pino-pretty` ，运行这个命令:

```
npm install -g pino-pretty
```

安装后，你可以使用以下命令运行你的应用程序:

```
node app.js | pino-pretty
```

### Morgan

Morgan是一个Node.js库，用于记录HTTP请求。它通常被作为一个中间件加入，这样它就可以跟踪所有的请求。与其他日志工具不同，它的主要功能是记录HTTP请求。

#### 安装Morgan

要安装Morgan，请在你的终端添加以下内容:

```
npm i morgan
```

#### 使用Morgan

安装后，你必须要求该库，然后将其添加为Express.js中间件:

```
var morgan = require('morgan')

app.use(morgan('dev'))
```

传递的`dev` ，是Morgan的格式。Morgan实现了五种日志格式:

1.  `combined` ，它使用标准的Apache组合日志输出
2.  `common`, 它使用标准的Apache组合日志输出
3.  `dev`, 它使用简洁的输出，以响应状态为颜色，供开发使用
4.  `short`, 包括响应时间并默认缩短日志
5.  `tiny`, 它使用最小的输出

然后你可以使用这些格式，如下图所示:

```
app.use(morgan('combined'))
app.use(morgan('common'))
app.use(morgan('dev'))
app.use(morgan('short'))
app.use(morgan('tiny'))
```

#### Morgan的好处

无需编写额外的配置代码，Morgan让你能够根据你的利基市场选择任何一种预定义的格式，从而节省你的时间。

### npmlog

这是npm使用的官方日志工具。就像其他Node.js日志库一样，它支持自定义级别，彩色输出，并让你有能力为你的不同日志级别设置不同的颜色。

#### 安装npmlog

要安装Npmlog，在你的终端添加以下内容:

```
npm i npmlog
```

#### 使用npmlog

要开始使用该库，创建一个测试文件，然后要求该包:

```
const log = require('npmlog');
log.info('Wisdom Ekpot', 'Hello from logrocket', {'message': 'test'})

```

`log.info` ，在控制台或文件中记录数据，它最多可以接受三个参数:

*   第一个参数：日志的前缀
*   第二个参数：实际的日志信息
*   第三参数：日志的附加数据

#### npmlog的好处

就像其他的日志工具一样，npmlog也有很多方法来简化开发，比如设置日志头、标题样式和定义日志级别。

Node.js日志库的统计数据
---------------

下面是我们在本文中涉及的Node.js日志库的快速比较；所有数据在发布本文时都是准确的。

#### .tg {border-collapse:collapse;border-spacing:0;}<br />.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;<br /> overflow:hidden; padding:10px 5px; word-break:normal; }<br />.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;<br /> font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}<br />.tg .tg-1wig{font-weight:bold; text-align:left; vertical-align:top}.<br />.tg .tg-0lax{text-align:left;vertical-align:top}。<br />

| 图书馆 | 每周下载次数 | Github星级 | Github分叉 |
| --- | --- | --- | --- |
| 邦彦 | 1,568,274 | 6.7k | 522 |
| 温斯顿 | 6,364,282 | 17.8k | 1.6k |
| 皮诺 | 1,836,807 | 7.8k | 530 |
| 摩根 | 2,873,389 | 6.7k | 485 |
| npmlog | 13,220,573 | 358 | 55 |

总结
--

通过所有这些Node.js日志工具，它表明在我们的任何Node.js项目中实现日志是相当简单和直接的。通常建议使用适合你的应用目的和显示实际需要的数据的库。

