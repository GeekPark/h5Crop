HTML5本地裁剪插件
---------
一个基于[jQuery](https://github.com/jquery/jquery)和[Jcrop](https://github.com/tapmodo/Jcrop)的本地图片裁剪插件。

####License: [MIT](http://opensource.org/licenses/MIT)

###为什么需要这玩意
目前很多的图片上传、裁剪都是基于服务器端的。比如Jcrop，在选择好图片后仅仅是做了一个裁剪的UI，然后发给后端起始位置、大小等参数，由后端来裁剪。不喜欢后端方案，前端上HTML5中的Canvas又赋予了裁剪图片并输出为Base64格式的能力，自然这个插件就诞生了。

###如何使用
犹豫插件依赖`jQuery`和`Jcrop`，请保证在使用前先引入前两者。
####HTML
```html
<input type="file" id="imageupload">
```
####Javascript
```javascript
  $('#imageupload').h5Crop({
    cropW: 120, // 裁剪区域宽
    cropH: 150, // 裁剪区域高
    previewW: 400, // 预览宽度（高度自适应）
    previewClass: 'upload-preview' // 预览样式类
  });
```

###浏览器兼容性
* IE 10+  
* Firefox 3.6+  
* Chrome 7+   
* Safari 6+

###TODO:
* 增加数据导出，目前的图片数据还没放到input里
* 增加提交按钮


