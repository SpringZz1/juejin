---
theme: qklhk-chocolate
highlight: androidstudio
---

我正在参加「创意开发 投稿大赛」详情请看：[掘金创意开发大赛来了！](https://juejin.cn/post/7120441631530549284 "https://juejin.cn/post/7120441631530549284")

在给公司开发官网的过程中，会有涉及到一些图片的鼠标悬停效果，鼠标悬停后会改变原图，单纯的渐隐渐现，放大缩小，左右平移已经满足不了产品经理期望了，总觉得不够惊艳，创意不够。其实作为一个开发者，也不会满足这普通日常的动画交互效果，在寻找新的 idea 时发现基于 CSS `mask-image` 可以实现很多不错的效果，本文将基于此属性实现四种图片过渡动画效果。

### 前置知识点 mask-image

`mask-image` CSS 属性用于设置元素上遮罩层的图像。默认值是 `none`，也就是无遮罩图片。因此，和 `border` 属性中的 `border-style` 属性类似，是一个想要有效果就必须设定的属性值。注意由于此属性目前还不是完全支持，部分浏览器还需要增加`-webkit-`前缀使用。

`mask-image`遮罩所支持的图片类型非常的广泛，可以是 `url()`静态图片资源，格式包括 JPG，PNG 以及 SVG 等都是支持的；也可以是动态生成的图片，例如使用各种 CSS3 渐变绘制的图片。语法上支持 CSS3 各类渐变，以及 `url()`功能符，`image()`功能符，甚至 `element()`功能符。同时还支持多背景，因此理论上，使用 `mask-image` 我们可以遮罩出任意我们想要的图形，非常强大。

语法如下:

```css
/* <mask-source> value */
mask-image: url(masks.svg#mask1);

/* <image> values */
mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);
mask-image: image(url(mask.png), skyblue);

/* Multiple values */
mask-image: image(url(mask.png), skyblue), linear-gradient(rgba(0, 0, 0, 1.0), transparent);
```

示例演示，一个渐变色背景的纯文本元素增加 mask-image 属性后是什么效果呢。
![示例一](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7c2da4d59b94066808def3b609ee23f~tplv-k3u1fbpfcp-zoom-1.image)

```css
.mask {
  -webkit-mask-size: contain;
 -webkit-mask-image: url(https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/161ced10bf344eb085c34cefd8958dd1~tplv-k3u1fbpfcp-watermark.image?);
}
```

两张图片以渐变的方式合并成为一张图片。

![示例二](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2734c44975b34435877716d38569b9b6~tplv-k3u1fbpfcp-zoom-1.image)

```css
.scene-2 {
  background-image: url(https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd9e83460a5645ccb78dc1c8efb86871~tplv-k3u1fbpfcp-watermark.image?);
  -webkit-mask-image: linear-gradient(to right, transparent 8%, #fff 30%);
}
```

如上图 1 所示，使用 `mask-image` 属性设置了一个 png 格式的客服图标，整个元素将只显示 png 图像的内容区域，其他区域都消失不见了。如图 2 所示，使用 mask-image 属性设置渐变颜色，使两种图片以渐变叠加的方式融合在了一起。

想必大家可以看出 `mask-image` 的主要功能了吧，CSS `mask` 属性在使用的时候就是 `mask: xxx`，现在随着这个属性的规范化，`mask` 属性实际上已经成为了诸多 `mask-\*`的缩写，除了 `mask-image` 还有以下属性，用法和 CSS `background` 用法是相仿的，具体属性值可以看 [mask 遮罩层详解](https://blog.csdn.net/qq_32682137/article/details/83751176)。

```
mask-mode

mask-repeat

mask-position

mask-clip

mask-origin

mask-size

mask-type

mask-composite
```

介绍完主要的前置知识点，接下来就进入到具体的动画效果和实现过程。

### 效果一

![GIF18.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ea2fe5ee4844ddb86ba92186a491f07~tplv-k3u1fbpfcp-watermark.image?)

两张图片切换的过渡效果，动画开始前中间定位了一个透明的图标，动画开始后图标不断放大，直到图标放大到全屏此时已过渡到第二张图片，整个过程相当炫酷。基于上面的前置知识点，很快可想到对应的实现方式，这里需要额外用到其他的几个属性，用法和 `background` 类似：

- `mask-size`： 如动画所示，中间的 png 图标从小放大，则需要这个属性控制图标的大小变化
- `mask-position`： 图标一直是保持在水平垂直居中的位置放大，则需要这个属性图像的起始位置
- `mask-repeat`：和 `background` 类似，不设置 `no-repeat` 图标会重复整个界面

动画效果示意图如下：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5315667e847d4b20b2aca266711c4b9b~tplv-k3u1fbpfcp-zoom-1.image)

核心代码如下：

```css
.scene-2 {
  background-image: url(https://assets.codepen.io/77020/sw-shape-zoom-scene-2.jpg);
  -webkit-mask-image: url(https://assets.codepen.io/77020/sw-jedi-crest.svg);
  -webkit-mask-size: 10%;
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
}

.scenes:is(:hover, :focus) .scene-2 {
  animation: scene-transition 4s cubic-bezier(1, 0, 1, 1) forwards;
}

@keyframes scene-transition {
  100% {
    -webkit-mask-size: 1800%;
  }
}
```

这时整体动画效果基本完成了，但是还有细节继续优化，动画开始前图标内的图片已经看到，这样对比整个界面不够鲜明美观，所以需要默认设置第二张图片的亮度，当动画进行到一定的阶段再彻底显示出来。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/367674c840ed475ba8dfa996b42825a7~tplv-k3u1fbpfcp-zoom-1.image)

