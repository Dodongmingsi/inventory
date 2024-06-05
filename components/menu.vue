<template>
    <div class="relative w-full h-screen overflow-hidden">
      <swiper
        ref="swiperRef"
        :modules="[Pagination, Navigation, Autoplay, EffectFade]"
        loop="true"
        :pagination="{ el: '.swiper-pagination', clickable: true }"
        :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
        :autoplay="{ delay: 3000 }"
        effect="fade"
        class="swiper-container"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <div
            class="flex justify-center items-center text-2xl text-white bg-cover bg-center w-full h-full"
            :style="{ backgroundImage: `url(${slide.image})` }"
          >
            {{ slide.text }}
          </div>
        </swiper-slide>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </swiper>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper';
  import 'swiper/swiper-bundle.min.css';
  
  const swiperRef = ref(null);
  
  const slides = ref([
    { image: '/images/fandb.jpg', text: 'Slide 1' },
    { image: '/images/hande.jpg', text: 'Slide 2' },
    { image: '/images/handp.jpg', text: 'Slide 3' },
    { image: '/images/handw.jpg', text: 'Slide 4' },
    { image: '/images/bandg.jpg', text: 'Slide 5' },
  ]);
  </script>
  
  <style scoped>
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: #fff;
    background-size: cover;
    background-position: center;
  }
  </style>
  