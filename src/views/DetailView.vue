<script setup lang="ts">
import { ref, onUpdated, onMounted, watchEffect, onBeforeUpdate, watch} from 'vue';
import { useRouter, useRoute } from 'vue-router';

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

//data句
const post = ref<Post>();
const relatedPosts = ref<Post[]>([]);

//apollo
const { client } = useApolloClient();
const fetchPost = async () => {
  try {
    const query = gql`
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
    const { data: { post: fetchedPost } } = await client.query({
      query: query,
      variables: { slug: props.slug },
    });

    console.log('DetailViewで記事詳細を取得');
    post.value = fetchedPost;
    console.log('post.value', post.value);
  } catch (e) {
    console.log('DetailVIew。fetchPost()でエラー発生');
    console.log(e);
  }
};
const fetchRelatedPosts = async () => {
  console.log('fetchRelatedPosts開始')
  // そもそもpost取得できなかったら不要
  if(!post.value) {
    return;
  }
  try {
    const relatedPostsQuery = gql`
      query GetRelatedPosts($slug: String, $tagSlugs: [String]) {
        posts(
          where: {
            AND: [{ slug_not: $slug }, { tags_some: { slug_in: $tagSlugs } }]
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
      }
    `;
    const { data: { posts: fetchedPosts } } = await client.query({
      query: relatedPostsQuery,
      variables: {
        slug: post.value.slug,
        tagSlugs: post.value.tags.map((tag) => tag.slug),
      },
    });
    console.log('関連ポスト取得');
    relatedPosts.value = fetchedPosts;
    console.log('relatedPosts.value', relatedPosts.value);
  } catch (e) {
    console.log('DetailVIew。fetchRelatedPosts()でエラー発生');
    console.log(e);
  }
};

const router = useRouter();
const route = useRoute();
onMounted(async () => {
  console.log('★DetailVIewでonMounted');
  await fetchPost();
  if (!post.value) {
    router.push({ name: 'not-found', params: { pathMatch: ['posts', `${route.params.slug}`] } })
  }
  await fetchRelatedPosts();
});

// 同じURL群(posts/)でのレンダリング更新
onBeforeUpdate(async () => {
  console.log('★★★DetailViewでonUpdated')
  await fetchPost();
  await fetchRelatedPosts();
});

// watchEffect(async () => {
//   console.log('HomeViewでwatchEffect開始')
//   const 
//   const currentIndex = postSlugs.value.findIndex(postSlug => postSlug.slug === post.value.slug)
//   leftPostSlug.value = postSlugs.value[currentIndex - 1]?.slug;
//   rightPostSlug.value = postSlugs.value[currentIndex + 1]?.slug;
//   console.log('leftPostSlug.value→', leftPostSlug.value)
//   console.log('rightPostSlug.value→', rightPostSlug.value)
// })

// watch(route, async () => [await fetchPost(), await fetchRelatedPosts()]);

</script>

<template>
  <div v-if="post" class="px-3 sm:px-4 py-5 break-all w-full text-start">
    <DetailComponent :post="post" />

    <h2 class="pt-12 sm:pt-20 pb-5 xl:pb-10 border-t-2">
      <span class="px-[10px] py-[6px] text-gray-100 xl:text-lg bg-gray-800 rounded-lg">関連記事</span>
    </h2>
    <div class="flex flex-wrap flex-col">
      <PostFlatComponent v-for="post in relatedPosts" :key="post.slug" :post="post" />
    </div>
  </div>
</template>
