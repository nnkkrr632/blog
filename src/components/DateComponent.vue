<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

const props = defineProps<{ postedAt: string; revisedAt: string }>();
console.log('ここはDateComponentのprops↓', props);

const postDate = ref(new Date(props.postedAt));
const revisedDate = ref(new Date(props.revisedAt));
console.log('postDate↓', postDate);
console.log('revisedDate↓', revisedDate);
if (revisedDate.value) {
  console.log('revisedDateはtrue');
} else {
  console.log('revisedDateはfalse');
}
</script>

<template>
  <div class="flex flex-wrap space-x-3 bg-gray-300">
    <!-- 作成日 -->
    <div class="flex flex-wrap bg-slate-100">
      <span class="material-symbols-outlined opacity-60 mr-1">edit</span>
      <time
        :datetime="props.postedAt"
        class="text-slate-500 bg-white"
        >{{ postDate.toLocaleDateString() }}</time
      >
    </div>
    <!-- 更新日 -->
    <div v-if="Number(revisedDate)" class="flex flex-wrap bg-slate-100">
      <span class="material-symbols-outlined opacity-60 mr-1">update</span>
      <time
        :datetime="props.revisedAt"
        class="text-slate-500 bg-white"
        >{{ revisedDate.toLocaleDateString() }}</time
      >
    </div>
  </div>
</template>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20;
}
</style>
