// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/common.css'
import './assets/css/base.css'
import './assets/css/theme.less'
import VueScroller from 'vue-scroller'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
/* eslint-disable no-new */
Vue.use(VueScroller);
Vue.use(VueAwesomeSwiper);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
let setRem = function (){
  let hWidth = document.documentElement.getBoundingClientRect().width;
  document.documentElement.style.fontSize=hWidth/7.5 +"px"
};
setRem();
