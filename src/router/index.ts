import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeView2 from '../views/HomeView2.vue'
import ListByTagView from '../views/ListByTag.vue'
import DetailView from '../views/DetailView.vue'
import ShortsView from '../views/ShortsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/2',
      name: 'home2',
      component: HomeView2
    },
    {
      path: '/shorts',
      name: 'shorts',
      component: ShortsView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/tags/:tagId',
      name: 'list-by-tag',
      component: ListByTagView
    },
    {
      path: '/posts/:slug',
      name: 'detail',
      component: DetailView
    },
  ]
})

export default router
