### 封面图

![2940877fbfe61d75b050ff9906d97a60ebdb2efeee6ea87c3164861dd8610a3cQzpcVXNlcnNcaGFvbW9cQXBwRGF0YVxSb2FtaW5nXERpbmdUYWxrXDEzOTU2OTE3N192MlxJbWFnZUZpbGVzXEQ4RDc0ODc0LTMzOUUtNDZiOS05RTJELTk3Njk2QjE4NERDMC4zNjBfdGh1bWI=.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afd58eecb1c84f4aa4975f4d31863579~tplv-k3u1fbpfcp-watermark.image?)

魔女宅急便剧照

###  背景

在某个项目中，传统的二次弹框总是使用一个大的modal来进行，对界面的流程有一定的阻断效果。

同时，用户看到弹框习惯直接点击确认按钮，导致操作失误。

### 分析


二次确认的主要作用是防止误操作，以及警示操作带来的后果，避免用户无意之间执行了本不想做的操作。从用户流程图中我们不难看出，二次确认是一种打断用户流程的设计，只是迫不得已的折中方案。所以在是否使用，如何使用上需要有一定的考虑，否则会适得其反。

### 解决方案

针对上述问题，两种比较好的设计方案如下：

- 误操作左后，给定撤销时间


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb1e4c6e9c404e628e3889b0f6c69710~tplv-k3u1fbpfcp-watermark.image?)

- 多次询问

确认时输入指定字符

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3272a84102d4c39b070cfb21c84b653~tplv-k3u1fbpfcp-watermark.image?)

### 存在问题

这种弹框虽然可以解决问题，但是整个Modal弹出时，遮住整个页面，用户无法看清楚页面的其他信息。


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a57a85fc9b0941db9aa3c24f34604258~tplv-k3u1fbpfcp-watermark.image?)

基于此，决定将二次弹框封装到propConfirm中。这样做有两个好处：

- 一是占用较少的界面空间，propConfirm弹出时不会占用太多界面空间。

- 二是用户的关注点更加聚焦，一定程度上可以减少操作失误的概率。

### 设计方案



![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7044fa9277de4cbc95d5a0427e7b71ba~tplv-k3u1fbpfcp-watermark.image?)


RemindModal 提供常用的组件方案，RemindModalHook提供快捷方法。即用户即可以使用常用的组件使用模式，在组件上添加各种参数，也可以用HOOK直接进行快捷注册。


### 注意事项

- 钩子函数`regist`的首要任务是在组件挂载时，设置参数中传递过来的props。
- 子元素需要用`cloneVNodes`方法进行复制，在上面添加onclick方法、
- 位置信息的计算


### 问题

`slot`进来元素不随父元素变化，怎么实现？
- teleport 挂载到body
- 动态计算placement位置
- 提示框在页面滚动时不随按钮一起滚动

### 解决方案

1. 子元素不采用slot , 而是用cloneVnodes复制一份
2. 根据triggerRect 和 contentRect动态计算提示位置
3. body添加onscroll 事件

### 相关代码

```js
// position.ts
export const useClientRect = (ele) => {
  const res = ele && ele.$el ? ele.$el.getClientRects() : ele.getClientRects()
  const { top, left, width, height, x, y } = res[0]
  return {
    top,
    left,
    width,
    height,
    x,
    y
  }
}

interface Position {
  top?: number
  left?: number
  width?: number
  height?: number
  x?: number
  y?: number
}

export const usePlaceMent = ({ triggerRect, contentRect, placeMent }) => {
  if (placeMent === 'left') {
    return {
      top: triggerRect.top - contentRect.height / 2 + triggerRect.height / 2,
      left: triggerRect.left - contentRect.width - 10
    } as Position
  }

  if (placeMent === 'top') {
    const lastScrollTop = document.body.scrollTop
    return {
      top: triggerRect.top - contentRect.height - 10 + lastScrollTop - document.body.scrollTop,
      left: triggerRect.left + triggerRect.width / 2 - contentRect.width / 2
    } as Position
  }
  if (placeMent === 'right') {
    return {
      top: triggerRect.top - contentRect.height / 2 + triggerRect.height / 2,
      left: triggerRect.left + contentRect.width / 2 - triggerRect.width / 2 + 10
    } as Position
  }
  if (placeMent === 'bottom') {
    return {
      top: triggerRect.top + triggerRect.height + 10,
      left: triggerRect.left + triggerRect.width / 2 - contentRect.width / 2
    } as Position
  }
}

export const useScroll = (ele, onScroll: (evt: Event) => void) => {
  const handleScroll = (evt: Event) => {
    onScroll(evt)
  }
  const bindScroll = () => {
    document.body.addEventListener('scroll', handleScroll, true)
  }
  bindScroll()
}

```

