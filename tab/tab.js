export class Tab {
  constructor(options) {

    this.headers = document
      .querySelector(options.header)
      .querySelectorAll('[data-toggle="tab"]')
    this.contents = document
      .querySelector(options.content)
      .querySelectorAll('[data-toggle="tab"]')
    this.clsName = options.active || 'active'
    this.event = options.event || 'click'
    this.index = options.index || 0
    this.fn = options.cb

    this.init()
  }

  init() {
    this._initializeShow()
    this._headerToggle()
  }
  // 初始化时显示第几个
  _initializeShow() {
    var len
    var styles = this._delDisplay(this._getStyleAttr(this.contents[this.index]))
    if (this.headers.length !== this.contents.length) {
      throw Error('标签页和内容页数量不一致')
    }
    len = this.headers.length

    for (var i = 0; i < len; i++) {
      this.contents[i].style.display = 'none'
      this.headers[i].classList.remove(this.clsName)
    }
    //
    this.headers[this.index].classList.add(this.clsName)
    this.contents[this.index].setAttribute('style', styles)
    this.fn && this.fn(this.index)
  }
  // 头部
  _headerToggle() {
    var self = this
    var headers = this.headers
    var len = headers.length
    var ev = this.event === 'hover' ? 'mouseover' : this.event
    ;[].slice.call(headers).forEach(function(tab, index) {
      tab.addEventListener(ev, function() {
        // 去除所有class
        for (var i = 0; i < len; i++) {
          headers[i].classList.remove(self.clsName)
        }
        // 点击标签添加class
        tab.classList.add(self.clsName)
        self._contentToggle(index)
      })
    })
  }
  // 内容
  _contentToggle(index) {
    var contents = this.contents
    var len = contents.length
    // 将style标签中的display：none删掉
    var styles = this._delDisplay(this._getStyleAttr(contents[index]))
    for (var i = 0; i < len; i++) {
      contents[i].style.display = 'none'
    }
    contents[index].setAttribute('style', styles)
    this.fn && this.fn(index)
  }
  // 获取style属性
  _getStyleAttr(elem) {
    // 如果没有style属性的话就返回空字符串
    return elem.getAttribute('style') || ''
  }
  // 删除display：none属性
  // 没有使用elem.style.display = 'block'; 避免可能display被设置为flex
  // 没有使用elem.removeAttribute('style'), 避免节点上还有其他style属性被删除
  _delDisplay(str) {
    return str.replace(/(display)\s*:\s*(none)\s*;*/gi, '')
  }
}
