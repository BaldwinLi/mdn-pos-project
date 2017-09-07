import Vue from 'vue'
import axios from 'axios'
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
import 'element-ui/lib/theme-default/index.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import App from './App'
import router from './router'
import store from './store'

window.Vue = Vue
window.Vue.use(Row)
window.Vue.use(Col)
window.Vue.use(Menu)
window.Vue.use(Submenu)
window.Vue.use(MenuItem)
window.Vue.use(MenuItemGroup)
window.Vue.use(CollapseTransition)
window.Vue.use(Button)
window.Vue.use(Dialog)
window.Vue.use(Input)
window.Vue.use(Switch)
window.Vue.prototype.$confirm = MessageBox.confirm
window.Vue.prototype.$alert = MessageBox.alert
window.Vue.prototype.$message = Message

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
