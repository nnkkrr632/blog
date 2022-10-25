<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref, reactive, onMounted } from 'vue';

interface Tag {
  slug: string;
  name: string;
  image: string;
  count: number;
}

const tags: Tag[] = [
{
    image: 'https://placehold.jp/150x150.png',
    slug: 'vuejs',
    name: 'Vue.js',
    count: 3,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'vuetify',
    name: 'Vuetify',
    count: 4,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'nuxtjs',
    name: 'NuxtJS',
    count: 5,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'typescript',
    name: 'TypeScript',
    count: 6,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'javascript',
    name: 'JavaScript',
    count: 7,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'vuejs',
    name: 'Vue.js',
    count: 3,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'vuetify',
    name: 'Vuetify',
    count: 4,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'nuxtjs',
    name: 'NuxtJS',
    count: 5,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'typescript',
    name: 'TypeScript',
    count: 6,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'javascript',
    name: 'JavaScript',
    count: 7,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'vuejs',
    name: 'Vue.js',
    count: 3,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'vuetify',
    name: 'Vuetify',
    count: 4,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'nuxtjs',
    name: 'NuxtJS',
    count: 5,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'typescript',
    name: 'TypeScript',
    count: 6,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'javascript',
    name: 'JavaScript',
    count: 7,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'vuejs',
    name: 'Vue.js',
    count: 3,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'vuetify',
    name: 'Vuetify',
    count: 4,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'nuxtjs',
    name: 'NuxtJS',
    count: 5,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'typescript',
    name: 'TypeScript',
    count: 29,
  },
  {
    image: 'https://placehold.jp/150x150.png',
    slug: 'javascript',
    name: 'JavaScript',
    count: 30,
  },
];

const defaultTagCount = 15;
const toggleObject = ref({ display: false, image: 'expand_more', text: '' });

//宣言するときにrefになってないとhtmlに表示されない？
const displayedTags = ref<Tag[]>([]);

const toggleTags = () => {
  if (displayedTags.value.length === defaultTagCount) {
    displayedTags.value = tags.slice(0, tags.length);
    toggleObject.value.image = 'expand_less';
    toggleObject.value.text = '折りたたむ';
  } else {
    displayedTags.value = tags.slice(0, defaultTagCount);
    toggleObject.value.image = 'expand_more';
    toggleObject.value.text = `他 ${tags.length - defaultTagCount} 件を表示`;
  }
  console.log('displayedTags', displayedTags);
};

onMounted(() => {
  console.log('マウンてっとされた');
  if (tags.length > defaultTagCount) {
    toggleObject.value.display = true;
    toggleObject.value.text = `他 ${tags.length - defaultTagCount} 件を表示`;
  }
  displayedTags.value = tags.slice(0, defaultTagCount);
  console.log('displayedTags', displayedTags);
});
</script>
<template>
  <div id="sidebar" class="flex flex-col tex-sm bg-slate-100 w-16 xl:w-60">
    <div class="sticky top-0 overflow-y-auto h-screen">
      <!-- ホーム -->
      <RouterLink to="/">
        <div
          class="flex flex-col xl:flex-row items-center bg-slate-200 py-2 hover:bg-slate-300 focus:bg-slate-700 xl:pl-5"
        >
          <span class="material-symbols-outlined xl:mr-6">home</span>
          <div class="text-[7px] xl:text-sm">ホーム</div>
        </div>
      </RouterLink>
      <!-- ショート -->
      <RouterLink :to="{ name: 'shorts' }">
        <div
          class="flex flex-col xl:flex-row items-center bg-slate-200 py-2 hover:bg-slate-300 focus:bg-slate-700 xl:pl-5"
        >
          <span class="material-symbols-outlined xl:mr-6">electric_bolt</span>
          <div class="text-[7px] xl:text-sm">ショート</div>
        </div>
      </RouterLink>
      <!-- 情報 -->
      <RouterLink to="/2">
        <div
          class="flex flex-col xl:flex-row items-center bg-slate-200 py-2 hover:bg-slate-300 xl:pl-5"
        >
          <span class="material-symbols-outlined xl:mr-6">info</span>
          <div class="text-[7px] xl:text-sm">情報</div>
        </div>
      </RouterLink>
    <!-- タグリストセクション -->
    <div id="tagListSection" class="invisible xl:visible mb-24">
      <!-- ボーダー -->
      <p class="mt-4 pt-4 border-t border-slate-300"></p>
      <!-- タグ別アイコン -->
      <p class="text-sm text-start xl:pl-5">#タグ</p>
      <ul>
        <RouterLink
          v-for="tag in displayedTags"
          :key="tag.slug"
          :to="{ name: 'list-by-tag', params: { tagSlug: tag.slug } }"
        >
          <li class="py-2 pl-5 hover:bg-slate-300">
            <img
              :src="tag.image"
              width="25"
              class="inline xl:mr-5 rounded-full"
            />{{ tag.name }}({{ tag.count }})
          </li>
        </RouterLink>
      </ul>
      <!-- トグル -->
      <div
        v-show="toggleObject.display"
        class="flex flex-col xl:flex-row items-center cursor-pointer bg-slate-200 py-2 hover:bg-slate-300 xl:pl-5"
        @click="toggleTags"
      >
        <span class="material-symbols-outlined mr-5">{{
          toggleObject.image
        }}</span>
        <div class="text-sm">
          {{ toggleObject.text }}
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}

.router-link-active {
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  }
  div, li {
    background-color: rgb(100 116 139);
    font-weight: bold;
    &:hover {
      background-color: rgb(71 85 105);
    }
  }
}
</style>
