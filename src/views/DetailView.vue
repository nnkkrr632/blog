<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
//GraphQL
import { useApolloClient } from '@vue/apollo-composable';
import gql from 'graphql-tag';
//共通型
import type { Post, HeadParams } from '../plugins/interfaces';
//部品
import DetailComponent from '../components/DetailComponent.vue';
import PostFlatComponent from '../components/PostFlatComponent.vue';

const props = defineProps<{ slug: string }>();

// fetch
const { client } = useApolloClient();
const post = ref<Post>();
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

    console.log('★DetailViewでfetchPost');
    post.value = fetchedPost;
  } catch (e) {
    console.log('DetailVIew。fetchPost()でエラー発生');
    console.log(e);
  }
};
const relatedPosts = ref<Post[]>([]);
const fetchRelatedPosts = async () => {
  console.log('fetchRelatedPosts開始')
  if (post.value) {
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
      console.log('★DetailViewでfetchRelatedPost。結果↓');
      relatedPosts.value = fetchedPosts;
      console.log('relatedPosts.value', relatedPosts.value);
    } catch (e) {
      console.log('DetailVIew。fetchRelatedPosts()でエラー発生');
      console.log(e);
    }
  }
};

//headタグ用
const emit = defineEmits<{ (event: "updateHeadParams", params: HeadParams): void }>()
const executeEmit = () => {
  if (post.value) {
    const params: HeadParams = {
      title: post.value.title,
      description: post.value.description,
      imageUrl: post.value.image.url
    }
    emit('updateHeadParams', params)
  }
}

const router = useRouter();
const route = useRoute();
// ★onMounted前に開始され，propsの変更からフックされるのでonMounted()でfetchしなくてよい
watchEffect(async () => {
  console.log('●●DetailViewでwatchEffect()フックされた')
  await fetchPost();
  if (post.value) {
    await fetchRelatedPosts();
  } else {
    router.push({ name: 'not-found', params: { pathMatch: ['posts', `${route.params.slug}`] } })
  }
  executeEmit();
})
</script>

<template>
  <div v-if="post" class="px-3 sm:px-4 py-5 break-all w-full text-start 2xl:max-w-screen-2xl mx-auto">
    <DetailComponent :post="post" />

    <aside>
      <div class="pt-12 sm:pt-20 pb-5 xl:pb-10 border-t-2">
        <h2 class="inline px-[10px] py-[6px] text-gray-100 xl:text-lg bg-gray-800 rounded-lg">関連記事</h2>
      </div>
      <div class="flex flex-wrap flex-col">
        <PostFlatComponent v-for="post in relatedPosts" :key="post.slug" :post="post" />
      </div>
    </aside>
  </div>
</template>
