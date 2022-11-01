<script setup lang="ts">
import type { Tag } from '../plugins/interfaces';
interface Props extends Omit<Tag, ''> { }
const props = defineProps<{ tags: Props[] }>();
</script>

<template>
  <ul class="flex flex-wrap mt-1">
    <li v-for="tag in props.tags" :key="tag.slug" class="list-none">
      <RouterLink :to="{ name: 'list-by-tag', params: { tagSlug: tag.slug } }"
        class="text-sky-600 mr-3 hover:bg-gray-300">#{{ tag.name }}</RouterLink>
    </li>
  </ul>
</template>
