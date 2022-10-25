<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeMount, watchEffect} from 'vue';
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
console.log('markedでbodyにHTMLを注入。↓')
const body = ref<string>();

//最初の画面ロード時はAPIでデータ取得前でnullが入ってくる。API取得後にbodyを生成できるようwatchを使う
watchEffect( () => {
    console.log('watchEffectの分岐入った')
    if(props.post.markdown) {
        console.log('watchEffectのifの、props.post.markdownが存在する分岐クリア')
        body.value = marked(props.post.markdown) 
    }
    })

console.log('ここはDetailComponent.vue。body.value↓', body.value)

const sentence: string = `
# Hello World
**TITLE** 

\`const number = 1\`

\`\`\`js
function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\-highlight\b/) != -1)
      return process(block, true, 0x0F);
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }

  return (
    <div>
      <web-component>{block}</web-component>
    </div>
  )
}

export  $initHighlight;\`\`\`
# Hello World2

<h1>Hello World</h1>
`;

const jsonExample = `
\`\`\`json
{
  "data": {
    "authors": [
      {
        "name": "中村 享介",
        "affiliation": "PixelGrid Inc.",
        "title": "Jamstackエンジニア",
        "icon": {
          "url": "https://media.graphcms.com/08EPcNB2QwqcPWdriqBq"
        },
        "articles": [
          {
            "id": "cjyjugko1494j08304cbjki3z"
          }
          // 中略
       ],
        "slug": "kyosuke"
      }
      // 中略
    ]
  }
}
\`\`\`
`;

const html: string = marked(sentence);
const json: string = marked(jsonExample);

</script>

<template class="bg-gray-200">
  <div class="bg-white px-2 sm:px-3 xl:px-8 py-5 break-all w-full text-start">
    ここは記事詳細ページ
    あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

      <h1 class="text-3xl font-bold my-2">{{ props.post.title }}</h1>
      <DateComponent
        :postedAt="post.postedAt"
        :revisedAt="post.revisedAt ?? 0"
      />
      <TagsComponent :tags="props.post.tags"></TagsComponent>

      <p class="py-4 my-4 border-y-2">{{ props.post.description }}</p>
      <!-- 本文 -->
      <section id="body-section">
        <p v-html="body"></p>
      </section>
  </div>
</template>


<style lang="scss" scoped>
#body-section {
  ::v-deep(pre) {
    padding: 12px;
    box-sizing: border-box;
    margin-bottom: 12px;
    border-radius: 0.375rem;
    background-color: rgb(30 41 59);
    overflow-x: auto;
    color: white;
    width: 100%;
  }

  ::v-deep(:not(pre) > code) {
    font-style: italic;
    background-color: rgb(226 232 240);
    padding: 4px 6px;
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
        background-color: rgb(203 213 225);
        border: solid rgb(100 116 139) 1px;
      }
      td {
        padding: 0.5rem;
        background: white;
        border: solid rgb(100 116 139) 1px;
      }
    }
  }

  ::v-deep(p + p) {
    margin: 1rem 0 0;
  }

  ::v-deep(h2) {
    margin: 2.5rem 0 1.2rem;
    font-weight: bold;
    font-size: 1.6rem;
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
    border-left: 0.25rem solid rgb(226 232 240);
    padding: 0 1rem;
    color: rgb(71 85 105);
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
    margin: 0 0 0 1rem;
  }
}
</style>

<!-- node_modules/hightlight.js/styles/github-dark.cssから読み込んでいる -->
<style src="highlight.js/styles/github-dark.css"></style>
