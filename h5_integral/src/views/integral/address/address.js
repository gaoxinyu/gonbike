import Vue from 'vue'
import VueRouter from 'vue-router'

import Address from './address.vue'
import Citys from './cityList.vue'
// import Province from './cityProvince.vue'
// import City from './cityCity.vue'
// import Area from './cityArea.vue'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/citys', component: Citys
  }
]
const router = new VueRouter({
  routes:routes
})
new Vue({
  router,
  render: h => h(Address)
}).$mount('#app')
