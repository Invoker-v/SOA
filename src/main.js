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

Vue.prototype.stats = function(a){
  if (a.confirmed)
    return [Number(a.confirmed),Number(a.recovered), Number(a.death)] ;
  else{
    var c = 0, r = 0, d = 0;
    for (var key in a){
      var s = this.stats(a[key])
      c += s[0];
      r += s[1]
      d += s[2]
    }
    return [c,r,d];
  }
}
new Vue({
  render: (h) => h(App)
}).$mount('#app');
