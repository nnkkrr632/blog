<script setup lang="ts">
const props = defineProps<{ postedAt: string; revisedAt?: string }>();
</script>

<template>
  <div class="flex flex-wrap mt-1">
    <!-- 作成日 -->
    <time :datetime="props.postedAt" class="text-gray-500">{{
        props.postedAt.replaceAll('-', '/')
    }}</time>
    <!-- 更新日 -->
    <span v-if="props.revisedAt" class="ml-2 text-gray-500">
      (+<time :datetime="props.revisedAt">{{
          props.revisedAt.replaceAll('-', '/')
      }}</time>)
    </span>
  </div>
</template>
