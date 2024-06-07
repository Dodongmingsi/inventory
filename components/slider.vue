<template>
  <div class="slider relative">
    <div class="slides" :style="{ transform: `translateX(${-currentSlide * 100}%)` }">
      <div v-for="(image, index) in extendedImages" :key="index" class="slide">
        <img :src="image.src" :alt="image.alt" class="screen w-screen">
        
        <div class="font-extrabold absolute imagetext left-56 text- text-white text-5xl">{{ image.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const currentSlide = ref(0);
const images = ref([
  { src: '/images/products.jpg', alt: 'Coke', text: 'Shop now!' },
  { src: '/images/makeup.jpg', alt: 'Makeup', text: 'Refresh yourself!' },
  { src: '/images/store.jpg', alt: 'Kitchen', text: 'Shop now! ' }
]);

// Add a copy of the first image at the end of the array
const extendedImages = ref([...images.value, images.value[0]]);

const moveSlides = () => {
  if (currentSlide.value < images.value.length) {
    currentSlide.value++;
  } else {
    // Reset transition to none and jump to the first image
    document.querySelector('.slides').style.transition = 'none';
    currentSlide.value = 0;
    setTimeout(() => {
      document.querySelector('.slides').style.transition = 'transform 1s ease-in-out, filter 0.5s ease-in-out';
      currentSlide.value++;
    }, 50); // Delay to ensure the transition is reset properly
  }
};

let intervalId;

onMounted(() => {
  intervalId = setInterval(moveSlides, 3000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.slider {
  position: relative;
  max-width: 100%;
  margin: auto;
  overflow: hidden;
  max-height: 800px;
}

.slides {
  display: flex;
  transition: transform 1s ease-in-out, filter 0.5s ease-in-out;
  /* Initialize with no blur */
  filter: blur(0);
}
.imagetext{
  top:400px;

}
.slide {
  min-width: 100%;
  box-sizing: border-box;
  position: relative;
}

.slide img {
  width: 100%;
  height: auto;
}

.font-extrabold {
  z-index: 10;
}

.screen {
  position: relative;
}

.absolute {
  position: absolute;
}

/* Add blur animation */
@keyframes blurAnimation {
  0%, 100% {
    filter: blur(0);
  }
  50% {
    filter: blur(5px);
  }
}

.slides.blurring {
  animation: blurAnimation 1s ease-in-out;
}
</style>
