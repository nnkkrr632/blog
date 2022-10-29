<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import PostComponent from '../components/PostComponent.vue';
import { useApolloClient } from '@vue/apollo-composable';
import gql from 'graphql-tag';

// import type {
//   AxiosInstance,
//   AxiosRequestConfig,
//   AxiosResponse,
//   AxiosError,
// } from 'axios';
// import axiosClient from '../plugins/axiosClient';
import type { apiResponse, Post } from '../plugins/interfaces';

// const options: AxiosRequestConfig = {
//   url: '/posts?orders=-publishedAt,-revisedAt&limit=9999',
//   method: 'GET',
// };
const posts = ref<Post[]>([]);
// const getPosts = async () => {
//   try {
//     console.log(import.meta.env.VITE_API_KEY);
//     console.log(import.meta.env.API_KEY);
//     const response: AxiosResponse<apiResponse<Post>> = await axiosClient(
//       options
//     );
//     console.log('ここはHomeView2での記事ゲット。response↓');
//     console.log(response);
//     posts.value = response.data.contents;
//     console.log('posts', posts);
//     console.log('posts.value', posts.value);
//   } catch (e: AxiosError) {
//     console.log('エラー発生');
//     console.log(e);
//   }
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
      // variables: someVariablesIfNeeded,
    });
    console.log('取得');
    console.log(response);
    posts.value = response.data.posts;
    console.log('posts', posts);
    console.log('posts.value', posts.value);

    console.log('flame', response.data.materials);
  } catch (e) {
    console.log('エラー発生');
    console.log(e);
  }
};

onMounted( async () => {
  await getPosts();
});
</script>

<template>
  <div>
    bbbb
    <button @click="getPosts">ボタン</button>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      <PostComponent v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>
