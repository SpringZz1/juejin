---
highlight: a11y-dark
theme: channing-cyan
---
## 值穿透
值穿透指的是，链式调用的参数不是函数时，会发生值穿透，就传入的非函数值忽略，传入的是之前的函数参数。

```js
Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .then(console.log)
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b2ae406f0f647daa3a5280a0addbadb~tplv-k3u1fbpfcp-watermark.image)  
传入2或者promise的fulfilled状态都会发生值穿透。

```js
Promise.resolve(1)
    .then(() => { return 2 })
    .then(() => { return 3 })
    .then(console.log)
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f8b399c94ff4b44b6b28b48db397b47~tplv-k3u1fbpfcp-watermark.image)

```js
Promise.resolve(1)
    .then(function () {
        return 2
    })
    .then(() => { Promise.resolve(3) })
    .then(console.log)
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/281df78645064370baa0bee46b5c82f8~tplv-k3u1fbpfcp-watermark.image)  
只有传入的是函数才会传递给下一个链式调用。

## 异常穿透

```js
Promise.reject(1)
    .then(res => {
        console.log(res);
    })
    .then(res => { console.log(res) },
        rej => {
            console.log(`rej****${rej}`);
        })
    .catch(err => {
        console.log(`err****${err}`);
    })
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9541a66c95424bdc99293043f9f0c169~tplv-k3u1fbpfcp-watermark.image)  
当在then中传入了第二个函数，就不会被catch捕获到错误了。


```js
Promise.reject(1)
    .then(res => {
        console.log(res);
    })
    .then(res => { console.log(res) },
        rej => {
            console.log(`rej****${rej}`);
        })
    .then(res => {
        console.log(`res****${res}`);
    }, rej => {
        console.log(`rej****${rej}`);
    })
    .catch(err => {
        console.log(`err${err}`);
    })
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/536550842278420cb9c2896f54ea2d79~tplv-k3u1fbpfcp-watermark.image)  
被then捕获的错误也会传给下一个链式调用成功的状态，虽然为undefined。
***
**记录记录！**
