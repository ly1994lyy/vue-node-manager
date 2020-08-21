import Vue from 'vue'
import App from './App.vue'
import http from './http'
import router from './router'
import store from './store'
import './plugins/element.js'

import '../public/iconfont/iconfont.css'
Vue.config.productionTip = false

Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
