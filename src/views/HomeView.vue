<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PostComponent from '@/components/PostComponent.vue';
import { useApolloClient } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import type { Post } from '../plugins/interfaces';

// postsの取得
const posts = ref<Post[]>([]);
const fetchPosts = async () => {
  try {
    const { client } = useApolloClient();
    const { data: { posts: fetchedPosts } } = await client.query({
      query: gql`
        query {
          posts (orderBy: postedAt_DESC, first: 100){
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
    console.log('HomeViewでエラー発生');
    console.log(e);
  }
};
onMounted(async () => {
  await fetchPosts();
});
</script>

<template>
    <div v-if="posts" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 sm:pt-5">
      <PostComponent v-for="post in posts" :key="post.slug" :post="post" />
    </div>
</template>
