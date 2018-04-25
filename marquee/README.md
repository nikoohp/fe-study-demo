# JS学习之轮子 -- 无缝滚动
js学习过程中造的轮子!!!

## 兼容性
`>= IE9`

## 使用
`<script src="marquee-prototype.min.js"></script>`
```
  new Marquee({
    selector: '#marquee'
  })
```

## 配置项

```
  var mq = new Marquee({
    selector: '#marquee',   // 可以是选择器,也可以是dom对象
    speed: 3,               // 数字/数字字符串, 默认为[5], 数字越大速度越快
    dir: 'left'             // 运动方向,默认为[left], (left, right, top, bottom)可选
  })
```

暂停运动，设置`mq.pause = true`

恢复运动，设置`mq.pause = false`