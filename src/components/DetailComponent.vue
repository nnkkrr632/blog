<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import type { Post } from '../plugins/interfaces';
// マークダウン関連
import { marked } from 'marked';
import hljs from 'highlight.js';
//部品
import TagsComponent from './TagsComponent.vue';
import DateComponent from './DateComponent.vue';


//Vue3.2では直接definePropsにimportした型をあてられないらしい
interface Props extends Omit<Post, ''> {}
const props = defineProps<{ post: Props;}>();
console.log('ここはDetailComponent.vue。props', props);


//marked
marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value;
  }, // シンタックスハイライトに使用する関数の設定
  breaks: true, // falseにすると改行入力は末尾の半角スペース2つになる
  silent: false, // trueにするとパースに失敗してもExceptionを投げなくなる
});

const body = marked(props.post.markdown)

</script>

<template class="bg-gray-200">
  <div class="bg-white px-2 sm:px-3 xl:px-8 py-5 break-all w-full text-start">
      <TagsComponent :tags="props.post.tags"></TagsComponent>
      <h1 class="text-3xl font-bold w-full break-words">{{ props.post.title }}</h1>
      <p>{{ props.post.description }}</p>
      <!-- <DateComponent
        :postedAt="post.postedAt"
        :revisedAt="post.revisedAt ?? ''"
      /> -->

      <p>{{ props.post.postedAt }}</p>
      <p>{{ props.post.revisedAt }}</p>
      <!-- 本文 -->
      <section id="body-section">
        <p v-html="body"></p>
      </section>
  </div>
</template>


