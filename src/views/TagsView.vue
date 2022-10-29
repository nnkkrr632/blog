<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { ref, reactive, onMounted, computed } from 'vue';
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
    <div class="m-5 min-h-[calc(100vh-6rem)]">
        <h1 class="text-xl sm:font-semibold border-b pb-1 mb-5">すべてのタグ</h1>
        <div class="flex">
            <div class="hidden sm:block basis-1/12"></div>
            <ul class="flex flex-col space-y-3 sm:space-y-5 basis-10/12">
                <li v-for="tag in tags" :key="tag.slug" :tag="tag">
                    <!-- アイコンとテキストの横並び -->
                    <RouterLink :to="{ name: 'list-by-tag', params: { tagSlug: tag.slug } }"
                        class="flex flex-wrap items-center hover:bg-gray-50">
                        <img :src="tag.image.url" class="bg-white rounded-full w-10 h-10 sm:w-32 sm:h-32 mr-4 sm:mr-32" />
                        <!-- テキストの縦並び -->
                        <div class="flex flex-col">
                            <h2 class="sm:text-xl sm:font-semibold">{{ tag.name }}</h2>
                            <div class="text-gray-600 text-sm mb-1 hidden sm:flex">
                                <div>{{ tag.posts.length }} 本の記事</div>
                                <ul class="hidden">
                                    <li v-for="post in tag.posts" :key="post.slug" :post="post" class="">
                                        <RouterLink :to="{ name: 'detail', params: { slug: post.slug } }">・{{ post.title
                                        }}
                                        </RouterLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </RouterLink>
                </li>
            </ul>
            <div class="hidden sm:block basis-1/12"></div>
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
