---
theme: channing-cyan
---
携手创作，共同成长！这是我参与「掘金日新计划 · 8 月更文挑战」的第3天，[点击查看活动详情](https://juejin.cn/post/7123120819437322247 "https://juejin.cn/post/7123120819437322247")
## 前言
大家好呀，我是L同学。在上篇文章[react笔记（二）—— jsx使用](https://juejin.cn/post/7126162125281574920)中，我们学习了jsx使用步骤、注意事项、jsx中使用javascript表达式、条件渲染、列表渲染、样式处理等相关知识点。在这篇文章中，我们将学习react的组件介绍、创建函数组件和类组件、有状态组件和无状态组件等相关知识点。

## 组件基本介绍
组件是 React 开发（现代前端开发）中最重要的内容。组件允许你将 UI 拆分为独立、可复用的部分，每个部分都可以独立的思考。组合多个组件（组装乐高积木）实现完整的页面功能。组件的特点是独立、可复用、可组合。
## react创建组件
React中创建组件有两种方式：

1. 使用 JS 中的`函数`创建组件
2. 使用 JS 中的 `class` 创建组件

### react创建组件-函数组件
函数组件是使用JS的函数或者箭头函数创建的组件。需要注意的是，**函数名称必须以大写字母开头**，React 据此区分组件和普通的 HTML。函数组件必须有返回值，表示该组件的 UI 结构；如果不需要渲染任何内容，则返回 null。

使用函数创建组件。

```js
// 使用普通函数创建组件：
function Hello() {
  return <div>这是我的第一个函数组件!</div>
}

function Button() {
  return <button>按钮</button>
}

// 使用箭头函数创建组件：
const Hello = () => <div>这是我的第一个函数组件!</div>
```
使用组件。

1. 组件就像 HTML 标签一样可以被渲染到页面中。组件表示的是一段结构内容，对于函数组件来说，渲染的内容是函数返回值对应的内容。
2. 使用函数名称作为组件标签名称。

```js
// 使用 双标签 渲染组件：
<Hello></Hello>
ReactDOM.render(<Hello></Hello>, root)

// 使用 单标签 渲染组件：
<Hello />
ReactDOM.render(<Hello />, root)
```
### react创建组件-类组件
使用 ES6 的 class 创建的组件，叫做类（class）组件。**类名称也必须以大写字母开头**。类组件应该继承 React.Component 父类，从而使用父类中提供的方法或属性。类组件必须提供 render 方法。render 方法必须有返回值，表示该组件的 UI 结构。

定义组件。

```js
// 导入 React
import React from 'react'
class Hello extends React.Component {
  render() {
    return <div>Hello Class Component!</div> 
  }
}
ReactDOM.render(<Hello />, root)

// 只导入 Component
import { Component } from 'react'
class Hello extends Component {
  render() {
    return <div>Hello Class Component!</div> 
  }
}
```
使用组件。

```js
ReactDOM.render(<Hello />, document.getElementById('root'))
```
在hooks之前，使用class语法创建组件比函数创建稍微麻烦一些，但是类组件的功能会比函数组件的功能更加强大。
## 有状态组件和无状态组件
在hooks之前，函数组件又叫做**无状态组件**函数组件是不能自己提供数据。类组件又叫做**有状态组件** 类组件可以自己提供数据，组件内部的状态（数据如果发生了改变，内容会自动的更新）数据驱动视图。状态（state）即组件的私有数据，当组件的状态发生了改变，页面结构也就发生了改变。函数组件是没有状态的，只负责页面的展示（静态，不会发生变化）性能比较高。类组件有自己的状态，负责*更新UI*，只要类组件的数据发生了改变，UI就会发生更新。在复杂的项目中，一般都是由函数组件和类组件共同配合来完成的。【增加了使用者的负担，所以后来有了hooks】。