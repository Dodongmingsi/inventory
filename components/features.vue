<template>
  <div class="featured flex flex-col items-center justify-center gap-10">
    
    <div class="featured-item-container">
      <div class="featured-item" v-for="(image, index) in images" :key="index" :style="{ opacity: currentImageIndex === index ? 1 : 0 }">
        <img :src="image.src" :alt="image.alt" class="w-full h-full object-cover rounded-lg" />
        <div class="overlay">{{ image.text }}</div>
      </div>
      <div v-if="!images.length" class="text-gray-500 text-lg">No featured items available</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const images = ref([
  { src: '/images/choco.jpg', alt: 'Coke', text: 'Yummy chocolates' },
  { src: '/images/ice.jpg', alt: 'Makeup', text: 'Refresh yourself!' },
  { src: '/images/yoki.jpg', alt: 'Kitchen', text: 'Yummy foods!' },
  { src: '/images/doritos.jpg', alt: 'Kitchen', text: 'Amazing Snacks' }
]);

const currentImageIndex = ref(0);

const switchImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
};

let intervalId;

onMounted(() => {
  intervalId = setInterval(switchImage, 4000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.featured {
  width: 100%;
  padding: 20px;
}

.featured-item-container {
  width: 800px; /* Adjust the width as needed */
  height: 500px; /* Adjust the height as needed */
  position: relative;
  overflow: hidden;
}

.featured-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 1s ease-in-out;
  opacity: 0;
}

.overlay {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
}
</style>
