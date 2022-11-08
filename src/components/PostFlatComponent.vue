<script setup lang="ts">
import { ref } from 'vue';
import type { Post } from '../plugins/interfaces';
import DateComponent from './DateComponent.vue';
import TagsComponent from './TagsComponent.vue';

//Vue3.2では直接definePropsにimportした型をあてられないらしい
interface PostProps extends Omit<Post, ''> { }
const props = defineProps<{ post: PostProps; }>();

const editedTitle = ref(props.post.isShorts ? props.post.title + ' #shorts' : props.post.title);
</script>

<template>
  <div>
    <RouterLink :to="{ name: 'detail', params: { slug: props.post.slug } }"
      class="flex flex-wrap items-center xl:items-start p-1 xl:p-2 text-start break-words font-semibold hover:bg-gray-100">
      <!-- 画像 -->
      <div class="relative w-32 xl:w-64">
        <img class="rounded-lg" :class="{ absolute: props.post.isShorts }" :src="props.post.image.url" :alt="props.post.title"/>
        <img v-if="props.post.isShorts" class="rounded-lg" src="https://media.graphassets.com/rWtEJuPZTMm9U4sPsKLV" alt="shortsFrame" />
      </div>

      <!-- テキスト -->
      <div class="flex-1 mx-3">
        <h3 :title="editedTitle" class="line-clamp-4 xl:font-semibold xl:text-lg">
          {{ editedTitle }}
        </h3>
        <p :title="props.post.description" class="hidden xl:line-clamp-4 mt-1 text-gray-500 text-sm">
          {{ props.post.description }}
        </p>

        <div class="flex flex-wrap xl:flex-col">
          <DateComponent :postedAt="props.post.postedAt" class="mr-2 xl:mr-0" />
          <!-- タグs -->
          <TagsComponent v-bind:tags="props.post.tags" />
        </div>
      </div>
    </RouterLink>
  </div>
</template>
