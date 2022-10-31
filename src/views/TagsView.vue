<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
//共通型
import type { HasPostsTag } from '@/plugins/interfaces';
import { getTags } from '@/plugins/myLibrary';


// タグ一覧
const tags = ref<HasPostsTag[]>([]);
onMounted(async () => {
    tags.value = await getTags() ?? []
    console.log('ここはTagsView。onMounted。tags.value→', tags.value)
})
</script>

<template>
    <div class="m-2 min-h-[calc(100vh-6rem)]">
        <h1 class="text-xl sm:font-semibold border-b pb-1 my-5">すべてのタグ</h1>
        <div class="flex">
            <ul class="flex flex-col space-y-3 w-full pl-6 sm:pl-20 xl:pl-32 pr-10 sm:space-y-5 sm:basis-4/6">
                <li v-for="tag in tags" :key="tag.slug" :tag="tag">
                    <!-- アイコンとテキストの横並び -->
                    <RouterLink :to="{ name: 'list-by-tag', params: { tagSlug: tag.slug } }"
                        class="flex flex-wrap justify-between items-center hover:bg-gray-100 rounded-lg">
                        <div class="flex items-center">
                            <img :src="tag.image.url" class="bg-white rounded-full w-10 h-10 sm:w-16 sm:h-16 mr-4 sm:mr-32" />
                            <!-- テキストの縦並び -->
                            <div class="flex sm:flex-col">
                                <h2 class="sm:text-xl">{{ tag.name }}</h2>
                                <div class="text-gray-500 text-sm mt-2 hidden sm:flex">{{ tag.posts.length }} 本の記事</div>
                            </div>
                        </div>
                        <div class="sm:hidden text-gray-500 text-sm">{{ tag.posts.length }} 本の記事</div>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}

.router-link-active {
    .material-symbols-outlined {
        font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
    }

    div,
    li {
        background-color: rgb(209 213 219);
        font-weight: bold;

        &:hover {
            background-color: rgb(156 163 175);
        }
    }
}
</style>
