

# 写在前面
> 好久没写博客了...既然上次写博客的时候还是在上次...然而，这是一篇译文
 
众所周知，Node.js项目在部署的时候，无论是在虚拟机部署，还是使用`docker`进行部署，无非都是要先`npm install`,然后把整个`node_modules`丢上去,最后启动服务

但是有些开发依赖在生产环境部署的时候是不需要的。如果能每次打包只打包生产依赖，那就极大的减少`node_modules`大小

所以当时我在优化公司的nestjs项目时，苦苦寻找解决方案，就找到了这一篇文章，英文版原本在这里
https://www.tomray.dev/nestjs-docker-production

# 原文开始
这是一篇手把手的教程，教你如何在制作`nestjs`镜像时,能够编写出一个优化生产依赖的`Dockerfile`

有了这个`Dockerfile`，无论是在本地开发环境，还是在容器环境都能很轻松完成部署

P.S 如果你想直接复制最终的`Dockerfile`，请直接跳到文章末尾

# 开始编写Dockerfile

每个镜像都可以视为一个单独的软件包，你可以通过编写`Dockerfile`告诉`docker`如何来打包镜像

让我们开始编写吧，首先，先创建一个空的文件
```
touch Dockerfile
```
然后把我们的指令添加到`Dockerfile`里面，并且注释每一步是干什么
```yml
# 基础镜像
FROM node:18
# 创建一个应用目录
WORKDIR /usr/src/app
# 这个星号通配符意思是复制package.json和package-lock.json,复制到当前应用目录
COPY package*.json ./
# 安装应用依赖
RUN npm install
# 安装完毕后复制当前目录所有文件到镜像目录里面
COPY . . 
# 执行npm run build 后生成dist目录
RUN npm run build
# 使用打包后的镜像
CMD ["node","dist/main.js"]
```
同样的，创建`.gitignore`文件，我们可以把那些不需要经过`docker`打包的文件给忽略掉
```
touch .dockerignore
```
把一下文件给排除忽略掉
```
Dockerfile
.dockerignore
node_modules
npm-debug
.log
dist
```
# 在本地测试下
如果你在本地安装了`docker`，可以在本地进行打包测试，让我们来瞧瞧是否如预期中那样打包镜像

在命令行中执行以下命令，当然，你也可以把`nest-app-demo`换成你想要的镜像名，需要注意的是，不要忘记后面的`.`号！
```
docker build -t nest-app-demo .
```
接着你可以在你本机执行以下命令，查看是否已经成功打包了镜像
```
docker images
```
噢，感谢上帝，已经成功打包成镜像了，可以看到我们的命名`nest-app-demo`就像只肥硕的土拨鼠静静的躺在镜像列表里面
```
docker images
REPOSITORY                   TAG       IMAGE ID       CREATED          SIZE
nest-app-demo               latest    004f7f222139   31 seconds ago   1.24GB

```
紧接着让我们来把镜像给跑起来，映射到本机`80`端口,如果端口被占用可以使用其他端口
```
docker run -p 80:3000 nest-app-demo
```
这时候你就在浏览器中输入`http://localhost`进行访问，可以看到容器正常启动。
如果你想删除那些正在运行的容器，可以使用以下命令进行删除
```
docker rm -f $(docker ps -aq)
```
# Dockerfile 生产环境优化
好了，现在我们对镜像包进行压缩了，因为可以看到，目前镜像大小是1.24G，噢，上帝，真是太大了！

让我们来看看之前编写的`Dockerfile`，看如何对它进行优化

