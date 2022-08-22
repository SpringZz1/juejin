持续创作，加速成长！这是我参与「掘金日新计划 · 6 月更文挑战」的第21天，[点击查看活动详情](https://juejin.cn/post/7099702781094674468 "https://juejin.cn/post/7099702781094674468")

## 前言

小伙伴们好，这是村长《Vue经典面试题源码级详解》系列文章第 44 题，前面已完成题目合集在此： [历时一个月，2.6W字！50+Vue经典面试题源码级详解，你值得收藏！](https://juejin.cn/post/7097067108663558151 "https://juejin.cn/post/7097067108663558151")

## 学习群

我组织了一个面试学习群，关注村长公众号`村长学前端`，回复“加群”，大家一起卷~

## 相关学习资源

本系列有`配套视频`，`思维导图`和`开源项目`，大家学习同时千万不要忘了`三连` + `关注` + `分享`，有道是喝水不忘挖井人~

-   视频教程：[56道经典Vue面试题详解](https://link.juejin.cn?target=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV11i4y1Q7H2%2F "https://link.juejin.cn?target=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV11i4y1Q7H2%2F")
-   思维导图：[Vue面试专题](https://link.juejin.cn?target=https%3A%2F%2Fwww.processon.com%2Fview%2Flink%2F620c4de01efad406e72b891f%23map "https://link.juejin.cn?target=https%3A%2F%2Fwww.processon.com%2Fview%2Flink%2F620c4de01efad406e72b891f%23map")
-   配套代码：[vue-interview](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2F57code%2Fvue-interview "https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2F57code%2Fvue-interview")


## Vue-router 除了 router-link 怎么实现跳转

### 分析

vue-router导航有两种方式：`声明式导航`和`编程方式导航`

---

### 体验

声明式导航

```html
<router-link to="/about">Go to About</router-link>
```

编程导航

```js
// literal string path
router.push('/users/eduardo')

// object with path
router.push({ path: '/users/eduardo' })

// named route with params to let the router build the url
router.push({ name: 'user', params: { username: 'eduardo' } })
```

---

### 思路

- 两种方式
- 分别阐述使用方式
- 区别和选择
- 原理说明

---

### 回答范例

- vue-router导航有两种方式：`声明式导航`和`编程方式导航`
- 声明式导航方式使用`router-link`组件，添加to属性导航；编程方式导航更加灵活，可传递调用router.push()，并传递path字符串或者RouteLocationRaw对象，指定path、name、params等信息
- 如果页面中简单表示跳转链接，使用router-link最快捷，会渲染一个a标签；如果页面是个复杂的内容，比如商品信息，可以添加点击事件，使用编程式导航
- 实际上内部两者调用的导航函数是一样的

---

### 知其所以然

https://github1s.com/vuejs/router/blob/HEAD/src/RouterLink.ts#L240-L241

routerlink点击跳转，调用的是navigate方法

![image-20220626173129790](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f211b6c61fb14c08aff6eea0de8bf0b2~tplv-k3u1fbpfcp-zoom-1.image)

navigate内部依然调用的push

![image-20220626173217861](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d98398bf8ff4817a2812aff65fcdfd2~tplv-k3u1fbpfcp-zoom-1.image)
