import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/compat/app';
Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/bills',
    name: 'Bills',
    component: () => import('../views/Bills.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/myaccount',
    name: 'MyAccount',
    component: () => import('../views/MyAccount.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/successregister',
    name: 'SuccessRegister',
    component: () => import('../views/SuccessRegister.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/modifyinformation',
    name: 'ModifyInformation',
    component: () => import('../views/ModifyInformation.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/changePassword',
    name: 'ChangePassword',
    component: () => import('../views/ChangePassword.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      next({
        name: 'Login',
      });
    }
  } else {
    next();
  }
});

export default router;
