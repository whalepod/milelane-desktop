import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment-timezone'

import './assets/css/base.css'
import './assets/css/layout.css'

moment.tz.setDefault('Asia/Tokyo')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
