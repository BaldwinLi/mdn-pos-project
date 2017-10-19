import Vue from 'vue'
import axios from 'axios'
// import lang from 'element-ui/lib/locale/lang/en'
import {
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Button,
  Message,
  MessageBox,
  Dialog,
  Input,
  Switch
} from 'element-ui'
import locale from 'element-ui/lib/locale'
// import ElementUI from 'element-ui'
import lang from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-default/index.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import App from './App'
import router from './router'
import store from './store'

// 设置语言
debugger
locale.use(lang)
// console.log(lang)
// locale.use(zhlang)
// Vue.use(ElementUI, {locale: lang})
window.Vue = Vue
// window.Vue.use(ElementUI, {zhlang})

window.Vue.component(Row.name, Row)
window.Vue.component(Col.name, Col)
window.Vue.component(Menu.name, Menu)
window.Vue.component(Submenu.name, Submenu)
window.Vue.component(MenuItem.name, MenuItem)
window.Vue.component(MenuItemGroup.name, MenuItemGroup)
window.Vue.component(CollapseTransition.name, CollapseTransition)
window.Vue.component(Button.name, Button)
window.Vue.component(Dialog.name, Dialog)
window.Vue.component(Input.name, Input)
window.Vue.component(Switch.name, Switch)
window.Vue.prototype.$confirm = MessageBox.confirm
window.Vue.prototype.$alert = MessageBox.alert
window.Vue.prototype.$message = Message

window.Vue.prototype.$confirm()
if (!process.env.IS_WEB) window.Vue.use(require('Vue-electron'))
window.Vue.http = window.Vue.prototype.$http = axios
window.Vue.config.productionTip = false

/* eslint-disable no-new */
new window.Vue({
  components: { App },
  router,
  store,
  render: h => h(App),
  template: '<App/>'
}).$mount('#app')

const sw = window.navigator.serviceWorker

const killSW = window.killSW || false

if (sw) {
  if (killSW) {
    sw.getRegistration('sw').then(registration => {
      // 手动注销
      registration.unregister()
    })
  } else {
    // 表示该 sw 监听的是根域名下的请求
    sw.register('sw.js')
      .then(registration => {
        // 注册成功后会进入回调
        console.log(registration.scope)
      }).catch(err => {
        console.error(err)
      })
  }
}
