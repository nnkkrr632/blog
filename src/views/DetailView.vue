<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

// マークダウン関連
import { marked } from 'marked';
import hljs from 'highlight.js';
//GraphQL
import { useApolloClient } from '@vue/apollo-composable';
import gql from 'graphql-tag';
//共通型
import type { Post } from '../plugins/interfaces';
//部品
import TagsComponent from '../components/TagsComponent.vue';
import DateComponent from '../components/DateComponent.vue';
import DetailComponent from '../components/DetailComponent.vue';

//VueRouterからURLの受け取り
const props = defineProps<{ slug: string }>();
console.log('ここはDetailView。props↓');
console.log(props);
console.log('ここはDetailView。props.slug↓');
console.log(props.slug);

//data句
const body = ref('');
const post = ref<Post>({});

//marked
marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value;
  }, // シンタックスハイライトに使用する関数の設定
  breaks: true, // falseにすると改行入力は末尾の半角スペース2つになる
  silent: false, // trueにするとパースに失敗してもExceptionを投げなくなる
});

//apollo
const { client } = useApolloClient();
const getPost = async () => {
  try {
    const response = await client.query({
      query: gql`
        query {
          post(where: { slug: "${props.slug}" }) {
            slug
            title
            description
            postedAt
            revisedAt
            image {
              url
            }
            tags {
              slug
              name
            }
            markdown
          }
        }
      `,
    });
    console.log('取得');
    console.log(response);
    post.value = response.data.post;
    console.log('post.value', post.value);
    //マークダウン
    body.value = marked(post.value.markdown);
    console.log(body);
  } catch (e) {
    console.log('エラー発生');
    console.log(e);
  }
};

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
console.log(html);

onMounted(() => {
  // getPost();
});
</script>

<template class="bg-gray-200">
  <div class="bg-white px-2 sm:px-3 xl:px-8 py-5 break-all w-full text-start">
    ここは記事詳細ページ
    あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

    <p>---------------------------</p>
    <p>---------------------------</p>
    <p>---------------------------</p>
    <p>---------------------------</p>
    <p>---------------------------</p>
    <p>---------------------------</p>
    <button @click="getPost">ボタン</button>
    <div>
      <TagsComponent :tags="post.tags"></TagsComponent>
      <h1 class="text-3xl font-bold w-full break-words">{{ post.title }}</h1>
      <p>{{ post.description }}</p>
      <!-- <DateComponent
        :postedAt="post.postedAt"
        :revisedAt="post.revisedAt ?? ''"
      /> -->

      <p>{{ post.postedAt }}</p>
      <p>{{ post.revisedAt }}</p>
      <!-- 本文 -->
      <section id="body-section">
        <!-- <div v-html="html"></div>
        <div v-html="json"></div> -->
        <p v-html="body"></p>
      </section>
    </div>
  </div>
</template>


