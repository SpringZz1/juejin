---
theme: Chinese-red
highlight: a11y-dark
---
> ��Ҫ����**������ô���ܡ�**��������**��Ϊʲô���ܡ�**

��Һã�����**��˾�**��

���죬������̸̸���������**�ؼ���Ⱦ·��**������������һЩ�������£�����ǰ���н��ܡ��ֱ��*������ܹ�*��*���µ���Ⱦ����*�����˹���ҳ����Ⱦ����ظ����Ӧ�������¡�

- [ҳ����������ɵ�(��۽Ƕ�)](https://mp.weixin.qq.com/s/Vf1LLeYVNleC6DXq36p8KA)
- [Chromium ������Ⱦ����--RenderingNG](https://mp.weixin.qq.com/s/_IHUqb7hc5NrFCnBmid8ew)
- [RenderingNG�йؼ����ݽṹ�����ɫ](https://mp.weixin.qq.com/s/2JA6IX3Jz-Sad5E0xQimSQ)


�������������<span style="font-weight:800;color:#FFA500;font-size:18px">{�ؼ���Ⱦ·��| Critical Rendering Path}</span>������Ӱ��ҳ����**����**�׶ε���Ҫ��׼��

�����ن���һ�㣬ͨ��һ��ҳ����**�����׶�**
1. **���ؽ׶�**
	- ��ָ��**����������Ⱦ������ҳ��**�Ĺ���
   - Ӱ�쵽����׶ε���Ҫ������**����**�� **JavaScript �ű�**
2. **�����׶�**
	 - ��Ҫ�Ǵ�ҳ�������ɵ�**�û�����**����������
   - Ӱ�쵽����׶ε���Ҫ������ **JavaScript �ű�**
3. **�رս׶�**
	- ��Ҫ���û������ر�ָ���ҳ��������һЩ**�������**

���ˣ�ʱ�䲻���ˡ����ɡ�

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f52fb616f6645ef9c91c84993cba02a~tplv-k3u1fbpfcp-zoom-1.image)



### ������ѧ����֪ʶ��
> 1. �ؼ���Ⱦ·���ĸ���ָ��
> 1. <span style="font-weight:800;color:#FFA500;font-size:18px">{�ؼ���Դ| Critical Resource}</span>�����п���**�谭ҳ����Ⱦ**����Դ
> 2. <span style="font-weight:800;color:#FFA500;font-size:18px">{�ؼ�·������|Critical Path Length}</span>����ȡ����ҳ����������йؼ���Դ����� **RTT**��Round Trip Time��
>3. <span style="font-weight:800;color:#FFA500;font-size:18px">{�ؼ��ֽ�| Critical Bytes}</span>����Ϊ��ɺ͹���ҳ���һ���ֶ������**�ֽ�����**��
> 4. ����HTTP����
> 5. ��Թؼ���Ⱦ·�����и����Ż�����
> 6. ���`React`Ӧ�����Ż�����


---

# 1. ���ؽ׶ιؼ�����
## <span style="font-weight:800;color:#FFA500;font-size:18px">{�ĵ�����ģ��| Document Object Model}</span>

> **DOM**:��`HTML`ҳ���ڽ����󣬻��ڶ���ı�����ʽ��

*DOM*��һ��Ӧ�ñ�̽ӿڣ�API����ͨ��������ʾ�ĵ�����,��һ��**������ƽ̨������**�ķ�ʽ���ʺ��޸�һ��ҳ������ݺͽṹ��

�� `HTML` �ĵ��У�Web�����߿���ʹ��`JS`��CRUD DOM �ṹ������Ҫ��Ŀ����**��̬**�ı�HTML�ĵ��Ľṹ��

>**DOM ������`HTML`ҳ�����Ϊһ��ֲ�ڵ�**

**DOM ����ֻ��ͨ�� JS ����**, ��<span style="font-weight:700;color:green;">{������ʸ��ͼ| SVG}</span>��<span style="font-weight:700;color:green;">{��ѧ�������| MathML}</span>��<span style="font-weight:700;color:green;">{ͬ����ý�弯������| SMIL}</span>�������˸����Զ��е� `DOM` �����ͽӿڡ�


**һ��HTML���������ͻὨ��һ��DOM��**��

����Ĵ�������������`header`��`main`��`footer`������`style.css`Ϊ*�ⲿ�ļ�*��


```html
<html>
  <head>
      <link rel="stylesheet" href="style.css">
      <title>�ؼ���Ⱦ·��ʾ��</title>
  </head>
  <body>
    <header>
      <h1>...</h1>
      <p>...</p>
    </header>
    <main>
         <h1>...</h1>
         <p>...</p>
    </main>
    <footer>
         <small>...</small>
    </footer>
  </body> 
</html>
```
������ `HTML` ���뱻���������Ϊ `DOM��`״�ṹʱ��������ڵ�Ĺ�ϵ���¡�

![DOM��](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81f515504d684e13bbe9760e3e6b8299~tplv-k3u1fbpfcp-zoom-1.image)

ÿ���������**��ҪһЩʱ�����HTML**�����ң�**������������**�����ڼ������������HTML�����ʱ�䡣(���������ߴ���������ǣ�����Ҫ���������*������*ȥ�������ж�)

���壬���������ν�`HTML`�ַ�����Ϣ��ת�����ܹ���JS������`DOM`���󣬲��ڴ��ĵ����۷�Χ�ڡ����������ǿ��Ծ�һ����С�����ӡ�������[JS�㷨̽��֮ջ(Stack)](https://mp.weixin.qq.com/s/doLwCZ1v4dKUDhMtcDf7UA)�У���һ�������*����ж����ŵ���ȷ��*��

>����һ��ֻ���� '('��')'��'{'��'}'��'[',']' ���ַ��� s ���ж��ַ����Ƿ���Ч�� ��Ч�ַ��������㣺<br>
>�����ű�������ͬ���͵������űպϡ�<br>
>�����ű�������ȷ��˳��պϡ�<br>
>ʾ����<br>
>���룺s = "()[]{}" �����true <br>
>���룺s = "(]" �����false

��ʵ����������Ӿ�����򵥵�һ�ֱ�ǩƥ�䡣����˵�����׵㣬���ǵ���Ҫ˼����һ�µġ�

---
## CSSOM Tree
>`CSSOM`Ҳ��һ�����ڶ����������**��������DOM����ص���ʽ**��

�н����ģ����������к�����`HTML`���׵�`CSS`��ʽ��

```css
header{
   background-color: white;
   color: black;
}
p{
   font-weight:400;
}
h1{
   font-size:72px;
}
small{
   text-align:left
}
```
��������CSS������`CSSOM��`����ʾ���¡�

![CSSOM��](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/987229b176f14d50ad7a821f9d09cc7b~tplv-k3u1fbpfcp-zoom-1.image)

���ڣ�`css`�Ĳ��������ܹ���**�̳�**�����ԣ��ڸ����ڵ㶨������ԣ��������������ӽڵ�Ҳ�ǻ��ж�Ӧ��������Ϣ����󽫶�Ӧ����ʽ��Ϣ����Ⱦ��ҳ���ϡ�

>һ����˵��CSS����Ϊ��һ��<span style="font-weight:800;color:#FFA500;font-size:18px">{��Ⱦ���| Render-Blocking}</span>��Դ��

ʲô��**��Ⱦ���**����Ⱦ������Դ��һ��*���*������**�������������Ⱦ����DOM����ֱ����������Դ����ȫ����**��<br>`CSS` ��һ����Ⱦ�����Դ����Ϊ��CSS��ȫ����֮ǰ�����޷���Ⱦ����

*�����ҳ��������`CSS`��Ϣ���������һ���ļ���* �����ڣ�������Աͨ��һЩ�����ֶΣ��ܹ���`CSS`�ļ�**�ָ�**������**ֻ����Ⱦ�����ڽ׶��ṩ�ؼ���ʽ**��

---
## ִ��JS

�Ƚ�һ��С֪ʶ�㣬��ʵ����ǰ��������У������Ѿ������ˡ���������ن���һ�顣

��**�����������**��`JS = ECMAScript + DOM + BOM`��
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60652c6726d441faa9ad7b087c8fb864~tplv-k3u1fbpfcp-zoom-1.image)

### ECMAScript
JS��**���Ĳ���**���� *ECMA-262* ��������ԣ����������� Web �������

`Web` �����ֻ�� `ECMAScript` ʵ�ֿ��ܴ��ڵ�һ��<span style="font-weight:800;color:#FFA500;font-size:18px">{��������| Host Environment}</span>�������������ṩ `ECMAScript` ��**��׼ʵ��**����**�����������������չ**��(���� `DOM` ʹ�� `ECMAScript` �������ͺ��﷨���ṩ�ض��ڻ����Ķ��⹦��)��

�����ǱȽϳ�����*Web �����*�� *Node.js*���Ѿ�����̭�� *Adobe Flash*����`ECMA`������������

`ECMAScript` ֻ�Ƕ�ʵ��*ECMA-262*�淶��һ�����Եĳƺ��� `JS` ʵ���� `ECMAScript`��`Adobe ActionScript` Ҳʵ�� `ECMAScript`��

���������ֻ����һ��֪ʶ��Ĳ��䣬������ƪ�����г��ֵ�`JS`����һ�������ϵĺ��壺��`javascript`�ı���Ϣ��

----


**`JavaScript` ��һ����������`DOM`������**����Щ**��������ʱ��**����������վ������*����ʱ��*�����У�

>`JavaScript` ���뱻��Ϊ <span style="font-weight:800;color:#FFA500;font-size:18px">{����������| Parser Blocking}</span>��Դ��

ʲô��**����������**������Ҫ**����**��**ִ��**`JavaScript`����ʱ���������**��ִͣ�к͹���DOM��**����JavaScript���뱻ִ�����DOM���Ĺ����ż������С�

���Բ��У� **`JavaScript`��һ�ְ������Դ**��˵����

---
## ʾ����ʾ
������һ��`HTML`�������ʾ�������ʾ��һЩ���ֺ�ͼƬ���������������ģ�**����ҳ�����ʾֻ���˴�Լ40ms**����ʹ��һ��ͼƬ��ҳ����ʾ��ʱ��Ҳ���̡�������Ϊ�ڽ���*��һ�λ���*ʱ��**ͼ��û�б������ؼ���Դ**��

��ס��
><span style="font-weight:800;color:#FFA500;font-size:18px">{�ؼ���Ⱦ·��| Critical Rendering Path}</span>����**����`HTML`��`CSS`��`Javascript`��**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22e61e85c3d84cda86ce3f71c385ccd9~tplv-k3u1fbpfcp-zoom-1.image)

���ڣ�����δ��������`css`��������ͼ��ʾ��һ��**��������󱻴���**�ˡ����ܼ���`html`�ļ���ʱ������ˣ����������ʾҳ�������ʱ��ȴ�����˽�10����Ϊʲô�أ�
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57dbcd88627e4d5eac7e3cfa0b3fb3a5~tplv-k3u1fbpfcp-zoom-1.image)

