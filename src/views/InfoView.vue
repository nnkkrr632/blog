<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApolloClient } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import type { HeadParams } from '../plugins/interfaces';

const postsCount = ref(0);
const fetchPostsCount = async () => {
  try {
    const query = gql`
    query PostsCount {
  postsConnection ( stage: PUBLISHED ){
    aggregate {
      count
    }
  }
}`;
    const { client } = useApolloClient();
    const { data: { postsConnection: { aggregate: { count : fetchedPostsCount } } } } = await client.query({ query: query });
    postsCount.value = fetchedPostsCount
  } catch (e) {
    // console.log('fetchPostsCount()でエラー発生');
    // console.log(e);
  }
};

//<head>用
  const emit = defineEmits<{ (event: "updateHeadParams", params: HeadParams): void }>()
const executeEmit = () => {
    const params: HeadParams = {
      title: `情報`,
      description: `nrpan's技術ブログの情報を表示しています。`,
    }
    emit('updateHeadParams', params)
  }

onMounted(() => {
  fetchPostsCount();
  executeEmit();
});

</script>
<template>
  <div class=" min-h-[calc(100vh-3.5rem)]">
    <img src="https://media.graphassets.com/resize=fit:crop,height:400,width:2500/rbxXTlktSqGvZ2snvv5g" alt="情報ページのヘッダー写真"/>

    <div class="pt-4 px-6 sm:px-20 border-b">
      <div class="flex flex-wrap items-center space-x-4">
        <img src="https://avatars.githubusercontent.com/u/91203083" class="block w-14 sm:w-20 rounded-full" alt="プロフィールアイコン"/>
        <div>
          <h1 class="text-lg sm:text-2xl">
            nrpan's技術ブログ
          </h1>
          <div class="mt-1 text-sm text-gray-500">記事数 {{ postsCount }}記事</div>
        </div>
      </div>
      <div class="pt-4 pb-2">
        <span class="px-5 py-2 border-b-2 border-gray-700 text-sm">概要</span>
      </div>
    </div>
    <!-- flex -->
    <div class="flex flex-col sm:flex-row text-sm px-6 sm:px-20 space-y-12 sm:space-y-0 sm:space-x-32">
      <div class="basis-3/5">
        <dl>
          <dt class="text-base mt-6 sm:mt-9 mb-5">説明</dt>
          <dd class="border-b pb-8">
            2022年からITエンジニアとして働いています。<br />仕事や個人での学び・メモを残したいと思います(予定)。
          </dd>
          <dt class="text-base my-5">詳細</dt>
          <dd class="border-b pb-9 text-gray-500 text-xs">
            <span class="pr-8">場所:</span>日本
          </dd>
          <dt class="text-base my-5">リンク</dt>
          <div class="flex flex-wrap border-b pb-9">
            <dd class="basis-1/2">
              <a href="https://github.com/nnkkrr632" target="_blank" class="text-sky-600 hover:bg-white">GitHub</a>
            </dd>
            <dd class="basis-1/2">
              <a href="https://twitter.com/nrpans" target="_blank" class="text-sky-600 hover:bg-white">Twitter</a>
            </dd>
            <!-- <dd class="basis-1/2 mt-6">
              <a href="" target="_blank" class="text-sky-600">Zenn</a>
            </dd> -->
          </div>
        </dl>
      </div>
      <div class="basis-2/5">
        <div class="text-base border-b py-3 mt-3 sm:mt-6">統計情報</div>
        <div class="py-3 border-b">2022/11/06 に作成</div>
        <div class="py-3 border-b">{{ postsCount }} 記事</div>

        <div class="text-base border-b py-3 mt-12">技術情報</div>
        <dl>
          <dt class="pt-3 text-gray-500">フロントエンド</dt>
          <dd class="pb-3 border-b">TypeScript + Vue3 + Tailwind CSS</dd>
          <dt class="pt-3 text-gray-500">コンテンツ管理</dt>
          <dd class="pb-3 border-b">Hygraph (GraphCMS)</dd>
          <dt class="pt-3 text-gray-500">ホスティング</dt>
          <dd class="pb-3 border-b mb-8">Vercel</dd>
        </dl>
      </div>
    </div>
  </div>
</template>
