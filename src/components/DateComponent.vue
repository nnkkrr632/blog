<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

const props = defineProps<{ postedAt: string; revisedAt: string }>();
console.log('ここはDateComponentのprops↓', props);

const state = reactive({
  postDate: new Date(0),
  revisedDate: new Date(0)
})
state.postDate = new Date(props.postedAt);
state.revisedDate = new Date(props.revisedAt)

console.log('postDate↓', state.postDate);
console.log('revisedDate↓', state.revisedDate);
</script>

<template>
  <div class="flex flex-wrap bg-gray-300">
    <!-- 作成日 -->
    <div class="flex flex-wrap bg-slate-100 mr-3">
      <span class="material-symbols-outlined opacity-60 mr-1">edit</span>
      <time
        :datetime="props.postedAt"
        class="text-slate-500 bg-white"
        >{{ state.postDate.toLocaleDateString() }}</time
      >
    </div>
    <!-- 更新日 -->
    <div v-if="Number(state.revisedDate)" class="flex flex-wrap bg-slate-100">
      <span class="material-symbols-outlined opacity-60 mr-1">update</span>
      <time
        :datetime="props.revisedAt"
        class="text-slate-500 bg-white"
        >{{ state.revisedDate.toLocaleDateString() }}</time
      >
    </div>
  </div>
</template>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20;
}
</style>