- ��ͨ��`HTML`�����漰̫���*��Դ��ȡ*��*��������*�����ǣ�**����CSS�ļ������빹��һ��CSSOM**��`HTML` �� `DOM` �� `CSS` �� `CSSOM` �����뱻��������������һ����ʱ�Ĺ��̡�

- `JavaScript` ���п��ܻ��ѯ `CSSOM`������ζ�ţ�**��ִ���κ�JavaScript֮ǰ��CSS�ļ����뱻��ȫ���غͽ���**��

**ע��**��`domContentLoaded` ��`HTML DOM`��**��ȫ�����ͼ���ʱ������**�����¼�����ȴ�`image`����`frame`��������ʽ����ȫ���ء�**Ψһ��Ŀ�����ĵ�������**��������`window`������¼����Բ鿴DOM�Ƿ񱻽����ͼ��ء�

```javascript
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM�������Ҽ��سɹ�');
});
```
��ʹ��ѡ����*�����ű�ȡ���ⲿ�ļ�*������Ҳ�����д�ĸı䡣��Ҫ����Ϊ��Ҫ����`CSSOM`������㿼��ʹ���ⲿ�ű���������� `async`���ԡ��⽫*����Խ����������*��

---
# �ؼ�·���������

- <span style="font-weight:800;color:#FFA500;font-size:18px">{�ؼ���Դ| Critical Resource}</span>�����п���**�谭ҳ����Ⱦ**����Դ
- <span style="font-weight:800;color:#FFA500;font-size:18px">{�ؼ�·������|Critical Path Length}</span>����ȡ����ҳ����������йؼ���Դ����� **RTT**��Round Trip Time��
  - ��ʹ�� `TCP` Э�鴫��һ���ļ�ʱ������ `TCP` �����ԣ�������ݲ�����һ�δ��䵽����˵ģ�������Ҫ��ֳ�һ�������ݰ����ض�ν��д����
  - `RTT` ���������**����ʱ��**
    - ����������һ��*��Ҫ������ָ��*��ʾ�ӷ��Ͷ˷������ݿ�ʼ�������Ͷ��յ����Խ��ն˵�ȷ�ϣ�**�ܹ�������ʱ��**
  - ͨ�� 1 �� `HTTP` �����ݰ��� `14KB` ����
    - ���������� `HTML` ��Դ�������С�� `6KB`��С�� `14KB`������ 1 �� RTT �Ϳ��Խ��
  - ���� `JavaScript` �� `CSS` �ļ�
    - ������Ⱦ������һ��**Ԥ�������߳�**,�ڽ��յ� `HTML` ����֮��,Ԥ�����̻߳�**����ɨ�� `HTML` �����еĹؼ���Դ**,һ��ɨ�赽�ˣ�������������
    - ������Ϊ `JavaScript` �� `CSS` ��**ͬʱ��������**��,�������ǵ�**�������ص���**���������ǵ� RTT ʱ,**ֻ��Ҫ������������Ǹ�����**�Ϳ�����
    
