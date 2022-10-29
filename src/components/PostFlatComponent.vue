<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import type { Post } from '../plugins/interfaces';
import DateComponent from './DateComponent.vue';
import TagsComponent from './TagsComponent.vue';

//Vue3.2では直接definePropsにimportした型をあてられないらしい
interface PostProps extends Omit<Post, ''> {}
const props = defineProps<{ post: PostProps; }>();
console.log('props', props);

const editedTitle = ref(
  props.post.isShorts ? props.post.title + ' #shorts' : props.post.title
);
</script>

<template>
  <RouterLink
    :to="{ name: 'detail', params: { slug: props.post.slug } }"
    class="flex flex-wrap items-center xl:items-start bg-gray-100 p-1 xl:p-2 text-start break-words font-semibold hover:bg-slate-200"
  >
    <!-- 画像 -->
    <div class="relative border-y w-32 xl:w-64">
      <img
        class="rounded-lg"
        :class="{ absolute: props.post.isShorts }"
        :src="props.post.image.url"
      />
      <img v-if="props.post.isShorts" class="rounded-lg" src="https://media.graphassets.com/xILXABzYRBqpxv0HGiWk" />
    </div>

    <!-- テキスト -->
    <div class="flex-1 text-area mx-3">
      <h3 :title="editedTitle" class="bg-slate-200 line-clamp-4 xl:text-lg">
        {{ editedTitle }}
      </h3>
      <p
        :title="props.post.description"
        class="hidden bg-slate-400 xl:line-clamp-4 mt-1 text-slate-500 text-sm"
      >
        {{ props.post.description }}
      </p>

      <div class="flex flex-wrap">
        <DateComponent :postedAt="props.post.postedAt" />
        <!-- タグs -->
        <TagsComponent v-bind:tags="props.post.tags" />
      </div>
    </div>
  </RouterLink>
</template>
