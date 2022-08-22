---
theme: vuepress
highlight: tomorrow-night-bright
---
> 上个月写过一篇[V8是如何运行JavaScript(let a = 1)代码的？](https://juejin.cn/post/7109410330295402509),写完之后我就发现，我对平常使用的工具V8引擎，偏底层的知识了解的竟然是如此甚少。同时我真正从事前端的时间还算是比较短的，那么基础也算是非常的薄弱。结合以上，我打算有时间就去从底层的角度去学习了解，便于在使用过程中的理解和解决遇到的问题，理解JavaScript的本质，能够更好的学习JavaScript。如果你跟我有同样的困惑，那我们可以结伴同行，共同学习。

本系列我会从我的视角不断的去总结：
    
- [JavaScript基础系列开篇：V8是如何运行JavaScript(let a = 1)代码的？](https://juejin.cn/post/7109410330295402509)
    
- [JavaScript基础系列第二篇：从执行上下文的角度看JavaScript到底是怎么运行的](https://juejin.cn/post/7116687916759253000)

- [JavaScript基础系列第三篇：调用栈在JavaScript引擎中扮演了一个什么样的角色](https://juejin.cn/post/7117839908055547917)

- [JavaScript基础系列第四篇：如果你不理解作用域和作用域链,欢迎你点进来看看](https://juejin.cn/post/7118906121703653407)

- [JavaScript基础系列第五篇：通过最简单的几个小例子让你轻松的搞明白闭包](https://juejin.cn/post/7120371754274553887)
 
 
> 本文主要通过几个最简单的小demo,层层递进，慢慢的深入闭包，让你能轻松的搞明白闭包。那接下来就让我们一起来看看这几个小例子吧。

## 1、第一个小demo
先来看一段非常简单的代码片段
```javascript
<script>
  var aehyok = "全局"
function outFunction () { 
  var aehyok = "out函数" 
  function innerFunction(){
    console.log(aehyok)
  }
  innerFunction()
}
outFunction()
</script>
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ec1ae01478742938894d9e03ef3fcff~tplv-k3u1fbpfcp-watermark.image?)

首先代码非常简单，根据截图中可以发现，执行到断点位置时，根据词法作用域的规则，内部函数`innerFunction`可以访问它的外部`outerFunction`函数中的变量`aehyok`，执行后打印`out函数`一点毛病没有。

> 这里可以查看我之前的文章，[关于作用域链的讲解](https://juejin.cn/post/7118906121703653407)。

> 同时通过截图右侧的红色箭头可以发现，**`outFunction`函数其实已经形成了闭包**。

## 2、第二个小demo
```javascript
<script>
  var aehyok = "全局"
function outFunction () { 
  var aehyok = "out函数" 
  function innerFunction(){
    console.log(aehyok)
  }
  return innerFunction
}
let fun = outFunction()
fun()
</script>
```


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2be6add5dba04045ae8a6282e75dac4d~tplv-k3u1fbpfcp-watermark.image?)

查看代码，`const fun = outFunction()` 根据理解这里其实已经执行完`outFunction函数`，从`调用栈`的角度来说，已经将outFunction函数的`执行上下文`从`调用栈`里面移除了。

再调用`fun()`时，按道理打印的`aehyok变量`肯定不是`out函数`了。

但是通过截图可以发现，即将打印的变量值为`out函数`。这是为什么呢？

这里就产生了`闭包`,这个`闭包`是什么呢？

并且里面包含了`outFunction`函数的变量呢？

带着这一系列的问题，我们来看一下`闭包`的定义吧。

## 3、给闭包下一个定义

>MDN的解释：一个函数和对其周围状态（**lexical environment，词法环境**）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是**闭包**（**closure**）。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。

`outFunction`函数，以及`var声明的变量`（变量环境，但变量环境也是一个词法环境）被捆绑在了一起，我们暂时就把它比作一个`背包`吧。然后在内部创建的函数`innerFunction`,其中是可以访问这个`背包`里所有东西的。

> 你不知道的JavaScript一书中的解释是：当函数可以记住并访问所在的词法作用域，即时函
数是在当前词法作用域外执行，这时就产生了闭包。闭包就是可以读取其他函数内部变量的函数。

`fun()`确实是在最外面全局执行上下文中调用的，但是最终却可以访问`outFunction`函数的变量。


> 根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量。当通过调用一个外部函数返回一个内部函数后，即时该函数是在其他地方被调用，并且它的外部函数已经执行结束了，但是内部函数引用外部函数的变量仍然保存在内存中，我们就把这些变量的集合称为闭包。比如`outFunction`，那么再加上`变量aehyok`的集合就可以称为outFunction函数的闭包。（再说明一下第一个小例子：根据截图可以看到，其实这样也是产生了闭包的。）

## 4、再看第一个小demo

在大致理解了`闭包`后，我们再回头再看第一节的截图可以发现，此时右侧也已经在作用域中产生了`闭包`.再来看下面的截图

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3cfe06a9232f46529c50296d4fcb5bfc~tplv-k3u1fbpfcp-watermark.image?)

`outFunction`函数中创建了`innerFunction`函数之后，此时`outFunction`函数的闭包就已经形成了。因为我截图的状态还没有真正的开始执行，所以`aehyok变量`的值为undefined。

如果从执行上下的角度分析（如果想了解执行上下文的话，可以回头看我前几天刚热乎的文章：https://juejin.cn/post/7116687916759253000 ）。

- 1、编译全局上下文

先创建`全局执行上下文`，`var aehyok`被放到变量环境中，并赋初始值为undefined，遇到`outFunction函数`直接放到全局执行上下文中
- 2、执行全局上下文

先给`aehyok变量`赋值为“全局”，然后找到`outFunction`,发现是个函数

- 3、编译outFunction函数

先创建`函数执行上下文`，`var aehyok`被放到变量环境中，并赋初始值为undefined，遇到`innerFunction函数`直接放到函数执行上下文中

> 其实此时闭包在这里就已经形成了，通过上面我的截图右侧可以发现，作用域中的箭头指向已经存在了`闭包`,只不过此时截图的状态还没开始执行，`aehyok变量`还没有赋值操作，所以显示的是undefined初始值。也就是函数创建完以后闭包就形成了。

- 4、执行函数outFunction

先给`aehyok变量`赋值为“out函数”，然后找到`innerFunction`,发现是个函数

- 5、编译innerFunction函数

没有变量进行初始化

- 6、执行innerFunction函数

直接通过`console.log`打印变量`aehyok`的值。

> 打印变量的时候开始查找变量的作用域链，在`innerFunction`执行上下文的变量环境和词法环境中都没有找到变量，那么就要根据词法作用域链（也就是我上一篇模拟的outer指向来查找），找到`outFuntion`函数的作用域，发现了变量，于是打印结果为“**out函数**”

## 5、调整第一个小demo
```javascript
<script>
  var aehyok = "全局"
function outFunction () { 
  var aehyok = "out函数" 
  function innerFunction(){
    console.log(aehyok)
  }
  innerFunction()
}
let fun = outFunction()
console.log(fun)
</script>
```
主要修改就是最后两行代码，添加了一个赋值，并进行console.log打印操作

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf858f1e6f1a4407b382a6a60bfed520~tplv-k3u1fbpfcp-watermark.image?)

根据截图所示，执行到最后的打印位置，很明显，执行`outFunction()`后，我们又没有return返回值，所以返回默认值undefined，这是没毛病的。

而且右侧作用域中也不存在什么函数作用和什么闭包了，浏览器的V8引擎在调用栈移除函数执行上下文的时候，自动处理在内存中进行了销毁。

## 6、第二个小demo增加一行代码

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4854596f48114269875c8e2000691436~tplv-k3u1fbpfcp-watermark.image?)

如果所示我只是在第二个小例子中添加了一个打印而已，但是通过截图发现右侧的作用域中，竟然存在这么多,我主要来说一下重点

- 1、fun的引用
fun实际上就是`innerFunction`函数，这个看代码是在`outFunction`函数中进行了return返回

- 2、闭包
`outFunction`函数的闭包，这个跟第5部分的例子不同，第5部分的闭包没有在全局执行上下文中使用，所以第5部分中的闭包会等函数销毁后，在下次V8引擎执行垃圾回收的时候，判断闭包这块内容已经没有被使用了，那么V8引擎就会回收这块内存了。

但是在这个例子中，`fun`变量引用了`outFunction`函数的闭包，而且是一个全局变量，那么这个闭包就会一直存在，直到页面关闭时才会销毁。

## 7、总结

- 1、了解闭包的定义

- 2、通过层层递进的小例子，来了解闭包

- 3、通过一二个小例子：闭包是储存在堆内存中。因为如果存在于栈中的话，执行上下文执行完之后就要从调用栈移除，就不存在了，所以它是存在于堆内存中的。

- 4、通过第五个小例子：已经形成了闭包，但是在outFunction函数外部没有使用过闭包，所以闭包在函数执行完在内存中也就自动释放了

- 5、通过第六个小例子：已经形成了闭包，并在outFunction函数外部使用了闭包，fun在执行完毕之后，再打印fun可以发现，闭包仍然是存在的。

> 闭包形成，并被访问之后，是不会自动释放的，在第六个小例子中，如果想释放，可以对fun进行手动赋值为null,随后再打印可发现闭包不见了。所以使用闭包时要非常的谨慎，稍不注意内存不断累积，从而导致页面运行缓慢，甚至直接出现内存溢出等问题。

- 6、最后简单总结一下闭包的使用场景：
    - 函数中返回函数
   
    - 函数作为参数传递
   
    - IIFE自执行函数
    
    - 使用回调函数
    
    - ......等等
   
 我正在参与掘金技术社区创作者签约计划招募活动，[点击链接报名投稿](https://juejin.cn/post/7112770927082864653 "https://juejin.cn/post/7112770927082864653")。  