- <span style="font-weight:800;color:#FFA500;font-size:18px">{�ؼ��ֽ�| Critical Bytes}</span>����Ϊ��ɺ͹���ҳ���һ���ֶ������**�ֽ�����**��


�����ǵĵ�һ�������У������*��ͨ��HTML�ű�*���������ָ���ֵ����
- 1���ؼ���Դ(`html`)
- 1��RTT
- 192�ֽڵ�����

�ڵڶ��������У�һ��*��ͨ��HTML���ⲿCSS�ű�*���������ָ���ֵ����
- 2���ؼ���Դ(`html`+`css`)
- 2��RTT
- 400�ֽڵ�����


�����ϣ���Ż��κο���еĹؼ���Ⱦ·��������Ҫ������ָ�����¹��򲢼��ԸĽ���

>- �Ż��ؼ���Դ
>    - �� `JavaScript` �� `CSS` �ĳ���������ʽ �������������Ǻܴ�
>    - ��� `JavaScript` ����û�� `DOM` ���� `CSSOM` �Ĳ���,����Ըĳ� `sync` ���� `defer` ����
>    - �������ݿ������ȼ��أ����������ݲ���**��������**
>- �Ż��ؼ�·������
>   - **ѹ��** `CSS` �� `JavaScript` ��Դ
>   - �Ƴ� `HTML`��`CSS`��`JavaScript` �ļ���һЩ**ע������**
>- �Ż��ؼ��ֽ�
>   - ͨ�����ٹؼ���Դ��**����**�ͼ��ٹؼ���Դ��**��С**������ʵ��
>   - ʹ�� `CDN` ������ÿ�� `RTT` ʱ��

