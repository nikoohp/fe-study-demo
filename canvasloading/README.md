# 圆形进度条使用说明
## html结构
```html
<canvas id='canvas' width='100' height='100'></canvas>
```

## 使用
```js
import { CanvasLoading } from 'canvasLoading.js'

new CanvasLoading({
  el: '#canvas',  // canvas节点class名或者id
  baseColor: '#e7e9ed', // 底层圆环颜色
  activeColor: '#dba962', // 进度条及文字颜色
  percent: 50,  // 当前进度
  animate: true,  // 初始化时是否加载运动。true/false，默认true
  width: 5,   // 圆环宽度。默认5
})
```