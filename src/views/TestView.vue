<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

const images = [
  'https://i.picsum.photos/id/925/600/400.jpg?hmac=VxvBfviRrdHXsJ6_nbZ00wdqs0AEutxmI1ughFU8KQU',
  'https://i.picsum.photos/id/428/600/400.jpg?hmac=grP0p8M-3MohHSsDfu7ZXo9VGbL-OUSCDScCUZu8ps4',
  'https://i.picsum.photos/id/340/600/400.jpg?hmac=fUPfZKTRNEKns8xR8vPzDByTCfY9cEbh5lFLG8rP8H8',
  'https://i.picsum.photos/id/702/600/400.jpg?hmac=KxRAc7VlNyemdt4RTHqjBvy9heWN7FV0qHG_U2OyOjo',
];

// Swiperのインスタンスが返ってくる
const onSwiper = (swiper) => {
  console.log('swiper', swiper);
};

// スライド位置が変更された時に呼ばれる
const onSlideChange = () => {
  console.log('slide change');
};
</script>

<template>
  <div class="story-visuals">
    <swiper @swiper="onSwiper" @slideChange="onSlideChange">
      <swiperSlide v-for="element in ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb']" :key="element">
        <div>{{element}}</div>
      </swiperSlide>
    </swiper>
  </div>
</template>



