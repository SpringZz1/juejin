# cropperjs�ü�ͼƬ

> ǰ�ԣ�Ŀǰ��ʵ�������У��кܶ����������Ҫ����ͼƬ�ü�������˵�ϴ�ͷ���ϴ����桢���ɱ༭ͼƬ�������Ĺ����������ʱ�����Ǹ���ô��ȥ����ͼƬ�Ĳü��أ���ʲô��ʽ�����ǿ��ܹ����ٵİ������ǽ���ͼƬ�Ĳü��ģ����Ȳü����ϴ����������ϴ��ٲü��أ�

��������ѡ��Cropper.js��ΪͼƬ�ü��⣬����һ���������ֲ��ҹ���ʮ��ǿ���һ���⡣

**Cropper.js ���ĵ���ַ**

- https://github.com/fengyuanchen/cropperjs
- DEMO ��ʾ��https://fengyuanchen.github.io/cropperjs/

```javascript
// npm install cropperjs  
import Cropper from "cropperjs";
// �ر�ע��Ҫ����css�ļ�����Ȼ�޷���ȷ��ʾ�ü�����
import "cropperjs/dist/cropper.css";
// ����ʹ�ã������õ�ͼƬ�ü�����ĸ�����ֵ
const image = document.getElementById('image');
const cropper = new Cropper(image, {
  aspectRatio: 16 / 9,
  crop(event) {
    console.log(event.detail.x);
    console.log(event.detail.y);
    console.log(event.detail.width);
    console.log(event.detail.height);
    console.log(event.detail.rotate);
    console.log(event.detail.scaleX);
    console.log(event.detail.scaleY);
  },
});

```

ʵ����Ŀ�е�ʹ�ã�

```javascript
<a-modal
  title="�ü�ͼƬ"
  v-model:visible="showModal"
  @ok="handleOk"
  @cancel="showModal = false"
  okText="ȷ��"
  cancelText="ȡ��"
>
  <div class="image-cropper">
    <img
      :src="baseImageUrl"
      id="processed-image"
      ref="cropperImg"
    />
  </div>
</a-modal>
```

```javascript
// ��vue3+typescriptΪ����ʾ��
setup(props, context) {
  const showModal = ref(false);
  const cropperImg = ref<null | HTMLImageElement>(null);
  // ��Ϊ��д�Ĳü����ܷ�װ�������������ͼƬ��ַbaseImageUrl�Ǵ�props�ﴫ���ģ������Լ�ʹ�õĻ�����Ŀ����޸�
  const baseImageUrl = computed(() => props.value.split("?")[0]);
  let cropper: Cropper;
	let cropData: CropDataProps | null = null;
  watch(showModal, async (newValue) => {
    if (newValue) {
      await nextTick();
      if (cropperImg.value) {
        cropper = new Cropper(cropperImg.value, {
          crop(event) {
            const { x, y, width, height } = event.detail;
            cropData = {
              x: Math.floor(x),
              y: Math.floor(y),
              width: Math.floor(width),
              height: Math.floor(height),
            };
          },
        });
      }
    } else {
      // ע��modal���ص�ʱ��Ҫ��cropper����
      if (cropper) {
        cropper.destroy();
      }
    }
  });
}

```


![image-20220806153545628.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59c20ae3f39e4facbd5e9ee04fcd5349~tplv-k3u1fbpfcp-watermark.image?)


���ʱ�������ҳ������������ʾͼƬ�Ͳü����򣬿��Ը����Լ����뷨�����޸Ĳü�����ĳߴ磬��������е�`cropData`����������Ҫʹ�õĲü���������ݣ�x�������ϽǶ������ԭͼ��ߵ�left��y�����ϽǾ���ԭͼ�ϱߵ�top��width��height���ǲü�����Ŀ�ߣ����ʱ��͵����õ��˲ü�����ͼƬ���ݡ�

��Ȼ�õ��˲ü���������ݣ���������ô����ͼƬ�ϴ��أ�

**�ü����ϴ������ַ�ʽ**

- ������Щ�ü����ݣ��õ��µ�ͼƬ���ݣ����ɶ��������ݣ������ϴ����ϴ���Ϻ������µ�ͼƬ��ַ�������滻��
- ���� ������ OSS �����ͼƬ�����ܣ��޸��ض��� URL ��������޸�

**1.ʹ�ð����� OSS �����ͼƬ�ü�**

- ������OSS ͼƬ�����ĵ���https://help.aliyun.com/document_detail/44686.html?spm=a2c4g.11186623.2.3.280d709dBRO1Ug
- ���ò����Ĵ����ĵ���https://help.aliyun.com/document_detail/44693.html?spm=a2c4g.11186623.2.5.426a7c19gfRFgx

```javascript
// ���ȷ�������������
const handleOk = () => {
  if (cropData) {
   	const { x, y, width, height } = cropData;
    // ���cropperURL����ͨ��������oss���вü���ͼƬ·��
    const cropperURL = baseImageUrl.value + `?x-oss-process=image/crop,x_${x},y_${y},w_${width},h_${height}`;
    // �����������д�ģ����Ե�emit��ȥ�����Ǹ����Լ�����Ŀ�������
    context.emit("change", cropperURL);
  }
  showModal.value = false;
};
```

> ע���һ���ǣ�ʹ�ð�����oss��ʱ��Ҫע��ͼƬ�������⣬��Ҫ�����Լ�ȥ������oss��������ã���Ȼ����ü���ʱ���õ���ͼƬ�����ǲ��ܵ���cropper�ü����

**2.ʹ�� Cropper.js ��ȡ�ü�ͼƬ���ݲ������ϴ�**

**ʵ���ϵ�һ������ - getCroppedCanvas**

https://github.com/fengyuanchen/cropperjs/blob/master/README.md#getcroppedcanvasoptions

**HTMLCanvasElement**
https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement

����cropperjs�ķ���getCroppedCanvas������������ص���һ��HTMLCanvasElement��HTML5��׼�����͵�ֵ�����HTMLCanvasElement������toBlob����������᷵��һ��Blob���͵�����

![image-20220806165358209.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f36fe0bca2b14a768b9a0c3484235a10~tplv-k3u1fbpfcp-watermark.image?)

![image-20220806170440316.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dbcf6147b4a44a49b13c8a5b53f587b~tplv-k3u1fbpfcp-watermark.image?)

����Blob���Բο�����ĵ���https://developer.mozilla.org/zh-CN/docs/Web/API/Blob

![image-20220806171231061.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe8bbf61d9d94620b2d248ac1c654acb~tplv-k3u1fbpfcp-watermark.image?)

ͨ��������ĵ������˽⵽�������ڵ���cropper.getCroppedCanvas()֮�󣬿���ͨ��toBlob������ȡ�ü�ͼƬ��Blob���ݣ�����File�ӿ��ǻ���Blob���������ʱ������Bolb����͵�������File��������File��������ϴ�ͼƬ������׾��ˣ����Կ�����Ĵ���

```javascript
const handleOk = () => {
  if (cropData) {
    cropper.getCroppedCanvas().toBlob((blob) => {
      if (blob) {
        const formData = new FormData();
        formData.append("croppedImage", blob, "test.png");
        axios
          .post(
          "http://xxxxxxxxx/api/upload/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
          .then((resp) => {
          context.emit("change", resp.data.data.url);
          showModal.value = false;
        });
      }
    });
  }
  showModal.value = false;
};
```

���ʱ��������ͼƬ�Ĳü��ˣ���ȥ���԰�

�����ƪ���¶������ã����Ե����ղ�Ŷ~

лл���


