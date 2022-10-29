<script setup lang="ts">
const props = defineProps<{ isShortsRoute: Boolean; }>();
</script>

<template>
    <footer class="sm:hidden flex items-center bg-gray-50 w-full h-14 z-50 bottom-0 fixed">
        <!-- ホーム -->
        <RouterLink to="/" class="basis-1/4 flex flex-col items-center h-full pt-1 hover:bg-gray-200 rounded-md">
            <span class="material-symbols-outlined">home</span>
            <div class="text-[7px]">ホーム</div>
        </RouterLink>
        <!-- ショート -->
        <RouterLink :to="{ name: 'shortsTop' }"
            class="basis-1/4 flex flex-col items-center h-full pt-1 hover:bg-gray-200 rounded-md"
            :class="{ 'router-link-active': props.isShortsRoute }">
            <span class="material-symbols-outlined">electric_bolt</span>
            <div class="text-[7px]">ショート</div>
        </RouterLink>
        <!-- タグ一覧 -->
        <RouterLink :to="{ name: 'tags' }"
            class="basis-1/4 flex flex-col items-center h-full pt-1 hover:bg-gray-200 rounded-md">
            <span class="material-symbols-outlined">tag</span>
            <div class="text-[7px]">タグ一覧</div>
        </RouterLink>
        <!-- 情報 -->
        <RouterLink to="/info" class="basis-1/4 flex flex-col items-center h-full pt-1 hover:bg-gray-200 rounded-md">
            <span class="material-symbols-outlined ">info</span>
            <div class="text-[7px]">情報</div>
        </RouterLink>
    </footer>
</template>

<style lang="scss" scoped>
.material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}

.router-link-active {
    .material-symbols-outlined {
        font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
    }

    background-color: rgb(209 213 219);
    font-weight: bold;

    &:hover {
        background-color: rgb(156 163 175);
    }
}
</style>