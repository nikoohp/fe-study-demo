!function(){function t(t,e){for(var n in e)t[n]=e[n];return t}function e(t){var e="",n=["Webkit","Moz","ms","O"],o=document.createElement("div").style;t=t.toLowerCase(),n.forEach(function(e,o){n[o]=e+t.replace(/^\S/,function(t){return t.toUpperCase()})}),n.unshift(t);for(var r=0,i=n.length;r<i;r++)n[r]in o&&(e=n[r]);return e}var n=document.querySelector("body"),o=document.createElement("style");o.className="__alert_css__";var r=function(e){if(e=e||{},!(this instanceof r))return new r(e);if(this.config={type:"warning",msg:"",delay:2e3,maskEffect:!0},this.alertComponent=null,"[object Object]"!==Object.prototype.toString.call(e))throw TypeError("options should be a object");t(this.config,e),this.init()};r.prototype={constructor:r,init:function(){this.createStyle(),this.createLayout()},createLayout:function(){var t,t="alert__icon-"+this.config.type,e=document.createElement("article"),o=document.createElement("section");e.className="__alert_component__",o.className="alert__container",o.innerHTML='<div class="alert__content"><div class="alert__content-icon"><i class="alert__icon '+t+'"></i></div><div class="alert__content-msg">'+this.config.msg+"</div></div>",e.appendChild(o),this.createButton(o),this.createMask(e),n.appendChild(e)},createButton:function(t){var e,n,o=this,r=this.config.buttons?this.config.buttons.length:0;if(e=document.createElement("div"),e.className="alert__button",r>0)for(var i=0;i<r;i++){var a=this.config.buttons[i].text,s=this.config.buttons[i].type,l=this.config.buttons[i].color;if(!a)throw Error("text should be required");n=document.createElement("button"),n.className="J_alert_button button",n.innerText=a,n.style.width=100/r+"%",n.index=i,!s&&l?n.style.background=l:s||l?n.classList.add(s):n.classList.add("button-success"),n.addEventListener("click",function(){var t=o.config.buttons[this.index].callback;if(t&&"function () {}"!=t){if("function"!=typeof t)throw TypeError("callback should be a function");t()}else o.close()},!1),e.appendChild(n)}else this.config.delay&&setTimeout(function(){o.close()},this.config.delay);t.appendChild(e)},createMask:function(t){var e=this,n=this.config.maskEffect,o=t.firstChild,r=document.createElement("section");r.className="alert__mask",t.appendChild(r),n&&this.config.delay<=0&&r.addEventListener("click",function(){e.close(o)},!1)},close:function(){var t=e("transform"),r=e("transition"),i={transition:"transitionend",msTransition:"MSTransitionEnd",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"},a=document.querySelector(".alert__container");a.style[t]="translate(-50%, -100%)",a.nextSibling.style.display="none",a.addEventListener(i[r],function(){n.removeChild(a.parentNode),n.removeChild(o)},!1)},createStyle:function(){o.innerHTML='.alert__mask{position:fixed;width:100%;height:100%;top:0;left:0;bottom:0;background-color:rgba(241,241,241,0.8);z-index:9998}.alert__container{position:fixed;top:0;left:50%;max-width:400px;min-height:40px;background-color:#fefefe;font-size:16px;border-radius:6px;-webkit-box-shadow:0 0 15px #f0f0f0;box-shadow:0 0 15px #f0f0f0;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transform:translate(-50%, 100px);-ms-transform:translate(-50%, 100px);transform:translate(-50%, 100px);-webkit-transition:-webkit-transform .2s;transition:-webkit-transform .2s;transition:transform .2s;transition:transform .2s, -webkit-transform .2s;-webkit-animation:alertShow .2s linear;animation:alertShow .2s linear;overflow:hidden;z-index:9999}@media screen and (max-width: 767px){.alert__container{max-width:auto;width:94%;font-size:13px}}.alert__content{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:16px 20px}.alert__content-icon{width:50px}.alert__content-icon .alert__icon{display:inline-block;width:30px;height:30px;line-height:30px;text-align:center;font-size:20px;font-weight:bold;font-style:normal;vertical-align:middle;color:#fff;border-radius:50%;overflow:hidden}.alert__content-icon .alert__icon::before{display:block;width:100%;height:100%}.alert__content-icon .alert__icon-success::before{content:"√";background-color:#60c51d}.alert__content-icon .alert__icon-warning::before{content:"!";background-color:#fda409}.alert__content-msg{-webkit-box-flex:1;-ms-flex:1;flex:1}@media screen and (max-width: 767px){.alert__content-msg{font-size:13px}}.alert__button{display:-webkit-box;display:-ms-flexbox;display:flex}.alert__button .button{outline:none;border:none;width:100%;text-align:center;padding:6px 0;cursor:pointer;margin-top:10px;color:#fff}@media screen and (max-width: 767px){.alert__button .button{padding:10px 0}}.alert__button .button:first-child:nth-last-child(2) ~ .alert__button .button{width:50%}.alert__button .button-success{background-color:#4da9ea}.alert__button .button-cancel{color:#4da9ea;background-color:#e6e6e6}@-webkit-keyframes loader{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes loader{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes alertShow{0%{-webkit-transform:translate(-50%, -120%);transform:translate(-50%, -120%)}100%{-webkit-transform:translate(-50%, 100px);transform:translate(-50%, 100px)}}@keyframes alertShow{0%{-webkit-transform:translate(-50%, -120%);transform:translate(-50%, -120%)}100%{-webkit-transform:translate(-50%, 100px);transform:translate(-50%, 100px)}}',n.appendChild(o)}},window.Alert=r}();