<!-- <script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import DetailComponent from './DetailComponent.vue';

//Vue3.2では直接definePropsにimportした型をあてられないらしい
import type { Post } from '../plugins/interfaces';
interface Props extends Omit<Post, ''> { }

const props = defineProps<{ post: Props }>();
console.log('ここはShortComponent。props↓');
console.log(props);
</script>
<template>
    <div class="bg-red-400">
        <DetailComponent :post="props.post" />
    </div>
</template> -->
