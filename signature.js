lineCanvas(obj) {
  this.linewidth = 2
  this.color = '#000000'
  this.background = '#fff'
  for (var i in obj) {
    this[i] = obj[i]
  };
  this.canvas = document.createElement('canvas')
  this.canvas.className = 'canvas-cls'
  this.el.appendChild(this.canvas)
  this.ctx = this.canvas.getContext('2d')
  // console.log(`ctx`, this.ctx)
  this.canvas.width = this.el.clientWidth
  this.canvas.height = this.el.clientHeight
  this.ctx.fillStyle = this.background
  // console.log(this.canvas.offsetTop)
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  this.ctx.strokeStyle = this.color
  this.ctx.lineWidth = this.linewidth
  this.ctx.lineCap = 'round'
  this.top = this.el.offsetTop
  // console.log(`this`, this)
  // console.log(`ctx`, this.ctx)
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  // 开始绘制
  this.canvas.addEventListener('touchstart', function (e) {
    this.ctx.beginPath()
    // console.log(`e`, e.changedTouches[0])
    // console.log('top', this.top)
    // console.log('pageY', e.changedTouches[0].clientY)
    this.ctx.moveTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY - this.top)
  }.bind(this), false)
  // 绘制中
  this.canvas.addEventListener('touchmove', function (e) {
    this.ctx.lineTo(e.changedTouches[0].pageX, e.changedTouches[0].clientY - this.top)
    this.ctx.stroke()
    e.preventDefault()
  }.bind(this), { passive: false })
  // 结束绘制
  this.canvas.addEventListener('touchend', function () {
    this.ctx.closePath()
  }.bind(this), false)
}





new lineCanvas({
  el: document.querySelector('.canvas'),
})
