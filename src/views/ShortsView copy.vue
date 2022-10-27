<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import ShortComponent from '../components/ShortComponent.vue';
import DetailComponent from '../components/DetailComponent.vue';
import { useApolloClient } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import type { Post } from '../plugins/interfaces';



const posts = ref<Post[]>([]);
const targetPost = ref<{ index: number, post: Post }>({ index: 0, post: {} });

const { client } = useApolloClient();
const getPosts = async () => {
    try {
        const response = await client.query({
            query: gql`
        query {
          posts {
            slug
            title
            description
            isShorts
            postedAt
            revisedAt
            markdown
            tags {
              name
              slug
            }
          }
        }
      `,
        });
        console.log('ここはShortsView取得response↓');
        console.log(response);
        posts.value = response.data.posts;
        console.log('posts', posts);
        console.log('posts.value', posts.value);
        console.log('posts.value', posts.value);
        console.log('posts.length', posts.value.length);
        targetPost.value.index = 0;
        targetPost.value.post = posts.value[0];

    } catch (e) {
        console.log('エラー発生');
        console.log(e);
    }
};

const getRightPost = () => {
    console.log('getRightPost発動。')
    targetPost.value.index++;
    targetPost.value.post = posts.value[targetPost.value.index]
    console.log('ターゲットのインデックス↓')
    console.log(targetPost.value.index)
    console.log('ターゲットのポスト↓')
    console.log(targetPost.value.post)
}
const getLeftPost = () => {
    console.log('getLeftPost発動。')
    targetPost.value.index--;
    targetPost.value.post = posts.value[targetPost.value.index]
    console.log('ターゲットのインデックス↓')
    console.log(targetPost.value.index)
    console.log('ターゲットのポスト↓')
    console.log(targetPost.value.post)
}
onMounted(() => {
    // getPosts();
});
</script>

<template>
    <div class="bg-gray-200 text-start">
        <RouterLink to="/test">ここはShortsビュー</RouterLink>
        <button @click="getPosts">記事取得ボタン</button>

        <div class="flex items-center">
            <button :disabled="targetPost.index === 0"
                class="flex-1 disabled:text-slate-100" @click="getLeftPost">
                <span class="material-symbols-outlined">arrow_back_ios</span>
            </button>
            <div class="w-11/12">
                <DetailComponent :post="targetPost.post"
                    class="p-3 bg-orange-300 overflow-y-auto h-[calc(100vh-3.5rem)]" />
            </div>
            <button :disabled="targetPost.index === posts.length-1"
                class="flex-1 disabled:text-slate-100" @click="getRightPost">
                <span class="material-symbols-outlined">arrow_forward_ios</span>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.material-symbols-outlined {
    font-variation-settings:
        'FILL' 1,
        'wght' 700,
        'GRAD' 200,
        'opsz' 48;
    font-size: 40px;
}
</style>