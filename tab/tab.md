# `TAB`切换组件使用说明
## html结构
```html
<!-- header -->
<ul class="tabs">
  <li data-toggle="tab"><a href="#">1</a></li>
  <li data-toggle="tab"><a href="#">2</a></li>
  <li data-toggle="tab"><a href="#">3</a></li>
</ul>
<!-- content -->
<div class="tab-content">
  <div data-toggle="tab"></div>
  <div data-toggle="tab"></div>
  <div data-toggle="tab"></div>
</div>
```
> 结构上加上自定义属性`data-toggle="tab"`

## 使用
```js
import {Tab} from 'tab.js'

new Tab({
  header: '.tabs',      // 点击切换容器的class或者id
  content: '.tab-content',  // 内容容器的class或者id
  index: 1,   // 初始化时显示第几个tab，默认为0
  event: 'hover',   // 触发tab切换方式，hover/click，默认为click
  active: 'active',   // tab栏高亮class名，默认为active
  cb: function(index) {   // 切换后的回调，index为当前的索引
    console.log(`这是第${index+1}个content`)
  }
})
```

注：若设置index后，内容闪烁，可在内容的标签上全部添加`style='dispaly: none;'`
```html
<div class="tab-content">
  <div data-toggle="tab" style='dispaly: none;'></div>
  <div data-toggle="tab" style='dispaly: none;'></div>
  <div data-toggle="tab" style='dispaly: none;'></div>
</div>
```