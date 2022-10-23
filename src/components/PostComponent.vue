<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import type { Post } from '../plugins/interfaces';
import DateComponent from './DateComponent.vue';

//Vue3.2では直接definePropsにimportした型をあてられないらしい
interface Props extends Omit<Post, ''> {}
const props = defineProps<{ post: Props; flameUrl: string }>();
console.log('props', props);
</script>

<template>
  <RouterLink
    :to="{ name: 'detail', params: { slug: props.post.slug } }"
    class="bg-gray-100 p-2 pb-8 text-start break-words font-semibold"
  >
    <!-- 画像 -->
    <div class="relative">
      <img
        class="w-full"
        :class="{ absolute: props.post.isShorts }"
        :src="props.post.image.url"
      />
      <img v-if="props.post.isShorts" class="w-full" :src="props.flameUrl" />
    </div>

    <div id="text-area" class="mx-3">
      <h3 :title="props.post.title" class="bg-slate-200 line-clamp-2 text-lg mt-2">
        {{ props.post.title }} {{ props.post.isShorts ? '#shorts' : '' }}
      </h3>
      <p :title="props.post.description" class="bg-slate-400 line-clamp-4 mt-1 text-slate-500">
        {{ props.post.description }}
      </p>
      <DateComponent
        :postedAt="props.post.postedAt"
        :revisedAt="props.post.revisedAt"
      />
      <!-- タグs -->
      <ul class="flex flex-wrap mt-1">
        <RouterLink
          v-for="tag in props.post.tags"
          :key="tag.slug"
          :to="{ name: 'list-by-tag', params: { tagId: tag.slug } }"
        >
          <li class="list-none text-sky-600 mr-4">#{{ tag.name }}</li>
        </RouterLink>
      </ul>
    </div>
  </RouterLink>
</template>
