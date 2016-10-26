import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'


Vue.use(VueRouter)


const routes = [
  { path: '/', component: App },
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

const app = new Vue({
  router
}).$mount('#app')