---
# ������Ⱦ��������Դ
## ������

���صĹؼ��� "������"���κ�ý����Դ��`CSS`��`JavaScript`��ͼ������`HTML`�����Ա������ء�ÿ�μ���**���޵�ҳ�������**��������߹ؼ���Ⱦ·����

- ��Ҫ�ڼ���ҳ��ʱ�����������ҳ��� `CSS`��`JavaScript` �� `HTML`��
- �෴������Ϊһ��`button`���һ���¼�������ֻ�����û������ťʱ�ż��ؽű���
- ʹ��`Webpack`����������ع��ܡ�

������һЩ���ô�JavaScriptʵ�������صļ�����

���磬������һ��`<img/>/<iframe/>` ����Щ����£����ǿ�������`<img>`��`<iframe>`��ǩ**������Ĭ��`loading`����**������������������ǩʱ������**�Ƴټ���**`iframe`��`image`�������﷨���£�


```html
<img src="image.png" loading="lazy">
<iframe src="abc.html" loading="lazy"></iframe>
```

ע�⣺`loading=lazy`�������ز�Ӧ�����ڷǹ�����ͼ�ϡ�

��������`loading=lazy`��������У������ʹ��`IntersectionObserver`�����API������һ��������Ϊÿ��Ԫ�صĿɼ��������˸��ı��ʡ���һ��Ԫ�����ӿ����ǿɼ��ģ����ͻᱻ���ء�

>`IntersectionObserverEntry` �����ṩĿ��Ԫ�ص���Ϣ��һ�����������ԡ�
>ÿ�����Եĺ������¡�
>- `time`���ɼ��Է����仯��ʱ�䣬��һ���߾���ʱ�������λΪ����
>- `target`�����۲��Ŀ��Ԫ�أ���һ�� `DOM` �ڵ����
>- `rootBounds`����Ԫ�صľ����������Ϣ��`getBoundingClientRect()`�����ķ���ֵ�����û�и�Ԫ�أ���ֱ��������ӿڹ��������򷵻�null
>- `boundingClientRect`��Ŀ��Ԫ�صľ����������Ϣ
>- `intersectionRect`��Ŀ��Ԫ�����ӿڣ����Ԫ�أ��Ľ����������Ϣ
>- `intersectionRatio`��Ŀ��Ԫ�صĿɼ���������`intersectionRect`ռ`boundingClientRect`�ı�����**��ȫ�ɼ�ʱΪ1����ȫ���ɼ�ʱС�ڵ���0**


- ���ǹ۲����о���`.lazy`���Ԫ�ء�
- ������`.lazy`���Ԫ�����ӿ���ʱ��**�ཻ�ʻή��������**������ཻ��Ϊ�������㣬˵��Ŀ�겻���ӿ��ڡ����ң�����Ҫ��ʲô��

```javascript
var intersectionObserver = new IntersectionObserver(function(entries) {
  if (entries[0].intersectionRatio <= 0) return;

  //intersection ratio ��0�ϣ�˵�����ӿ����ܿ���
  console.log('���м��ش���');
});
// ���Ŀ��DOM���д���
intersectionObserver.observe(document.querySelector('.lazy));
```
---
## Async, Defer, Preload

**ע��**��`Async` �� `Defer` �������ⲿ�ű������ԡ�

### ʹ��Async����ű�

��ʹ�� `Async` ʱ������������������� `JavaScript` ��Դʱ���������顣**һ���������**�����ص�`JavaScript`��Դ����ִ�С�

1. `JavaScript` ��**�첽����**�ġ�
2. ���������ű���ִ�н�����ͣ��
3. DOM��Ⱦ��ͬʱ������
4. **DOM��Ⱦ��ֻ�ڽű�ִ��ʱ��ͣ**��
5. ��Ⱦ������JavaScript�������ʹ��`async`�����������

**���һ����Դ����Ҫ��������Ҫʹ��async����ȫʡ����**


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58dba93cf7d44c50ae9a20a5e6164a6a~tplv-k3u1fbpfcp-zoom-1.image)


```html
<p>...ִ�нű�֮ǰ���ܿ���������...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ���������!"));
</script>

<script async src=""></script>

<p>...�����ű�ִ���꣬���ܿ��������� ...</p>
```
### ʹ��Defer����ű�

��ʹ��`Defer`ʱ��`JavaScript` ��Դ����HTML��Ⱦʱ�����ء�Ȼ����**ִ�в����ڽű������غ������������෴������ȴ�HTML�ļ�����ȫ��Ⱦ**��


