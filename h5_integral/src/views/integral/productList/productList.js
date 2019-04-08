import Vue from 'vue'
import ProductList from './productList.vue'
// import router from './router'

// Vue.config.productionTip = false

new Vue({
  render: h => h(ProductList)
}).$mount('#app')
