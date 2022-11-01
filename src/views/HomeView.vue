<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PostComponent from '@/components/PostComponent.vue';
import { useApolloClient } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import type { Post, HeadParams } from '../plugins/interfaces';

// postsの取得
const posts = ref<Post[]>([]);
const fetchPosts = async () => {
  try {
    const { client } = useApolloClient();
    const { data: { posts: fetchedPosts } } = await client.query({
      query: gql`
        query {
          posts (
            orderBy: postedAt_DESC
            first: 100
          ){
            slug
            title
            description
            isShorts
            postedAt
            revisedAt
            image {
              id
              url(
                transformation: {
                  image: { resize: { width: 320, height: 180, fit: crop } }
                }
              )
            }
            tags {
              id
              name
              slug
            }
          }
        }
      `,
    });
    posts.value = fetchedPosts;
  } catch (e) {
    // console.log('HomeViewでエラー発生');
    // console.log(e);
  }
};

//<head>用
const emit = defineEmits<{ (event: "updateHeadParams", params: HeadParams): void }>()
const executeEmit = () => {
  const params: HeadParams = {
    title: `nrpan's技術ブログ`,
    description: `nrpan's技術ブログです。TypeScriptやVue.jsを中心に、仕事や個人の学びを残します(予定)。`,
  }
  emit('updateHeadParams', params)
}

onMounted(async () => {
  await fetchPosts();
  executeEmit();
});
</script>

<template>
  <div v-if="posts" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 sm:w-[95%] 2xl:max-w-screen-2xl mx-auto sm:pt-5">
    <PostComponent v-for="post in posts" :key="post.slug" :post="post" />
  </div>
</template>
