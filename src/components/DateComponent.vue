<script setup lang="ts">
const props = defineProps<{ postedAt: string; revisedAt?: string }>();
</script>

<template>
  <div class="flex flex-wrap mt-1">
    <!-- 作成日 -->
    <div class="flex flex-wrap mr-3">
      <span class="material-symbols-outlined opacity-60 mr-1">edit</span>
      <time :datetime="props.postedAt" class="text-gray-500">{{
          props.postedAt.replaceAll('-', '/')
      }}</time>
    </div>
    <!-- 更新日 -->
    <div v-if="props.revisedAt" class="flex flex-wrap">
      <span class="material-symbols-outlined opacity-60 mr-1">update</span>
      <time :datetime="props.revisedAt" class="text-gray-500">{{
          props.revisedAt.replaceAll('-', '/')
      }}</time>
    </div>
  </div>
</template>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20;
}
</style>
