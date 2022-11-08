<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import type { HasPostsTag } from '@/plugins/interfaces';
import { getTags } from '@/plugins/myLibrary';

// URLによるHTML&CSSの調整
const route = useRoute();

// すべてのタグ
const tags = ref<HasPostsTag[]>([]);
const displayingTags = ref<HasPostsTag[]>([]);
const defaultTagCount = 5;
const tagToggleSwitch = ref({ display: false, image: 'expand_more', text: '' });
onMounted(async () => {
  tags.value = await getTags() ?? []
  if (tags.value.length > defaultTagCount) {
    tagToggleSwitch.value.display = true;
    tagToggleSwitch.value.text = `他 ${tags.value.length - defaultTagCount} 件を表示`;
  }
  displayingTags.value = tags.value.slice(0, defaultTagCount);
});
const toggleTags = () => {
  if (displayingTags.value.length === defaultTagCount) {
    displayingTags.value = tags.value.slice(0, tags.value.length);
    tagToggleSwitch.value.image = 'expand_less';
    tagToggleSwitch.value.text = '折りたたむ';
  } else {
    displayingTags.value = tags.value.slice(0, defaultTagCount);
    tagToggleSwitch.value.image = 'expand_more';
    tagToggleSwitch.value.text = `他 ${tags.value.length - defaultTagCount} 件を表示`;
  }
};
</script>

<template>
  <aside class="hidden sm:flex flex-col tex-sm bg-white sm:w-16 xl:w-60 sticky top-0 xl:overflow-y-auto h-screen">

    <!-- サイト -->
    <div class="flex flex-col xl:flex-row items-center  py-2 xl:pl-5 rounded-lg" title="nrpan's技術ブログ">
      <span class="text-lg xl:mr-6">🍳</span>
      <h1 v-if="route.name === 'home'" class="hidden xl:inline text-sm">nrpan's技術ブログ</h1>
      <div v-else class="hidden xl:inline text-sm">nrpan's技術ブログ</div>
    </div>
    <!-- ホーム -->
    <RouterLink to="/" class="hover:bg-gray-100 rounded-lg">
      <div class="flex flex-col xl:flex-row items-center py-2 xl:pl-5 rounded-lg">
        <span class="material-symbols-outlined xl:mr-6">home</span>
        <span class="text-[7px] xl:text-sm">ホーム</span>
      </div>
    </RouterLink>
    <!-- ショート -->
    <RouterLink :to="{ name: 'shortsTop' }" :class="{ 'router-link-active': route.name === 'shorts' }"
      class="hover:bg-gray-100 rounded-lg">
      <div class="flex flex-col xl:flex-row items-center py-2 xl:pl-5 rounded-lg">
        <span class="material-symbols-outlined xl:mr-6">electric_bolt</span>
        <span class="text-[7px] xl:text-sm">ショート</span>
      </div>
    </RouterLink>
    <!-- すべてのタグ -->
    <RouterLink to="/tags" class="hover:bg-gray-100 rounded-lg">
      <div class="flex flex-col xl:hidden items-center py-2 rounded-lg">
        <span class="material-symbols-outlined xl:mr-6">tag</span>
        <span class="text-[7px] xl:text-sm">タグ</span>
      </div>
    </RouterLink>
    <!-- 情報 -->
    <RouterLink to="/info" class="hover:bg-gray-100 rounded-lg">
      <div class="flex flex-col xl:flex-row items-center py-2 xl:pl-5 rounded-lg">
        <span class="material-symbols-outlined xl:mr-6">info</span>
        <span class="text-[7px] xl:text-sm">情報</span>
      </div>
    </RouterLink>
    <!-- タグリストセクション -->
    <div v-if="displayingTags" class="hidden xl:block mb-24">
      <!-- ボーダー -->
      <p class="mt-4 pt-4 border-t border-gray-200"></p>
      <!-- タグ別アイコン -->
      <p class="text-sm text-start xl:pl-5">#タグ</p>
      <ul>
        <RouterLink v-for="tag in displayingTags" :key="tag.slug"
          :to="{ name: 'list-by-tag', params: { tagSlug: tag.slug } }">
          <li class="flex justify-between items-center hover:bg-gray-100 py-2 pl-5 rounded-lg">
            <div class="flex items-center space-x-5">
              <img :src="tag.image.url" class="inline rounded-full w-6" :alt="tag.name" />
              <span>{{ tag.name }}</span>
            </div>
            <span class="pr-8">({{ tag.posts.length }})</span>
          </li>
        </RouterLink>
      </ul>
      <!-- トグル -->
      <div v-show="tagToggleSwitch.display"
        class="flex flex-col xl:flex-row items-center cursor-pointer  py-2 hover:bg-gray-100 xl:pl-5 rounded-lg"
        @click="toggleTags">
        <span class="material-symbols-outlined mr-5">{{
            tagToggleSwitch.image
        }}</span>
        <span class="text-sm">
          {{ tagToggleSwitch.text }}
        </span>
      </div>
    </div>
    <!-- コピーライト -->
    <div class="flex h-full items-end">
      <p class=" mx-auto xl:mx-5 text-xs text-gray-500 mb-4">© @nrpans</p>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}

.router-link-active {
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  }

  div,
  li {
    background-color: rgb(229 231 235);

    &:hover {
      background-color: rgb(209 213 219);

      div {
        background-color: rgb(209 213 219);
      }
    }
  }
}
</style>
