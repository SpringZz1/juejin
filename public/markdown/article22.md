�������������ٳɳ��������Ҳ��롸������¼ƻ� �� 6 �¸�����ս���ĵ�21�죬[����鿴�����](https://juejin.cn/post/7099702781094674468 "https://juejin.cn/post/7099702781094674468")

## ǰ��

С����Ǻã����Ǵ峤��Vue����������Դ�뼶��⡷ϵ�����µ� 44 �⣬ǰ���������Ŀ�ϼ��ڴˣ� [��ʱһ���£�2.6W�֣�50+Vue����������Դ�뼶��⣬��ֵ���ղأ�](https://juejin.cn/post/7097067108663558151 "https://juejin.cn/post/7097067108663558151")

## ѧϰȺ

����֯��һ������ѧϰȺ����ע�峤���ں�`�峤ѧǰ��`���ظ�����Ⱥ�������һ���~

## ���ѧϰ��Դ

��ϵ����`������Ƶ`��`˼ά��ͼ`��`��Դ��Ŀ`�����ѧϰͬʱǧ��Ҫ����`����` + `��ע` + `����`���е��Ǻ�ˮ�����ھ���~

-   ��Ƶ�̳̣�[56������Vue���������](https://link.juejin.cn?target=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV11i4y1Q7H2%2F "https://link.juejin.cn?target=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV11i4y1Q7H2%2F")
-   ˼ά��ͼ��[Vue����ר��](https://link.juejin.cn?target=https%3A%2F%2Fwww.processon.com%2Fview%2Flink%2F620c4de01efad406e72b891f%23map "https://link.juejin.cn?target=https%3A%2F%2Fwww.processon.com%2Fview%2Flink%2F620c4de01efad406e72b891f%23map")
-   ���״��룺[vue-interview](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2F57code%2Fvue-interview "https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2F57code%2Fvue-interview")


## Vue-router ���� router-link ��ôʵ����ת

### ����

vue-router���������ַ�ʽ��`����ʽ����`��`��̷�ʽ����`

---

### ����

����ʽ����

```html
<router-link to="/about">Go to About</router-link>
```

��̵���

```js
// literal string path
router.push('/users/eduardo')

// object with path
router.push({ path: '/users/eduardo' })

// named route with params to let the router build the url
router.push({ name: 'user', params: { username: 'eduardo' } })
```

---

### ˼·

- ���ַ�ʽ
- �ֱ����ʹ�÷�ʽ
- �����ѡ��
- ԭ��˵��

---

### �ش���

- vue-router���������ַ�ʽ��`����ʽ����`��`��̷�ʽ����`
- ����ʽ������ʽʹ��`router-link`��������to���Ե�������̷�ʽ�����������ɴ��ݵ���router.push()��������path�ַ�������RouteLocationRaw����ָ��path��name��params����Ϣ
- ���ҳ���м򵥱�ʾ��ת���ӣ�ʹ��router-link���ݣ�����Ⱦһ��a��ǩ�����ҳ���Ǹ����ӵ����ݣ�������Ʒ��Ϣ��������ӵ���¼���ʹ�ñ��ʽ����
- ʵ�����ڲ����ߵ��õĵ���������һ����

---

### ֪������Ȼ

https://github1s.com/vuejs/router/blob/HEAD/src/RouterLink.ts#L240-L241

routerlink�����ת�����õ���navigate����

![image-20220626173129790](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f211b6c61fb14c08aff6eea0de8bf0b2~tplv-k3u1fbpfcp-zoom-1.image)

navigate�ڲ���Ȼ���õ�push

![image-20220626173217861](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d98398bf8ff4817a2812aff65fcdfd2~tplv-k3u1fbpfcp-zoom-1.image)
