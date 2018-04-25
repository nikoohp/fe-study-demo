## html:
```html
<div class="custom__audio">
  <header data-audio="title" class="custom__audio__header">正在播放：
    <span>路演音频一</span>
  </header>
  <div class="custom__audio__progress">
    <div data-audio="progress" class="custom__audio__progress__bar"></div>
  </div>
  <div class="custom__audio__control">
    <div class="custom__audio__play">
      <span data-audio="play" class="dgd-icon icon-play"></span>
      <span data-audio="time" class="custom__audio__time"></span>
    </div>
    <div class="custom__audio__volume">
      <i data-audio="mute" class="dgd-icon icon-sound"></i>
      <div class="custom__audio__progress">
        <div data-audio="volumebar" class="custom__audio__progress__bar"></div>
      </div>
    </div>
  </div>
</div>
```
> 注意自定义属性`data-*`不可缺少
## scss:
```css
@import 'audio';
```
## js:
```js
import { RAudio } from 'audio'

new RAudio({
  el: '.selector',  // DOM节点或者类名,ID名
  url: 'xxx.mp3',   // 音频文件地址
  volume: 40,   // 音量大小百分制，默认50
  loop: true,   // 是否循环播放，布尔值，默认true
  autoplay: false,    // 是否自动播放，布尔值，默认false
})
```