// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Animate from 'animate.css'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(Animate);
Vue.use(ElementUI,{ size: 'small' });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
