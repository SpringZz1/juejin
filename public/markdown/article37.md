---
theme: channing-cyan
highlight: androidstudio
---

�������������ٳɳ��������Ҳ��롸������¼ƻ� �� 6 �¸�����ս���ĵ�1�죬[����鿴�����](https://juejin.cn/post/7099702781094674468 "https://juejin.cn/post/7099702781094674468")

## ǰ��
<blockquote>
    С���ã����ְף�react��Ŀ��д����������react��Ȧ�ӣ����һ�׳������������Ǹ��Ƚϴ����ս������������զ����ȥѽ��������ô����״̬������ƴ��������ţ����ô���������������ڷ���������Ŀ����Я�̱ʼǵ�ҳ��Ϊģ�����ѧϰʵ���õ��ġ����¿�ʼ�����Ǹ�ҹ�ڷ�ߵ����ϣ���д�Ŵ���...
</blockquote>

## ����һ��react��Ŀ
<blockquote>
    ʹ�� npm init @vitejs/app ��ʼ��һ��react��Ŀ��Ȼ��һ·react���򿪽���react����Ĵ��š������ú������Ŀʹ�� npm i �����������ʹ�� npm run dev ��������������������ͷǳ�����ˣ���Ϊ���������Ǵ�չ���ֵ�ʱ���ˣ�
</blockquote>

## ǰ��׼��
��дһ��react�����Ҫһ���Ļ���֪ʶ������ǰ�������ף�css��js��html���ƺ�ͻȻ֮�䲻����ô�Ѻ��ˣ���զ���أ���һ���Ƚϸ�Ч�İ취�ǡ���ҳ�桱����Ȼ�����ܼ򵥵���ҳ�棬Ҫ��ģ����ʽ��ѧϰ����˼�����ʽ���Ժ��壬Ȼ���γ��Լ��Բ��ֵ���Ⲣ���Զ�������д�������������Ŀ��������Ҫ���������¼�����Դ����⣺

- `swiper`�����Ǵ�javascript����Ļ�����Ч���������ʵ�ֻõ�ƬЧ�����������ֲ�ͼ����ҳBanners��λչʾ��������ʵ��3D�Ļ���Ч����
- `styled-components`����˵��Ϊcss in js�����������ʽ������css��ʽ����css��ʽҲ��Ϊ�����
- `axios`������һ������ promise ����������⣬��ǰ�����˽ӿ���������ʱ�Ƚϳ��á�
- `classnames`������ʵ�ֶ�̬��Ϊ�����������������
- `antd-mobile-icons`����ר��Ϊ��Ŀ�����ṩ��һЩ��Ҫ��ͼ�꣬ͼ��ࡣ
�������ʣ�������ô�죬�ܲ���д���ɡ�����ʹ����`faskmock`������һ�����߽ӿڹ��ߣ�������û�к�˳�����������ʵ������ģ��ajax����ʵ�ֿ����е�����ģ��Ӷ�ʵ��ǰ��˷��롣

## ���˼·
### ����Ϊһ
��ҳ����л��֣����ֳ�һ�����������һҳ�����ȿ��Կ����Ƿ���԰��մ�ͳ��Header��Main��Footer���ܲ�ͬ���л��֣�Ȼ�����Main���ְ���ҵ���������и�ɲ�ͬ������������Ŀ��Ҫ��ΪHeader��Main���󲿷֣�����Main�ֳַ�����ͬ�Ķ���������
### ���ű���
- api �ļ���ר��ʹ��`axios`����ӿ���������
- assets �ļ��зŵ����font����css��ʼ��
- components �ļ��д�����������commons�ļ��з���ͨ�����
- modules �ļ�������������Ӧ����
- ��ר��ʹ��`<Main />`���������api������ȡ���ݣ�����״̬
���������������ܸ����ļ�����...

��Ŀ�ṹ�����ͼ��
![��Ļ��ͼ 2022-06-29 222041.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b399f5a9abb45888d5b169dd9035375~tplv-k3u1fbpfcp-watermark.image?)
��Ŀ����ʵ�ֵ�Ч������ͼ��
![��Ļ��ͼ 2022-06-29 223020.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/307efc5f18af46eaa9bf2aea4b0ac0bc~tplv-k3u1fbpfcp-watermark.image?)

![��Ļ��ͼ 2022-06-29 223046.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ece8445dd9dd43548fb2972c9c45b1c3~tplv-k3u1fbpfcp-watermark.image?)

![��Ļ��ͼ 2022-06-29 223104.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb87c0ea9cec48c1aff0f0f0e91e4dc1~tplv-k3u1fbpfcp-watermark.image?)

## ���ص�����һ��
### Header ���
������ֵ��������ֱ����һЩ��Դ���������ѡ�񣬱������õıȽ϶���� antd-mobile��������һ����Ҫע����������Ŀ��Header�����ǹ̶��ģ��������Ŵ�����������ʧ���ؼ����ԣ�`position: fixed;`��ͬʱ����������һ�������ͼ�꣬����ʵ�ַ��صĲ�����
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
                    <span>Я�̱ʼ�</span>
                </a>
            </div>
        </Wrapper>
    )
}

