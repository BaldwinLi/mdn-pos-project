import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'order-page',
      component: require('@/components/AppPages/OrderPage')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
