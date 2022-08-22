---
theme: channing-cyan
highlight: androidstudio
---

持续创作，加速成长！这是我参与「掘金日新计划 · 6 月更文挑战」的第1天，[点击查看活动详情](https://juejin.cn/post/7099702781094674468 "https://juejin.cn/post/7099702781094674468")

## 前言
<blockquote>
    小白兔，白又白，react项目，写起来！初入react的圈子，设计一套成熟的组件还真是个比较大的挑战。报！这个组件咋挂上去呀，报！怎么不在状态啊？我拼的明明是牛，怎么出来的是马啊。现在分享的这个项目是以携程笔记单页面为模板进行学习实践得到的。故事开始，那是个夜黑风高的晚上，我写着代码...
</blockquote>

## 开启一个react项目
<blockquote>
    使用 npm init @vitejs/app 初始化一个react项目，然后一路react，打开进入react世界的大门。建立好后进入项目使用 npm i 下载相关依赖使用 npm run dev 把它运行起来，到这里就非常舒服了，因为接下来就是大展身手的时候了！
</blockquote>

## 前期准备
手写一个react组件需要一定的基础知识，比如前端三件套：css、js、html。似乎突然之间不是那么友好了，那咋办呢？有一个比较高效的办法是“切页面”，当然，不能简单的切页面，要从模板样式里学习布局思想和样式属性含义，然后形成自己对布局的理解并加以锻炼，多写多练！在这个项目里面我主要运用了以下几个开源组件库：

- `swiper`：它是纯javascript打造的滑动特效插件，可以实现幻灯片效果，常用作轮播图、首页Banners部位展示，还可以实现3D的滑动效果。
- `styled-components`：常说成为css in js，以组件的形式来声明css样式，让css样式也成为组件。
- `axios`：它是一个基于 promise 的网络请求库，在前端向后端接口请求数据时比较常用。
- `classnames`：可以实现动态的为盒子添加属性类名。
- `antd-mobile-icons`：它专门为项目开发提供了一些需要的图标，图标多。
还有疑问？数据怎么办，总不能写死吧。这里使用了`faskmock`，它是一款在线接口工具，可以在没有后端程序的情况下真实地在线模拟ajax请求，实现开发中的数据模拟从而实现前后端分离。

## 设计思路
### 化整为一
对页面进行划分，划分成一个个组件，单一页面首先可以考虑是否可以按照传统的Header、Main、Footer功能不同进行划分，然后对于Main部分按照业务需求再切割成不同的组件。这个项目主要分为Header、Main两大部分，其中Main又分成需求不同的多个子组件。
### 分门别类
- api 文件夹专门使用`axios`来向接口请求数据
- assets 文件夹放导入的font或者css初始化
- components 文件夹存放组件，其中commons文件夹放入通用组件
- modules 文件夹用来做自适应处理
- 将专门使用`<Main />`组件来操作api函数获取数据，设置状态
将来还将继续介绍更多文件分类...

项目结构搭建如下图：
![屏幕截图 2022-06-29 222041.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b399f5a9abb45888d5b169dd9035375~tplv-k3u1fbpfcp-watermark.image?)
项目最终实现的效果如下图：
![屏幕截图 2022-06-29 223020.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/307efc5f18af46eaa9bf2aea4b0ac0bc~tplv-k3u1fbpfcp-watermark.image?)

![屏幕截图 2022-06-29 223046.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ece8445dd9dd43548fb2972c9c45b1c3~tplv-k3u1fbpfcp-watermark.image?)

![屏幕截图 2022-06-29 223104.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb87c0ea9cec48c1aff0f0f0e91e4dc1~tplv-k3u1fbpfcp-watermark.image?)

## 捡重点来玩一玩
### Header 组件
这个部分的组件可以直接在一些开源的组件库里选择，比如我用的比较多的是 antd-mobile，但是有一点需要注意的是这个项目的Header部分是固定的，不会随着窗口下拉而消失，关键属性：`position: fixed;`。同时这里引入了一个朝左的图标，可以实现返回的操作。
```
import React from 'react';
import { Wrapper } from './style'
import { LeftOutline } from 'antd-mobile-icons'

const Header = () => {
    
    return (
        <Wrapper>
            <div className="header detail_header">
                <LeftOutline className="iconstyle"/>
                <a href="#">
                    <span>携程笔记</span>
                </a>
            </div>
        </Wrapper>
    )
}

export default Header
```

### 关注/取消关注的实现
`<UserInfo />`组件展示了用户的卡片信息，并且设置了一个`addguanzhu`状态，初始为false以及一个点击事件用来更新状态。这里我的方法是设定关注、不关注两个盒子，通过状态的boolean值，运用`addguanzhu && 盒子`来实现，即当其为true时执行这个盒子，反而言之`!addguanzhu`为false则不执行另一个盒子。还可以将这部分代码封装进一个函数里面，通过插入`{函数执行}`的方式实现。

![chrome-capture-2022-5-29.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee74a9c0c2014850828174f89573354d~tplv-k3u1fbpfcp-watermark.image?)
```
import React, { useState } from 'react';
import { Wrapper } from './style';
import { AddOutline, CheckOutline } from 'antd-mobile-icons'

const UserInfo = () => {

    const [addguanzhu, setAddguanzhu] = useState(false)
    const onadd = () => {
        setAddguanzhu(!addguanzhu)
    }

    return (
        <Wrapper>
                ...
                {
                    !addguanzhu &&
                    <div className="user_btn_wrap" onClick={() => onadd()}>
                        <AddOutline style={{width:10, height:10, marginRight: 4}} />
                        <span className="btn_follow_text">关注</span>
                    </div>
                }
                {
                    addguanzhu &&
                    <div className="user_btn_wrap" onClick={() => onadd()} >
                        <CheckOutline style={{width:10, height:10, marginRight: 3}} />
                        <span className="btn_follow_text" style={{fontSize:2}}>已关注</span>
                    </div>
                }
            </div>
        </Wrapper>
    )
}

export default UserInfo
```

### swiper 使用

![chrome-capture-2022-5-30.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc9f5d686848448ca490d390dc3ef591~tplv-k3u1fbpfcp-watermark.image?)
这个项目有三个部分都使用了swiper，如何可以做到相互之间不冲突呢，很简单，给每个swiper最大的那个盒子加上`id="单独的别名"`，并且在new一个swiper出来时使用`#id`，类似`swiper= new Swiper('#imgswiper', {})`，用于区分。为了避免状态更新时重复new swiper，所以在`useEffect()`外对swiper声明并且为`null`，在其内进行除重操作。swiper不仅仅需要引入，还需要使用固定的模板格式，可以对应版本查看官方文档喔~

```
import React, { useEffect } from 'react';
import Swiper from 'swiper';
import { Wrapper } from './style';

const ImgSwiper = ({imgdata}) => {
    let swiper = null;
    useEffect(() => {
        if (swiper) {
            return 
        }
        swiper= new Swiper('#imgswiper', {
            loop: true,
            pagination: {
                el:"#pagination",
            }
        })
    }, [])

    const renderImg = () => {
        return imgdata.map(item => {
            return (
                <img 
                    src={item.pic} 
                    key={item.id}
                    className="swiper-slide"
                    />
            )
        })
    }

    return (
        <Wrapper>
            <div className="media media-layer">
                <div className="swiper-container mediaSwiper" id="imgswiper">
                    <div className="swiper-wrapper media-swiper-wrapper">
                        {renderImg()}
                    </div>
                    <div className="swiper-pagination" id="pagination"></div>
                </div>
            </div>
        </Wrapper>
    )
}

export default ImgSwiper
```

### `<Content />`组件
该组件是对数据传输过来里面的文章内容进行处理的，同时引入了`<Mask />`组件，这将在下一部分单独介绍。文章内容处理主要为样式的运用，使用了`word-break: break-word; white-space: pre-line;`对文章内容有空白的部分进行处理，以及使每一行的内容多少跟随窗口大小进行变化。这里作了一个展开全文和收起的需求满足，在这两个盒子上分别添加`display()`点击事件负责将模态框的状态修改为true以及通过`setIsdisplay(!isdisplay)`这种写法简化逻辑。此外，还做了对日期的更新操作，从数据中取得文章的发表日期，得到当前时间，计算得到时间差然后利用ES6写法插入html代码中，从而实现日期更新。
        
```
import React, { useState, useEffect } from 'react';
import { Wrapper } from './style'
import { DownOutline, UpOutline } from 'antd-mobile-icons'
import classnames from 'classnames'
import Mask from '../commons/open-mask'

const Content = ({content={}}) => {

    const { contentDetail={} } = content
    const { content_tags=[], contents, content_title, contentDate } = contentDetail
    const [isdisplay, setIsdisplay] = useState(true)
    const [ismask, setIsmask] = useState(false)

    const tags = () => {
        return content_tags.map((tag, index) => 
            <span className="content_ctag" key={index}>{tag}</span>
        )
    }

    const display = () => {
        setIsdisplay(!isdisplay)
        setIsmask(true)
    }

    const closeMask = () => {
        setIsmask(false)
    }

    let time = new Date(contentDate)
    let nowtime = new Date()
    let dateDiff = nowtime.getTime() - time.getTime()
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000))

    return (
        <Wrapper>
            <div className="content detail_content_wrap" >
                <div id="contentDetail" className={classnames({content_detail_retract: isdisplay})}>
                    <span className="detail_content_title">{content_title}</span><br/>
                    {tags()}<br/> 
                    {contents}
                </div>
                {
                    isdisplay &&
                    <div className="content_retract_div" onClick={() => display()} >
                            <p className="content_retract_before"></p>
                            <p className="content_retract_content">
                                展开全文
                                <DownOutline />
                            </p>
                    </div>
                }
                {
                    !isdisplay &&
                    <div onClick={() => display()}>
                        <p className="content_retract_content">
                            收起
                            <UpOutline />
                        </p>
                    </div>
                }
            </div>
            <div className="content_topic_layer taglist"></div>
            <div className="publish_time_wrapper time">
                <span className="publish_time">{`${dayDiff}天前发布`}</span>
                <span className="shoot_time">{`拍摄于${contentDate}`}</span>
            </div>
            <div className="content_spliter"></div>
            { ismask && <Mask closeMask={closeMask} /> }
        </Wrapper>
    )
}

export default Content
```

### 模态框部分
可以看到这部分模态框组件对引入它的组件很依赖，是为了实现需求而做的。进一步思考如何将其做成一个单独的组件呢，即任何组件引入并且使用特制的函数传递即可使用它呢？这里，也有另一种设计的模态框，实现了这个需求，如第二部分的代码，它实现了不仅可以内部关闭，还可以通过外部对其操作，关键是相对独立，把外部通过props传过来的状态设置为其内部状态的状态值，并用useEffect对这个状态进行监听。`visible:show`是在这个组件内对visible取别名。`onClose && onClose()`意为引用这个组件的组件用了一个`onclose()`在外部对模态框的关闭操作函数，并通过props把这个函数传进来并且运行，当模态框其内部关闭时，又通过这个函数告诉那个组件“我的状态改变了，现在是false了”，从而实现状态更新。

![chrome-capture-2022-5-30.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0d9043bb4594d0fbecc987bb350233d~tplv-k3u1fbpfcp-watermark.image?)
```
import React from 'react';
import { Wrapper } from './style'

const Mask = ({closeMask}) => {

    return (
        <Wrapper>
                <div className="open_Model">
                    <div className="content">
                        <div className="content_text">是否打开“携程App”阅读全文</div>
                        <div className="footer_handle">
                            <div className="btn cancle" onClick={closeMask}>取消</div>
                            <div className="btn confirm">确认</div>
                        </div>
                    </div>
                </div>
        </Wrapper>
    )
}

export default Mask
```

#### 看我看我!

```
import React, { useState, useEffect } from 'react'
import './model.css'

const Model = (props) => {
    // console.log(loading, '------');
    const { visible:show, title, children } = props
    const { onClose, onConfirm } = props
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        setVisible(show)
    }, [show])
    const closeModel = () => {
        setVisible(false)
        onClose && onClose()
    }
    const confirm = () => {
        setVisible(false)
        onConfirm && onConfirm()
    }
    const maskClick = () => {
        setVisible(false)
        onClose && onClose()
    }
    return (
        visible && <div className="model-wrapper">
            <div className="model">
                <div className="model-title">{title}</div>
                <div className="model-content">{children}</div>
                <div className="model-operator">
                    {/* <button className="model-operator-close" onClick={deleteMask}>取消</button>
                    <button className="model-operator-confirm" onClick={gotoPage}>确定</button> */}
                    <button className="model-operator-close" onClick={closeModel}>取消</button>
                    <button className="model-operator-confirm" onClick={confirm}>确定</button> 
                </div>
            </div>
            <div className="mask" onClick={maskClick}></div>
        </div>
    )
}

export default Model
```

### 复用小组件

![chrome-capture-2022-5-30.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9905acd4b1174bd0b995304fe9058e66~tplv-k3u1fbpfcp-watermark.image?)
复用性要高，状态尽量不往外搞。我们来比较这两种写法，第一种是父组件用状态控制子组件是否显示；第二种是子组件实现自我状态控制，父组件只要引入就好。如果多个父组件引用了`<Task />`组件呢？组件的设计往往需要考虑它的`复用性`高不高！
```
// 父组件
// 省略了点击事件，即改变状态为false
const [istask, setIstask] = useState(true)
{ istask && <Task /> }
```

```
import React, { useEffect, useState } from 'react';
import { Wrapper } from './style'
import Swiper from 'swiper'

const Task = () => {
    const [istask, setIstask] = useState(true)
    let swiper = null;
    useEffect(() => {
        if (swiper) {
            return 
        }
        swiper= new Swiper('#taskswiper', {})
    }, [])

    return (
        istask && <Wrapper>
            <div className="task-module">
                <div className="swiper-container task-swiper swiper-container-3d" id="taskswiper">
                    <div className="swiper-wrapper">
                        <div className="task-item swiper-slide">
                            <img src="https://dimg04.c-ctrip.com/images/0106l120008jelt2nB954.png" alt="" className="task_item_img" />
                        </div>
                    </div>
                </div>
                <div className="close-view" onClick={() => setIstask(!istask)} >
                    <img src="https://pages.c-ctrip.com/livestream/tripshoot/dest_tripshoot_task_close.png" className="close_view_img" />
                </div>
            </div>
        </Wrapper>
    )
}

export default Task
```
类似的还有像：（复用性高，拿来就可以用）

![屏幕截图 2022-06-30 144819.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b53515f6f26445d8134d0a98a519b0b~tplv-k3u1fbpfcp-watermark.image?)

![屏幕截图 2022-06-30 145402.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afea0dee475a48119c610441ea222573~tplv-k3u1fbpfcp-watermark.image?)
其实像这些：（也可以封装成一个个小组件）

![屏幕截图 2022-06-30 145155.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9527f360cd74beaaa283b89e46a92ee~tplv-k3u1fbpfcp-watermark.image?)

![屏幕截图 2022-06-30 145559.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/713dc3ce804047c5b8fea58faa8ac34f~tplv-k3u1fbpfcp-watermark.image?)

### 瀑布流布局、自适应

![屏幕截图 2022-06-30 134420.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ff1d467aebc4edd96f4bb8b5804d26f~tplv-k3u1fbpfcp-watermark.image?)
这里我对大盒子的宽和高进行了固定，利用了这几个关键属性：`flex-wrap: wrap;`、`flex-direction: column;`、`flex-wrap: wrap;`进行布局。这里没有做到真正实现瀑布流的效果，建议可以利用 flex固定一列，然后另一列自适应来实现两列式瀑布流。另外，宽度如何根据视窗大小自适应呢？抛代码！
```
// 一个糟糕的例子
.relevant_waterfall_box {
        width: 375px;
        background: #f4f8fb;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        height: 2710px;
    }
    .relevant_wf_item {
        width: 48%;
        box-shadow: 0 1px 8px rgb(0 0 0 / 4%);
        border-radius: 6px;
        margin-bottom: 10px;
        background: #fff;
    }
```
#### 自适应
在src目录下新建一个modules文件夹，创建一个rem.js文件，放入以下代码。然后，给需要自适应的css属性值单位替换为`rem`，值/20即可
```
document.documentElement.style.fontSize = 
    document.documentElement.clientWidth / 3.75 + 'px';

// 横竖屏切换
window.onresize = function() {
    document.documentElement.style.fontSize = 
        document.documentElement.clientWidth / 3.75 + 'px';
}
```

### css reset
`css reset`重置默认样式，有两种写法，第一种简单，但性能相对较差；推荐使用第二种写法。
```
// 第一种
* {
    margin: 0;
    padding: 0;
    outline: 0
  }
// 第二种
body {
    height: 100%;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-overflow-scrolling: touch;
  }
  
code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  
blockquote, body, button, code, dd, div, dl, dt, em, fieldset, form, h1, h2, h3, h4, h5, h6, html, input, legend, li, ol, p, pre, td, textarea, th, ul {
    margin: 0;
    padding: 0;
  }
  
img {
    border: 0;
    margin: 0;
    padding: 0;
    vertical-align: top;
  }
```

### 工程化相关
在`vite.config.js`文件中，进行了以下配置：
- `port`指定了项目运行的端口为 3001
- `base`与项目打包有关，将 index.html 与 assets 的关系配置成 ./
- `alias`当组件深度比较大的时候，相对路径变得难`../../`，使用它来为路径配置别名
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001
  },
  base: './',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  }
})
```

### 最后的最后
向各位递上项目pages[点我看项目实现效果](<http://serendipityliu.xyz/xiechenbiji/>)<br>
以及项目源码分享[点我](https://github.com/liu-serendipity/xiechenbiji)






