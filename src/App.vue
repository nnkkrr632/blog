<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import SideBar from './components/SideBar.vue';
</script>

<template>
  <div>
    <head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <!-- <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/styles/github-dark.css" /> -->
    </head>
    <div>
      <!-- ヘッダー -->
      <div>
        <div class="flex bg-slate-400 px-5 py-3 hover:bg-slate-300">
          <span class="material-symbols-outlined mr-5 cursor-pointer"
            >menu</span
          >
          <h1 class="cursor-pointer">nrブログ</h1>
        </div>
      </div>

      <div class="flex">
        <!-- サイドバー -->
        <SideBar class="hidden sm:flex"/>
        <!-- メイン -->
        <div class="bg-slate-600 px-2 sm:px-3 xl:px-5 py-3 w-full box-border">
          <main>
            <RouterView />
          </main>
        </div>
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