export default Header
```

### ��ע/ȡ����ע��ʵ��
`<UserInfo />`���չʾ���û��Ŀ�Ƭ��Ϣ������������һ��`addguanzhu`״̬����ʼΪfalse�Լ�һ������¼���������״̬�������ҵķ������趨��ע������ע�������ӣ�ͨ��״̬��booleanֵ������`addguanzhu && ����`��ʵ�֣�������Ϊtrueʱִ��������ӣ�������֮`!addguanzhu`Ϊfalse��ִ����һ�����ӡ������Խ��ⲿ�ִ����װ��һ���������棬ͨ������`{����ִ��}`�ķ�ʽʵ�֡�

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
                        <span className="btn_follow_text">��ע</span>
                    </div>
                }
                {
                    addguanzhu &&
                    <div className="user_btn_wrap" onClick={() => onadd()} >
                        <CheckOutline style={{width:10, height:10, marginRight: 3}} />
                        <span className="btn_follow_text" style={{fontSize:2}}>�ѹ�ע</span>
                    </div>
                }
            </div>
        </Wrapper>
    )
}

export default UserInfo
```

### swiper ʹ��

![chrome-capture-2022-5-30.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc9f5d686848448ca490d390dc3ef591~tplv-k3u1fbpfcp-watermark.image?)
�����Ŀ���������ֶ�ʹ����swiper����ο��������໥֮�䲻��ͻ�أ��ܼ򵥣���ÿ��swiper�����Ǹ����Ӽ���`id="�����ı���"`��������newһ��swiper����ʱʹ��`#id`������`swiper= new Swiper('#imgswiper', {})`���������֡�Ϊ�˱���״̬����ʱ�ظ�new swiper��������`useEffect()`���swiper��������Ϊ`null`�������ڽ��г��ز�����swiper��������Ҫ���룬����Ҫʹ�ù̶���ģ���ʽ�����Զ�Ӧ�汾�鿴�ٷ��ĵ��~

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

### `<Content />`���
������Ƕ����ݴ������������������ݽ��д���ģ�ͬʱ������`<Mask />`������⽫����һ���ֵ������ܡ��������ݴ�����ҪΪ��ʽ�����ã�ʹ����`word-break: break-word; white-space: pre-line;`�����������пհ׵Ĳ��ֽ��д����Լ�ʹÿһ�е����ݶ��ٸ��洰�ڴ�С���б仯����������һ��չ��ȫ�ĺ�������������㣬�������������Ϸֱ����`display()`����¼�����ģ̬���״̬�޸�Ϊtrue�Լ�ͨ��`setIsdisplay(!isdisplay)`����д�����߼������⣬�����˶����ڵĸ��²�������������ȡ�����µķ������ڣ��õ���ǰʱ�䣬����õ�ʱ���Ȼ������ES6д������html�����У��Ӷ�ʵ�����ڸ��¡�
        
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
                                չ��ȫ��
                                <DownOutline />
                            </p>
                    </div>
                }
                {
                    !isdisplay &&
                    <div onClick={() => display()}>
                        <p className="content_retract_content">
                            ����
                            <UpOutline />
                        </p>
                    </div>
                }
            </div>
            <div className="content_topic_layer taglist"></div>
            <div className="publish_time_wrapper time">
                <span className="publish_time">{`${dayDiff}��ǰ����`}</span>
                <span className="shoot_time">{`������${contentDate}`}</span>
            </div>
            <div className="content_spliter"></div>
            { ismask && <Mask closeMask={closeMask} /> }
        </Wrapper>
    )
}

export default Content
```

### ģ̬�򲿷�
���Կ����ⲿ��ģ̬����������������������������Ϊ��ʵ����������ġ���һ��˼����ν�������һ������������أ����κ�������벢��ʹ�����Ƶĺ������ݼ���ʹ�����أ����Ҳ����һ����Ƶ�ģ̬��ʵ�������������ڶ����ֵĴ��룬��ʵ���˲��������ڲ��رգ�������ͨ���ⲿ����������ؼ�����Զ��������ⲿͨ��props��������״̬����Ϊ���ڲ�״̬��״ֵ̬������useEffect�����״̬���м�����`visible:show`�����������ڶ�visibleȡ������`onClose && onClose()`��Ϊ�������������������һ��`onclose()`���ⲿ��ģ̬��Ĺرղ�����������ͨ��props����������������������У���ģ̬�����ڲ��ر�ʱ����ͨ��������������Ǹ�������ҵ�״̬�ı��ˣ�������false�ˡ����Ӷ�ʵ��״̬���¡�

![chrome-capture-2022-5-30.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0d9043bb4594d0fbecc987bb350233d~tplv-k3u1fbpfcp-watermark.image?)
```
import React from 'react';
import { Wrapper } from './style'

