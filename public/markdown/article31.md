# cropperjs裁剪图片

> 前言：目前在实际生产中，有很多种情况下需要进行图片裁剪，比如说上传头像、上传封面、自由编辑图片或其他的功能需求，这个时候我们该怎么样去进行图片的裁剪呢？有什么方式或者是库能够快速的帮助我们进行图片的裁剪的？是先裁剪再上传，还是先上传再裁剪呢？

首先我们选择Cropper.js作为图片裁剪库，这是一个简单易上手并且功能十分强大的一个库。

**Cropper.js 的文档地址**

- https://github.com/fengyuanchen/cropperjs
- DEMO 演示：https://fengyuanchen.github.io/cropperjs/

```javascript
// npm install cropperjs  
import Cropper from "cropperjs";
// 特别注意要引入css文件，不然无法正确显示裁剪区域
import "cropperjs/dist/cropper.css";
// 初级使用，可以拿到图片裁剪区域的各种数值
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

实际项目中的使用：

```javascript
<a-modal
  title="裁剪图片"
  v-model:visible="showModal"
  @ok="handleOk"
  @cancel="showModal = false"
  okText="确认"
  cancelText="取消"
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
// 以vue3+typescript为代码示例
setup(props, context) {
  const showModal = ref(false);
  const cropperImg = ref<null | HTMLImageElement>(null);
  // 因为我写的裁剪功能封装成了组件，所以图片地址baseImageUrl是从props里传来的，你们自己使用的话看项目情况修改
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
      // 注意modal隐藏的时候要把cropper销毁
      if (cropper) {
        cropper.destroy();
      }
    }
  });
}

```


![image-20220806153545628.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59c20ae3f39e4facbd5e9ee04fcd5349~tplv-k3u1fbpfcp-watermark.image?)


这个时候可以在页面上正常的显示图片和裁剪区域，可以根据自己的想法自由修改裁剪区域的尺寸，上面代码中的`cropData`就是我们需要使用的裁剪区域的数据，x就是左上角顶点距离原图左边的left，y是左上角距离原图上边的top，width和height就是裁剪区域的宽高，这个时候就等于拿到了裁剪区域图片数据。

既然拿到了裁剪区域的数据，那我们怎么进行图片上传呢？

**裁剪并上传的两种方式**

- 根据这些裁剪数据，拿到新的图片数据，生成二进制数据，重新上传，上传完毕后生成新的图片地址，进行替换。
- 根据 阿里云 OSS 特殊的图片处理功能，修改特定的 URL 参数完成修改

**1.使用阿里云 OSS 来完成图片裁剪**

- 阿里云OSS 图片处理文档：https://help.aliyun.com/document_detail/44686.html?spm=a2c4g.11186623.2.3.280d709dBRO1Ug
- 常用操作的处理文档：https://help.aliyun.com/document_detail/44693.html?spm=a2c4g.11186623.2.5.426a7c19gfRFgx

```javascript
// 点击确定调用这个方法
const handleOk = () => {
  if (cropData) {
   	const { x, y, width, height } = cropData;
    // 这个cropperURL就是通过阿里云oss进行裁剪的图片路径
    const cropperURL = baseImageUrl.value + `?x-oss-process=image/crop,x_${x},y_${y},w_${width},h_${height}`;
    // 我是在组件中写的，所以得emit出去，你们根据自己的项目情况随意
    context.emit("change", cropperURL);
  }
  showModal.value = false;
};
```

> 注意的一点是，使用阿里云oss的时候要注意图片跨域问题，需要你们自己去阿里云oss里进行配置，不然点击裁剪的时候，拿到的图片链接是不能调起cropper裁剪框的

**2.使用 Cropper.js 获取裁剪图片数据并重新上传**

**实例上的一个方法 - getCroppedCanvas**

https://github.com/fengyuanchen/cropperjs/blob/master/README.md#getcroppedcanvasoptions

**HTMLCanvasElement**
https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement

调用cropperjs的方法getCroppedCanvas，这个函数返回的是一个HTMLCanvasElement（HTML5标准）类型的值，这个HTMLCanvasElement上面有toBlob这个方法，会返回一个Blob类型的数据

![image-20220806165358209.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f36fe0bca2b14a768b9a0c3484235a10~tplv-k3u1fbpfcp-watermark.image?)

![image-20220806170440316.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dbcf6147b4a44a49b13c8a5b53f587b~tplv-k3u1fbpfcp-watermark.image?)

关于Blob可以参考这个文档，https://developer.mozilla.org/zh-CN/docs/Web/API/Blob

![image-20220806171231061.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe8bbf61d9d94620b2d248ac1c654acb~tplv-k3u1fbpfcp-watermark.image?)

通过上面的文档可以了解到，我们在调用cropper.getCroppedCanvas()之后，可以通过toBlob方法获取裁剪图片的Blob数据，并且File接口是基于Blob，所以这个时候有了Bolb对象就等于有了File对象，有了File对象完成上传图片就轻而易举了，可以看下面的代码

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

这个时候就完成了图片的裁剪了！快去试试吧

如果这篇文章对你有用，可以点赞收藏哦~

谢谢大家


