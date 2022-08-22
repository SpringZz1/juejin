---
theme: channing-cyan
highlight: xcode
---
持续创作，加速成长！这是我参与「掘金日新计划 · 6 月更文挑战」的第29天，[点击查看活动详情](https://juejin.cn/post/7099702781094674468 "https://juejin.cn/post/7099702781094674468")




## 节流

高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率。

关于节流，有两种主流的实现方式：一种是使用时间戳，一种是设置定时器。



### 时间戳

当触发**高频事件**时：

- 我们取出当前的时间戳，然后和**之前的时间戳（一开始为0）**相减
  - 得到的差值如果大于设置的时间周期，就执行该函数，然后**更新时间戳**为当前时间戳
  - 否则就不执行。

```js
function throttle(fn, wait = 500) {
  let preTime = 0; // 之前的时间戳
  return (...args) => {
    let nowTime = +new Date(); // new Date 前面多一个+号，会直接转换为“时间戳”
    if(nowTime - preTime > wait) { // 两次“高频函数”调用的间隔大于“时间周期”
      fn.apply(this, args); // 执行该函数
      preTime = nowTime; // 更新时间戳
    }
  }
}
```



### 定时器

当事件触发的时候：

- 我们设置一个定时器
- 当事件再次触发的时候
  - 如果定时器存在，就不执行
  - 直到定时器执行，然后执行“高频函数”，并清空定时器（下次触发函数时定时器为空，则会创建下一个定时器）

```js
function throttle(fn, wait = 500) {
  let timer;
  return (...args) => {
    if(!timer) { // 如果定时器为空，则开始
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args)
      }, wait)
    }
  }
}
```



### 两种方式相比较

- **时间戳**的方式事件会立即执行；**定时器**的方式事件会在 n 秒后第一次执行
- **时间戳**的方式在事件停止触发后，没有办法再执行事件；**定时器**的方式在事件停止触发后依然会再执行一次事件



### 有头有尾

如果我们想要**鼠标移入就立即执行**，并且停止触发事件的时候还能再执行一次，该怎么办呢？

我们需要结合两者的优势：

```js
function throttle(fn, wait = 500) {
  let timer, preTime = 0;
  let throttled = function(...args) {
    let nowTime = +new Date();
    // 下次触发的时间
    let remaining = wait - (nowTime - preTime);
    // 如果已经没有剩余时间了，或者剩余时间大于需要等待的时间（系统时间出问题）
    // 则执行函数
    if(remaining <= 0 || remaining > wait) { // “立即触发”功能，每次都会清理掉定时器
      if(timer) {
        clearTimeout(timer);
        timer = null;
      }
      preTime = nowTime;
      fn.apply(this, args)
    } else if(!timer) { 
      // 定时器被上次触发清理掉了（上次的函数执行了），
      // 并且当前时间还处于“间隔时间”内（不能再次“立即触发”），
      // 则使用“剩余时间”创建定时器
      timer = setTimeout(() => {
        preTime = +new Date(); // 更新“上次”时间戳
        timer = null; // 清理定时器
        fn.apply(this, args); // 执行函数
      }, remaining);
    }
  }
  return throttled; // 这里也可以直接return function，但是抽离出来 throttled 是为了之后的cancel方法
}
```



### 有头无尾、无头有尾

设置 `options` 作为第三个参数，依据传值来判断用户需要什么效果：

```js
leading: false // 表示禁用第一次执行
trailing: false // 表示禁用停止触发的执行
```

```js
function throttle(fn, wait = 500, options = {}) {
  let timer, preTime = 0;
  let throttled = function(...args) {
    let nowTime = +new Date();
    // 如果是首次，但是用户设置了“禁用第一次”
    // 则直接将“上次时间戳”设置为“当前时间戳”
    if(!preTime && options.leading === false) preTime = nowTime;
    let remaining = wait - (nowTime - preTime);
    if(remaining <= 0 || remaining > wait) {
      if(timer) {
        clearTimeout(timer);
        timer = null;
      }
      preTime = nowTime;
      fn.apply(this, args);
    } else if(!timer && options.trailing !== false) { // 如果定时器不存在（上次执行过了），并且用户没有设置“禁用停止触发”，则生成尾触发的定时器
      timer = setTimeout(() => {
        preTime = +new Date();
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  }
  return throttled;
}
```



### 取消

```js
throttled.cancel = function() {
  clearTimeout(timer);
  previous = 0;
  timer = null;
}
```

