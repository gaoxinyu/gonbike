import Vue from 'vue'
import productDetail from './productDetail.vue'
// import router from './router'

// Vue.config.productionTip = false

new Vue({
  render: h => h(productDetail)
}).$mount('#app')
