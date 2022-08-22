---
highlight: agate
theme: channing-cyan
---


# 组件的联动，其实也不难

低代码的表单控件，最大的问题就是如何实现灵活性，而灵活性又包含很多情况，像 el-form 提供了很高的灵活性，但是用起来比较繁琐，所以需要我们找到一个折中点。

首先考虑的是方便性，然后才去考虑灵活性，否则直接用 el-form 好了。

## 相关文章

* 专栏 [基于Vue3做一套低代码引擎](https://juejin.cn/column/7121319406331756581)
* 开篇
  * [把UI库变成低代码工具，LowCode 应该成为程序员的开发利器](https://juejin.cn/post/7117071097425559582)
* 列表
  * [【摸鱼神器】UI库秒变LowCode工具——列表篇（一）设计与实现](https://juejin.cn/post/7105981301416542245)
  * [【摸鱼神器】UI库秒变LowCode工具——列表篇（二）维护json的小工具](https://juejin.cn/post/7119691288185667598)
  * [【低代码】为客户设计个性化方案：列表篇（客户自己调整排序对齐等）](https://juejin.cn/post/7119102542939684877)
* 表单
  * [【摸鱼神器】UI库秒变低代码工具——表单篇（一）设计](https://juejin.cn/post/7114847752927838238)
  * [【摸鱼神器】UI库秒变低代码工具——表单篇（二）子控件](https://juejin.cn/post/7121149988729520158)
* 角色和权限
  * [【低代码】角色和权限的解决方案](https://juejin.cn/post/7121479241102786597/)




## 数据的联动，比如省市区县级联

数据的联动比较简单，可以直接使用 UI 库提供的组件，比如 el-cascader 。所以本篇介绍的不是这个。

如果想自己控制组件的话，问题也不大，使用 watch 监听组件值，然后根据值加载需要的数据，绑定给下级组件即可。

以前要设置事件，或则监听事件，现在Vue提供了响应性的功能，所以我们可以使用监听的方式来实现，个人感觉用监听根方便一些。当然如果您喜欢使用事件，那么也可以。


## 组件的联动

组件的联动是什么样子的？还是用一个动图来描述一下：


![10组件联动演示.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17a6a2870a60471dab5fbc553f4e798f~tplv-k3u1fbpfcp-watermark.image?)

用户选择一个选项后，显示对应的组件，隐藏不需要的组件。

想一想这种情况要如何描述呢？

变量是什么？组件值 —— 需要显示的组件。

好像有办法了。

## 实现方式

先定义json，然后搞定内部代码。表单控件的实现方式可以看这里：[【摸鱼神器】UI库秒变低代码工具——表单篇（一）设计](https://juejin.cn/post/7114847752927838238)

### 定义json的描述方式

```json
"linkageMeta": {
  "90": {
    "1": [90, 101, 100, 102, 103, 104, 105, 106, 107, 108],
    "2": [90, 110, 111, 112],
    "3": [90, 120, 121, 122, 123, 124, 125, 126, 127, 128],
    "4": [90, 130, 131, 132],
    "5": [90, 150, 151, 152, 153],
    "6": [90, 160, 161, 162, 163, 165, 166, 164]
  } 
}

```

* 90 ： 这是 “分类” 组件的编号。
* 1-6： 这是“分类”组件的六个选项值。当然也可以设置其他的值。
* 数组：当用户选择某个选项后，依据数组里的编号显示对应的组件。

### 并不需要手撸

你说啥，全是魔数没法看！不要着急，我也没说要手动处理呀，我们提供了维护工具：


![10组件联动的设置.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5f5d6d0a5c1426da4bf3be3c16bfe3f~tplv-k3u1fbpfcp-watermark.image?)

是不是很直观方便？目前支持选项型的组件，都可以依据选项值设置对应的组件。

### 表单控件内部代码的实现方式

那么这么神奇的功能是如何实现的呢？其实也挺简单的，就是用 watch 监听组件的值，然后根据json里的配置，设置对应的组件的 v-show。

为啥用 v-show？因为想加点动画效果，而动画效果需要使用 v-show 作为判断依据。所以只好用v-show 的方式来控制。

一开始是直接控制 colOrde 数组的。现在要增加 showCol 来记录组件的 v-show 值。

```ts
/**
 * 设置备选项和子控件的联动
 * @param formMeta 表单控件的meta
 * @param model 表单完整的 model
 * @param partModel 表单部分 的 model
 * @returns 
 */
export const setControlShow = (
  formMeta: IFromMeta,
  itemMeta: IFormItemList,
  model: any,
  partModel: any
) => {
  // 获取 配置信息
  const {
    linkageMeta, // 联动的描述
    colOrder // 字段的先后顺序
  } = formMeta
  
  // 设置字段的是否可见（为了加上动画效果）
  const showCol = reactive<ShowCol>({})
  // 依据meta设置，默认都可见
  const setShow = () => {
    if (typeof itemMeta === 'object') {
      for (const key in itemMeta) {
        showCol[key] = true
      }
    }
  }

  // 设置联动
  const setFormColShow = () => {
    setShow()
    // 数据变化，联动组件的显示
    if (typeof linkageMeta === 'object' && Object.keys(linkageMeta).length > 0) {
      // 遍历需要联动的组件
      for (const key in linkageMeta) {
        const ctl = linkageMeta[key] // 触发联动的组件
        const colName = itemMeta[key].formItemMeta.colName // 字段名称
        if (typeof model[colName] !== 'undefined') {
          // 监听 组件的值，有变化就重新设置局部 model
          watch(() => model[colName], (v1, v2) => {
            if (v1 === null) {
              // 清空选项，设为全部可见
              Object.keys(itemMeta).forEach(key => {
                showCol[key] = true
              })
            } else if (typeof ctl[v1] !== 'undefined') {
              // 隐藏表单里全部组件
              Object.keys(itemMeta).forEach(key => {
                showCol[key] = false
              })
              // 显示需要的组件
              ctl[v1].forEach(id => {
                showCol[id] = true
              })
              // 设置部分的 model
              createPartModel(model, partModel, itemMeta, showCol)
            }
          },
          { immediate: true })
        }
      }
      // 监听完整 model 的值的变化，同步值
      if (typeof partModel !== 'undefined') {
        watch(model, () => {
          for (const key in model) {
            if (typeof(partModel[key]) !== 'undefined') {
              partModel[key] = model[key]
            }
          }
        })
      }
    }
  }
  setFormColShow()
   
  return {
    showCol,
    setFormColShow
  }
}
```

这是表单控件里面组件联动部分的代码，简单地说，就是监听组件的值，然后设置其他对应的组件是否可见。


## 两种 model

一般一个表单只需要一个 model，但是现在有了组件的联动，如果还是一个的话，那就不太方便了，所以我们提供了两种 model，方便大家按需选择。

```html
<nf-form
  v-form-drag="formMeta"
  :model="model" // 完整的 model
  :partModel="model2" // 仅显示的组件的 model
  v-bind="formMeta"
></nf-form>
```

### 完整的 model

完整的 model 包含所有的字段，不管显示与否。

```js
model: {
  kind：1,
  text：'文本33',
  area：'多行文本11',
  pwd：'密码222',
  Email：'Email',
  Tel：'13800000000',
  url：'http://www.naturefw.com',
  Search：'Search',
  Autocomplete：'选填',
  Color：'#3D0B0B',
  number1：2,
  number2：3,
  number3：4,
  date：'2022-5-02',
  dateRange1：[],
  datetime：'2022-5-03',
  dateRange2：[],
  month：'2022 03',
  monthR1：'',
  monthR2：'',
  monthR1_monthR2：[],
  year：2023,
  week：'',
  check2：'',
  其他略
}
```


### 仅显示的组件的 model

按照显示的组件组合的而成的 model。

有的时候，我们只需要记录显示的组件对应的值，隐藏起来的组件就不需要了，所以设置了第二种 model。和吧，其实是做维护 json 工具的时候，需要这种功能。


```js
model2: {
  kind：1,
  text：'文本33',
  area：'多行文本11',
  pwd：'密码222',
  Email：'Email',
  Tel：'13800000000',
  url：'http://www.naturefw.com',
  Search：'Search',
  Autocomplete：'选填',
  Color：'#3D0B0B'
}
```



## 维护json工具的组件联动

联动还用一个比较常见的需求，那就是维护JSON工具里面，给组件设置属性的时候。

UI库的组件一般提供了很多的属性，但是组件里的一些属性，并不是同时有效，比如 el-input 的 show-word-limit  只有在 “只在 `type = "text"` 或 `type = "textarea"` 时有效”。

这时候需要有联动的功能，比如这样：


![10组件联动演示2.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87dfd27cb552461f979262daf29d417d~tplv-k3u1fbpfcp-watermark.image?)

当我们选择组件类型的时候，只显示需要属性，避免混乱。


## 使用方式

使用的时候非常简单的，使用工具设置好json文件，然后引入json，绑定属性即可。

比如上面的例子，只需要设置这样的 json 即可：

```json
{
  "formMeta": {
    "moduleId": 1001,
    "formId": 100110,
    "columnsNumber": 1,
    "colOrder": [
      90,
      10103, 10101,10105,
      10106, 10107,
      10001, 10002, 10006,
      10201,
      10801, 10802, 10804, 10803,
      500
    ],
    "linkageMeta": {
      "90": {
        "101": [ 90, 10103,10101,10105, 10106, 10107],
        "100": [ 90, 10103,10101,10105,  10001, 10002, 10006],
        "102": [ 90, 10103,10101, 10201],
        "103": [ 90, 10103,10101,10106, 10107],
        "104": [ 90, 10103,10101,10106, 10107],
        "105": [ 90, 10103,10101],
        "106": [ 90, 10103,10101,10106, 10107],
        "107": [ 90, 10103,10101, 500],
        "108": [ 90, 10801, 10802, 10804]
      }
    },
    "ruleMeta": {}
  },
  "itemMeta": {
    "90": {  
      "formItemMeta": {
        "columnId": 90,
        "colName": "controlType",
        "label": "类型",
        "controlType": 160,
        "defValue": 0,
        "colCount": 1
      },
      "placeholder": "类型",
      "title": "类型",
      "optionList": [
        { "value": 101, "label": "单行文本" },
        { "value": 100, "label": "多行文本" },
        { "value": 102, "label": "密码" },
        { "value": 105, "label": "URL" },
        { "value": 107, "label": "可选" },
        { "value": 108, "label": "颜色" },
        { "value": 106, "label": "查询" },
        { "value": 103, "label": "邮编" },
        { "value": 104, "label": "电话" }
      ]
    },
    "10101": {  
      "formItemMeta": {
        "columnId": 10101,
        "colName": "maxlength",
        "label": "最大输入长度",
        "controlType": 101,
        "defValue": "",
        "colCount": 1
      },
      "title": "最大输入长度",
      "placeholder": "最大输入长度"
    },
    "10103": {  
      "formItemMeta": {
        "columnId": 10103,
        "colName": "readonly",
        "label": "是否只读",
        "controlType": 151,
        "defValue": false,
        "colCount": 1
      },
      "title": "是否只读",
      "placeholder": "是否只读"
    },
    "10105": {
      "formItemMeta": {
        "columnId": 10105,
        "colName": "show-word-limit",
        "label": "显示输入字数",
        "controlType": 151,
        "defValue": false,
        "colCount": 1
      },
      "title": "显示输入字数",
      "placeholder": "显示输入字数"
    },
    "10106": {  
      "formItemMeta": {
        "columnId": 10106,
        "colName": "prefix-icon",
        "label": "前缀",
        "controlType": 107,
        "defValue": "",
        "colCount": 1
      },
      "placeholder": "自定义前缀图标",
      "title": "自定义前缀图标",
      "optionList": [
        { "value": "CloseBold", "label": "" },
        { "value": "Plus", "label": "" },
        { "value": "Star", "label": "" },
        { "value": "UserFilled", "label": "" },
        { "value": "Loading", "label": "" },
        { "value": "Connection", "label": "" },
        { "value": "Edit", "label": "" },
        { "value": "FolderOpened", "label": "" }
      ]
    },
    "10107": {  
      "formItemMeta": {
        "columnId": 10107,
        "colName": "suffix-icon",
        "label": "后缀",
        "controlType": 107,
        "defValue": "",
        "colCount": 1
      },
      "placeholder": "自定义后缀图标",
      "title": "自定义后缀图标",
      "optionList": [
        { "value": "CloseBold", "label": "" },
        { "value": "Plus", "label": "" },
        { "value": "Star", "label": "" },
        { "value": "UserFilled", "label": "" },
        { "value": "Loading", "label": "" },
        { "value": "Connection", "label": "" },
        { "value": "Edit", "label": "" },
        { "value": "FolderOpened", "label": "" }
      ]
    },
    "10201": {
      "formItemMeta": {
        "columnId": 10201,
        "colName": "show-password",
        "label": "显示密码图标",
        "controlType": 151,
        "defValue": "",
        "colCount": 1
      },
      "title": "显示切换密码图标",
      "placeholder": "显示切换密码图标"
    },
    "10001": {
      "formItemMeta": {
        "columnId": 10001,
        "colName": "rows",
        "label": "行数",
        "controlType": 110,
        "defValue": 0,
        "colCount": 1
      },
      "title": "多行文本的行数",
      "placeholder": "多行文本的行数"
    },
    "10002": {  
      "formItemMeta": {
        "columnId": 10002,
        "colName": "autosize",
        "label": "是否自适应",
        "controlType": 151,
        "defValue": false,
        "colCount": 1
      },
      "title": "是否自适应",
      "placeholder": "是否自适应"
    },
    "10003": {  
      "formItemMeta": {
        "columnId": 10003,
        "colName": "autosize",
        "label": "是否自适应",
        "controlType": 101,
        "defValue": "",
        "colCount": 1
      },
      "title": "是否自适应",
      "placeholder": "是否自适应"
    },
    "10006": {  
      "formItemMeta": {
        "columnId": 10006,
        "colName": "resize",
        "label": "缩放",
        "controlType": 107,
        "defValue": "",
        "colCount": 1
      },
      "placeholder": "控制是否能被用户缩放",
      "title": "控制是否能被用户缩放",
      "optionList": [
        { "value": "none", "label": "不行" },
        { "value": "both", "label": "都可" },
        { "value": "horizontal", "label": "横向" },
        { "value": "vertical", "label": "纵向" }
      ]
    },
    "10801": {  
      "formItemMeta": {
        "columnId": 10801,
        "colName": "show-alpha",
        "label": " 支持透明度",
        "controlType": 151,
        "isClear": false,
        "defValue": false,
        "colCount": 1
      },
      "title": " 支持透明度",
      "placeholder": "支持透明度"
    },
    "10802": {  
      "formItemMeta": {
        "columnId": 10802,
        "colName": "color-format",
        "label": " 颜色的格式",
        "controlType": 160,
        "isClear": false,
        "defValue": "",
        "colCount": 1
      },
      "placeholder": "颜色的格式",
      "title": " 颜色的格式",
      "optionList": [
        { "value": "hsl", "label": "hsl" },
        { "value": "hsv", "label": "hsv" },
        { "value": "hex", "label": "hex" },
        { "value": "rgb", "label": "rgb" }
      ]
    },
    "10803": {  
      "formItemMeta": {
        "columnId": 10803,
        "colName": "popper-class",
        "label": " 自定义图标",
        "controlType": 107,
        "isClear": false,
        "defValue": "",
        "colCount": 1
      },
      "placeholder": "自定义图标",
      "title": " 自定义图标",
      "optionList": [
        { "value": "CloseBold", "label": "" },
        { "value": "Plus", "label": "" },
        { "value": "Star", "label": "" },
        { "value": "UserFilled", "label": "" },
        { "value": "Loading", "label": "" },
        { "value": "Connection", "label": "" },
        { "value": "Edit", "label": "" },
        { "value": "FolderOpened", "label": "" }
      ]
    },
    "10804": {  
      "formItemMeta": {
        "columnId": 10804,
        "colName": "predefine",
        "label": " 预定义颜色",
        "controlType": 161,
        "isClear": false,
        "defValue": [],
        "colCount": 1
      },
      "placeholder": "预定义颜色",
      "title": " 预定义颜色",
      "optionList": [
        { "value": "#ff4500", "label": "" },
        { "value": "#ff8c00", "label": "" },
        { "value": "rgba(255, 69, 0, 0.68)", "label": "" },
        { "value": "rgb(255, 120, 0)", "label": "" },
        { "value": "hsv(51, 100, 98)", "label": "" },
        { "value": "hsva(120, 40, 94, 0.5)", "label": "" },
        { "value": "hsl(181, 100%, 37%)", "label": "" },
        { "value": "hsla(209, 100%, 56%, 0.73)", "label": "" }
      ],
      "multiple": true
    },
    "500": {
      "formItemMeta": {
        "columnId": 500,
        "colName": "optionList",
        "label": "备选项",
        "controlType": 170,
        "defValue": [],
        "colCount": 1
      },
      "title": "备选项",
      "placeholder": "备选项"
    }
  }
}
```

内部组件：

```
<template>
  <nf-form
    :model="model"
    :partModel="partModel"
    v-bind="extendFormProps"
  >
  </nf-form>
</template>

<script>
  import { defineComponent, reactive } from 'vue'
  import { getItemState } from '../state-item'
  import myWatch from './controller'

  import item_text from '../json/item-text.json'
 
  export default defineComponent({
    name: 'nf-meta-help-item-extend-test',
    inheritAttrs: false,
    setup(props) {
      // 文本类扩展属性表单，需要的 meta
      const extendFormProps = reactive(item_text)

      // 内部 model
      const state = getItemState()

      const {
        setup,
        model,
        partModel,
      } = myWatch(props)

      setup(model)

      return {
        state,
        model,
        partModel,
        extendFormProps
      }
    }
  })

</script>
```

> 把变化的部分放在 json 里面，不变的抽象为 hook，最后在 setup 里面组合即可。


我正在参与掘金技术社区创作者签约计划招募活动，[点击链接报名投稿](https://juejin.cn/post/7112770927082864653 "https://juejin.cn/post/7112770927082864653")。
