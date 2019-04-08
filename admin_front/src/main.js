// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './routers';
import VueI18n from 'vue-i18n'
import locales from './locales/index.js'

import Element from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'

// zhu 2017.09.19
import VueClipboard from 'vue2-clipboards'

import App from './App'


// vue-clipboard zhu 2017.09.19
Vue.use(VueClipboard)
// 单车logo管理 zhu 2017.04.17
// const defaultLang = navigator.language || 'zh-CN';
const defaultLang = 'en';
// Vue.config.lang = localStorage.getItem('lang') || defaultLang
// Vue.config.fallbackLang = defaultLang
// Object.keys(locales).forEach(function (lang) {
//   Vue.locale(lang, locales[lang])
// })


// i18n
Vue.use(VueI18n)
// vue-i18n ^6.0.0 version
var i18n = new VueI18n({
  locale: localStorage.getItem('lang') || defaultLang,
  messages: locales
})

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})  

const app = new Vue({
  router,
  ...App,
  i18n,
});

app.$mount('#app');
