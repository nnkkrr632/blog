<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useRoute } from 'vue-router';

import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import SideBar from './components/SideBar.vue';

const route = useRoute();
const isShortsRoute = computed(() => {
  return route.name === 'shorts'
})


// const displayHeader = () => {
//   console.log("横スクロール：" + window.scrollX);
//     console.log("縦スクロール：" + window.scrollY);
// }

// onMounted(() => {
//   window.addEventListener('scroll', displayHeader);
// });
// onUnmounted( () => {
//   window.removeEventListener('scroll', displayHeader)
// })


</script>

<template>
  <div>

    <head>
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <meta property="og:url" content=" ページのURL" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content="nrpan's技術情報" />
      <meta property="og:description" content=" ページの説明文" />
      <meta property="og:site_name" content="nrpan's技術情報" />
      <meta property="og:image" content="https://media.graphassets.com/resize=fit:crop,height:630,width:1200/rbxXTlktSqGvZ2snvv5g" />
    </head>
    <div class="bg-white">
      <!-- ヘッダー -->
      <!-- <HeaderComponent /> -->

      <!-- 中身 -->
      <div class="flex">
        <!-- サイドバー -->
        <SideBar :isShortsRoute="isShortsRoute" />
        <!-- 中身 -->
        <!-- <div class="bg-gray-600 px-2 sm:px-3 xl:px-5 py-3 w-full box-border break-all"> -->
        <main class="break-all w-full sm:w-[calc(100%-4rem)] xl:w-[calc(100%-15rem)] mb-14 sm:mb-0">
          <RouterView />
        </main>
      </div>

      <!-- フッター -->
      <FooterComponent :isShortsRoute="isShortsRoute" />
    </div>
  </div>
</template>
