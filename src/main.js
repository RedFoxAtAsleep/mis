import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/element'
import './plugins/echarts'
import './api/mock'
import './plugins/highcharts'
// import './plugins/antdesign'



Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
