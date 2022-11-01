import { createRouter, createWebHistory } from 'vue-router'
// GraphQL
import { provideApolloClient } from '@vue/apollo-composable';
import apolloClient from '@/plugins/apolloClient';
import gql from 'graphql-tag';
// view
import HomeView from '@/views/HomeView.vue'
import ListByTagView from '@/views/ListByTagView.vue'
import DetailView from '@/views/DetailView.vue'
import ShortView from '@/views/ShortView.vue'
import ShortsTopView from '@/views/ShortsTopView.vue'
import TagsView from '@/views/TagsView.vue'
import InfoView from '@/views/InfoView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

provideApolloClient(apolloClient)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0
      }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tags',
      name: 'tags',
      component: TagsView
    },
    {
      path: '/tags/:tagSlug',
      name: 'list-by-tag',
      component: ListByTagView,
      props: true,
    },
    {
      path: '/posts/:slug',
      name: 'detail',
      component: DetailView,
      props: true,
    },
    {
      path: '/shorts/:slug',
      name: 'shorts',
      component: ShortView,
      props: true,
    },

    {
      path: '/shorts',
      name: 'shortsTop',
      component: ShortsTopView,
      beforeEnter: async (to, from, next) => {
        const query = gql`
query GetShortPosts {
  posts (
    where: { isShorts: true }
    orderBy: postedAt_DESC
    first: 1
  ) {
    slug
  }
}
`;
        const response = await apolloClient.query({ query: query })
        const slug = response.data.posts[0].slug;
        next({ name: 'shorts', params: { slug: slug } })
      }
    },
    {
      path: '/info',
      component: InfoView
    },
    // ↓最初から書いてあった
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    
    // 404
    // 呼び出し側：params「pathMatch」に配列を渡す。
    // router.push({ name: 'not-found', params: { pathMatch: ['aaa', 'bbb', 'ccc'] } })
    // URL→/aaa/bbb/ccc
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },

    // 404その2 pathMatch に配列を指定しない場合はこっち(するとエラー)
    // ↓router.push({name: 'not-found', params: { pathMatch: 'aaa'} })
    // URL→/aaa
    // {
    //   path: '/:pathMatch(.*)',
    //   name: 'not-found',
    //   component: NotFoundView
    // },
  ]
})

export default router
