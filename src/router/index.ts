import { createRouter, createWebHistory } from 'vue-router'
//GraphQL
import { useApolloClient, provideApolloClient, useQuery, useResult } from '@vue/apollo-composable';
import apolloClient from '@/plugins/apolloClient';
import gql from 'graphql-tag';


import HomeView from '../views/HomeView.vue'
import ListByTagView from '../views/ListByTag.vue'
import DetailView from '../views/DetailView.vue'
import ShortView from '../views/ShortView.vue'
import ShortsTopView from '../views/ShortsTopView.vue'
import TagsView from '../views/TagsView.vue'
import InfoView from '../views/InfoView.vue'
import TestView from '../views/TestView.vue'
import { computed } from 'vue';

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
        console.log('beforeEnter発動。')
        console.log(to)
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
        const response = await apolloClient.query({
          query: query
        })
        const slug = response.data.posts[0].slug;
        console.log(response)
        console.log(response.data.posts)
        console.log(response.data.posts[0].slug)
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

    {
      path: '/tags',
      name: 'tags',
      component: TagsView
    },
    {
      path: '/tags/:tagSlug',
      name: 'list-by-tag',
      component: ListByTagView
    },
    {
      path: '/test',
      name: 'test',
      component: TestView,
    },
  ]
})

export default router
