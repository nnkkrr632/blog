<script setup lang="ts">
import {computed} from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute(); 
const isShortsRoute = computed( () => {
  return route.name === 'shorts'
})
</script>

<template>
    <header class="hidden sm:flex items-center bg-gray-400 h-14 px-5" :class="{ 'hidden': isShortsRoute }">
        <!-- <span class="material-symbols-outlined mr-5 cursor-pointer">menu</span> -->
        <RouterLink to="/">
            <h1 class="cursor-pointer text-xl pb-1">🍳 nrpan's技術ブログ</h1>
        </RouterLink>
    </header>
</template>