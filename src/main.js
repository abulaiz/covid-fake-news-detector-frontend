import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
Vue.use(BootstrapVue);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
