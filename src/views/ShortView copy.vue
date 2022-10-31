<script setup lang="ts">
import { ref, onMounted, watchEffect, onUpdated } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DetailComponent from '../components/DetailComponent.vue';
import { useApolloClient } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import type { Post } from '../plugins/interfaces';

//VueRouterからURLの受け取り
const props = defineProps<{ slug: string }>();
console.log('ここはShortsView。props.slug', props.slug)

//コンテンツの取得
const post = ref<Post>({});
const postSlugs = ref<{ slug: string }[]>([]);
const fetchContents = async () => {
  try {
    const query = gql`
        query GetShortPost($slug: String) {
          post (
            where: { slug: $slug }
          ){
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
          posts (
            where: { isShorts: true }
            orderBy: postedAt_DESC
          ) {
            slug
          }
        }
      `;
    const { client } = useApolloClient();
    const { data: { post: fetchedPost, posts: fetchedPostSlugs } } = await client.query({
      query: query,
      variables: { slug: props.slug },
    });
    post.value = fetchedPost
    console.log('POSTはあるの？→', post.value)
    postSlugs.value = fetchedPostSlugs
  } catch (e) {
    console.log('ShortViewのfetchでエラー発生');
    console.log(e);
  }
};

const router = useRouter();
const route = useRoute();
onMounted(async () => {
  console.log('■ShortViewでonMounted')
  await fetchContents();
  if (!post.value) {
    router.push({ name: 'not-found', params: {pathMatch: ['shorts', `${route.params.slug}`]}})
  }
});

//watch で左右矢印リンクの反映
const leftPostSlug = ref<string>('');
const rightPostSlug = ref<string>('');
const setNeighborPostSlugs = () => {
  console.log('XXXX。ShortViewで左右の矢印URLを更新するメソッド開始')
  const currentIndex = postSlugs.value.findIndex(postSlug => postSlug.slug === post.value.slug)
  leftPostSlug.value = postSlugs.value[currentIndex - 1]?.slug;
  rightPostSlug.value = postSlugs.value[currentIndex + 1]?.slug;
  console.log('leftPostSlug.value→', leftPostSlug.value)
  console.log('rightPostSlug.value→', rightPostSlug.value)
}
watchEffect( () => {
  console.log('▲▲ShortVIewでwatchEffect()開始')
  setNeighborPostSlugs()
})

//同じshorts/でのレンダリング更新
onUpdated(async () => {
  console.log('■■■ShortViewでonUpdated')
  // await fetchContents();
});

</script>

<template>
  <div>
    <!-- フレックス -->
    <div class="text-start flex items-center">
      <!-- 左ボタン -->
      <div class="hidden sm:inline-block sm:flex-1">
        <span v-if="!leftPostSlug" class="material-symbols-outlined text-gray-200">arrow_back_ios</span>
        <RouterLink v-else :to="{ name: 'shorts', params: { slug: leftPostSlug } }" class="hover:bg-gray-50">
          <span class="material-symbols-outlined">arrow_back_ios</span>
        </RouterLink>
      </div>

      <!-- 記事 -->
      <div class="w-full sm:w-11/12">
        <DetailComponent :post="post"
          class="px-3 xl:px-5 py-3 sm:pb-10 overflow-y-auto h-[calc(100vh-6rem)] sm:h-screen" />
      </div>

      <!-- 右ボタン -->
      <div class="hidden sm:inline-block sm:flex-1">
        <span v-if="!rightPostSlug"
          class="material-symbols-outlined text-gray-200">arrow_forward_ios</span>
        <RouterLink v-else :to="{ name: 'shorts', params: { slug: rightPostSlug } }" class="hover:bg-gray-50">
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </RouterLink>
      </div>
    </div>

    <!-- スマホ用固定フッター -->
    <div id="sp-footer" class="bg-gray-50 flex justify-around h-10 pt-[2px] sm:hidden">
      <!-- 左ボタン -->
      <div class="flex flex-col items-center">
        <span v-if="!leftPostSlug" class="material-symbols-outlined text-gray-200">arrow_back_ios</span>
        <RouterLink v-else :to="{ name: 'shorts', params: { slug: leftPostSlug } }" class="hover:bg-gray-50">
          <span class="material-symbols-outlined">arrow_back_ios</span>
        </RouterLink>
      </div>
      <!-- 右ボタン -->
      <div class="flex flex-col items-center">
        <span v-if="!rightPostSlug"
          class="material-symbols-outlined text-gray-200">arrow_forward_ios</span>
        <RouterLink v-else :to="{ name: 'shorts', params: { slug: rightPostSlug } }" class="hover:bg-gray-50">
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </RouterLink>
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
  font-size: 18px;
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