1. �ű���ִ��ֻ��������Ⱦ���֮��
2. `Defer` ����ʹ���JavaScript��Դ���Բ��������Ⱦ


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/021ef8c8064e4f139611a735033de7f3~tplv-k3u1fbpfcp-zoom-1.image)


```html
<p>...ִ�нű�֮ǰ���ܿ���������...</p>

<script defer src=""></script>

<p>...�����ݲ���js��������Ҳ����˵����������...</p>
```

### ʹ��Prelaod�����ⲿ��Դ

��ʹ��`Preload`ʱ����������HTML�ļ���û�е��ļ���������Ⱦ�����JavaScript��CSS�ļ���ʱ������`Preload`��������ͻ�������Դ������Դ���õ�ʱ��ͻ�ִ�С�

- ʹ��`Prelaod`��������������ļ�����ʹ�������ҳ�����ǲ���Ҫ�ġ�
- ̫���Ԥ�ػ�ʹ���ҳ���ٶ��½���
- ����̫���Ԥ���ļ�ʱ��ʹ��Ԥ�صĹ�������Ȩ���ܵ�Ӱ�졣
- **ֻ��������ҳ����Ҫ���ļ��ſ���Ԥ��**��
- Ԥ���ļ����������ļ�����Ⱦʱ�Żᱻ���֡����磬����һ��`CSS`�ļ������һ����������á���CSS�ļ�������֮ǰ��������Ĵ��ڲ��ᱻ֪������������屻��ǰ���أ�������������վ�ٶȡ�
- **Ԥ����ֻ����`<link>`��ǩ**��


```html
<link rel="preload" href="style.css" as="style">
<link rel="preload" href="main.js" as="script">
```

----
## ��дԭ��(Vanilla) JS������ʹ�õ������ű�
ԭ�� JSӵ�кܺõ����ܺͿɷ����ԡ�����һ���ض����������㲻��Ҫȫ�̵������������ű�����Ȼ��Щ�������ܽ��һ�����⣬�����������صĿ�������򵥵�����ᵼ����Ĵ��������½���

**���ǵ�Ҫ���Ǳ���ʹ�ÿ�ܺͱ�д100%���´��롣���ǵ�Ҫ����ʹ�ø���������С��ģ�Ĳ����**

----
# <span style="font-weight:800;color:#FFA500;font-size:18px">{����| Caching}</span>��<span style="font-weight:800;color:#FFA500;font-size:18px">{ʧЧ| Expiring}</span>����

�����Դ�����ҳ���ϱ�*����ʹ��*����ôһֱ�������ǽ���һ����ĥ����������ÿ�ζ��ڼ�����վ�����潫�����ڷ�ֹ����ѭ������*HTTP��Ӧͷ*�и������ṩ������Ϣ,ֻ�������ǹ���ʱ�ż��ء�

## HTTP����

