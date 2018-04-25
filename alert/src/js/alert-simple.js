;
(function () {
  var cssTxt = '.alert__mask{position:fixed;width:100%;height:100%;top:0;left:0;bottom:0;background-color:rgba(241,241,241,0.8);z-index:9998}.alert__container{position:fixed;top:0;left:50%;max-width:400px;min-height:40px;background-color:#fefefe;font-size:16px;border-radius:6px;-webkit-box-shadow:0 0 15px #f0f0f0;box-shadow:0 0 15px #f0f0f0;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transform:translate(-50%, 100px);-ms-transform:translate(-50%, 100px);transform:translate(-50%, 100px);-webkit-transition:-webkit-transform .2s;transition:-webkit-transform .2s;transition:transform .2s;transition:transform .2s, -webkit-transform .2s;-webkit-animation:alertShow .2s linear;animation:alertShow .2s linear;overflow:hidden;z-index:9999}@media screen and (max-width: 767px){.alert__container{max-width:auto;width:94%;font-size:13px}}.alert__content{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:16px 20px}.alert__content-icon{width:50px}.alert__content-icon .alert__icon{display:inline-block;width:30px;height:30px;line-height:30px;text-align:center;font-size:20px;font-weight:bold;font-style:normal;vertical-align:middle;color:#fff;border-radius:50%;overflow:hidden}.alert__content-icon .alert__icon::before{display:block;width:100%;height:100%}.alert__content-icon .alert__icon-success::before{content:"√";background-color:#60c51d}.alert__content-icon .alert__icon-warning::before{content:"!";background-color:#fda409}.alert__content-msg{-webkit-box-flex:1;-ms-flex:1;flex:1}@media screen and (max-width: 767px){.alert__content-msg{font-size:13px}}.alert__button{display:-webkit-box;display:-ms-flexbox;display:flex}.alert__button .button{outline:none;border:none;width:100%;text-align:center;padding:6px 0;cursor:pointer;margin-top:10px;color:#fff}@media screen and (max-width: 767px){.alert__button .button{padding:10px 0}}.alert__button .button:first-child:nth-last-child(2) ~ .alert__button .button{width:50%}.alert__button .button-success{background-color:#4da9ea}.alert__button .button-cancel{color:#4da9ea;background-color:#e6e6e6}@-webkit-keyframes loader{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes loader{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes alertShow{0%{-webkit-transform:translate(-50%, -120%);transform:translate(-50%, -120%)}100%{-webkit-transform:translate(-50%, 100px);transform:translate(-50%, 100px)}}@keyframes alertShow{0%{-webkit-transform:translate(-50%, -120%);transform:translate(-50%, -120%)}100%{-webkit-transform:translate(-50%, 100px);transform:translate(-50%, 100px)}}';
  var body = document.querySelector('body'),
    style = document.createElement('style');
  style.className = '__alert_css__';

  var Alert = function (options) {
    options = options || {};

    if (this instanceof Alert) {
      this.config = {
        type: 'warning',
        msg: '',
        delay: 2000,
        maskEffect: true
      }
      // 弹窗组件节点
      this.alertComponent = null;
      // 验证参数
      if (Object.prototype.toString.call(options) !== '[object Object]') {
        throw TypeError('options should be a object')
      }
      // 合并参数
      extend(this.config, options);

      // 初始化
      this.init();
    } else {
      return new Alert(options)
    }
  }
  // 原型
  Alert.prototype = {
    constructor: Alert,
    // 初始化
    init: function () {
      this.createStyle();
      this.createLayout();
    },
    // 创建布局
    createLayout: function () {
      var alert_coomponent, type,
        type = 'alert__icon-' + this.config.type,
        alert_component = document.createElement('article'),
        alert_container = document.createElement('section');

      alert_component.className = '__alert_component__';
      alert_container.className = 'alert__container';
      alert_container.innerHTML = '<div class="alert__content"><div class="alert__content-icon"><i class="alert__icon ' + type + '"></i></div><div class="alert__content-msg">' + this.config.msg + '</div></div>';
      // 
      alert_component.appendChild(alert_container);
      // 添加按钮
      this.createButton(alert_container);
      // 创建mask层
      this.createMask(alert_component);
      // 将弹窗组件添加到body底部
      body.appendChild(alert_component);

    },
    // 创建按钮
    createButton: function (parent) {
      var _this_ = this,
        button_wrapper,
        button,
        buttonLen = this.config.buttons ? this.config.buttons.length : 0;

      button_wrapper = document.createElement('div');
      button_wrapper.className = 'alert__button';

      if (buttonLen > 0) {
        for (var i = 0; i < buttonLen; i++) {
          var text = this.config.buttons[i].text,
            type = this.config.buttons[i].type,
            color = this.config.buttons[i].color
          // 如果没有text, 抛出错误
          if (!text) {
            throw Error('text should be required')
          }

          button = document.createElement('button');
          button.className = 'J_alert_button button';
          button.innerText = text;
          button.style.width = 100 / buttonLen + '%';
          button.index = i;
          // 根据不同的配置设置不同的按钮样式
          if (!type && color) {
            button.style.background = color;
          } else if (!type && !color) {
            button.classList.add('button-success')
          } else {
            button.classList.add(type)
          }

          // 处理按钮的回调函数
          button.addEventListener('click', function () {
            var cb = _this_.config.buttons[this.index].callback;
            // 回调函数存在并且不为空函数
            if (cb && cb != 'function () {}') {
              if (typeof cb !== 'function') {
                throw TypeError('callback should be a function')
              }
              cb();
            } else {
              _this_.close();
            }
          }, false)

          button_wrapper.appendChild(button)
        }
      } else {
        // 当没有按钮并且延时时间大于等于0毫秒时,自动隐藏
        if (this.config.delay) {
          setTimeout(function () {
            _this_.close();
          }, this.config.delay)
        }
      }
      parent.appendChild(button_wrapper);
    },
    // 创建蒙版层
    createMask: function (parent) {
      var _this_ = this,

        maskEffect = this.config.maskEffect,

        container = parent.firstChild,
        // 创建节点
        mask = document.createElement('section');
      // 设置class
      mask.className = 'alert__mask';
      // 添加
      parent.appendChild(mask);
      // 绑定事件
      if (maskEffect && this.config.delay <= 0) {
        mask.addEventListener('click', function () {
          _this_.close(container);
        }, false)
      }

    },
    // 关闭事件
    close: function () {
      var transform = getSupport('transform'),
        transition = getSupport('transition'),
        transitionend = {
          'transition': 'transitionend',
          'msTransition': 'MSTransitionEnd',
          'OTransition': 'oTransitionEnd',
          'MozTransition': 'transitionend',
          'WebkitTransition': 'webkitTransitionEnd'
        },
        elem = document.querySelector('.alert__container');
      elem.style[transform] = 'translate(-50%, -100%)';
      elem.nextSibling.style.display = 'none';
      elem.addEventListener(transitionend[transition], function () {
        body.removeChild(elem.parentNode);
        body.removeChild(style);
      }, false)
    },
    // 添加样式
    createStyle: function () {

      style.innerHTML = cssTxt;
      body.appendChild(style);
    }
  }

  // 合并对象
  function extend(o, p) {
    for (var prop in p) {
      o[prop] = p[prop];
    }
    return o;
  }
  // 获取浏览器的支持情况
  function getSupport(property) {
    var support = '',
      list = ['Webkit', 'Moz', 'ms', 'O'],
      divStyle = document.createElement('div').style;

    property = property.toLowerCase();
    list.forEach(function (item, index) {
      list[index] = item + property.replace(/^\S/, function (s) {
        return s.toUpperCase()
      })
    })
    list.unshift(property)
    for (var i = 0, len = list.length; i < len; i++) {
      if (list[i] in divStyle) {
        support = list[i]
      }
    }
    return support;
  }

  window.Alert = Alert;
})();