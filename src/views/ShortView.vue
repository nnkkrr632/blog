<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DetailComponent from '../components/DetailComponent.vue';
import { useApolloClient } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import type { Post, HeadParams } from '../plugins/interfaces';

const router = useRouter();
const route = useRoute();

//ショートポスツの取得
const posts = ref<Post[]>();
const fetchShortPosts = async () => {
  try {
    const query = gql`
        query GetShortPosts {
          posts (
            where: { isShorts: true }
            orderBy: postedAt_DESC
            first: 100
          ) {
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
            image {
              url
            }
        }
      }
      `;
    const { client } = useApolloClient();
    const { data: { posts: fetchedPosts } } = await client.query({ query: query });
    posts.value = fetchedPosts
    console.log('SHORT全件取得→', posts.value)
  } catch (e) {
    console.log('ShortViewのfetchでエラー発生');
    console.log(e);
  }
};

onMounted(async () => {
  console.log('■ShortViewでonMounted')
  await fetchShortPosts();
  if (!post.value) {
    router.push({ name: 'not-found', params: { pathMatch: ['shorts', `${route.params.slug}`] } })
  }
});

// 現在のポスト& 左右矢印のポスト をはめ込む
const post = ref<Post>();
const leftPostSlug = ref<string>();
const rightPostSlug = ref<string>();
const embedPosts = () => {
  console.log('embedPosts()開始')
  if (posts.value) {
    post.value = posts.value.find(post => post.slug === route.params.slug)
    const currentPostIndex = posts.value.findIndex(post => post.slug === route.params.slug)
    leftPostSlug.value = posts.value[currentPostIndex - 1]?.slug;
    rightPostSlug.value = posts.value[currentPostIndex + 1]?.slug;
  }
}

//headタグ用
const emit = defineEmits<{ (event: "updateHeadParams", params: HeadParams): void }>()
const executeEmit = () => {
  if (post.value) {
    const params: HeadParams = {
      title: `${post.value.title} #shorts`,
      description: post.value.description,
      imageUrl: post.value.image.url
    }
    emit('updateHeadParams', params)
  }
}

// watchEffectはonMounted前に開始される
watchEffect(() => {
  console.log('▲▲ShortVIewでwatchEffect()開始')
  embedPosts()
  executeEmit();
})
</script>

<template>
  <div v-if="post">
    <!-- フレックス -->
    <div class="text-start flex items-center">
      <!-- 左ボタン -->
      <div class="hidden sm:block sm:flex-1 text-right">
        <RouterLink v-if="leftPostSlug" :to="{ name: 'shorts', params: { slug: leftPostSlug } }" class="hover:bg-white">
          <span class="material-symbols-outlined">arrow_back_ios</span>
        </RouterLink>
        <span v-else class="material-symbols-outlined text-gray-200">arrow_back_ios</span>
      </div>

      <!-- 記事 -->
      <div class="w-full sm:w-[88%] 2xl:max-w-screen-2xl">
        <DetailComponent :post="post"
          class="px-3 xl:px-5 sm:py-3 sm:pb-10 overflow-y-auto h-[calc(100vh-6rem)] sm:h-screen" />
      </div>

      <!-- 右ボタン -->
      <div class="hidden sm:block sm:flex-1 pl-2">
        <RouterLink v-if="rightPostSlug" :to="{ name: 'shorts', params: { slug: rightPostSlug } }"
          class="hover:bg-white">
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </RouterLink>
        <span v-else class="material-symbols-outlined text-gray-200">arrow_forward_ios</span>
      </div>
    </div>

    <!-- スマホ用固定フッター -->
    <div id="sp-footer" class="bg-white flex justify-around h-10 pt-[2px] sm:hidden">
      <!-- 左ボタン -->
      <div class="flex flex-col items-center">
        <RouterLink v-if="leftPostSlug" :to="{ name: 'shorts', params: { slug: leftPostSlug } }" class="hover:bg-white">
          <span class="material-symbols-outlined">arrow_back_ios</span>
        </RouterLink>
        <span v-else class="material-symbols-outlined text-gray-200">arrow_back_ios</span>
      </div>
      <!-- 右ボタン -->
      <div class="flex flex-col items-center">
        <RouterLink v-if="rightPostSlug" :to="{ name: 'shorts', params: { slug: rightPostSlug } }"
          class="hover:bg-white">
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </RouterLink>
        <span v-else class="material-symbols-outlined text-gray-200">arrow_forward_ios</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 700,
    'GRAD' 200,
    'opsz' 48;
}

#sp-footer .material-symbols-outlined {
  font-size: 30px;
}

@media screen and (min-width:640px) {
  .material-symbols-outlined {
    font-size: 40px;
  }
}
</style>