// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import utils from './common/utils/index'
// import theme from 'muse-ui/lib/theme';
import './assets/js/flexible'
// 样式引入
import './assets/styles/flexible.css'



// theme.use('dark');
Vue.use(MuseUI);
Vue.prototype.globalFun = utils;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router.routerGroup,
  store,
  data:{
    eBus:new Vue()
  },
  components: { App },
  template: '<App/>'
})
