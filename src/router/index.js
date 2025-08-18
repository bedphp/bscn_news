import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/page/news.vue')
    }, {
      name: 'articles',
      path: '/news/:id',
      component: () => import('@/page/articles.vue')
    },
    {
      path: '/*',
      redirect: '/'
    }
  ],
})

export default router
