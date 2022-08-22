> 需求背景：
> 
> 前端同学在后台配置颜色后客户端与前端再从服务端请求中的字段获取颜色


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4fcd15a885e4cc19d4eed3492d0979d~tplv-k3u1fbpfcp-watermark.image?)
在此过程中就涉及到了一个问题，需要确定服务端下发数据的格式。
客户端同学这边规定的颜色规范为**八位色值**，例如#aabbccdd，前两位表示透明度，顺序为argb，而我们常用的颜色设置为rgba，如果我们使用前端这种格式进行传输，客户端同学就需要对传过去的颜色字符串进行处理，如果使用八位色值，一是前端常用的不是该种规范，二是八位色值这种使用方式具有兼容性问题，所以我们便使用了将颜色与透明度分开传的方式。

最开始，各端对齐的格式如下：

```js
attr:{
    background_color:{
        color:'#ffffff',
        opacity:'1'
    }
    color:{
        color:'#ffffff',
        opacity:'1'
    }
}
```

转换成interface为：

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c3792caff22429cbe5a92f3f8abcc97~tplv-k3u1fbpfcp-watermark.image?" 
     alt="image.png" width="50%" />
     
所以我们传过去的数据应该是这样的


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e9df2446f2b43d6899bd6ce32f159cf~tplv-k3u1fbpfcp-watermark.image?)

此时客户端同学说这种转义字符串不太合理应该直接是color对应的也是一个json对象，而不是一个字符串，这样不好取值。再加上本次需求背景颜色UI同学给取消了，所以最后传的数据便是这样子的

```js
org_attr:{
    color:'#ffffff',
    opacity:1
}
```
在此过程中我还遇到了一个问题，便是json字符串的格式。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b8d1939cc224a5ea39bf1552e62fbba~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="30%" />

json数据中的键名需要用双引号包括，使用单引号或者不使用都会在json.parse的时候报错，由于一开始我并未意识到是json数据格式的问题，便寻找了一下字符串转对象的方法：
- 使用eval
    
   
    ```js
    const str = '{"error":1,"data":"用户不存在"}'
    eval("("+str+")")
    ```
    我们便可以使用str.error，str.data来获取对应的数据。
    > eval是全局对象上的一个函数，会把传入的字符串当做 JavaScript 代码执行。如果传入的参数不是字符串，它会原封不动地将其返回。
    > 
    > - 降低性能。JavaScript引擎会在编译阶段进行数项的性能优化。其中有些优化依赖于能够根据代码的 词法进行静态分析，并预先确定所有变量和函数的定义位置，才能在执行过程中快速找到标识符。但如果引擎在代码中发现了 eval(..) ，它只能简单地假设关于标识符位置的判断都是无效的，因为无法在词法分析阶段明确知道 eval(..) 会接收到什么代码，这些代码会如何对作用域进行修改。最悲观的情况是如果出现了 eval(..) ，所有的优化可能都是无意义的，因此最简单的做法就是完全不做任何优化，所以性能会变慢
    > - 安全问题
    > - 调试困难。用chromeDev等调试工具无法打断点调试
- JSON.parse()——数据必须满足json格式
- (new Function("return " + str))();

```js
  // 定义一个对象字符串
  const str = '{"error":1,"data":"用户不存在"}';
  // 使用Function
  var obj = (new Function("return " + str))();
```
我们便可以说使用obj.error，obj.data获取对应的数据

参考文章：\
https://juejin.cn/post/6844903713140637709
https://blog.csdn.net/thunderevil35/article/details/80783746 \
https://www.cnblogs.com/dora-zc/p/10864382.html \
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval