import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RecipeUpload from '../views/RecipeUpload.vue'
import Log_in from '../views/Log_in.vue'
import Sign_up from '../views/Sign_up.vue'
import userItems from '../views/userItems.vue'
import Recipe from '../views/Recipe.vue'
import { isAuthenticated } from './helpers'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: 'https://web-app-frontend.onrender.com/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: 'https://web-app-frontend.onrender.com/upload',
      name: 'upload',
      component: RecipeUpload,
     meta: { requiresAuth: true }
    },
    {
      path: 'https://web-app-frontend.onrender.com/login',
      name: 'login',
      component: Log_in
    
    },
    {
      path: 'https://web-app-frontend.onrender.com/signup',
      name: 'signup',
      component: Sign_up
    
    },
    {
      path: 'https://web-app-frontend.onrender.com/myFridge',
      name: 'myFridge',
      component: userItems,
      meta: { requiresAuth: true }
    
    },
    {
      path: 'https://web-app-frontend.onrender.com/recipe',
      name: 'recipe',
      component: Recipe,
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
