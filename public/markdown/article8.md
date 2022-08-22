# 前言
在不断自我提升的过程，我打算好好研究一下原型和原型链，但是，学习原型和原型链，我们就不得不了解一下new这个关键字和构造函数，本来是想把两个分开写的，但是呢，这两个有必然的联系，所以，写在一起，也方便自己回顾~~

# 什么是构造函数
  构造函数是典型的面向对象编程语言，js的对象语言体系，是基于构造函数和原型链的
  构造函数是生成对象实例的模板
# 构造函数和普通函数有什么区别？

```js
1. this指向：{
    ① 构造函数中的this，指向的是其创建出来的实例;
    ② 而普通函数的this指向则是window，严格模式下指向的为undefined;
}
2. 构造函数使用new关键字，而普通函数没有
```
# new关键字进场啦~
new关键字的使用，也是构造函数和普通函数的区别之一。
# new关键字都做了什么

```js
① 创建一个空对象
② 继承该函数的相关属性
③ 绑定this
```
### 解释new和prototype的关系

```js
new 关键字会创造出一个空对象，而它可以去继承该函数的相关属性，这个空对象，
相当于一个空间，装的东西多了，就会导致内存不足，
那么这种情况，我们就有了prototype，就相当于我们创建了一个共享空间，
只有我们有的东西，都可以在这个共享空间找并且找到，
如果没有就会通过__proto__链式查找，一直找下去，制导找不到为止
```















