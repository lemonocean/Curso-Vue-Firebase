import Vue from 'vue'
import Vuelidate from 'vuelidate'
import './plugins/vuetify'
import App from './App.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  render: h => h(App)
}).$mount('#app')