����֮ǰ��[����ʰ��֮Http����](https://mp.weixin.qq.com/s/vM1t8S15egOAQ8kQ8bJFlw)�ͽ��ܹ�������http�����֪ʶ�㣬�Ҿ�ֱ�����������ˡ�

> **������**���������**û������**

�������**��̬��Դ**�Ļ��汾������ `HTTP` Э��Ļ�����ԣ������ֿ��Է�Ϊ**ǿ�ƻ���**��**Э�̻���**��
>���ֻ�����Զ���**����Դ���浽����**

- ǿ�ƻ�����Ը���**����ʱ��**����ʹ�ñ��ػ��滹����������Դ��
- Э�̻���ÿ�ζ���**��������**������**���������жԱ�**��������ñ��ػ��滹������Դ��

����������ֻ�����ԣ��� HTTP Э����ײ��� `Headers` ����Ϣ������

��[����ͨ��֮����HTTP��Ϣ](https://mp.weixin.qq.com/s/UIrBufba6QoTUhcNYfEH2w)�����ǽ��ܹ�����Ϣͷ������;�ɷ�Ϊ**�Ĵ���**<br>1. *ͨ��ͷ*���������������Ӧ��ͷ�ֶ�<br>2. *����ͷ*�����ڱ�ʾ������Ϣ�ĸ�����Ϣ��ͷ�ֶ�<br>3. *��Ӧͷ*�����ڱ�ʾ��Ӧ��Ϣ�ĸ�����Ϣ��ͷ�ֶ�<br>4. *ʵ��ͷ*������**��Ϣ��**�ĸ�����Ϣ��ͷ�ֶ�

���Ƕ�HTTP�����õ����ֶν���һ�μ򵥵ķ���ͻ��ܡ�

| ͷ�ֶ�    |   ��������  |
| --- | --- | 
|  Expires   |   ʵ��ͷ  |     
|  Cache-control   |  ͨ��ͷ    |   
|  ETag   |   ʵ��ͷ  |  


> ETag: ��**���²���**�У���ʱ����Ҫ����**��һ���������Ӧ����**��������һ����������������£�����ֶο��������ṩ�ϴ���Ӧ���´�����֮���**������Ϣ**���ϴ���Ӧ�У���������ͨ�� `Etag` ��ͻ��˷���һ��Ψһ��ʶ�����´������пͻ��˿���ͨ�� `If-Match`��`If-None-Match`��`If-Range` �ֶν������ʶ��֪��������������������֪����������ϴε���Ӧ����صġ�<br><br>����ֶε�**���ܺ� Cookie ����ͬ**�ģ��� Cookie ��������Netscape����˾���п����Ĺ�񣬶� Etag �ǽ�����б�׼����Ĺ��


## Expires �� Cache-control:max-age=x(ǿ����)
>`Expires`�� `Cache-control:max-age=x` ��**ǿ�ƻ���**���ԵĹؼ���Ϣ�����߾���**��Ӧ�ײ���Ϣ**(��˷����ͻ���)�ġ�

`Expires` �� `HTTP 1.0` ��������ԣ�ͨ��ָ��һ��**��ȷ��ʱ���**��Ϊ������Դ�Ĺ���ʱ�䣬�ڴ�ʱ���֮ǰ�ͻ��˽�ʹ�ñ��ػ�����ļ�Ӧ�����󣬶����������������ʵ������

`Expires` ���ŵ�:
- �����ڻ������ʱ����**����**�ͻ��˵� HTTP ����
- ��ʡ�˿ͻ��˴���ʱ�������� Web Ӧ�õ�ִ���ٶ�
- ������**����������**�Լ��ͻ���������Դ������

��Ӧ���﷨

```shell
Expires: <http-date>
```
`<http-date>`��һ�� HTTP-���� ʱ���


```shell
Expires: Wed, 24 Oct 2022 14:00:00 GMT
```
������Ϣָ����Ӧ��Դ��**�������ʱ��**Ϊ `2022��8��24�� 14��`

>`Expires` һ��**������ȱ��**�ǣ�����ָ����ʱ�������**������Ϊ׼**��ʱ�䣬����**�ͻ��˽��й����ж�**ʱ�ǽ�**���ص�ʱ�����ʱ���Ա�**��

����ͻ��˵�ʱ�������������**���**�������������ʱ���� `2022�� 8�� 23�� 13 ��`�����ͻ��˵�ʱ���� `2022�� 8�� 23�� 15 ��`����ôͨ�� `Expires` ���ƵĻ�����Դ����**ʧЧ**���ͻ��˽��ᷢ��ʵ�������ȡ��Ӧ��Դ��

���������⣬ `HTTP 1.1` ������ `Cache-control` �ײ���Ϣ�Ա�**����׼**�ؿ��ƻ��档

���õ� Cache-control ��Ϣ�����¼��֡�

- `no-cache`:<br>ʹ�� `ETag` ��Ӧͷ����֪�ͻ��ˣ������������������������Դ������Ҫ������Ƿ��ڷ�����޸Ĺ�������֮ǰ���ܱ����á����**��ζ��no-cache����ͷ���������һ��ͨѶ**��ȷ�����ص���Դû���޸Ĺ������û���޸Ĺ�����û�б�Ҫ���������Դ����֮������Ҫ�������ء�
- `no-store`<br>�ڴ�����Դ���ܱ�����͸��õ��߼���ʱ���� `no-cache`���ơ�Ȼ��������֮����һ����Ҫ��**����**��`no-store`Ҫ����Դÿ�ζ����������������������ڴ�����˽��Ϣ��private information����ʱ������һ����Ҫ�����ԡ�
- `public & private` <br> `public`��ʾ����Ӧ���Ա�������Լ��м仺����**�����ڻ���**������Ϣ��*������*�����淽����ʹ�� `max-age` ָ����ȷ�Ļ���ʱ��<br>`private`��ʾ����Ӧ���Ա��û���������棬����**�������κ��м仺����**������л��档 ���磬�û�����������Ի�������û�˽����Ϣ�� HTML ��ҳ���� `CDN` ȴ���ܻ��档
- `max-age=<seconds>`<br>ָ����**�����ʱ��**��ʼ���㣬����Ӧ�Ļ��渱����Ч���ʱ�䣨��λ��**��**�� ���磬`max-age=360`��ʾ������ڽ������� 1 Сʱ��ʹ�ô���Ӧ�ı��ػ��棬���ᷢ��ʵ�����󵽷�����
- `s-maxage=<seconds>`<br>`s-maxage` �� `max-age`���ƣ������**s**���������ָ��һ������� `CDNs` ��������**�м���**��intermediary caches�������ָ���**����**`max-age`��`expires`��Ӧͷ��

- `no-transform`<br>�м������ʱ��ı�ͼƬ�Լ��ļ��ĸ�ʽ���Ӷ��ﵽ������ܵ�Ч����`no-transform`ָ������м����Ҫ�ı���Դ�ĸ�ʽ


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3795a4ac54a34271a21ed611ac38daec~tplv-k3u1fbpfcp-zoom-1.image)


>`max-age` ָ�����ǻ����**ʱ����**�����ǻ���ʧЧ��ʱ��㣬�����ܵ��ͻ����������ʱ������Ӱ�졣

�� `Expires` ��ȣ� `max-age` ����**����ȷ�ؿ��ƻ���**�����ұ� Expires ��**���ߵ����ȼ�** 


ǿ�ƻ�������£� `Cache-control` δָ�� `no-cache`��
`no-store`���Ļ����ж�����


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/851415b43bf443b7a32cbf9432266c64~tplv-k3u1fbpfcp-zoom-1.image)

