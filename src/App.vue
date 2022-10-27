<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import SideBar from './components/SideBar.vue';
</script>

<template>
  <div>

    <head>
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </head>
    <div>
      <!-- ヘッダー -->
      <div>
        <div class="flex items-center bg-slate-400 h-14 px-5">
          <span class="material-symbols-outlined mr-5 cursor-pointer">menu</span>
          <RouterLink to="/">
            <h1 class="cursor-pointer text-xl pb-1">🍳 nrpan's技術情報</h1>
          </RouterLink>

        </div>
      </div>

      <div class="flex">
        <!-- サイドバー -->
        <SideBar />
        <!-- メイン -->
        <!-- <div class="bg-slate-600 px-2 sm:px-3 xl:px-5 py-3 w-full box-border break-all"> -->
        <main class="bg-slate-600 break-all w-full sm:w-[calc(100%-64px)] xl:w-[calc(100%-240px)]">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
}
</style>
