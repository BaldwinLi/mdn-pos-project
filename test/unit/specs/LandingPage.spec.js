import Vue from 'vue'
// import LandingPage from '@/components/LandingPage/LandingPage'
import OrderPage from '@/components/AppPages/OrderPage'

describe('OrderPage.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(OrderPage)
    }).$mount()

    expect(vm.$el.querySelector('.title').textContent).to.contain('Welcome to your new project!')
  })
})
