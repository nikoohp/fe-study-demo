## scss:
```css
@import 'dialog';
```
## js:
```js
import { RDialog } from 'dialog.js'

new RDialog({
  type: 'warning',
  content: '账户余额不足 <a href="#">去充值</a>',
  delay: 2,
  sep: {
    // time: 6,
    url: 'http://www.dgd.vc',
    text: '您还可以选择以下支付方式'
  },
  buttons: [{
    text: '在线支付',
    hasBg: true,
    cb() {
      alert('继续投资')
    }
  },
  {
    text: '确定',
    hasBg: false,
    cb() {
      alert('点击了确定按钮')
    }
  }]
})
```

- `type`：`success/warning`，默认`success`
- `content`: 提示消息，可以是纯文本，可以是`html`字符串，可以是`DOM`节点
- `delay`：
- `sep`：分割线提示
  - `time`：倒计时时间
  - `url`：跳转链接
  - `text`：提示文本
  > 将`time`设置为0或者负数时，将不会倒计时跳转
- `buttons`：数组
  - `text`：按钮文字
  - `hasBg`：是否有背景
  - `cb`：点击按钮后的事件