---
## `Etag` �� `If-None-Match` ��Э�̻��棩

>`Etag` ��**������**Ϊ��Դ������ַ�����ʽ**Ψһ�Ա�ʶ**����Ϊ**��Ӧ�ײ�**��Ϣ���ظ������ 

**�����**�� `Cache-control` ָ�� `no-cache` ���� `max-age`�� `Expires` ������֮�󣬽�`Etag` ֵͨ�� `If-None-Match` ��Ϊ**�����ײ�**��Ϣ���͸���������

**������**���յ�����֮�󣬶Ա���������Դ�� `Etag` ֵ�Ƿ�ı䣬���δ�ı佫���� `304 Not Modified`,���Ҹ��ݼȶ��Ļ�����Է����µ� `Cache-control` ��Ϣ;�����Դ�����˸ı䣬���
����**����**����Դ�Լ�*���·���*�� `Etag`ֵ��


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b6b240bcfa34c78a8505fc09c325857~tplv-k3u1fbpfcp-zoom-1.image)

���ǿ�������ʹ��Э�̻�����ԣ���Ҫ�� `Cache-control` �ײ���Ϣ����Ϊ `no-cache` �������㲻���ж� `max-age`�� `Expires` ����ʱ�䣬�Ӷ�**ÿ����Դ���󶼻ᾭ���������Ա�**��


---
## JS���������洦��(ServerWorker)

�ڴ�JavaScript�У���������ɵ�����`service workers`�������Ƿ���Ҫ�������ݡ����磬���������ļ���`style.css` �� `script.js`������Ҫ������Щ�ļ����ҿ���ʹ��`service workers`��������Щ��Դ�Ƿ���뱣�����£����߿���ʹ�û��档

