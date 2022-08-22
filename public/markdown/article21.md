---
theme: fancy
---
持续创作，加速成长！这是我参与「掘金日新计划 · 6 月更文挑战」的第7天，[点击查看活动详情](https://juejin.cn/post/7099702781094674468 "https://juejin.cn/post/7099702781094674468")
# 实现效果

![chrome-capture-2022-5-22.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/444da54733a045a4b1b143d1ba3b89de~tplv-k3u1fbpfcp-watermark.image?)

# 实现思路
1. 基本布局
2. 开始事件
3. 结束事件

# 基本布局
基本布局没什么好说的一个盒子里面放随机的文字,文字水平垂直居中。盒子下面一个按钮，用来控制随机数的启动和停止。

# 开始事件
点击开始后，切换按钮状态。既然要一直切换文字，那么肯定要用到setInterval定时器。又用到了随机数肯定用到了Math.floor(Math.random())方式创建随机数。然后Math.random()的取值范围取决于你随机的列表的长度。当然为了避免快速点击按钮，每次点击事件要判断是否存在定时器，如果有要清除，如果没有则执行。

# 结束事件
点击结束后清除启动的定时器，就可以实现停止效果了。

# 实现代码

```
<template>
  <div class="eat-box">
    <div class="eat-content">
      <div>{{ msg }}</div>
    </div>
    <div @click="start" v-show="!buttonStatus">
      <button>开始</button>
    </div>
    <div @click="end" v-show="buttonStatus">
      <button>结束</button>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
export default {
  setup() {
    const state = reactive({
      eatList: ['火锅','烤鸡','麦当劳','肯德基','披萨','意面','轻食沙拉','烤肉','热干面','桂林米粉'],
      msg: '今天吃什么？',
      timer: null,
      buttonStatus: false
    })
    const start = () => {
      state.buttonStatus = !state.buttonStatus
      if(state.timer){
        clearInterval(state.timer)
      }
      state.timer = setInterval(()=>{
        let index = Math.floor(Math.random() * state.eatList.length)
        console.log(index)
        state.msg = state.eatList[index]
      },50)
    }
    const end = () => {
      state.buttonStatus = !state.buttonStatus
      clearInterval(state.timer)
    }
    return {
      ...toRefs(state),
      start,
      end

    }
  },
}
</script>


<style lang="less" scoped>
.eat-box {
  width:100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccf0c6;
  flex-direction: column;
  .eat-content {
    width: 300px;
    height: 200px;
    border: 1px solid #ff6700;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

```
# 总结
- 使用Math.floor(Math.random())生成随机数
- 使用setInterval定时器
- 使用clearInterval清除定时器。
- 如果要做个随机点名效果，思路和这个一致。