import Vue from 'vue';
import App from './App.vue';
import echarts from 'echarts';
import 'echarts-gl';
import 'echarts/map/js/china';

// import bootstrap
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

new Vue({
  render: (h) => h(App)
}).$mount('#app');
