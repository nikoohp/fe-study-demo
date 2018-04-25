class Mvvm {
  constructor(options) {
    this.$options = options
    this.$el = document.querySelector(options.el)
    this.$data = options.data
    this.$methods = options.methods

    this._init(options)
  }
  // 初始化
  _init(options) {
    this._proxyData(this.$data)
    this._observer(this.$data)
    this._complie(this)
    options.mounted.call(this)
  }
  // 数据代理
  _proxyData(data) {
     Object.keys(data).forEach(key => {

      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return this.$data[key]
        },
        set(newVal) {
          this.$data[key] = newVal
        }
      })
     })
  }
  // 数据监听
  _observer(data) {
    const self = this
    const dep = new Dep()

    if (!data || typeof data !== 'object') return

    Object.keys(data).forEach(key => {
      let val = data[key]
      // 如果对象的属性值是对象的话，递归设置
      if (typeof val === 'object') this._observer(val)
      // 设置set/get
      Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
          Dep.target && dep.addSub(Dep.target)
          // console.log(dep.subs)
          return val
        },
        set(newVal) {
          if (newVal === val) return
          val = newVal
          self._observer(newVal)
          dep.notify()
        }
      })

    })
  }
  // 编译
  _complie(vm) {
    let child
    const fragment = document.createDocumentFragment()
    // 换行也是子节点
    /* let child = vm.$el.firstChild;
    while (child) {
      fragment.appendChild(child);
      child = vm.$el.firstChild;
    } */
    while (child = vm.$el.firstChild) {
      fragment.appendChild(child)
    }

    // 对文本替换
    function replace(frag) {
      const reg = /\{\{(.*?)\}\}/g
      ;[...frag.childNodes].forEach(node => {
        let txt = node.textContent
        // 如果是文本节点且有{{}}
        if (node.nodeType === 3 && reg.test(txt)) {

          function replacetxt() {
            node.textContent = txt.replace(reg, (matched, placeholder) => {
              // console.log(placeholder)
              new Watcher(vm, placeholder, replacetxt)
              return placeholder.split('.').reduce((acc, cur) => {
                return acc[cur]
              }, vm)
            })
          }
          replacetxt()

        }
        if (node.nodeType === 1) {
          const nodeAttrs = node.attributes
          ;[...nodeAttrs].forEach(attr => {
            const name = attr.name
            const val = attr.value
            if (name === 'v-model') {
              node.value = vm[val]

              new Watcher(vm, val, newVal => {
                node.value = newVal
              })

              node.addEventListener('input', e => {
                const v = e.target.value
                console.log(v)
                vm[val] = v
              })
            }
          })

        }
        // 如果有子节点，则递归调用
        if (node.childNodes && node.childNodes.length) {
          replace(node)
        }
      })

    }

    replace(fragment)
    // 将文本片段插入到节点中
    vm.$el.appendChild(fragment)
  }
}


// 发布订阅模式
class Dep {
  constructor(){
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

// 监听
// 通过Watcher创建的实例都有一个update方法, 传递一个回调函数
class Watcher {
  constructor(vm, exp, fn) {
    this.vm = vm
    this.data = exp.split('.')
    this.fn = fn
    // 此处为了触发属性的getter，从而在dep添加自己
    this.value = this.get()
  }
  update() {
    let val = this.vm
    this.data.forEach(key => val = val[key])
    this.fn(val)
  }
  get() {
    Dep.target = this
    // 触发getter, 添加自己到属性订阅器中
    const value = this.vm[exp]
    // 添加完成，重置
    Dep.target = null
    return value
  }
}