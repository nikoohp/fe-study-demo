# 弹窗封装

## 兼容性
`>= IE 10`

## 使用

### 用法一
直接引用`<script src="./assets/js/alert-simple.js"></script>`,无需再引用`css`文件

## 用法二
引用`<link rel="stylesheet" href="./assets/style/alert.css">`
然后再引用`<script src="./assets/js/alert.js"></script>`

## 配置
```
Alert({
        type: 'success',        // success/warning
        msg: '快来学习JS吧快来学习!',    // 提示文本（必填）
        buttons: [{             // 按钮数组
          text: '去学习',        // 按钮文字
          callback: function () { // 点击按钮的回调函数
            alert('我就去学习')
          }
        }, {
          text: '不用了',
          type: 'cancle',       // 按钮类型（success/cancle），默认success
          color: '#f40',        // 自定义按钮背景
          callback: function () {}
        }],
        maskEffect: true,       // 点击蒙版是否关闭弹窗,当没有按钮且delay>0时
        delay: 110      // 弹窗关闭时间， 当有按钮时，或者为0或负数时，延时无效
      })
```