import { createRouter, createWebHistory } from 'vue-router'
// GraphQL
import { provideApolloClient } from '@vue/apollo-composable';
import apolloClient from '@/plugins/apolloClient';
import gql from 'graphql-tag';
// view
import HomeView from '@/views/HomeView.vue'
import ListByTagView from '@/views/ListByTagView.vue'
import DetailView from '@/views/DetailView.vue'
import ShortsView from '@/views/ShortsView.vue'
import ShortsTopView from '@/views/ShortsTopView.vue'
import TagsView from '@/views/TagsView.vue'
import InfoView from '@/views/InfoView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

import AreaView from '@/views/AreaView.vue'
import AreaIdView from '@/views/AreaIdView.vue'
import AreaNameView from '@/views/AreaNameView.vue'

provideApolloClient(apolloClient)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 };
    }
  },
  routes: [

    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // パラメータが数字にマッチ
    // 例. area/1, area/999
    {
      path: '/:areaId([1-9][0-9]*)',
      name: 'area-id',
      component: AreaIdView
    },
    // パラメータが1文字以上の半角英字にマッチ
    // 例. area/shinjuku, area/naha
    {
      path: '/:areaName([a-z]+)',
      name: 'area-name',
      component: AreaNameView
    },
    // 都道府県、都道府県/市区町村、都道府県/市区町村/町名 にマッチ
    // 例. tokyo, tokyo/shibuya, tokyo/setagaya/mishuku
    {
      path: '/area/:area+',
      name: 'area',
      component: AreaView
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
      component: ShortsView,
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
        const slug = response.data.posts[0]?.slug;
        if (slug) {
          next({ name: 'shorts', params: { slug: slug } })
        } else {
          next();
        }
      }
    },
    {
      path: '/info',
      name: 'info',
      component: InfoView
    },
    {
      path: '/o/:orderId',
      name: 'info',
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
      path: '/:matchAnything(.*)*',
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
