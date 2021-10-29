import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/bills',
    name: 'Bills',
    component: () => import('../views/Bills.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/myaccount',
    name: 'MyAccount',
    component: () => import('../views/MyAccount.vue')
  },
  {
    path: '/successregister',
    name: 'SuccessRegister',
    component: () => import('../views/SuccessRegister.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
