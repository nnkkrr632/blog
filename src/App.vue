<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';
// import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import SidebarComponent from './components/SidebarComponent.vue';
import type { HeadParams } from '@/plugins/interfaces';

const route = useRoute();
const isShortsRoute = computed(() => {
  return route.name === 'shorts'
})

// <head>
const siteDomain = import.meta.env.VITE_SITE_DOMAIN
const headParams = ref<HeadParams>({
  title: `nrpan's技術ブログ`,
  description: `404 Not Found`,
  imageUrl: "https://media.graphassets.com/resize=fit:crop,height:630,width:1200/rbxXTlktSqGvZ2snvv5g"
})
const reflectParams = (emittedHeadParams: HeadParams) => {
  if (route.name !== 'home') {
    emittedHeadParams.title += ` - nrpan's技術ブログ`
  }
  emittedHeadParams.description = emittedHeadParams.description?.replaceAll('\n', '');
  headParams.value = { ...headParams.value, ...emittedHeadParams };
}
</script>

<template>
  <div>
    <!-- App.vueの↓<head>がbodyの中なのに反映される不思議 -->

    <head>
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <link rel="canonical" :href="siteDomain + route.fullPath" />
      <meta v-if="route.name === 'not-found'" name="robots" content="noindex, nofollow" />
      <title>{{ headParams.title }}</title>
      <meta name="description" :content="headParams.description" />
      <!-- OGP -->
      <meta property="og:url" :content="siteDomain + route.fullPath" />
      <meta property="og:type" content="article" />
      <meta property="og:title" :content="headParams.title" />
      <meta property="og:description" :content="headParams.description" />
      <meta property="og:site_name" content="nrpan's技術ブログ" />
      <meta property="og:image" :content="headParams.imageUrl" />
      <meta property="og:locale" content="ja_JP" />
      <!-- twitter Card -->
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@nrpans" />
      <meta name="twitter:domain" :content='siteDomain' />
      <meta name="twitter:title" :content="headParams.title" />
      <meta name="twitter:description" :content="headParams.description" />
      <meta name="twitter:image" :content="headParams.imageUrl" />
    </head>
    <div>
      <!-- ヘッダー -->
      <!-- <HeaderComponent /> -->
      <!-- 中身 -->
      <div class="flex">
        <!-- サイドバー -->
        <SidebarComponent :isShortsRoute="isShortsRoute" />
        <!-- 中身 -->
        <main class="break-all w-full sm:w-[calc(100%-4rem)] xl:w-[calc(100%-15rem)] mb-14 sm:mb-0">
          <RouterView @updateHeadParams="reflectParams" />
        </main>
      </div>
      <!-- フッター -->
      <FooterComponent :isShortsRoute="isShortsRoute" />
    </div>
  </div>
</template>