��[Web�����Ż�֮Worker�߳�(��)](https://mp.weixin.qq.com/s/yVKxbLKyxVhuKUjBpbInag)�����н��ܹ�����`ServerWork`����ϸ���ܡ��������Ȥ������ȥ���

���û�*��һ��������ҳӦ�ó���ʱ����װ����ִ��*��

```javascript
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          'styles.css',
          'script.js'
        ]
      );
    })
  );
});
```
���û�ִ��һ�����ʱ

```javascript
document.querySelector('.lazy').addEventListener('click', function(event) {
  event.preventDefault();
  caches.open('lazy_posts��).then(function(cache) {
    fetch('/get-article��).then(function(response) {
      return response;
    }).then(function(urls) {
      cache.addAll(urls);
    });
  });
});

```
������������

```javascript
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('lazy_posts').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response 
      });
    })
  );
});
```
----
ֽ�ϵ����վ�ǳ����֪����Ҫ���С�����������������������ʵ�ʿ����У�������Ż��������ǰ�`React`����Ϊ���ӡ�
# React Ӧ���е��Ż�����
�Ż����ֳ������׶Ρ�
- 1. ��Ӧ�ó��򱻼���֮ǰ
- 2. �ڶ��׶�����Ӧ�ü��غ�����Ż�

## �׶�һ������ǰ��
�����ǽ���һ���򵥵�Ӧ�ó��������µĽṹ��

- `Header`
- `Sidebar`
- `Footer`

����ṹ���¡�
```javascript
webpack-demo
|- package.json
|- package-lock.json
|- webpack.config.js
|- /dist
|- /src
 |- index.js
 |- Header.js
 |- Sidebar.js
 |- Footer.js
 |- loader.js
 |- route.js
|- /node_modules
```

�����ǵ�Ӧ�ó����У�ֻ�е��û���¼ʱ����Ӧ�ÿ����������`Webpack` ��һ���ܺõĹ��ߣ����԰������ǽ���**������**��������������˴����֣����ǿ��Դ�`App.js`��`Route`����� `React`���� Lazy���ش���

���ǰѴ��밴ҳ���߼��������֡�ֻ�е�Ӧ�ó�����Ҫʱ���Ż������Щ�߼�Ƭ�Ρ���ˣ�����������������ֽϵ͡�

���磬���`Sidebar`���ֻ�����û���¼ʱ�Żᱻ���أ������м���������������ǵ�Ӧ�ó�������ܡ�

���ȣ����ǿ�����**·�ɲ���**�Դ�����������ش��������������ʾ�����뱻�ֳ��������߼��顣**ֻ�е��û�ѡ����һ���ض���·��ʱ��ÿ����Żᱻ����**������ζ�ţ����ǵ�DOM�ڳ�ʼ����ʱ���ؽ� `Sidarbar` ������Ϊ�� **Critical Bytes**��һ���֡�

```jsx
import { 
    Switch, 
    browserHistory, 
    BrowserRouter as Router, 
    Route
} from 'react-router-dom';
const Header = React.lazy( () => import('Header'));
const Footer = React.lazy( () => import('Footer'));
const Sidebar = React.lazy( () => import('Sidebar'));

const Routes = (props) => {
  return isServerAvailable ? (
      <Router history={browserHistory}>
         <Switch>
           <Route path="/" exact><Redirect to='/Header' /></Route>
           <Route path="/sidebar" exact component={props => <Sidebar {...props} />} />
           <Route path="/footer" exact component={props => <Footer {...props} />} />
        </Switch>
      </Router>
}

```

ͬ���أ�����Ҳ����**�Ӹ���App.js��ʵ��������**����������`React`��**������Ⱦ**���ơ�
```jsx
const Header = React.lazy( () => import('Header'));
const Footer = React.lazy( () => import('Footer'));
const Sidebar = React.lazy( () => import('Sidebar'));

function App (props) {
  return(
    <React.Fragment>
       <Header user = {props.user} />
       {props.user ? <Sidebar user = {props.user /> : null}
       <Footer/>
    </React.Fragment>
  )
}
```
̸��������Ⱦ��`React` ���������ڵ����ť�������Ҳ�ܼ��������

```jsx
import _ from 'lodash';
function buildSidebar() {
   const element = document.createElement('div');
   const button = document.createElement('button');
   button.innerHTML = '��¼';
   element.innerHTML = _.join(['���� Sidebar', 'webpack'], ' ');
   element.appendChild(button);
   button.onclick = e => 
       import(/* webpackChunkName: "sidebar" */ './sidebar')
       .then(module => {
         const sidebar = module.default;
         sidebar()   
       });

   return element;
 }

document.body.appendChild(buildSidebar());
```
��ʵ���У���Ҫ����**�����е�·�ɻ����д���ڽ���Suspense�������**���������صķ�ʽ���ء�`Suspense` ���������������ص����������ʱ��ΪӦ�ó����ṩһ��**������**�������ݿ������κζ���������һ��`<Loader/>`������һ����Ϣ�������û�Ϊʲôҳ�滹û�б���������

```jsx
import React, { Suspense } from 'react';
import { 
    Switch, 
    browserHistory, 
    BrowserRouter as Router, 
    Route
} from 'react-router-dom';
import Loader from ��./loader.js��
const Header = React.lazy( () => import('Header'));
const Footer = React.lazy( () => import('Footer'));
const Sidebar = React.lazy( () => import('Sidebar'));

const Routes = (props) => {
return isServerAvailable ? (
<Router history={browserHistory}>
    <Suspense fallback={<Loader trigger={true} />}>
         <Switch>
           <Route path="/" exact><Redirect to='/Header' /></Route>
           <Route path="/sidebar" exact component={props => <Sidebar {...props} />} />
           <Route path="/footer" exact component={props => <Footer {...props} />} />
         </Switch>
    </Suspense>
</Router>
}

```

---
## �׶ζ�
���ڣ�Ӧ�ó����Ѿ���ȫ���أ��������͵��˵��ͽ׶��ˡ����е����еĴ����߼�����`React`Ϊ���Ǵ��͡���������Ҫ��һ�����`React-Fiber`���ơ�

������˽�[React_Fiber](https://mp.weixin.qq.com/s/oNaffsAbvvG7rxBvgiA1_A)�����Բο�����֮ǰ�����¡�

### ʹ����ȷ��״̬������

- ÿ��`React DOM��`���޸�ʱ��������**��ʹ���������**���⽫�����Ӧ�ó�������ܲ�������Ӱ�졣**���ͱ�����ȷ������������ת�Ĵ���**��ͬ���أ�Reactʹ��״̬��������ֹ���֡����磬����һ��`useState()`hook��
- ���ʹ�õ��������������`shouldComponentUpdate()`�������ڷ�����`shouldComponentUpdate()`������`PureComponent`��ʵ�֡�����������ʱ��`state`��`props`֮��ᷢ��**ǳ�Ա�**����ˣ�������Ⱦ�ļ��ʴ�󽵵͡�

### ����React.Memo
- `React.Memo`�������������`props`���仯����һ�������Ҫ������Ⱦʱ�������**ǳ�Ա�**����������ԭ�����ַ������㷺ʹ�á�

```javascript
function MyComponent(props) {
}
function areEqual(prevProps, nextProps) {
  //�Ա�nextProps��prevProps�������ͬ������false,���ᷢ����Ⱦ
  // �������ͬ���������Ⱦ
}
export default React.memo(MyComponent, areEqual);
```
- ���ʹ�ú����������ʹ��`useCallback()`��`useMemo()`��

---

# ���
**������һ��̬��**��

�ο����ϣ�
- [�ؼ���Ⱦ·��](https://indepth.dev/posts/1498/101-javascript-critical-rendering-path)
- [����ʰ��֮Http����](https://mp.weixin.qq.com/s/vM1t8S15egOAQ8kQ8bJFlw)
- React����

**ȫ���꣬��Ȼ���������ˣ�������ò������ֵ���޺͡��ڿ����ɡ�**


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab1514df436a4bd0aa82695300858ef8~tplv-k3u1fbpfcp-zoom-1.image)

������[mdnice](https://mdnice.com/?platform=2)��ƽ̨����
