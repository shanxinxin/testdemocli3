import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import First from '../components/first.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
console.log(VueRouter)
console.log(1)
// Vue.use(Router)
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

const routes = [
  {
    path: '/',
    name: 'First',
    component: First
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
