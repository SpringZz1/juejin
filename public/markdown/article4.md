

如何在JavaScript中获取屏幕、窗口和网页的尺寸
===========================



要检测浏览器窗口是处于横向还是纵向模式，你可以比较浏览器窗口的宽度和高度。

但根据我的经验，在这一堆尺寸中很容易混淆：屏幕、窗口、网页尺寸。

这些尺寸是如何定义的，重要的是，如何访问它们，这就是我在这篇文章中要讨论的内容。

### 目录

*   [1.屏幕](https://dmitripavlutin.com/#1-the-screen)
    *   [1.1 屏幕尺寸](https://dmitripavlutin.com/#11-the-screen-size)
    *   [1.2 可用的屏幕尺寸](https://dmitripavlutin.com/#12-the-available-screen-size)
*   [2.窗口](https://dmitripavlutin.com/#2-the-window)
    *   [2.1 窗口外部尺寸](https://dmitripavlutin.com/#21-the-window-outer-size)
    *   [2.2 窗口内部尺寸](https://dmitripavlutin.com/#22-the-window-inner-size)
*   [3.网页的大小](https://dmitripavlutin.com/#3-the-web-page-size)
*   [4.总结](https://dmitripavlutin.com/#4-summary)

[](https://dmitripavlutin.com/#1-the-screen)1.屏幕
------------------------------------------------

### [](https://dmitripavlutin.com/#11-the-screen-size)1.1 屏幕尺寸

> *屏幕尺寸*是指屏幕的宽度和高度：显示器或移动屏幕。

[![Screen size](https://dmitripavlutin.com/static/1a774d8b5df58dc9eecadc43acebe8dc/360ab/screen-size-2.png)](https://dmitripavlutin.com/static/1a774d8b5df58dc9eecadc43acebe8dc/5ece7/screen-size-2.png)

`window.screen` 是保存屏幕尺寸信息的对象。下面是访问屏幕宽度和高度的方法。

```
const screenWidth  = window.screen.width;
const screenHeight = window.screen.height;
```

### [](https://dmitripavlutin.com/#12-the-available-screen-size)1.2 可用的屏幕尺寸

> *可用的屏幕尺寸*包括没有操作系统工具栏的活动屏幕的宽度和高度。

[![Screen size](https://dmitripavlutin.com/static/036e8d1e204812fe8aca25ddfa28e3e3/360ab/avail-screen-size-3.png)](https://dmitripavlutin.com/static/036e8d1e204812fe8aca25ddfa28e3e3/5ece7/avail-screen-size-3.png)

要访问可用的屏幕尺寸，你可以再次使用`window.screen` 对象。

```
const availScreenWidth  = window.screen.availWidth;
const availScreenHeight = window.screen.availHeight;
```

[](https://dmitripavlutin.com/#2-the-window)2.窗口
------------------------------------------------

### [](https://dmitripavlutin.com/#21-the-window-outer-size)2.1 窗口的外部尺寸

> *窗口外部尺寸*包括整个浏览器窗口的宽度和高度，包括地址栏、标签栏和其他浏览器面板。

[![Window outer size](https://dmitripavlutin.com/static/45993463dc8c98824b3188bc3f5696da/360ab/window-outer-size-2.png)](https://dmitripavlutin.com/static/45993463dc8c98824b3188bc3f5696da/5ece7/window-outer-size-2.png)

要访问窗口的外部尺寸，可以使用`outerWidth` 和`outerHeight` ，这些属性可以直接在`window` 对象上使用。

```
const windowOuterWidth  = window.outerWidth;
const windowOuterHeight = window.outerHeight;
```

### [](https://dmitripavlutin.com/#22-the-window-inner-size)2.2 窗口内部尺寸

> *窗口内部尺寸*（又称*视口尺寸*）包括显示网页的视口的宽度和高度。

[![Window inner size](https://dmitripavlutin.com/static/ae1c8d402206707a196958e8644159f8/360ab/window-inner-size-2.png)](https://dmitripavlutin.com/static/ae1c8d402206707a196958e8644159f8/5ece7/window-inner-size-2.png)

`window` 窗口内部尺寸对象提供了必要的属性`innerWidth` 和  `innerHeight`

```
const windowInnerWidth  = window.innerWidth;
const windowInnerHeight = window.innerHeight;
```

如果你想*在没有滚动条的情况下*访问窗口内部尺寸，你可以使用以下方法:

```
const windowInnerWidth  = document.documentElement.clientWidth;
const windowInnerHeight = document.documentElement.clientHeigh;
```

[](https://dmitripavlutin.com/#3-the-web-page-size)3.网页的大小
----------------------------------------------------------

> *网页大小*由渲染的页面内容的宽度和高度组成。

[![Web page size](https://dmitripavlutin.com/static/50a8a81657b2fc609a356faf0d2a4314/360ab/web-page-size.png)](https://dmitripavlutin.com/static/50a8a81657b2fc609a356faf0d2a4314/5ece7/web-page-size.png)

使用下面的方法来访问网页内容的大小（包括页面的padding，但不包括border、margin或scrollbars）。
```
const pageWidth  = document.documentElement.scrollWidth;
const pageHeight = document.documentElement.scrollHeight;
```

如果`pageHeight` 大于窗口的内部高度，那么就会显示垂直滚动条。

[](https://dmitripavlutin.com/#4-summary)4.总结
---------------------------------------------

希望现在你对如何确定不同种类的尺寸有了更好的了解。

*屏幕尺寸*是指你整个屏幕（或显示器）的尺寸，而*可用屏幕尺寸*是指不包括操作系统任务栏或工具栏的显示器的尺寸。

*窗口外部尺寸*是指整个浏览器窗口（包括地址栏、标签栏、侧边面板，如果打开的话），而*窗口内部尺寸*是指网页呈现的视口尺寸。

最后，网页大小是指网页及其内容的大小。

