---
theme: fancy
---
�������������ٳɳ��������Ҳ��롸������¼ƻ� �� 6 �¸�����ս���ĵ�7�죬[����鿴�����](https://juejin.cn/post/7099702781094674468 "https://juejin.cn/post/7099702781094674468")
# ʵ��Ч��

![chrome-capture-2022-5-22.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/444da54733a045a4b1b143d1ba3b89de~tplv-k3u1fbpfcp-watermark.image?)

# ʵ��˼·
1. ��������
2. ��ʼ�¼�
3. �����¼�

# ��������
��������ûʲô��˵��һ��������������������,����ˮƽ��ֱ���С���������һ����ť�����������������������ֹͣ��

# ��ʼ�¼�
�����ʼ���л���ť״̬����ȻҪһֱ�л����֣���ô�϶�Ҫ�õ�setInterval��ʱ�������õ���������϶��õ���Math.floor(Math.random())��ʽ�����������Ȼ��Math.random()��ȡֵ��Χȡ������������б�ĳ��ȡ���ȻΪ�˱�����ٵ����ť��ÿ�ε���¼�Ҫ�ж��Ƿ���ڶ�ʱ���������Ҫ��������û����ִ�С�

# �����¼�
�����������������Ķ�ʱ�����Ϳ���ʵ��ֹͣЧ���ˡ�

# ʵ�ִ���

```
<template>
  <div class="eat-box">
    <div class="eat-content">
      <div>{{ msg }}</div>
    </div>
    <div @click="start" v-show="!buttonStatus">
      <button>��ʼ</button>
    </div>
    <div @click="end" v-show="buttonStatus">
      <button>����</button>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
export default {
  setup() {
    const state = reactive({
      eatList: ['���','����','����','�ϵ»�','����','����','��ʳɳ��','����','�ȸ���','�����׷�'],
      msg: '�����ʲô��',
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
# �ܽ�
- ʹ��Math.floor(Math.random())���������
- ʹ��setInterval��ʱ��
- ʹ��clearInterval�����ʱ����
- ���Ҫ�����������Ч����˼·�����һ�¡