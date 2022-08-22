import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import 'github-markdown-css'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
Vue.prototype.$http = axios
// 挂载到原型上
// Vue.prototype.$axios = axios
Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   // 路由发生变化修改页面title
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
