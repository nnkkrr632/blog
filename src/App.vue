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

      <div class="sm:flex">
        <!-- サイドバー -->
        <SideBar class="hidden sm:inline-block" />
        <!-- メイン -->
        <div class="content">
          <main class="flex flex-wrap">
            <RouterView />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  flex: 1;
  background-color: #b3d874;
  text-align: center;
}

.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}
</style>
