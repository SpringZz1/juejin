# ����ķ��͹���
ĳ�죬��Ʒ���ŵ������ң�����ʵ��һ�����ܣ�A����ģ��Ҫ�������߶ȣ������ݲ��������߶ȣ���չʾ�������ݣ������ݳ������߶����س������߶ȵĲ��֣�ͬʱչʾ���鿴���ࡱ��ť������鿴���࣬չʾȫ����ͬʱչʾ�����𡱣���������𡱣�����ԭ��չ���Ķ���������˵������һ��**չ������**�Ĺ��ܡ�  

���⽣Ӱ֮�£��ҽ��������С����
# �ҵ�˼������
�������뵽����`MutationObserver`���`Api`,ͨ��������������ĸ߶�`clientHeight`��ͨ���ж�`clientHeight`��������`maxHeight`��̬���ư�ť��չʾ�����أ���ʵ֤��Ҳȷʵ�������ģ������ҵ��뷨����Ѹ�ײ����ڶ�������춣��֮���������ҵĵ�һ�����������˲��¡�
# ����һ `MutationObserver`
### vue Template����

```vue
<div class="header-tag-wrapper">
      <div class="content-wrapper" :style="{maxHeight: `${maxHeight}px`}">
        <div ref="headerTagContent" class="header-tag-content">
          <el-tag type="danger" v-for="(content, i) in items" :key="i">{{ content }}</el-tag>
        </div>
      </div>
      <div v-if="showBtns" class="footer-btn">
        <el-button type="text" icon="el-icon-arrow-down" v-if="islookMore" class="look-more" @click="lookMore">�鿴����</el-button>
        <el-button type="text" icon="el-icon-arrow-up" v-else class="fold" @click="fold">����</el-button>
      </div>
    </div>
```
### vue css����
```
.header-tag-wrapper {
  overflow-y: hidden;
  position: relative;
}
.header-tag-content {
  .el-tag {
    margin-top: 5px;
    margin-right: 5px;
  }
}
.content-wrapper {
  overflow-y: hidden;
}
.footer-btn {
  display: flex;
  justify-content: center;
}
```
### vue js����
```
export detault {
  props: {
    originMaxHeight: {
      type: Number,
      default: 60
    }
  },
  data () {
    return {
      maxHeight: this.originMaxHeight,
      showBtns: false,
      islookMore: false
    }
  },
  created() {
    this.observer = new MutationObserver((mutationList) => {
      if (this.height !== _.get(this, '$refs.headerTagContent.clientHeight')) {
        this.height = _.get(this, '$refs.headerTagContent.clientHeight')
        if (this.height > this.maxHeight) {
          this.showBtns = true
          this.islookMore = true
        }
      }
    })
    this.$nextTick(() => {
      if (!this.observer || !this.$refs.headerTagContent) return
      this.observer.observe(this.$refs.headerTagContent, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true
      })
    })
  },
  methods: {
    fold () {
      this.islookMore = true
      this.maxHeight = this.originMaxHeight
    },
    lookMore () {
      this.islookMore = false
      this.maxHeight = this.height
    }
  }
}
```
��ʵ�������Ӧ�ÿ��Դ��°��ˣ���ȷʵҲ���°��ˡ�
֮�����к���Ĺ�������Ϊ���ڶ������ϣ����峿�ĵ�һ�����ⳳ���ҵ�ʱ���Ҵ��ֻ���ϰ���ԵĿ���һ���ҹ�ע��һ���������ںţ��ţ��ͻ����𾪵ġ���Ȼ���ֹ��ڶ�̬����DOM��Ȼ�����������֮��ķ�����[ԭ���ڴ�](https://mp.weixin.qq.com/s/VoKPVLDlj1n_0-wrAYlLVA)������ʱ���������û�м�������ˮ����־Ҫʵ������ļ��ַ������۲��ᴴ�£������᳭�
�������ļ���������ÿ���ʱ�䣨����˵����9���°�֮���ʱ�䣬���ö�����ʵ����ԭ���м����������ϻ���˵�ˣ�ֱ���Ϸ����ѣ�д��ؼ�ߣè��
# ������ `IntersectionObserver`
`IntersectionObserver`�������������������Ľ�������ı������ĵ��ο�MDN
### vue template����  **ͬ����һ**
### vue css���� **ͬ����һ**
### vue js���� **�뷽��һ����**
����ֻ������һ�µĵط�
```js
export detault {
  created() {
    this.intersectionObserver = new IntersectionObserver((entries) => {
      const { intersectionRatio } = entries[0]
      console.log(intersectionRatio)
      if (intersectionRatio > 0 && intersectionRatio < 1) {
        this.showBtns = true
        this.islookMore = true
      }
    })
    this.$nextTick(() => {
      if (!this.intersectionObserver || !this.$refs.headerTagContent) return
      this.intersectionObserver.observe(this.$refs.headerTagContent)
    })
  }
}
```
# ������ `ResizeObserver`
`ResizeObserver`�ӿڿ��Լ���������������ĸı䣬��������׶Σ�������һ�㣬�����Ǻ�̨��Աʹ�õĶ���Chrome���Ҿ��õ�Ҳ���Խ����������
### vue template����  **ͬ����һ**
### vue css���� **ͬ����һ**
### vue js���� **�뷽��һ����**
����ֻ������һ�µĵط�
```js
export detault {
  props: {
    originMaxHeight: {
      type: Number,
      default: 60
    }
  },
  data () {
    return {
      maxHeight: this.originMaxHeight,
      showBtns: false,
      islookMore: false
    }
  },
  created() {
    this.observer = new ResizeObserver((entries) => {
      const clientHeight = entries[0].target.clientHeight
      if (clientHeight > this.maxHeight) {
        if (!this.showBtns) {
          this.showBtns = true
          this.islookMore = true
        }
      }
    })
    this.$nextTick(() => {
      if (!this.observer || !this.$refs.headerTagContent) return
      this.observer.observe(this.$refs.headerTagContent)
    })
  },
  methods: {
    fold () {
      this.islookMore = true
      this.maxHeight = this.originMaxHeight
    },
    lookMore () {
      this.islookMore = false
      this.maxHeight = this.$refs.headerTagContent.clientHeight
    }
  }
}
```
# ������ ��css����+һ��js
�̶��鿴�����λ�ã��̶������λ��,�������ȷʵ��ԭ�Ĵ���˵�����⣬����ʵҲû��ô������ʽ
### vue template����
```
```vue
<div class="header-tag-wrapper">
      <div ref="headerTagContent" class="header-tag-content">
          <el-tag type="danger" v-for="(content, i) in items" :key="i">{{ content }}</el-tag>
        </div>
      <div v-if="showBtns" class="footer-btn">
        <el-button type="text" icon="el-icon-arrow-down" v-if="islookMore" class="look-more" @click="lookMore">�鿴����</el-button>
        <el-button type="text" icon="el-icon-arrow-up" v-else class="fold" @click="fold">����</el-button>
      </div>
    </div>
```

### vue css����
```
.header-tag-wrapper {
  max-height: 100px;
  overflow-y: hidden;
  position: relative;
  .look-more {
    position: absolute;
    top:80px;
    left: 50%;
    background-color: aquamarine;
  }
  .fold {
    position: absolute;
    bottom: 0;
    left: 50%;
    background-color: aquamarine;
  }
}
.header-tag-content {
  .el-tag {
    margin-top: 5px;
    margin-right: 5px;
  }
}`

```

### vue js����
```
data: {
  islookMore: true
},
methods: {
    fold () {
      this.islookMore = true
      const headerTagWrapperDom = this.$refs.headerTagWrapper
      headerTagWrapperDom.style.overflowY = 'hidden'
      headerTagWrapperDom.style.maxHeight = '100px'
    },
    lookMore () {
      this.islookMore = false
      const headerTagWrapperDom = this.$refs.headerTagWrapper
      headerTagWrapperDom.style.overflowY = 'visible'
      headerTagWrapperDom.style.maxHeight = 'none'
    }
}
```
# ������ `iframe`
���������ʵ�����ҵ����ϣ��Զ�����
### vue template

```vue
<div class="header-tag-wrapper">
      <div class="content-wrapper" :style="{maxHeight: `${maxHeight}px`}">
        <div ref="headerTagContent" class="header-tag-content">
        <iframe ref="iframeRef" style="position: absolute;top: 0;width:0;z-index: -1;height: 100%"></iframe>
          <el-tag type="danger" v-for="(content, i) in items" :key="i">{{ content }}</el-tag>
        </div>
      </div>
      <div v-if="showBtns" class="footer-btn">
        <el-button type="text" icon="el-icon-arrow-down" v-if="islookMore" class="look-more" @click="lookMore">�鿴����</el-button>
        <el-button type="text" icon="el-icon-arrow-up" v-else class="fold" @click="fold">����</el-button>
      </div>
    </div>
```

### vue css

```
.header-tag-wrapper {
  overflow-y: hidden;
  position: relative;
}
.header-tag-content {
  position: relative;
  .el-tag {
    margin-top: 5px;
    margin-right: 5px;
  }
}
.content-wrapper {
  overflow-y: hidden;
  position: relative;
}
.footer-btn {
  display: flex;
  justify-content: center;
}
```

### vue js

```
export detault {
  props: {
    originMaxHeight: {
      type: Number,
      default: 60
    }
  },
  data () {
    return {
      maxHeight: this.originMaxHeight,
      showBtns: false,
      islookMore: false
    }
  },
  created() {
    this.$nextTick(() => {
      const ifr = this.$refs.iframeRef
      if (!ifr) return
      ifr.contentWindow.onresize = () => {
        const clientHeight = this.$refs.headerTagContent.clientHeight
        if (clientHeight > this.originMaxHeight) {
          this.showBtns = true
          if (this.maxHeight === clientHeight ) {
            this.islookMore = false
          } else if (this.maxHeight === this.originMaxHeight) {
            this.islookMore = true
          }
        } else {
          this.showBtns = false
        }
      }
    })
  },
  methods: {
    fold () {
      this.islookMore = true
      this.maxHeight = this.originMaxHeight
    },
    lookMore () {
      this.islookMore = false
      this.maxHeight = this.$refs.headerTagContent.clientHeight
    }
  }
}
```

# �ܽ�һ��
+ ������Ǽ����ԣ���ʹ��**������**����͵������������ҳ��������ˣ���Ҷ��ܴ���
+ �����ȫ�����Ǽ����ԣ���˵������ʲôp����������ʹ��**����һ~������**
# ���ܽ�һ��
��Ϊһ��Ŭ�����ϰ��������С��ũ��Ҫ�ó���һ�����ܾͿ������ս����һ��������ڻ��ͨ��ͨ��������������ô���ϰ����������檣����ˡ