---
theme: vuepress
---

携手创作，共同成长！这是我参与「掘金日新计划 · 8 月更文挑战」的第15天，[点击查看活动详情](https://juejin.cn/post/7123120819437322247 "https://juejin.cn/post/7123120819437322247")

---

## 一、专栏小结

掘金《[Java转Android](https://juejin.cn/column/7126822940523364366 "https://juejin.cn/column/7126822940523364366")》专栏，我说要更新30期，今天是第15期，完成一半了。

### 1.1 内容概括
看看前面我们都学习了啥内容：
1. [Java转Android：第1天 HelloWorld](https://juejin.cn/post/7126858938795950111 "Java转Android：第1天 HelloWorld")
2. [Java转Android：第2天 用Button做了个抽奖App](https://juejin.cn/post/7126962074902593543 "Java转Android：第2天 用Button做了个抽奖App")
3. [Java转Android：第3天 Listener实现问答App](https://juejin.cn/post/7127424576358711327 "Java转Android：第3天 Listener实现问答App")
4. [Java转Android：第4天 用Layout布局实现罗盘和三叉戟](https://juejin.cn/post/7127686132858355742 "Java转Android：第4天 用Layout布局实现罗盘和三叉戟")
5. [Java转Android：第5天 用Activity和Intent实现小通讯录](https://juejin.cn/post/7128180881444847647 "Java转Android：第5天 用Activity和Intent实现小通讯录")
6. [Java转Android：第6天 BroadcastReceiver知道你换了壁纸](https://juejin.cn/post/7128491222913515534 "Java转Android：第6天  BroadcastReceiver知道你换了壁纸")
7. [Java转Android：第7天 Handler做一个倒计时功能](https://juejin.cn/post/7128964814491090951 "Java转Android：第7天  Handler做一个倒计时功能")
8. [Java转Android：第8天 Service帮你背诵古诗词](https://juejin.cn/post/7129276744950874149 "Java转Android：第8天 Service帮你背诵古诗词")
9. [实战第09篇：SharedPreferences持久化存储记事本](https://juejin.cn/post/7129666495692406820 "实战第9篇：SharedPreferences持久化存储记事本")
10. [实战第10篇：JSONObject联网解析天气预报](https://juejin.cn/post/7130036801099530253 "实战第10篇：JSONObject联网解析天气预报")
11. [实战第11篇：MediaPlayer实现森林协奏曲](https://juejin.cn/post/7130391203568156680 "实战第11篇：MediaPlayer实现森林协奏曲")
12. [实战第12篇：SurfaceView实现视频播放的展示](https://juejin.cn/post/7130760932170399757 "实战第12篇：SurfaceView实现视频播放的展示")
13. [实战第13篇：Sensor距离传感器实现小猪睡觉趣味App](https://juejin.cn/post/7131152469802876941 "实战第13篇：Sensor距离传感器实现小猪睡觉趣味App")
14. [实战第14篇：方向传感器+RotateAnimation做一个指北针](https://juejin.cn/post/7131505775024799775 "实战第14篇：方向传感器+RotateAnimation做一个指北针")

**Java转Android**，不是说，我原来是一个Java开发者，转到了Android开发门下。而是，我从Java语言的角度来说，如何快速入门Android开发。因为开发Android除了用Java语言，也可以用其他语言。

我们看目录，在第9期之前，标题都叫`Java转Android：第几天`。后来，官方审核感觉，这小子有发布个人日记的嫌疑，不推荐了。后面，我才开始改名叫`实战第几篇`，档次一下就上来了。

前14天，我们涉及到了`环境的搭建`、`页面布局和控件`、`四大组件`、`网络交互`、`数据持久化存储`、`多媒体播放`、`传感器`。作为[10年老Android](https://juejin.cn/post/7123985353878274056)儿，我可以负责任地告诉大家，这些知识，加上你自己的举一反三、融会贯通，足以应付日常开发了。

### 1.2 专栏思路

因为有过[大赛经验](https://juejin.cn/post/7123985353878274056#heading-7)，我经常去高校和大学生交流，有时也客串讲师、评委等角色。

参加各种活动的过程中，我就发现，如今人们的生活和学习，变得节奏极快。以前，一部电影，看90分钟，才可以让人们悲喜交加。而现在，10秒钟的短视频，就能迅速控制你的喜怒哀乐。

现代人，已经不愿意付出很长时间，去认真学习一门课程了。即便学，他们也选择带“速成”标签的。

然而，**速成是一个伪命题**。所以，我就利用这个心理，对他们进行合理的引导。

传统的教学，采用的是大纲式的**单轮教学**模式。

> 拿Android开发举例，第一章是UI控件，一次性教给学生几十种控件的使用方法。跟背词典一样，常用词、生僻词，全都需要背下来。学生根本接受不了，他不明白某个知识点究竟怎么用，也不知道为啥要学习5种方式去定义一个按钮。因此，很多初学者会有抵触的情绪。

而我的速成大法理念是：要用**轮廓式多轮教学**模式。

> 我不提倡用一章的篇幅把某一类知识讲完，然后再用多章拼一起，讲完一套知识体系。我要每一类知识讲一点儿，讲上一圈儿，这是表层圈，不想学的可以撤了，第一轮够你稍微行走江湖了。想学的还有第二轮、第三轮。

这个专栏，我主要讲的是用Java开发Android，那我构思了使用三轮……摩托……三轮教学。

第一轮关键词是**了解**。了解Android开发环境，基础UI知识，四大组件基础，数据存储基础，网络基础，硬件传感器等等。重点让大家了解Android可以做什么，目的在于入门。让初学者在极短时间了解整个安卓体系的轮廓，再结合实战例子，用小知识点做出大App，能做出东西，炫耀也好，成长也罢，让他们以为学成了，有正向反馈，以此来提高学习者的兴趣。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce7247d0a7f642ad98c4d96c6aa8dced~tplv-k3u1fbpfcp-watermark.image?)

第二轮关键词是**应用**。这一轮讲开发环境的快捷操作、插件，复杂UI的使用，掌握四大组件的要点，重点掌握Android如何进行开发，目的在于项目级别的应用。让他们感觉，哎呀，原来的我肤浅了，没想到还有很多东西要学，还有异常情况要处理。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d4bc4f7a4ab44719896f52bfe1abc1e~tplv-k3u1fbpfcp-watermark.image?)

第三轮关键词是**提升**。这一轮主要讲解自定义UI的开发，Android各个版本的兼容，开源的第三方网络框架，移动开发模式的使用等等。目的在于，从教学的知识体系、从Android SDK体系中抽离出来，慢慢向企业级开发，进行过渡。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8622febb01b841dbb2f2ad51612ee017~tplv-k3u1fbpfcp-watermark.image?)

我不是一次性地把UI讲完，而是每一轮都会讲UI，每一轮都会讲网络。就跟素描一样，每一遍都会画眼睛，但是侧重点不一样，第一次是线条，第二次是光线，第三次是柔化。

所以啊，我们的第一轮就结束了。

其实，大家已经在很短的时间内，接触到Android完整的知识体系了。你想啊，连传感器都有介绍，还不全吗？但是，这都是比较表层的，面很广，但是深度有限。

下面，是该对第一轮，做一个小结的时候了。我们来学习如何打包发布程序。

## 二、安卓apk的打包发布

**APK**是*AndroidPackage*的缩写，即`Android安装包`。

在Android平台中，直接执行文件被打包为apk格式，通过将APK文件直接传到Android模拟器或Android手机中执行即可安装。

那么我们的Android Studio是如何把代码运行到手机里的呢？

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ab81a3609834cf49a98e5720ef2d266~tplv-k3u1fbpfcp-watermark.image?)

先是编译打包，然后通过签名文件进行签名，最后通过ADB跑到手机中（模拟器中）运行。

这里面提到几个词：编译打包、签名文件签名。

### 2.1 打包

打包，不是收拾剩饭啊。是指把代码组装成apk文件，apk文件其实是一个压缩包。

**APK文件解压缩后，主要结构如下**
1. META-INF\（注：Jar文件中常可以看到）
2. res\（注：存放资源文件的目录）
3. AndroidManifest.xml（注：程序全局配置文件）
4. classes.dex（注：Dalvik字节码）
5. resources.arsc（注：编译后的二进制资源文件）

如何生成呢？我要把代码转成apk安装包发给女朋友，说送她一个特殊的包包。

1、选择生成带签名的apk。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f572e52bcbf24d78a31fc6831d132a8b~tplv-k3u1fbpfcp-watermark.image?)

2、选择要打包的模块。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c3a92243d0144f2a267c3f3657934b1~tplv-k3u1fbpfcp-watermark.image?)

### 2.2 签名文件
3、选择或者创建key store签名文件。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4485610e87c4c2ea48547ca8260f711~tplv-k3u1fbpfcp-watermark.image?)

这个`key store`就是签名文件，签名文件就像是你的签名和印章，用来确定你apk的唯一性。假如，我是说假如，我把你的apk拿过来改改，我说是你的，但是加入了我的广告，这肯定是不行的，因为没有你的签名。

如果你有签名文件，可以直接选择，没有的话，可以创建，创建也不复杂，填信息就好。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5875868e15f841bf8b105606a36b9427~tplv-k3u1fbpfcp-watermark.image?)

4、选择打包文件存放位置，选择加密方法。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7fcfc7cf66824c14b51d3047625d5105~tplv-k3u1fbpfcp-watermark.image?)

5、打包完成，生成apk文件。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32952e5212f94352b924f01a7f80af48~tplv-k3u1fbpfcp-watermark.image?)

好了，拿着这个包，送人去吧。

## 最后

后面的文章，我不会**频繁**更新了。

原因主要是*正向反馈不那么强烈*，导致我怀疑写这个专栏的**必要**性。

主要体现在2点：

> 第一，我的日更，正好赶上8月更文活动，平台查薅羊毛凑字数的水文，比较严格。开头写上“这是我参与更文的xx天……”，容易被误伤。
> 
> 第二，即便文章被推荐了。从以往反馈看，大家对于Android开发（尤其使用Java开发），其实并不看好。一来是行业不景气，二来是kotlin以及其他跨平台开发语言的兴起（它们更高效）。那我写这个教程，其实帮不到很多人。也就是，没有需求。

鉴于以上两点原因吧，再加上我鼓捣安卓、IOS十多年了，而且已经转行到AI开发，不需要再提高这方面的技能了。我完全可以投入同等精力，去写另一个受众更广的专栏。


> 我原本计划的第二轮内容如下：

模块                | 知识点                                                          |
| ----------------- | ------------------------------------------------------------ |
| Android运行环境    | Android studio 快捷键；Android studio 插件的使用；了解gradle|
| UI基础              | 布局：FrameLayout、TableLayout；控件：ListView、ScrollView；Canvas绘制  |
| 按键交互              | 按键事件监听                                                       |
| Application       | 程序生命周期                                                       |
| Activity          | 启动模式                                                         |
| Fragment          | Activity加载；ViewPage联用实现多屏滑动    |
| Intent            | 显式和隐式跳转 ；数据的前传和回传   |
| BroadcastReceiver | 动态注册；自定义广播、本地广播 |
| Service           | 后台和前台通信；IntentService的使用       |
| 权限                | 动态权限申请     |
| 数据存储              | SQLite事务； 升级数据库；文件存储 |
| ContentProvider   | 访问其他程序；创建自己的内容提供者|
| 屏幕适配              | Nine-Patch的制作；Shape绘制形状|
| 网络通讯              | 使用volley访问网络；解析gson解析json    |
| 多媒体               | 通知； 摄像头         |
| 传感器               | 光照传感器            |
| 应用发布              | 混淆|

> 我原本计划的第三轮内容如下：
> 
模块          | 知识点                      |
| ----------- | ------------------------ |
| 运行环境 | 编译的原理和步骤；学会调试|
| UI基础        | 如何使用陌生新控件； 编写自定义控件； 从github上找开源炫酷控件   |
| 第三方开源库      | glide图片加载库；Butterknife 注解；eventbus事件总线；Retrofit 实现异步；Okhttp 网络请求；Retrofit 注解请求；RxPermissions 权限请求；Arouter 路由； Greendao 数据库 |
| 开发模式        | 基于Rxjava+Retrofit实现MVP开发；MVVM开发模式    |
| 版本兼容        | 权限申请；动态广播和服务；V4、v7包      |
| 第三方商业库      | 百度地图；支付宝支付；微信支付；微信分享    |
| 常用功能实现      | 版本检测更新的实现；广告轮播图； 数据缓存和清理    |
| 自建基础框架    | 封装BaseActivity；封装BaseFragment；封装BaseAdapter；文件管理；网络管理；|
| 发布          | 多渠道打包；jenkins自动打包； 加固     |
| 逆向编译         | 逆向解析apk                   |
| 协同开发        | Git；SVN

如果，大家有兴趣的话，催更吧。我依然还会更新，只是速度放慢了而已。

我是TF男孩，关注我的掘金专栏《[Java转Android](https://juejin.cn/column/7126822940523364366 "https://juejin.cn/column/7126822940523364366")》。日读1000字，30天可入门安卓开发。

> 本文由TF男孩在掘金社区独家发布，转载请注明出处。
