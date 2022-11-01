<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApolloClient } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import type { Post, Tag, HeadParams } from '../plugins/interfaces';
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
const tag = ref<Tag>();
const fetchTagAndPosts = async () => {
  try {
    const { client } = useApolloClient();
    const { data: { posts: fetchedPosts, tag: fetchedTag } } = await client.query({
    // const response = await client.query({
      // 変数を使う場合はqueryの後ろの()に {$変数名: 変数の型} を指定する(変数の型はなぜか大文字 ○:String ×:string)
      query: gql`
        query GetTagPosts($tagSlug: String) {
          posts (
            where: { tags_some: { slug: $tagSlug } }
            orderBy: postedAt_DESC
            first: 100
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
          tag (where: { slug: $tagSlug }) {
            slug
            name
            image {
              url
            }
          }
        }
      `,
      variables: {
        tagSlug: props.tagSlug,
      },
    });
    console.log('ListByTagViewでfetchTagAndPosts()成功。')
    posts.value = fetchedPosts;
    tag.value = fetchedTag;
  } catch (e) {
    console.log('ListByTagViewでエラー発生');
    console.log(e);
  }
};

//<head>用
const emit = defineEmits<{ (event: "updateHeadParams", params: HeadParams): void }>()
const executeEmit = () => {
  if (tag.value) {
    const params: HeadParams = {
      title: `#${tag.value.name} の記事`,
      description: `#${tag.value.name}に関する記事を表示しています。`,
      imageUrl: tag.value.image.url
    }
    emit('updateHeadParams', params)
  }
}

// watchEffectはonMountedの前に開始されるので，onMounted()でfetchする必要がない
watchEffect(async () => {
  console.log('●●ListByTagViewでwatchEffect()開始')
  await fetchTagAndPosts();
  if (posts.value.length) {
    executeEmit();
  } else {
    router.push({ name: 'not-found', params: { pathMatch: ['tags', `${route.params.tagSlug}`] } })
  }

})
</script>

<template>
  <div v-if="tag && posts">
    <h1 class="text-xl sm:font-semibold border-b pb-1 my-5 mx-2">#{{ tag.name }} の記事</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 sm:w-[95%] 2xl:max-w-screen-2xl mx-auto">
      <PostComponent v-for="post in posts" :key="post.slug" :post="post" />
    </div>
  </div>
</template>
