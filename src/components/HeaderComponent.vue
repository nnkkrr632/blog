<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
    <header class="hidden sm:flex items-center bg-gray-400 h-14 px-5" :class="{ 'hidden': route.name === 'shorts' }">
        <RouterLink to="/">
            <h1 class="cursor-pointer text-xl pb-1">ð³ nrpan'sæè¡ãã­ã°</h1>
        </RouterLink>
    </header>
</template>