## 使用Alpine node镜像
强烈推荐使用`node:18-alpine` 而不是`node:18`，使用`alpine`的镜像可以直接把镜像体积从1.24g减少到466MB！
## 添加 NODE_ENV 环境变量
很多依赖包会根据当前的`NODE_ENV`环境变量而进行判断是否优化压缩，所以我们可以在`Dockerfile`里面把环境变量加进去，设置为`production`
```
ENV NODE_ENV production
```
顺便提一句，如果你不知道如何在Nestjs里面通过配置文件进行环境变量设置的话，可以看下这篇入门文章https://www.tomray.dev/nestjs-config
## 使用npm ci 而不是npm install
npm 比较推荐使用`npm ci` 而不是`npm install `来打包镜像，至于原因可以点击这里查看https://docs.npmjs.com/cli/v8/commands/npm-ci
> "`npm ci`与`npm install`很相似，除了当它用于自动化时，如测试平台，持续集成和部署————或者任何你想确保能有一个干净的依赖安装环境"

正好符合我们现在的情况，所以我们要使用`npm ci`来替换`npm install`
```
RUN npm ci
```
## 使用User指令
默认情况下，`Dockerfile`会使用`root`权限来构建你的镜像，这会存在一定的安全风险，在这里，我们已经拥有一个叫`node`的用户，我们可以直接使用它
```
USER node
```
当你在使用`COPY`指令时，添加标志以确保用户能够拥有正确的权限也是一种好做法，比如可以使用`--chown=node:node`
```
COPY --chown=node:node package*.json ./
```
## 使用多阶段构建
在`Dockerfile`中，你可以定义多阶段构建，这是一种通过多个镜像构建出最优镜像的方式，可以使得最后生成的镜像最小化
```
###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# ...开发环境构建说明

###################
# BUILD FOR PRODUCTION
###################

# 生产环境基础镜像
FROM node:18-alpine As build

# ... 这里是构建说明

###################
# PRODUCTION
###################

# 生产环境基础镜像
FROM node:18-alpine As production

# ... 你的生产环境构建说明


```
上面是多阶段构建的3个阶段：
 1. `development`这是用于本地环境构建镜像时的阶段
 2. `build` 这是用于构建生产镜像的阶段
 3. `production` 复制构建完毕后的文件并且启动服务

如果你不需要在本地环境使用`docker`启动你的Nestjs应用，可以把前两个阶段合二为一

上述多阶段设置的好处在于，这样你就有了一个可以在本地开发中使用的`Dockerfile`(与`docker-compose`组合在一起)。同时创建一个用于生产的优化`Docker`镜像。

如果你对使用`Docker Compose`的多阶段`Dockerfile`进行本地开发(热加载)有兴趣，可以点击看这篇文章https://www.tomray.dev/nestjs-docker-compose-postgres
## 最终的Dockerfile
通过上述使用的方案进行优化后，最终的`Dockerfile`如下，他可以帮助我们构建出最优的镜像
```
###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# 创建应用目录
WORKDIR /usr/src/app

# 复制依赖清单到容器镜像里.
# 这个星号通配符意思是复制package.json和package-lock.json,复制到当前应用目录.
# 首先复制这个选项可以防止在每次代码更改时重新运行npm install.
COPY --chown=node:node package*.json ./

# 使用npm ci来安装依赖而不是npm install
RUN npm ci

# 复制安装后的依赖包到当前目录下
COPY --chown=node:node . .

# 使用指定的用户而不是root权限用户
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# 我们需要通过Nest CLI 来执行npm run build,这是个开发依赖，然后把安装后依赖全部复制到指定目录
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# 执行打包命令
RUN npm run build

# 设置生产环境变量
ENV NODE_ENV production

# 运行' npm ci '会删除现有的node_modules目录，并传入——only=production确保只安装了生产依赖项。这确保node_modules目录尽可能优化
RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

# 将生产依赖和打包后的文件复制到指定目录下
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# 启动服务
CMD [ "node", "dist/main.js" ]

```
可以看到，最后打包的镜像只有189MB大小,相比于之前1.24G简直是天壤之别
```
REPOSITORY                   TAG       IMAGE ID       CREATED          SIZE
nest-app-demo               latest    004f7f222139   31 seconds ago   189MB

```



