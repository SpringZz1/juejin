---
highlight: agate
theme: channing-cyan
---


# �������������ʵҲ����

�ʹ���ı��ؼ�����������������ʵ������ԣ���������ְ����ܶ�������� el-form �ṩ�˺ܸߵ�����ԣ������������ȽϷ�����������Ҫ�����ҵ�һ�����е㡣

���ȿ��ǵ��Ƿ����ԣ�Ȼ���ȥ��������ԣ�����ֱ���� el-form ���ˡ�

## �������

* ר�� [����Vue3��һ�׵ʹ�������](https://juejin.cn/column/7121319406331756581)
* ��ƪ
  * [��UI���ɵʹ��빤�ߣ�LowCode Ӧ�ó�Ϊ����Ա�Ŀ�������](https://juejin.cn/post/7117071097425559582)
* �б�
  * [������������UI�����LowCode���ߡ����б�ƪ��һ�������ʵ��](https://juejin.cn/post/7105981301416542245)
  * [������������UI�����LowCode���ߡ����б�ƪ������ά��json��С����](https://juejin.cn/post/7119691288185667598)
  * [���ʹ��롿Ϊ�ͻ���Ƹ��Ի��������б�ƪ���ͻ��Լ������������ȣ�](https://juejin.cn/post/7119102542939684877)
* ��
  * [������������UI�����ʹ��빤�ߡ�����ƪ��һ�����](https://juejin.cn/post/7114847752927838238)
  * [������������UI�����ʹ��빤�ߡ�����ƪ�������ӿؼ�](https://juejin.cn/post/7121149988729520158)
* ��ɫ��Ȩ��
  * [���ʹ��롿��ɫ��Ȩ�޵Ľ������](https://juejin.cn/post/7121479241102786597/)




## ���ݵ�����������ʡ�����ؼ���

���ݵ������Ƚϼ򵥣�����ֱ��ʹ�� UI ���ṩ����������� el-cascader �����Ա�ƪ���ܵĲ��������

������Լ���������Ļ�������Ҳ����ʹ�� watch �������ֵ��Ȼ�����ֵ������Ҫ�����ݣ��󶨸��¼�������ɡ�

��ǰҪ�����¼�����������¼�������Vue�ṩ����Ӧ�ԵĹ��ܣ��������ǿ���ʹ�ü����ķ�ʽ��ʵ�֣����˸о��ü���������һЩ����Ȼ�����ϲ��ʹ���¼�����ôҲ���ԡ�


## ���������

�����������ʲô���ӵģ�������һ����ͼ������һ�£�


![10���������ʾ.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17a6a2870a60471dab5fbc553f4e798f~tplv-k3u1fbpfcp-watermark.image?)

�û�ѡ��һ��ѡ�����ʾ��Ӧ����������ز���Ҫ�������

��һ���������Ҫ��������أ�

������ʲô�����ֵ ���� ��Ҫ��ʾ�������

�����а취�ˡ�

## ʵ�ַ�ʽ

�ȶ���json��Ȼ��㶨�ڲ����롣���ؼ���ʵ�ַ�ʽ���Կ����[������������UI�����ʹ��빤�ߡ�����ƪ��һ�����](https://juejin.cn/post/7114847752927838238)

### ����json��������ʽ

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

* 90 �� ���� �����ࡱ ����ı�š�
* 1-6�� ���ǡ����ࡱ���������ѡ��ֵ����ȻҲ��������������ֵ��
* ���飺���û�ѡ��ĳ��ѡ�������������ı����ʾ��Ӧ�������

### ������Ҫ��ߣ

��˵ɶ��ȫ��ħ��û��������Ҫ�ż�����Ҳû˵Ҫ�ֶ�����ѽ�������ṩ��ά�����ߣ�


![10�������������.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5f5d6d0a5c1426da4bf3be3c16bfe3f~tplv-k3u1fbpfcp-watermark.image?)

�ǲ��Ǻ�ֱ�۷��㣿Ŀǰ֧��ѡ���͵����������������ѡ��ֵ���ö�Ӧ�������

### ���ؼ��ڲ������ʵ�ַ�ʽ

��ô��ô����Ĺ��������ʵ�ֵ��أ���ʵҲͦ�򵥵ģ������� watch ���������ֵ��Ȼ�����json������ã����ö�Ӧ������� v-show��

Ϊɶ�� v-show����Ϊ��ӵ㶯��Ч����������Ч����Ҫʹ�� v-show ��Ϊ�ж����ݡ�����ֻ����v-show �ķ�ʽ�����ơ�

һ��ʼ��ֱ�ӿ��� colOrde ����ġ�����Ҫ���� showCol ����¼����� v-show ֵ��

```ts
/**
 * ���ñ�ѡ����ӿؼ�������
 * @param formMeta ���ؼ���meta
 * @param model �������� model
 * @param partModel ������ �� model
 * @returns 
 */
export const setControlShow = (
  formMeta: IFromMeta,
  itemMeta: IFormItemList,
  model: any,
  partModel: any
) => {
  // ��ȡ ������Ϣ
  const {
    linkageMeta, // ����������
    colOrder // �ֶε��Ⱥ�˳��
  } = formMeta
  
  // �����ֶε��Ƿ�ɼ���Ϊ�˼��϶���Ч����
  const showCol = reactive<ShowCol>({})
  // ����meta���ã�Ĭ�϶��ɼ�
  const setShow = () => {
    if (typeof itemMeta === 'object') {
      for (const key in itemMeta) {
        showCol[key] = true
      }
    }
  }

  // ��������
  const setFormColShow = () => {
    setShow()
    // ���ݱ仯�������������ʾ
    if (typeof linkageMeta === 'object' && Object.keys(linkageMeta).length > 0) {
      // ������Ҫ���������
      for (const key in linkageMeta) {
        const ctl = linkageMeta[key] // �������������
        const colName = itemMeta[key].formItemMeta.colName // �ֶ�����
        if (typeof model[colName] !== 'undefined') {
          // ���� �����ֵ���б仯���������þֲ� model
          watch(() => model[colName], (v1, v2) => {
            if (v1 === null) {
              // ���ѡ���Ϊȫ���ɼ�
              Object.keys(itemMeta).forEach(key => {
                showCol[key] = true
              })
            } else if (typeof ctl[v1] !== 'undefined') {
              // ���ر���ȫ�����
              Object.keys(itemMeta).forEach(key => {
                showCol[key] = false
              })
              // ��ʾ��Ҫ�����
              ctl[v1].forEach(id => {
                showCol[id] = true
              })
              // ���ò��ֵ� model
              createPartModel(model, partModel, itemMeta, showCol)
            }
          },
          { immediate: true })
        }
      }
      // �������� model ��ֵ�ı仯��ͬ��ֵ
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

���Ǳ��ؼ���������������ֵĴ��룬�򵥵�˵�����Ǽ��������ֵ��Ȼ������������Ӧ������Ƿ�ɼ���


## ���� model

һ��һ����ֻ��Ҫһ�� model��������������������������������һ���Ļ����ǾͲ�̫�����ˣ����������ṩ������ model�������Ұ���ѡ��

```html
<nf-form
  v-form-drag="formMeta"
  :model="model" // ������ model
  :partModel="model2" // ����ʾ������� model
  v-bind="formMeta"
></nf-form>
```

### ������ model

������ model �������е��ֶΣ�������ʾ���

```js
model: {
  kind��1,
  text��'�ı�33',
  area��'�����ı�11',
  pwd��'����222',
  Email��'Email',
  Tel��'13800000000',
  url��'http://www.naturefw.com',
  Search��'Search',
  Autocomplete��'ѡ��',
  Color��'#3D0B0B',
  number1��2,
  number2��3,
  number3��4,
  date��'2022-5-02',
  dateRange1��[],
  datetime��'2022-5-03',
  dateRange2��[],
  month��'2022 03',
  monthR1��'',
  monthR2��'',
  monthR1_monthR2��[],
  year��2023,
  week��'',
  check2��'',
  ������
}
```


### ����ʾ������� model

������ʾ�������ϵĶ��ɵ� model��

�е�ʱ������ֻ��Ҫ��¼��ʾ�������Ӧ��ֵ����������������Ͳ���Ҫ�ˣ����������˵ڶ��� model���Ͱɣ���ʵ����ά�� json ���ߵ�ʱ����Ҫ���ֹ��ܡ�


```js
model2: {
  kind��1,
  text��'�ı�33',
  area��'�����ı�11',
  pwd��'����222',
  Email��'Email',
  Tel��'13800000000',
  url��'http://www.naturefw.com',
  Search��'Search',
  Autocomplete��'ѡ��',
  Color��'#3D0B0B'
}
```



## ά��json���ߵ��������

��������һ���Ƚϳ����������Ǿ���ά��JSON�������棬������������Ե�ʱ��

UI������һ���ṩ�˺ܶ�����ԣ�����������һЩ���ԣ�������ͬʱ��Ч������ el-input �� show-word-limit  ֻ���� ��ֻ�� `type = "text"` �� `type = "textarea"` ʱ��Ч����

��ʱ����Ҫ�������Ĺ��ܣ�����������


![10���������ʾ2.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87dfd27cb552461f979262daf29d417d~tplv-k3u1fbpfcp-watermark.image?)

������ѡ��������͵�ʱ��ֻ��ʾ��Ҫ���ԣ�������ҡ�


## ʹ�÷�ʽ

ʹ�õ�ʱ��ǳ��򵥵ģ�ʹ�ù������ú�json�ļ���Ȼ������json�������Լ��ɡ�

������������ӣ�ֻ��Ҫ���������� json ���ɣ�

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
        "label": "����",
        "controlType": 160,
        "defValue": 0,
        "colCount": 1
      },
      "placeholder": "����",
      "title": "����",
      "optionList": [
        { "value": 101, "label": "�����ı�" },
        { "value": 100, "label": "�����ı�" },
        { "value": 102, "label": "����" },
        { "value": 105, "label": "URL" },
        { "value": 107, "label": "��ѡ" },
        { "value": 108, "label": "��ɫ" },
        { "value": 106, "label": "��ѯ" },
        { "value": 103, "label": "�ʱ�" },
        { "value": 104, "label": "�绰" }
      ]
    },
    "10101": {  
      "formItemMeta": {
        "columnId": 10101,
        "colName": "maxlength",
        "label": "������볤��",
        "controlType": 101,
        "defValue": "",
        "colCount": 1
      },
      "title": "������볤��",
      "placeholder": "������볤��"
    },
    "10103": {  
      "formItemMeta": {
        "columnId": 10103,
        "colName": "readonly",
        "label": "�Ƿ�ֻ��",
        "controlType": 151,
        "defValue": false,
        "colCount": 1
      },
      "title": "�Ƿ�ֻ��",
      "placeholder": "�Ƿ�ֻ��"
    },
    "10105": {
      "formItemMeta": {
        "columnId": 10105,
        "colName": "show-word-limit",
        "label": "��ʾ��������",
        "controlType": 151,
        "defValue": false,
        "colCount": 1
      },
      "title": "��ʾ��������",
      "placeholder": "��ʾ��������"
    },
    "10106": {  
      "formItemMeta": {
        "columnId": 10106,
        "colName": "prefix-icon",
        "label": "ǰ׺",
        "controlType": 107,
        "defValue": "",
        "colCount": 1
      },
      "placeholder": "�Զ���ǰ׺ͼ��",
      "title": "�Զ���ǰ׺ͼ��",
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
        "label": "��׺",
        "controlType": 107,
        "defValue": "",
        "colCount": 1
      },
      "placeholder": "�Զ����׺ͼ��",
      "title": "�Զ����׺ͼ��",
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
        "label": "��ʾ����ͼ��",
        "controlType": 151,
        "defValue": "",
        "colCount": 1
      },
      "title": "��ʾ�л�����ͼ��",
      "placeholder": "��ʾ�л�����ͼ��"
    },
    "10001": {
      "formItemMeta": {
        "columnId": 10001,
        "colName": "rows",
        "label": "����",
        "controlType": 110,
        "defValue": 0,
        "colCount": 1
      },
      "title": "�����ı�������",
      "placeholder": "�����ı�������"
    },
    "10002": {  
      "formItemMeta": {
        "columnId": 10002,
        "colName": "autosize",
        "label": "�Ƿ�����Ӧ",
        "controlType": 151,
        "defValue": false,
        "colCount": 1
      },
      "title": "�Ƿ�����Ӧ",
      "placeholder": "�Ƿ�����Ӧ"
    },
    "10003": {  
      "formItemMeta": {
        "columnId": 10003,
        "colName": "autosize",
        "label": "�Ƿ�����Ӧ",
        "controlType": 101,
        "defValue": "",
        "colCount": 1
      },
      "title": "�Ƿ�����Ӧ",
      "placeholder": "�Ƿ�����Ӧ"
    },
    "10006": {  
      "formItemMeta": {
        "columnId": 10006,
        "colName": "resize",
        "label": "����",
        "controlType": 107,
        "defValue": "",
        "colCount": 1
      },
      "placeholder": "�����Ƿ��ܱ��û�����",
      "title": "�����Ƿ��ܱ��û�����",
      "optionList": [
        { "value": "none", "label": "����" },
        { "value": "both", "label": "����" },
        { "value": "horizontal", "label": "����" },
        { "value": "vertical", "label": "����" }
      ]
    },
    "10801": {  
      "formItemMeta": {
        "columnId": 10801,
        "colName": "show-alpha",
        "label": " ֧��͸����",
        "controlType": 151,
        "isClear": false,
        "defValue": false,
        "colCount": 1
      },
      "title": " ֧��͸����",
      "placeholder": "֧��͸����"
    },
    "10802": {  
      "formItemMeta": {
        "columnId": 10802,
        "colName": "color-format",
        "label": " ��ɫ�ĸ�ʽ",
        "controlType": 160,
        "isClear": false,
        "defValue": "",
        "colCount": 1
      },
      "placeholder": "��ɫ�ĸ�ʽ",
      "title": " ��ɫ�ĸ�ʽ",
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
        "label": " �Զ���ͼ��",
        "controlType": 107,
        "isClear": false,
        "defValue": "",
        "colCount": 1
      },
      "placeholder": "�Զ���ͼ��",
      "title": " �Զ���ͼ��",
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
        "label": " Ԥ������ɫ",
        "controlType": 161,
        "isClear": false,
        "defValue": [],
        "colCount": 1
      },
      "placeholder": "Ԥ������ɫ",
      "title": " Ԥ������ɫ",
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
        "label": "��ѡ��",
        "controlType": 170,
        "defValue": [],
        "colCount": 1
      },
      "title": "��ѡ��",
      "placeholder": "��ѡ��"
    }
  }
}
```

�ڲ������

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
      // �ı�����չ���Ա�����Ҫ�� meta
      const extendFormProps = reactive(item_text)

      // �ڲ� model
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

> �ѱ仯�Ĳ��ַ��� json ���棬����ĳ���Ϊ hook������� setup ������ϼ��ɡ�


�����ڲ�����������������ǩԼ�ƻ���ļ���[������ӱ���Ͷ��](https://juejin.cn/post/7112770927082864653 "https://juejin.cn/post/7112770927082864653")��
