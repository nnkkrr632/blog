<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

//GraphQL
import { useApolloClient } from '@vue/apollo-composable';
import gql from 'graphql-tag';
//共通型
import type { Post } from '../plugins/interfaces';
//部品
import DetailComponent from '../components/DetailComponent.vue';
import PostFlatComponent from '../components/PostFlatComponent.vue';

//VueRouterからURLの受け取り
const props = defineProps<{ slug: string }>();
console.log('ここはDetailView。props↓');
console.log(props);
console.log('ここはDetailView。props.slug↓');
console.log(props.slug);

//data句
const post = ref<Post>({});
const relatedPosts = ref<Post[]>([]);
const flameUrl = ref('flameUrl');

//apollo
const { client } = useApolloClient();
const getContents = async () => {
  try {
    //ポスト詳細取得
    const postQuery = gql`
      query GetPost($slug: String) {
        post(where: { slug: $slug }) {
          slug
          title
          description
          isShorts
          postedAt
          revisedAt
          image {
            url
          }
          tags {
            slug
            name
          }
          markdown
        }
      }
    `;
    const response = await client.query({
      query: postQuery,
      variables: { slug: props.slug },
    });

    console.log('DetailViewで記事詳細を取得');
    console.log(response);
    post.value = response.data.post;
    console.log('post.value', post.value);

    //関連ポスト取得
    const relatedPostsQuery = gql`
      query GetRelatedPosts($slug: String, $tags: [String]) {
        posts(
          where: {
            AND: [{ slug_not: $slug }, { tags_some: { slug_in: $tags } }]
          }
          orderBy: postedAt_DESC
          first: 10
        ) {
          slug
          title
          description
          isShorts
          postedAt
          revisedAt
          image {
            url(
              transformation: {
                image: { resize: { width: 320, height: 180, fit: crop } }
              }
            )
          }
          tags {
            name
            slug
          }
        }
        materials(where: { name: "shorts" }) {
          image {
            url
          }
        }
      }
    `;
    const response2 = await client.query({
      query: relatedPostsQuery,
      variables: {
        slug: post.value.slug,
        tags: post.value.tags.map((tag) => tag.slug),
      },
    });
    console.log('関連ポスト取得');
    console.log(response2);
    console.log(response2.data);
    relatedPosts.value = response2.data.posts;
    flameUrl.value = response2.data.materials.image.url;
  } catch (e) {
    console.log('エラー発生');
    console.log(e);
  }
};
</script>

<template>
  <div>
    ここは記事詳細ページ
    あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

    <p>---------------------------</p>
    <p>---------------------------</p>
    <p>---------------------------</p>
    <p>---------------------------</p>
    <p>---------------------------</p>
    <p>---------------------------</p>
    <button @click="getContents">ボタン</button>
    <DetailComponent :post="post" />

    <h2 class="mt-10 mb-5">
      <span
        class="p-2 border-t-2 xl:text-lg bg-slate-300 border-slate-400 rounded-full"
        >関連記事</span
      >
    </h2>
    <div class="flex flex-wrap flex-col">
      <PostFlatComponent
        v-for="post in relatedPosts"
        :key="post.id"
        :post="post"
        :flameUrl="flameUrl"
      />
    </div>
  </div>
</template>
