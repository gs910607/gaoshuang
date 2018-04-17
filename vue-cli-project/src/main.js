// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import util from './util/util'
import layout from './components/layout'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Button, Select } from 'element-ui'
import Animate from 'animate.css'
Vue.use(elementUi)
Vue.use(elementUi, { size: 'small' })

// Vue.config.productionTip = false 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { layout },
  template: '<layout/>'
})