Reminder.vue

```js
<script lang="tsx">
  // ref, unref, computed, reactive, watchEffect
  import type { Ref } from 'vue'
  import { defineComponent, ref, computed, Teleport, onMounted } from 'vue'
  import { cloneVNodes } from '../tool'
  import { Button, Form, FormItem, Input } from 'ant-design-vue'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  // import BasicRemind from './basic.vue'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { useClientRect, usePlaceMent, useScroll } from '../hooks/position'

  const props = {
    title: {
      type: String as PropType<String>,
      default: '确定执行此操作吗~'
    },
    duration: {
      type: Number as PropType<number>
      // default: 5
    },
    userText: {
      type: String as PropType<String>
    },
    cancleText: {
      type: String as PropType<String>,
      default: '取消'
    },
    confirmText: {
      type: String as PropType<String>,
      default: '确定'
    },
    placement: {
      type: String as PropType<String>,
      default: 'left'
    },
    reminderType: {
      type: String as PropType<String> // userInput | countDown
    },
    onOk: {
      type: Function as PropType<Function>,
      default: function () {
        console.log('onOk')
      }
    },
    onCancle: {
      type: Function as PropType<Function>,
      default: function () {
        console.log('onCancle')
      }
    }
  }

  export default defineComponent({
    name: 'RemindModal',
    components: { Button },
    props,
    emits: ['ok', 'cancle'],
    //  emit, expose
    setup(props, { slots }) {
      let disabled: Ref<boolean> = ref(false)
      let countDownNum: Ref<number> = ref(props.duration)
      let countDownTimer: Ref<any> = ref(null)
      let triggerEl: Ref<any> = ref(null)
      let position: Ref<Object> = ref({ top: 0, left: 0 })
      let opacity: Ref<any> = ref(0)
      let remindContainer: Ref<any> = ref({})
      let contentEl: Ref<any> = ref(null)
      let formRef: Ref<any> = ref(null)
      let userConfirmText: Ref<any> = ref('')

      const rules = {
        userConfirmText: [
          {
            required: true,
            // message: '请输入相关确认字符~',
            trigger: 'blur',
            validator: () => {
              if (userConfirmText.value === '') {
                return Promise.reject('请输入相关确认字符!')
              } else if (userConfirmText.value !== props.userText) {
                console.log('输入和预期不一致-----', userConfirmText.value)
                return Promise.reject('输入和预期不一致!')
              } else {
                return Promise.resolve()
              }
            }
          }
        ]
      }
      const onKeyDown = (e: KeyboardEvent) => {
        console.log('i am copyed el', e)
      }
      const { prefixCls } = useDesign('remind')
      const getRemindClass = computed(() => {
        return [prefixCls, [`${prefixCls}-modal`]]
      })

      const getRemindContainerClass = computed(() => {
        return [
          prefixCls,
          [`${prefixCls}-modal-content`, `${prefixCls}-modal-content-${props.placement}`]
        ]
      })
      console.log('getRemindContainerClass', getRemindContainerClass)
      const countDown = () => {
        disabled.value = true
        countDownTimer.value = setInterval(() => {
          countDownNum.value -= 1
          if (countDownNum.value <= 0) {
            clearInterval(countDownTimer.value)
            disabled.value = false
            countDownNum.value = props.duration
            opacity.value = 0
          }
        }, 1000)
      }

      const calcPlaceMent = () => {
        let triggerRect = useClientRect(triggerEl.value)
        let contentRect = useClientRect(contentEl.value)
        let calcPos = usePlaceMent({
          triggerRect,
          contentRect,
          placeMent: props.placement
        })
        position.value = calcPos
      }

      const onConfirm = () => {
        if (props.reminderType === 'userInput') {
          console.log('formRef', formRef)
          formRef.value
            .validate()
            .then(() => {
              props.onOk()
            })
            .catch((error) => {
              console.log('error', error)
            })
        }
        if (props.reminderType === 'countDown') {
          if (props.duration) {
            countDown()
          }
        }
      }

      const conCancle = () => {
        if (disabled.value && countDownNum.value) {
          clearInterval(countDownTimer.value)
          disabled.value = false
          countDownNum.value = props.duration
        }
        if (props.reminderType === 'userInput' && props.userText) {
          formRef.value.resetFields()
          userConfirmText.value = ''
        }
        opacity.value = 0
      }

      onMounted(() => {
        calcPlaceMent()
        useScroll(triggerEl.value, () => {
          calcPlaceMent()
        })
      })

      const renderUserText = () => {
        return (
          <>
            {props.userText ? (
              <div>
                <div>请输入以下内容:</div>
                <div>{`${props.userText}`}</div>
                <Form ref={formRef} model={userConfirmText} rules={rules}>
                  <FormItem name={'userConfirmText'}>
                    <Input v-model:value={userConfirmText.value} placeholder="请输入" />
                  </FormItem>
                </Form>
              </div>
            ) : null}
          </>
        )
      }

      const renderTip = () => {
        return (
          <Teleport to="body">
            <div
              ref={contentEl}
              class={getRemindContainerClass.value}
              style={{
                top: `${position.value?.top}px`,
                left: `${position.value?.left}px`,
                opacity: opacity.value
              }}
            >
              <div class="haomo-remind-modal-arrow">
                <span class="haomo-remind-modal-arrow-content"></span>
              </div>
              <div class="haomo-remind-modal-inner">
                <div class="ant-popover-inner-content">
                  <div class="ant-popover-message">
                    <span class="anticon anticon-exclamation-circle">
                      <ExclamationCircleOutlined style={{ color: '#faad14' }} />
                    </span>
                    <div class="ant-popover-message-title">{props.title}</div>
                  </div>
                  {renderUserText()}
                  <div class="ant-popover-buttons">
                    <Button type="default" size="small" onClick={() => conCancle()}>
                      {props.cancleText}
                    </Button>
                    {disabled.value ? (
                      <Button
                        type="primary"
                        danger={true}
                        size="small"
                        disabled
                        style={{ background: '#ff7875', color: '#fff' }}
                      >
                        {`${countDownNum.value}s后执行`}
                      </Button>
                    ) : (
                      <Button type="primary" size="small" onClick={() => onConfirm()}>
                        {props.confirmText}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Teleport>
        )
      }
      return () => {
        return (
          <div class={getRemindClass.value} ref={remindContainer}>
            {renderTip()}
            {cloneVNodes(
              slots.default?.() || [],
              {
                onKeydown: (e: KeyboardEvent) => {
                  onKeyDown(e)
                },
                onclick: () => {
                  opacity.value = opacity.value === 1 ? 0 : 1
                  calcPlaceMent()
                },
                ref: triggerEl
              },
              false
            )}
          </div>
        )
      }
    }
  })
</script>
```

### 最后

此开发案例并没有采用popConfirm ，而是使用了它的样式。在实际开发过程中，看了popConfirm的源码，是基于多个基础组件进行封装的。比如`tooltip`,`trigger`等...

最终效果如下：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2bfa08deabf43c2b9761f4966091fa8~tplv-k3u1fbpfcp-watermark.image?)



![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55528e6a3784421db415b329b69591c0~tplv-k3u1fbpfcp-watermark.image?)