代码如下：

```css
.scene-2 {
  filter: brightness(0%);
}

@keyframes scene-transition {
  25% {
    filter: brightness(100%);
  }
  100% {
    filter: brightness(100%);
  }
}
```

代码在线预览：
https://code.juejin.cn/pen/7121173655316332580

### 效果二

![GIF19.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c55557f9eeee4449b0f9f3535a55ea5d~tplv-k3u1fbpfcp-watermark.image?)

如效果图所示，这里用到了锥形渐变 `conic-gradient`，通过一个完整的锥形渐变过渡图片。和上面的示例二类似，只不过把 `linear-gradient` 线性渐变改变为 `conic-gradient` 锥形渐变，通过控制锥形渐变的角度完成图片的过渡效果，动画效果示例图如下：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3ca7dd6dda44e02929681ef3c2d77ae~tplv-k3u1fbpfcp-zoom-1.image)

核心代码如下：

```css
@property --angle {
  syntax: '<angle>';
  inherits: true;
  initial-value: -10deg;
}

.scene-2 {
  background-image: url(https://assets.codepen.io/77020/sw-clock-wipe-scene-2.jpg);
  z-index: -1;
  -webkit-mask-image:
    conic-gradient(
      #fff 0deg,
      #fff calc(var(--angle) - 10deg),
      transparent calc(var(--angle) + 10deg),
      transparent 360deg
    ),
    conic-gradient(
      transparent 340deg,
      #fff 360deg
    );
}
.scenes:is(:hover, :focus) .scene-2 {
  z-index: 1;
  animation: scene-transition 2s linear forwards;
}

@keyframes scene-transition {
  to { --angle: 370deg; }
}
```

代码在线预览：
https://code.juejin.cn/pen/7121174793981788196

### 效果三

![GIF20.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8623f8c8f6cf4fe68e624cd9ab3f7836~tplv-k3u1fbpfcp-watermark.image?)
此效果由效果二的锥形渐变改变为 radial-gradient 径向渐变，控制渐变的范围从完全不见到覆盖整个元素。动画效果示例图如下：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10ef636b94ce483aa664769bd100752e~tplv-k3u1fbpfcp-zoom-1.image)

核心代码如下：

```css
@property --radius {
  syntax: '<percentage>';
  inherits: true;
  initial-value: -5%;
}

@keyframes scene-transition {
  to { --radius: 105%; }
}

.scene-2 {
  background-image: url(https://assets.codepen.io/77020/sw-iris-wipe-scene-2.jpg);
  -webkit-mask-image: radial-gradient(
    circle,
    #fff calc(var(--radius) - 5%),
    transparent calc(var(--radius) + 5%)
  );
}

.scenes:is(:hover, :focus) .scene-2 {
  animation: scene-transition 2s linear forwards;
}
```

代码在线预览：
https://code.juejin.cn/pen/7121179125821210654

### 效果四

![GIF21.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28e91dc50fed4b6298536e8d14c1e840~tplv-k3u1fbpfcp-watermark.image?)
此效果和示例二中的效果一样，使用 linear-gradient 线性渐变过渡图片，这里将 `mask-size` 设置宽度的两倍，前面一半设置为透明色，则看到的还是第一张图片。触发动画的时候改变 `mask-position` 从 `left` 变更为 `right`，动画效果示例图如下：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8989b49e26f84cb6b4c8b6806b98bcec~tplv-k3u1fbpfcp-zoom-1.image)
核心代码如下：

```css
.scene-2 {
  background-image: url(https://assets.codepen.io/77020/sw-horizontal-wipe-scene-2.jpg);
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 47.5%,
    #fff 52.5%
  );
  -webkit-mask-size: 210%;
  -webkit-mask-position: left;
}

.scenes:is(:hover, :focus) .scene-2 {
  -webkit-mask-position: right;
  transition: -webkit-mask-position 2s linear;
}
```

代码在线预览：
https://code.juejin.cn/pen/7121181551152332814

### 最后

本文基于 CSS `mask-image` 实现了四种图片过渡效果，相信这几种效果能够让你的老板眼前一亮，让你的项目炫酷起来吧。看到最后如果觉得有用，记得点个赞收藏起来，说不定哪天就用上啦。

**专注前端开发，分享前端相关技术干货，公众号：南城大前端（ID: nanchengfe）**

### 参考

mask-image:
https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-image

codepen：https://codepen.io/lonekorean/details/eYVrWoq

mask 遮罩层详解：https://blog.csdn.net/qq_32682137/article/details/83751176

CSS的mask-image属性详解
：https://www.php.cn/css-tutorial-389418.html

