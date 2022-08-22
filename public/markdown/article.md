# 事情的发酵过程
某天，产品提着刀来找我，让我实现一个功能：A功能模块要给个最大高度，当内容不超过最大高度，则展示所有内容，当内容超过最大高度隐藏超过最大高度的部分，同时展示“查看更多”按钮，点击查看更多，展示全部，同时展示“收起”，点击“收起”，隐藏原来展开的东西。简单来说，就是一个**展开收起**的功能。  

刀光剑影之下，我接下了这个小需求。
# 我的思考过程
我首先想到的是`MutationObserver`这个`Api`,通过监听内容区域的高度`clientHeight`，通过判断`clientHeight`与容器的`maxHeight`动态控制按钮的展示与隐藏，事实证明也确实是这样的，基于我的想法我以迅雷不及掩耳盗铃而响叮当之势做出了我的第一个方案，交了差事。
# 方案一 `MutationObserver`
### vue Template部分

```vue
<div class="header-tag-wrapper">
      <div class="content-wrapper" :style="{maxHeight: `${maxHeight}px`}">
        <div ref="headerTagContent" class="header-tag-content">
          <el-tag type="danger" v-for="(content, i) in items" :key="i">{{ content }}</el-tag>
        </div>
      </div>
      <div v-if="showBtns" class="footer-btn">
        <el-button type="text" icon="el-icon-arrow-down" v-if="islookMore" class="look-more" @click="lookMore">查看更多</el-button>
        <el-button type="text" icon="el-icon-arrow-up" v-else class="fold" @click="fold">收起</el-button>
      </div>
    </div>
```
### vue css部分
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
### vue js部分
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
其实到这里，我应该可以打卡下班了，我确实也打开下班了。
之所以有后面的故事是因为，第二天早上，当清晨的第一缕阳光吵醒我的时候，我打开手机，习惯性的看了一眼我关注的一个技术公众号，嗯，就还听震惊的。竟然发现关于动态监听DOM竟然还可以有如此之多的方案（[原文在此](https://mp.weixin.qq.com/s/VoKPVLDlj1n_0-wrAYlLVA)），当时差点留下了没有技术的泪水，立志要实现其余的几种方案，咱不会创新，还不会抄嘛。
接下来的几天里，我利用空余时间（我是说晚上9点下班之后的时间，懂得都懂）实践了原文中几个方案。废话不说了，直接上方案把，写完回家撸猫。
# 方案二 `IntersectionObserver`
`IntersectionObserver`，监听内容区与容器的交叉区域的比例，文档参考MDN
### vue template部分  **同方案一**
### vue css部分 **同方案一**
### vue js部分 **与方案一类似**
这里只贴出不一致的地方
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
# 方案三 `ResizeObserver`
`ResizeObserver`接口可以监听到的内容区域的改变，还在试验阶段，兼容性一般，但我们后台人员使用的都是Chrome，我觉得倒也可以接收这个方案
### vue template部分  **同方案一**
### vue css部分 **同方案一**
### vue js部分 **与方案一类似**
这里只贴出不一致的地方
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
# 方案四 纯css控制+一点js
固定查看更多的位置，固定收起的位置,这个方案确实有原文大佬说的问题，我其实也没怎么调整样式
### vue template部分
```
```vue
<div class="header-tag-wrapper">
      <div ref="headerTagContent" class="header-tag-content">
          <el-tag type="danger" v-for="(content, i) in items" :key="i">{{ content }}</el-tag>
        </div>
      <div v-if="showBtns" class="footer-btn">
        <el-button type="text" icon="el-icon-arrow-down" v-if="islookMore" class="look-more" @click="lookMore">查看更多</el-button>
        <el-button type="text" icon="el-icon-arrow-up" v-else class="fold" @click="fold">收起</el-button>
      </div>
    </div>
```

### vue css部分
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

### vue js部分
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
# 方案五 `iframe`
这个方案真实出乎我的意料，脑洞打开了
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
        <el-button type="text" icon="el-icon-arrow-down" v-if="islookMore" class="look-more" @click="lookMore">查看更多</el-button>
        <el-button type="text" icon="el-icon-arrow-up" v-else class="fold" @click="fold">收起</el-button>
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

# 总结一下
+ 如果考虑兼容性，请使用**方案五**，我偷个懒，不给大家抽离成组件了，大家都很聪明
+ 如果完全不考虑兼容性（我说的这是什么p话），可以使用**方案一~方案三**
# 再总结一下
作为一个努力给老板买别墅的小码农，要拿出做一个功能就可以掌握解决这一类问题的融会贯通的通天能力，否则怎么给老板买别墅，臣妾，告退。