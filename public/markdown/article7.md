本文已参与「新人创作礼」活动，一起开启掘金创作之路。 [点击查看活动详情](https://bytedance.feishu.cn/file/boxcndnBfio1QJ9mgK48s3SBWAU)

### 写在前面
前面我们实现了canvas上元素的帧动画和自定义动画 [实现canvas的元素动画](https://juejin.cn/post/7132311241606823966) ，现在来实现元素的补间动画

### 补间动画
简单理解就是元素某些属性发生变化后，需要连续渐变的动画，避免突然变化太突兀了，这个连续渐变的效果是由起止两帧的状态生成的。

### jQuery的补间动画效果
相信大多数前端在用`jQuery`的时候都见过或者用过`animate`，只要指定要动画的属性，`jQuery`就会把相应的属性渐变的改变成最终效果
```js
// 把box从0移动到300px的位置，用时2000ms，动画的速率用平滑的
$("box").animate({left: "300px"}, 2000, "linear")
```

![ani.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f193f6cf5674a62b2eeaf58222e407f~tplv-k3u1fbpfcp-watermark.image?)


### 普通canvas元素动画
很显然，我们只要用定时器，不停的更新元素就可以达到目的了
```js
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let x = 0
setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if(x <= 300) {
        ctx.fillRect(x++, 0, 100, 100)
    }
}, 10)
```

### 补间动画
补间动画的原理其实也是计算出属性变化的间隔，在指定时间段内进行定时动画，只不过调用的方式发生了变化，现在我们给`Stage`添加上补间动画功能（[Timer定时器](https://juejin.cn/post/7132301878608478239)）
```js
class Stage {
    static animate(elm, option, t) {
        // 记录元素的初始位置
        var x0 = elm.x
        var y0 = elm.y
        // 拿到最终的xy
        // 计算出dx和dy，默认100次分解
        let dx = option.x ? (option.x - x0) / 100 : 0
        let dy = option.y ? (option.y - y0) / 100 : 0
        // 计算出每次更新的时间间隔
        let dt = t / 100
    
        let timer = new Timer(() => {
            if(elm.x == option.x || elm.y == option.y) {
                timer.clear()
            } else {
                // 在这里实现补间动画，动画的补间计算非常多且复杂，这里我们简单实现一个xy的补间
                elm.x += dx
                elm.y += dy
            }
        }, dt)
    }
}
```
这样Stage里的每个元素就都可以运用上补间动画了
```js
let s2 = new Stage(document.getElementById("stage"));

// 在 (50, 50)的位置初始化一个200 * 50的文字板
let t1 = new TextElm({
    text: "hello 解决1",
    x: 50,
    y: 50,
    w: 200,
    h: 50,
    color: "blue",
    parent: s2
});
s2.add(t1);
// 对t1添加动画，使其在2000ms时间里运动到300的位置
Stage.animate(t1, {
    x: 300,
    y: 300
}, 2000)
```

![ani2.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d9f49da2856418c90b9e708ea6af756~tplv-k3u1fbpfcp-watermark.image?)


通过这种形式，我们可以通过完善补间动画的计算，设计各种属性（`x/y`，`width/height`，`transform`等）的补间动画，应用到元素上也直观易懂。

这样做还可以把相同属性的计算逻辑抽取出来复用，比如一个元素从0到100，一个从100到200，如果把动画过程都写在类里面，显然是重复了的，都是`xy`属性的变化过程，不管是什么元素，计算逻辑完全可以复用的。









