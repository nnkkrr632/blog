<script setup lang="ts">
//Vue3.2では直接definePropsにimportした型をあてられないらしい
import type { Tag } from '../plugins/interfaces';
interface Props extends Omit<Tag, ''> {}

const props = defineProps<{ tags: Props[] }>();
console.log('ここはTagsComponent。props↓');
console.log(props);
</script>
<template>
  <ul class="flex flex-wrap mt-1">
    <RouterLink
      v-for="tag in props.tags"
      :key="tag.slug"
      :to="{ name: 'list-by-tag', params: { tagSlug: tag.slug } }"

    >
      <li class="list-none text-blue-600 mr-3">#{{ tag.name }}</li>
    </RouterLink>
  </ul>
</template>
