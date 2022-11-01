<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import type { Post } from '../plugins/interfaces';
import { marked } from 'marked';
import hljs from 'highlight.js';
import TagsComponent from './TagsComponent.vue';

//Vue3.2では直接definePropsにimportした型をあてられないらしい
interface Props extends Omit<Post, ''> { }
const props = defineProps<{ post: Props; }>();

//marked
marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value;
  }, // シンタックスハイライトに使用する関数の設定
  breaks: true, // falseにすると改行入力は末尾の半角スペース2つになる
  silent: false, // trueにするとパースに失敗してもExceptionを投げなくなる
});
const htmlDescription = ref('');
const body = ref('');
const h2List = ref<string[]>();
const editedTitle = ref('');
//shortsではAPIfetchなしにデータだけ入れ替えで入ってくるのでwatchして反映する
watchEffect(() => {
  console.log('DetailComponentでwatchEffectの分岐入った。markdown→HTML変換と目次の生成とタイトルの編集を行う')
  htmlDescription.value = marked(props.post.description)
  body.value = marked(props.post.markdown)
  const matches = Array.from(body.value.matchAll(/<h2 id="(.*)">/g));
  h2List.value = matches.map(match => match[1])
  editedTitle.value = props.post.isShorts ? props.post.title + ' #shorts' : props.post.title
})

// シェアボタン用
const route = useRoute();
const pageUrl = import.meta.env.VITE_SITE_DOMAIN + route.fullPath
</script>

<template>
  <article class="sm:text-base">
    <h1 class="text-xl sm:text-3xl font-bold py-2 border-b">{{ editedTitle }}</h1>
    <!-- 概要欄 -->
    <section class="bg-gray-100 p-3 mt-4 mb-2 rounded-lg">
      <div class="flex flex-col sm:flex-row sm:space-x-5">
        <p><time :datetime="post.postedAt" class="font-bold">{{ post.postedAt.replaceAll('-', '/') }}</time> に公開済み</p>
        <p v-if="post.revisedAt"><time :datetime="post.revisedAt" class="font-bold">{{
            post.revisedAt.replaceAll('-', '/')
        }}</time> に編集済み</p>
      </div>
      <div id="description" v-html="htmlDescription" class="my-3"></div>
      <!-- 目次 -->
      <div id="toc" v-if="h2List?.length" class="scroll-pt-4 snap-y">
        <div class="w-2/3 sm:w-1/3 border-y border-gray-600 border-dashed py-1 my-2"></div>
        <ul class="flex flex-col">
          <li v-for="(h2, index) of h2List" :key="index" class="flex flex-col">
            <div class="flex">
              ・
              <a :href="`#${h2}`" class="text-sky-600 snap-start hover:bg-gray-300">{{ h2 }}</a>
            </div>
            <span v-if="index !== h2List.length - 1">↓</span>
          </li>
        </ul>
        <div class="w-2/3 sm:w-1/3 border-y border-gray-600 border-dashed py-1 mt-2 mb-4"></div>
      </div>
      <TagsComponent v-bind:tags="props.post.tags" />
    </section>
    <!-- 本文 -->
    <section id="body-section">
      <p v-html="body"></p>
    </section>
    <!-- 共有 -->
    <section class="my-4 mx-4  flex justify-end">
      <div class="bg-gray-100 flex px-3 py-[2px] rounded-full items-center space-x-2">
        <span class="material-symbols-outlined">google_plus_reshare</span>
        <span>共有</span>
        <!-- はてな -->
        <a :href="`https://b.hatena.ne.jp/entry/panel/?url=${pageUrl}&title=${post.title}`" target="_blank"
          class="hover:bg-gray-100"><img class="mx-2"
            src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加"
            width="30" height="30" style="border: none;" /></a>
        <!-- twitter -->
        <a :href="`http://twitter.com/share?url=${pageUrl}&text=${post.title}&related=nrpans`" target="_blank"
          class="hover:bg-gray-100"><img
            src="https://media.graphassets.com/resize=height:33,width:33/8da1NC6PRiwZmmkFvJTZ" /></a>
      </div>
    </section>
  </article>
</template>


<style lang="scss" scoped>
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 200,
    'opsz' 48
}

#body-section {
  ::v-deep(pre) {
    padding: 12px;
    box-sizing: border-box;
    margin-bottom: 12px;
    border-radius: 0.5rem;
    background-color: rgb(30 41 59);
    overflow-x: auto;
    color: white;
    width: 100%;
  }

  ::v-deep(:not(pre) > code) {
    font-style: italic;
    background-color: rgb(229 231 235);
    padding: 3px 6px;
    margin: 0 1px;
    border-radius: 0.2rem;
  }

  ::v-deep(table) {
    margin: 0.6rem 0 1.2rem;

    tr {
      box-sizing: border-box;
      display: table-row;
      border: solid rgb(100 116 139) 1px;

      th {
        padding: 0.5rem;
        font-weight: bold;
        background-color: rgb(243 244 246);
        border: solid rgb(100 116 139) 1px;
      }

      td {
        padding: 0.5rem;
        background: white;
        border: solid rgb(100 116 139) 1px;
      }
    }
  }

  ::v-deep(a) {
    color: rgb(2 132 199);
    border-bottom: solid 1px;

    &:hover {
      background-color: rgb(255 255 255);
    }
  }

  ::v-deep(p + p) {
    margin: 1rem 0 0;
  }

  ::v-deep(h2) {
    margin: 2.5rem 0 1.2rem;
    font-weight: bold;
    font-size: 1.5rem;
    padding: 0 0 0.1rem;
    border-bottom: 1px solid rgb(203 213 225);
  }

  ::v-deep(h3) {
    margin: 1.8rem 0 0.8rem;
    font-weight: bold;
    font-size: 1.3rem;
  }

  ::v-deep(h4) {
    margin: 1rem 0 0.5rem;
    font-weight: bold;
    font-size: 1.1rem;
  }

  ::v-deep(img) {
    margin: 0.2rem 0 1.2rem;
  }

  ::v-deep(blockquote) {
    border-left: 0.25rem solid rgb(229 231 235);
    padding: 0 1rem;
    color: rgb(107 114 128);
  }

  ::v-deep(li) {
    padding: 0.2rem 0;
  }

  ::v-deep(ul) {
    margin: 0.4rem 0 0.4rem 1rem;

    li {
      text-indent: -1rem;
      padding-left: 1rem;

      &::before {
        content: '・';
        font-size: 120%;
      }
    }
  }

  ::v-deep(ol) {
    margin: 0.4rem 0 0.4rem 1rem;

    li {
      list-style-position: inside;
      list-style-type: decimal;
      text-indent: -1rem;
      padding-left: 1rem;
    }
  }

  ::v-deep(li ol),
  ::v-deep(li ul) {
    margin: 0 0 0 0.8rem;
  }
}
</style>

<!-- node_modules/hightlight.js/styles/github-dark.cssから読み込んでいる -->
<style src="highlight.js/styles/github-dark.css">

</style>
