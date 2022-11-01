<script setup lang="ts">
import { ref } from 'vue';
import type { Post } from '@/plugins/interfaces';
import DateComponent from './DateComponent.vue';
import TagsComponent from './TagsComponent.vue';

//Vue3.2では直接definePropsにimportした型をあてられないらしい
interface Props extends Omit<Post, ''> {}
const props = defineProps<{ post: Props; }>();
console.log('props', props);

const editedTitle = ref(props.post.isShorts ? props.post.title + ' #shorts' : props.post.title);
</script>

<template>
  <RouterLink
    :to="{ name: 'detail', params: { slug: props.post.slug } }"
    class="sm:px-2 pb-4 text-start break-words font-semibold hover:bg-gray-100"
  >
    <!-- 画像 -->
    <div class="relative">
      <img
        class="w-full sm:rounded-lg"
        :class="{ absolute: props.post.isShorts }"
        :src="props.post.image.url"
      />
      <img v-if="props.post.isShorts" class="w-full sm:rounded-lg" src="https://media.graphassets.com/rWtEJuPZTMm9U4sPsKLV" />
    </div>

    <div id="text-area" class="mx-3">
      <h3 :title="editedTitle" class="line-clamp-3 text-lg mt-1 font-semibold">
        {{ editedTitle }}
      </h3>
      <p :title="props.post.description" class="line-clamp-6 mt-1 text-gray-500 text-sm">
        {{ props.post.description }}
      </p>
      <DateComponent
        :postedAt="props.post.postedAt"
        :revisedAt="props.post.revisedAt ?? ''"
      />
      <!-- タグs -->
      <TagsComponent v-bind:tags="props.post.tags" />

    </div>
  </RouterLink>
</template>
