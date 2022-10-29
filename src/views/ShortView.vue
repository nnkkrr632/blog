<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUpdate, watchEffect, onUpdated, onUnmounted} from 'vue';
import DetailComponent from '../components/DetailComponent.vue';
import { useApolloClient } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import type { Post } from '../plugins/interfaces';
import { useRouter } from 'vue-router';

//VueRouterからURLの受け取り
const props = defineProps<{ slug: string }>();
console.log('ここはShortsView。props.slug', props.slug)

//コンテンツの取得
const post = ref<Post>({});
const postSlugs = ref<{slug: string}[]>([]);
const leftPostSlug = ref<string>('');
const rightPostSlug = ref<string>('');

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
    const { client } = useApolloClient();
    const response = await client.query({
      query: query,
      variables: { slug: props.slug },
    });
    console.log('ここはShortsView取得response↓');
    console.log(response);
    post.value = response.data.post;
    postSlugs.value = response.data.posts;
  } catch (e) {
    console.log('エラー発生');
    console.log(e);
  }
};

//最初の画面ロード時はAPIでデータ取得前でnullが入ってくる。API取得後にbodyを生成できるようwatchを使う
watchEffect(() => {
  console.log('ShortViewでwatchEffectの分岐入った。左右の矢印URLを更新する')
  const currentIndex = postSlugs.value.findIndex(postSlug => postSlug.slug === post.value.slug)
  leftPostSlug.value = postSlugs.value[currentIndex - 1]?.slug;
  rightPostSlug.value = postSlugs.value[currentIndex + 1]?.slug;
  console.log('postSlugs.value→', postSlugs.value)
  console.log('leftPostSlug.value→', leftPostSlug.value)
  console.log('rightPostSlug.value→', rightPostSlug.value)
})

onMounted(() => {
  console.log('ShortViewでオンマウンテッド')
  getContents();
});

// // キーボードで記事移動
// const router = useRouter();
// const getNeighborPostByKey = (e: KeyboardEvent) => {
//   console.log('getNeighborPost')
//     if (e.key === 'left') {
//       console.log('leftキーが押された')
//         router.push('/home')
//     } else if (e.key === 'right') {
//       console.log('rightキーが押された')
//       router.push( {name: 'shorts', params: { slug: rightPostSlug } })
//     }
// }

// onMounted(() => {
//     window.addEventListener('keypress', (e) => {
//         getNeighborPostByKey(e);
//     });
// });
// onUnmounted(() => {
//     window.removeEventListener('keypress', (e) => {
//         getNeighborPostByKey(e);
//     });
// })

// 矢印ボタンでの記事移動
onUpdated(() => {
  console.log('ShortViewでonUpdated')
  getContents();
});

</script>

<template>
  <div>
    <!-- フレックス -->
    <div class="text-start flex items-center">
      <!-- 左ボタン -->
      <div class="hidden sm:inline-block sm:flex-1">
        <span v-if="leftPostSlug === undefined" class="material-symbols-outlined text-gray-200">arrow_back_ios</span>
        <RouterLink v-else :to="{ name: 'shorts', params: { slug: leftPostSlug } }" class="hover:bg-gray-50">
          <span class="material-symbols-outlined">arrow_back_ios</span>
        </RouterLink>
      </div>

      <!-- 記事 -->
      <div class="w-full sm:w-11/12">
        <DetailComponent :post="post" class="px-3 xl:px-5 pt-3 pb-10 overflow-y-auto h-[calc(100vh-6rem)] sm:h-screen" />
      </div>

      <!-- 右ボタン -->
      <div class="hidden sm:inline-block sm:flex-1">
        <span v-if="rightPostSlug === undefined" class="material-symbols-outlined text-gray-200">arrow_forward_ios</span>
        <RouterLink v-else :to="{ name: 'shorts', params: { slug: rightPostSlug } }" class="hover:bg-gray-50">
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </RouterLink>
      </div>
    </div>

    <!-- スマホ用固定フッター -->
    <div id="sp-footer" class="bg-gray-50 flex h-10 pt-[2px] sm:hidden">
      <div class="basis-1/6"></div>
      <!-- 左ボタン -->
      <div class="basis-1/6 flex flex-col items-center">
        <span v-if="leftPostSlug === undefined" class="material-symbols-outlined text-gray-200">arrow_back_ios</span>
        <RouterLink v-else :to="{ name: 'shorts', params: { slug: leftPostSlug } }" class="hover:bg-gray-50">
          <span class="material-symbols-outlined">arrow_back_ios</span>
        </RouterLink>
      </div>
      <div class="basis-1/6"></div>
      <div class="basis-1/6"></div>
      <!-- 右ボタン -->
      <div class="basis-1/6 flex flex-col items-center">
      <span v-if="rightPostSlug === undefined" class="material-symbols-outlined text-gray-200">arrow_forward_ios</span>
      <RouterLink v-else :to="{ name: 'shorts', params: { slug: rightPostSlug } }" class="hover:bg-gray-50">
        <span class="material-symbols-outlined">arrow_forward_ios</span>
      </RouterLink>
      </div>
      <div class="basis-1/6"></div>

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