### ����ͼ

![2940877fbfe61d75b050ff9906d97a60ebdb2efeee6ea87c3164861dd8610a3cQzpcVXNlcnNcaGFvbW9cQXBwRGF0YVxSb2FtaW5nXERpbmdUYWxrXDEzOTU2OTE3N192MlxJbWFnZUZpbGVzXEQ4RDc0ODc0LTMzOUUtNDZiOS05RTJELTk3Njk2QjE4NERDMC4zNjBfdGh1bWI=.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afd58eecb1c84f4aa4975f4d31863579~tplv-k3u1fbpfcp-watermark.image?)

ħŮլ�������

###  ����

��ĳ����Ŀ�У���ͳ�Ķ��ε�������ʹ��һ�����modal�����У��Խ����������һ�������Ч����

ͬʱ���û���������ϰ��ֱ�ӵ��ȷ�ϰ�ť�����²���ʧ��

### ����


����ȷ�ϵ���Ҫ�����Ƿ�ֹ��������Լ���ʾ���������ĺ���������û�����֮��ִ���˱��������Ĳ��������û�����ͼ�����ǲ��ѿ���������ȷ����һ�ִ���û����̵���ƣ�ֻ���Ȳ����ѵ����з������������Ƿ�ʹ�ã����ʹ������Ҫ��һ���Ŀ��ǣ�������ʵ��䷴��

### �������

����������⣬���ֱȽϺõ���Ʒ������£�

- �������󣬸�������ʱ��


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb1e4c6e9c404e628e3889b0f6c69710~tplv-k3u1fbpfcp-watermark.image?)

- ���ѯ��

ȷ��ʱ����ָ���ַ�

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3272a84102d4c39b070cfb21c84b653~tplv-k3u1fbpfcp-watermark.image?)

### ��������

���ֵ�����Ȼ���Խ�����⣬��������Modal����ʱ����ס����ҳ�棬�û��޷������ҳ���������Ϣ��


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a57a85fc9b0941db9aa3c24f34604258~tplv-k3u1fbpfcp-watermark.image?)

���ڴˣ����������ε����װ��propConfirm�С��������������ô���

- һ��ռ�ý��ٵĽ���ռ䣬propConfirm����ʱ����ռ��̫�����ռ䡣

- �����û��Ĺ�ע����Ӿ۽���һ���̶��Ͽ��Լ��ٲ���ʧ��ĸ��ʡ�

### ��Ʒ���



![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7044fa9277de4cbc95d5a0427e7b71ba~tplv-k3u1fbpfcp-watermark.image?)


RemindModal �ṩ���õ����������RemindModalHook�ṩ��ݷ��������û�������ʹ�ó��õ����ʹ��ģʽ�����������Ӹ��ֲ�����Ҳ������HOOKֱ�ӽ��п��ע�ᡣ


### ע������

- ���Ӻ���`regist`����Ҫ���������������ʱ�����ò����д��ݹ�����props��
- ��Ԫ����Ҫ��`cloneVNodes`�������и��ƣ����������onclick������
- λ����Ϣ�ļ���


### ����

`slot`����Ԫ�ز��游Ԫ�ر仯����ôʵ�֣�
- teleport ���ص�body
- ��̬����placementλ��
- ��ʾ����ҳ�����ʱ���水ťһ�����

### �������

1. ��Ԫ�ز�����slot , ������cloneVnodes����һ��
2. ����triggerRect �� contentRect��̬������ʾλ��
3. body���onscroll �¼�

### ��ش���

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
      default: 'ȷ��ִ�д˲�����~'
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
      default: 'ȡ��'
    },
    confirmText: {
      type: String as PropType<String>,
      default: 'ȷ��'
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
            // message: '���������ȷ���ַ�~',
            trigger: 'blur',
            validator: () => {
              if (userConfirmText.value === '') {
                return Promise.reject('���������ȷ���ַ�!')
              } else if (userConfirmText.value !== props.userText) {
                console.log('�����Ԥ�ڲ�һ��-----', userConfirmText.value)
                return Promise.reject('�����Ԥ�ڲ�һ��!')
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
                <div>��������������:</div>
                <div>{`${props.userText}`}</div>
                <Form ref={formRef} model={userConfirmText} rules={rules}>
                  <FormItem name={'userConfirmText'}>
                    <Input v-model:value={userConfirmText.value} placeholder="������" />
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
                        {`${countDownNum.value}s��ִ��`}
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

### ���

�˿���������û�в���popConfirm ������ʹ����������ʽ����ʵ�ʿ��������У�����popConfirm��Դ�룬�ǻ��ڶ������������з�װ�ġ�����`tooltip`,`trigger`��...

����Ч�����£�

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2bfa08deabf43c2b9761f4966091fa8~tplv-k3u1fbpfcp-watermark.image?)



![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55528e6a3784421db415b329b69591c0~tplv-k3u1fbpfcp-watermark.image?)





