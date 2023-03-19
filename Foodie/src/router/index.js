import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Recepti from '../views/Recepti.vue'
import Log_in from '../views/Log_in.vue'
import Sign_up from '../views/Sign_up.vue'
import test from '../views/test.vue'
import Recept from '../views/Recept.vue'
import { isAuthenticated } from './helpers'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/recepti',
      name: 'recepti',
      component: Recepti,
     meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Log_in
    
    },
    {
      path: '/signup',
      name: 'signup',
      component: Sign_up
    
    },
    {
      path: '/test',
      name: 'test',
      component: test,
      meta: { requiresAuth: true }
    
    },
    {
      path: '/recept',
      name: 'recept',
      component: Recept,
      meta: { requiresAuth: true }
    
    },
    
  ]
 

})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
