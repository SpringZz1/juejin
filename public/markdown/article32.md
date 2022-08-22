---
theme: channing-cyan
highlight: xcode
---
�������������ٳɳ��������Ҳ��롸������¼ƻ� �� 6 �¸�����ս���ĵ�29�죬[����鿴�����](https://juejin.cn/post/7099702781094674468 "https://juejin.cn/post/7099702781094674468")




## ����

��Ƶ�¼����������� n ����ֻ��ִ��һ�Σ����Խ�����ϡ�ͺ�����ִ��Ƶ�ʡ�

���ڽ�����������������ʵ�ַ�ʽ��һ����ʹ��ʱ�����һ�������ö�ʱ����



### ʱ���

������**��Ƶ�¼�**ʱ��

- ����ȡ����ǰ��ʱ�����Ȼ���**֮ǰ��ʱ�����һ��ʼΪ0��**���
  - �õ��Ĳ�ֵ����������õ�ʱ�����ڣ���ִ�иú�����Ȼ��**����ʱ���**Ϊ��ǰʱ���
  - ����Ͳ�ִ�С�

```js
function throttle(fn, wait = 500) {
  let preTime = 0; // ֮ǰ��ʱ���
  return (...args) => {
    let nowTime = +new Date(); // new Date ǰ���һ��+�ţ���ֱ��ת��Ϊ��ʱ�����
    if(nowTime - preTime > wait) { // ���Ρ���Ƶ���������õļ�����ڡ�ʱ�����ڡ�
      fn.apply(this, args); // ִ�иú���
      preTime = nowTime; // ����ʱ���
    }
  }
}
```



### ��ʱ��

���¼�������ʱ��

- ��������һ����ʱ��
- ���¼��ٴδ�����ʱ��
  - �����ʱ�����ڣ��Ͳ�ִ��
  - ֱ����ʱ��ִ�У�Ȼ��ִ�С���Ƶ������������ն�ʱ�����´δ�������ʱ��ʱ��Ϊ�գ���ᴴ����һ����ʱ����

```js
function throttle(fn, wait = 500) {
  let timer;
  return (...args) => {
    if(!timer) { // �����ʱ��Ϊ�գ���ʼ
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args)
      }, wait)
    }
  }
}
```



### ���ַ�ʽ��Ƚ�

- **ʱ���**�ķ�ʽ�¼�������ִ�У�**��ʱ��**�ķ�ʽ�¼����� n ����һ��ִ��
- **ʱ���**�ķ�ʽ���¼�ֹͣ������û�а취��ִ���¼���**��ʱ��**�ķ�ʽ���¼�ֹͣ��������Ȼ����ִ��һ���¼�



### ��ͷ��β

���������Ҫ**������������ִ��**������ֹͣ�����¼���ʱ������ִ��һ�Σ�����ô���أ�

������Ҫ������ߵ����ƣ�

```js
function throttle(fn, wait = 500) {
  let timer, preTime = 0;
  let throttled = function(...args) {
    let nowTime = +new Date();
    // �´δ�����ʱ��
    let remaining = wait - (nowTime - preTime);
    // ����Ѿ�û��ʣ��ʱ���ˣ�����ʣ��ʱ�������Ҫ�ȴ���ʱ�䣨ϵͳʱ������⣩
    // ��ִ�к���
    if(remaining <= 0 || remaining > wait) { // ���������������ܣ�ÿ�ζ����������ʱ��
      if(timer) {
        clearTimeout(timer);
        timer = null;
      }
      preTime = nowTime;
      fn.apply(this, args)
    } else if(!timer) { 
      // ��ʱ�����ϴδ���������ˣ��ϴεĺ���ִ���ˣ���
      // ���ҵ�ǰʱ�仹���ڡ����ʱ�䡱�ڣ������ٴΡ���������������
      // ��ʹ�á�ʣ��ʱ�䡱������ʱ��
      timer = setTimeout(() => {
        preTime = +new Date(); // ���¡��ϴΡ�ʱ���
        timer = null; // ����ʱ��
        fn.apply(this, args); // ִ�к���
      }, remaining);
    }
  }
  return throttled; // ����Ҳ����ֱ��return function�����ǳ������ throttled ��Ϊ��֮���cancel����
}
```



### ��ͷ��β����ͷ��β

���� `options` ��Ϊ���������������ݴ�ֵ���ж��û���ҪʲôЧ����

```js
leading: false // ��ʾ���õ�һ��ִ��
trailing: false // ��ʾ����ֹͣ������ִ��
```

```js
function throttle(fn, wait = 500, options = {}) {
  let timer, preTime = 0;
  let throttled = function(...args) {
    let nowTime = +new Date();
    // ������״Σ������û������ˡ����õ�һ�Ρ�
    // ��ֱ�ӽ����ϴ�ʱ���������Ϊ����ǰʱ�����
    if(!preTime && options.leading === false) preTime = nowTime;
    let remaining = wait - (nowTime - preTime);
    if(remaining <= 0 || remaining > wait) {
      if(timer) {
        clearTimeout(timer);
        timer = null;
      }
      preTime = nowTime;
      fn.apply(this, args);
    } else if(!timer && options.trailing !== false) { // �����ʱ�������ڣ��ϴ�ִ�й��ˣ��������û�û�����á�����ֹͣ��������������β�����Ķ�ʱ��
      timer = setTimeout(() => {
        preTime = +new Date();
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  }
  return throttled;
}
```



### ȡ��

```js
throttled.cancel = function() {
  clearTimeout(timer);
  previous = 0;
  timer = null;
}
```

