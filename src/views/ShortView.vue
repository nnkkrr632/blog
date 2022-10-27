<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUpdate, watchEffect, } from 'vue';
import DetailComponent from '../components/DetailComponent.vue';
import { useApolloClient } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import type { Post } from '../plugins/interfaces';

//VueRouterからURLの受け取り
const props = defineProps<{ slug: string }>();
console.log('ここはShortsView。props.slug', props.slug)

const post = ref<Post>({});
const shortPosts = ref<Post[]>([]);

const leftPostSlug = ref<string>();
const rightPostSlug = ref<string>();

const { client } = useApolloClient();
const getContents = async () => {
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

    const response = await client.query({
      query: query,
      variables: { slug: props.slug },
    });
    console.log('ここはShortsView取得response↓');
    console.log(response);
    post.value = response.data.post;
    shortPosts.value = response.data.posts;

  } catch (e) {
    console.log('エラー発生');
    console.log(e);
  }
};

// const getRightPost = () => {
//     console.log('getRightPost発動。')
//     targetPost.value.index++;
//     targetPost.value.post = posts.value[targetPost.value.index]
//     console.log('ターゲットのインデックス↓')
//     console.log(targetPost.value.index)
//     console.log('ターゲットのポスト↓')
//     console.log(targetPost.value.post)
// }

//最初の画面ロード時はAPIでデータ取得前でnullが入ってくる。API取得後にbodyを生成できるようwatchを使う
watchEffect(() => {
  console.log('watchEffectの分岐入った')
  const currentIndex = shortPosts.value.findIndex(shortPost => shortPost.slug === post.value.slug)
  leftPostSlug.value = shortPosts.value[currentIndex - 1]?.slug;
  rightPostSlug.value = shortPosts.value[currentIndex + 1]?.slug;
  console.log('shortPosts.value→', shortPosts.value)
  console.log('leftPostSlug.value→', leftPostSlug.value)
  console.log('rightPostSlug.value→', rightPostSlug.value)
})

onMounted(() => {
  console.log('ShortViewでオンマウンテッド')
  getContents();
});

// 矢印ボタンでの記事移動
onBeforeUpdate(() => {
  console.log('ShortViewでonBeforeUpdate')
  getContents();
});

</script>

<template>
  <div class="bg-gray-200 text-start">
    <!-- <button @click="getContents">記事取得ボタン</button> -->

    <div class="flex items-center">
      <!-- 左ボタン -->
      <div class="hidden sm:inline-block sm:flex-1">
        <span v-if="leftPostSlug === undefined" class="material-symbols-outlined text-slate-100">arrow_back_ios</span>
        <RouterLink v-else :to="{ name: 'short', params: { slug: leftPostSlug } }">
          <span class="material-symbols-outlined">arrow_back_ios</span>
        </RouterLink>
      </div>

      <!-- 記事 -->
      <div class="w-full sm:w-11/12">
        <DetailComponent :post="post" class="px-3 xl:px-5 pt-3 bg-orange-300 overflow-y-auto h-[calc(100vh-3.5rem)]" />
      </div>

      <!-- 右ボタン -->
      <div class="hidden sm:inline-block sm:flex-1">
        <span v-if="rightPostSlug === undefined"
          class="material-symbols-outlined text-slate-100">arrow_forward_ios</span>
        <RouterLink v-else :to="{ name: 'short', params: { slug: rightPostSlug } }">
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </RouterLink>
      </div>
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
  font-size: 18px;
}

@media screen and (min-width:640px) {
  .material-symbols-outlined {
  font-size: 40px;
}
}
</style>