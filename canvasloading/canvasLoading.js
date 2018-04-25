export class CanvasLoading {
  constructor (options) {
    this.dpr = window.devicePixelRatio || 1
    this.canvas = document.querySelector(options.el)
    this.percent = options.percent || 0
    this.text = this.percent < 0 ? 0 : this.percent > 100 ? 100 : this.percent
    this.width = (options.width || 5) * this.dpr
    this.baseColor= options.baseColor || '#ccc'
    this.activeColor = options.activeColor || '#000'
    this.animate = typeof options.animate === 'undefined' ? true : options.animate === false ? false : true
    // 对象
    this.context = this.canvas.getContext('2d')
    // 中心坐标
    this.centerX = this.canvas.width * this.dpr / 2
    this.centerY = this.canvas.height * this.dpr / 2
    //将360度分成100份，那么每一份就是rad度
    this.rad = Math.PI*2/100
    // 半径
    this.radius = this.centerX - this.width
    this.n = 0
    this.t = 0

    this.canvas.style.width = this.canvas.width + 'px'
    this.canvas.style.height = this.canvas.height + 'px'
    this.canvas.height = this.canvas.height * this.dpr
    this.canvas.width = this.canvas.width * this.dpr

    this.init()
  }
  init() {
    if (this.animate) {
      this.animation()
    } else {
      this.static()
    }
  }
  // 动态绘制
  animation() {
    const ctx = this.context
    // 动态绘制前，先清除画布上上一次的绘制
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // 绘制底层圆环
    this.drawCircle(100, this.baseColor)

    this.n++
    if ((this.percent-100) > 0) {
      this.t += (this.percent - 100)/100 + 1
    } else {
      this.t++
    }
    // 边界情况处理
    if (this.t >= this.percent)  this.t = this.percent
    if (this.n >= 100)  this.n = 100
    // 递归调用
    if (this.t < this.percent) {
      window.requestAnimationFrame(this.animation.bind(this))
    }
    // 绘制进度圆环
    this.drawCircle(this.n, this.activeColor)
    // 绘制文字
    this.drawText(Math.round(this.t))
  }
  // 静态绘制
  static() {
    this.drawCircle(100, this.baseColor)
    this.drawCircle(this.text, this.activeColor)
    this.drawText(this.percent)
  }
  // 绘制圆环
  drawCircle(n, color) {
    const ctx = this.context
    //设置描边样式
    ctx.strokeStyle = color
    //设置线宽
    ctx.lineWidth = this.width
    //路径开始
    ctx.beginPath()
    //用于绘制圆弧ctx.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
    ctx.arc(this.centerX, this.centerY, this.radius, -Math.PI / 2, -Math.PI/2 +n*this.rad, false)
    //绘制
    ctx.stroke()
    //路径结束
    ctx.closePath()
  }
  // 绘制文字
  drawText(text) {
    const ctx = this.context
    const disWidth = text < 100 ? 4 : 10
    const disX1 = this.centerX - ctx.measureText(this.percent).width / 2 - disWidth * this.dpr
    const disX2 = this.centerX + ctx.measureText(this.percent).width / 2 + 5 * this.dpr
    const disY = this.centerY + 10

    ctx.font = `${this.dpr*24}px PT Sans`
    ctx.fillStyle = this.activeColor
    // fillText(文本, x坐标, y坐标)
    ctx.fillText(`${text}`, disX1, disY)

    ctx.font = `${this.dpr*14}px PT Sans`
    ctx.fillText('%', disX2, disY)
  }
}
