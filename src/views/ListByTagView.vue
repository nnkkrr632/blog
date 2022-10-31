<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApolloClient } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import type { Post } from '../plugins/interfaces';
import PostComponent from '@/components/PostComponent.vue';

//VueRouterからURLの受け取り
const props = defineProps<{ tagSlug: string }>();
console.log('○○ props.tagSlug の更新？→', props.tagSlug)

// ★useRouterはsetupスコープに定義する必要がある
// @see https://stackoverflow.com/questions/70222571/vue-3-vue-router-4-typeerror-cannot-read-properties-of-undefined-reading-p
const router = useRouter();
const route = useRoute();

// postsの取得
const posts = ref<Post[]>([]);
const fetchPosts = async () => {
  try {
    const { client } = useApolloClient();
    const { data: { posts: fetchedPosts } } = await client.query({
      // 変数を使う場合はqueryの後ろの()に {$変数名: 変数の型} を指定する(変数の型はなぜか大文字 ○:String ×:string)
      query: gql`
        query GetTagPosts($tagSlug: String) {
          posts (where: {tags_some: { slug: $tagSlug } }) {
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
      `,
      variables: {
        tagSlug: props.tagSlug,
      },
    });
    posts.value = fetchedPosts;
  } catch (e) {
    console.log('ListByTagViewでエラー発生');
    console.log(e);
  }
};

onMounted(async () => {
  await fetchPosts();
  if (!posts.value.length) {
    router.push({ name: 'not-found', params: { pathMatch: ['tags', `${route.params.tagSlug}`] } })
  }
});

const tagName = ref('');
watchEffect(async () => {
  console.log('●●ListByTagでwatchEffect()開始')
  await fetchPosts();
  // タグ名のセットはここでよい。 onMountedされた後にもwatchが走ってる。
  tagName.value = posts.value[0].tags.find(tag => tag.slug === route.params.tagSlug)?.name ?? ''
})
</script>

<template>
  <div class="">
    <h1 class="text-xl sm:font-semibold border-b pb-1 my-5 mx-2">#{{ tagName }} の記事</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      <PostComponent v-for="post in posts" :key="post.slug" :post="post" />
    </div>
  </div>

</template>
