// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Animate from 'animate.css'
import App from './App'
import router from './router'
import common from './common'
import focus from './directive/directive'
import $ from 'jquery'
import 'swiper/dist/css/swiper.min.css';
// import '../node_modules/swiper/dist/css/swiper.min.css'
// import 'swiper'

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(Animate);
Vue.use(ElementUI,{ size: 'small' });

Vue.prototype.$common = common;
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