const Mask = ({closeMask}) => {

    return (
        <Wrapper>
                <div className="open_Model">
                    <div className="content">
                        <div className="content_text">�Ƿ�򿪡�Я��App���Ķ�ȫ��</div>
                        <div className="footer_handle">
                            <div className="btn cancle" onClick={closeMask}>ȡ��</div>
                            <div className="btn confirm">ȷ��</div>
                        </div>
                    </div>
                </div>
        </Wrapper>
    )
}

export default Mask
```

#### ���ҿ���!

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
                    {/* <button className="model-operator-close" onClick={deleteMask}>ȡ��</button>
                    <button className="model-operator-confirm" onClick={gotoPage}>ȷ��</button> */}
                    <button className="model-operator-close" onClick={closeModel}>ȡ��</button>
                    <button className="model-operator-confirm" onClick={confirm}>ȷ��</button> 
                </div>
            </div>
            <div className="mask" onClick={maskClick}></div>
        </div>
    )
}

export default Model
```

### ����С���

![chrome-capture-2022-5-30.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9905acd4b1174bd0b995304fe9058e66~tplv-k3u1fbpfcp-watermark.image?)
������Ҫ�ߣ�״̬����������㡣�������Ƚ�������д������һ���Ǹ������״̬����������Ƿ���ʾ���ڶ����������ʵ������״̬���ƣ������ֻҪ����ͺá������������������`<Task />`����أ���������������Ҫ��������`������`�߲��ߣ�
```
// �����
// ʡ���˵���¼������ı�״̬Ϊfalse
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
���ƵĻ����񣺣������Ըߣ������Ϳ����ã�

![��Ļ��ͼ 2022-06-30 144819.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b53515f6f26445d8134d0a98a519b0b~tplv-k3u1fbpfcp-watermark.image?)

![��Ļ��ͼ 2022-06-30 145402.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afea0dee475a48119c610441ea222573~tplv-k3u1fbpfcp-watermark.image?)
��ʵ����Щ����Ҳ���Է�װ��һ����С�����

![��Ļ��ͼ 2022-06-30 145155.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9527f360cd74beaaa283b89e46a92ee~tplv-k3u1fbpfcp-watermark.image?)

![��Ļ��ͼ 2022-06-30 145559.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/713dc3ce804047c5b8fea58faa8ac34f~tplv-k3u1fbpfcp-watermark.image?)

### �ٲ������֡�����Ӧ

![��Ļ��ͼ 2022-06-30 134420.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ff1d467aebc4edd96f4bb8b5804d26f~tplv-k3u1fbpfcp-watermark.image?)
�����ҶԴ���ӵĿ�͸߽����˹̶����������⼸���ؼ����ԣ�`flex-wrap: wrap;`��`flex-direction: column;`��`flex-wrap: wrap;`���в��֡�����û����������ʵ���ٲ�����Ч��������������� flex�̶�һ�У�Ȼ����һ������Ӧ��ʵ������ʽ�ٲ��������⣬�����θ����Ӵ���С����Ӧ�أ��״��룡
```
// һ����������
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
#### ����Ӧ
��srcĿ¼���½�һ��modules�ļ��У�����һ��rem.js�ļ����������´��롣Ȼ�󣬸���Ҫ����Ӧ��css����ֵ��λ�滻Ϊ`rem`��ֵ/20����
```
document.documentElement.style.fontSize = 
    document.documentElement.clientWidth / 3.75 + 'px';

// �������л�
window.onresize = function() {
    document.documentElement.style.fontSize = 
        document.documentElement.clientWidth / 3.75 + 'px';
}
```

### css reset
`css reset`����Ĭ����ʽ��������д������һ�ּ򵥣���������Խϲ�Ƽ�ʹ�õڶ���д����
```
// ��һ��
* {
    margin: 0;
    padding: 0;
    outline: 0
  }
// �ڶ���
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

### ���̻����
��`vite.config.js`�ļ��У��������������ã�
- `port`ָ������Ŀ���еĶ˿�Ϊ 3001
- `base`����Ŀ����йأ��� index.html �� assets �Ĺ�ϵ���ó� ./
- `alias`�������ȱȽϴ��ʱ�����·�������`../../`��ʹ������Ϊ·�����ñ���
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

### �������
���λ������Ŀpages[���ҿ���Ŀʵ��Ч��](<http://serendipityliu.xyz/xiechenbiji/>)<br>
�Լ���ĿԴ�����[����](https://github.com/liu-serendipity/xiechenbiji)






