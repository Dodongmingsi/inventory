<template>

  <div>
 <!--Slider section-->
    <div class="relative w-full h-screen overflow-hidden">
        <div class="w-full h-full">
            <div class="swiper-wrapper">
                <div class="swiper-slide" style="background-image: url('fandb.jpg')">Slide 1</div>
                <div class="swiper-slide" style="background-image: url('hande.jpg')">Slide 2</div>
                <div class="swiper-slide" style="background-image: url('handp.jpg')">Slide 3</div>
                <div class="swiper-slide" style="background-image: url('handw.jpg')">Slide 4</div>
                <div class="swiper-slide" style="background-image: url('bandg.jpg')">Slide 5</div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
            <!-- Add Navigation -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
    </div>


    <!-- Main Content Section -->
    <div class="flex justify-between bg-orange-200 py-10">

      <!-- Best Sellers Section -->
      <div class="best-sellers flex flex-col items-center justify-center gap-10">
        <div class="text-2xl">Best Sellers</div>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="prod in bestSellers" :key="prod.id" class="product">
            <img :src="prod.url" class="h-48 w-48 object-cover rounded-md" alt="Product Image">
            <div class="text-center">{{ prod.ProductName }}</div>
            <div class="text-gray-500">{{ prod.Description }}</div>
            <div class="text-red-500 font-bold">${{ prod.Price }}</div>
            <button class="bg-blue-500 text-white px-4 py-2 rounded-md"><NuxtLink :to="`/products/${prod.ProductID}`">Buy now</NuxtLink></button>
            </div>
        </div>
      </div>
     
      
      <!-- Featured Items Section -->
      <div class="featured flex flex-col items-center justify-center gap-10">
        <div class="text-2xl">Featured Items</div>
        <div class="border-2 border-red-500 w-48 h-48"></div>
      </div>
    </div>
    
    <!-- Products Section -->
    <div class="text-3xl font-bold py-10 text-center">Products</div>
    <div class="flex flex-wrap justify-center gap-10 mb-10">
      <div v-for="prod in products" :key="prod.id" class="product-card flex flex-col items-center justify-center w-72 bg-gray-100 p-4 rounded-lg">
        <img :src="prod.url" class="h-48 w-48 object-cover rounded-md mt-4 mb-4" alt="Product Image">
        <div class="text-xl">{{ prod.ProductName }}</div>
        <div class="text-gray-500">{{ prod.Description }}</div>
        <div class="text-red-500 font-bold">${{ prod.Price }}</div>
       
          <button class="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"><NuxtLink :to="`/products/${prod.ProductID}`">Buy now</NuxtLink></button>
          <button class="bg-amber-500 text-white px-4 py-2 rounded-md mt-4" @click="count++">Add to cart</button>
     
      </div>
    </div>
    
    <!-- Footer Section -->
    <div class="footer bg-gray-900 text-white py-8 text-center">
      <div>Contact Us: example@example.com | Phone: 123-456-7890 | Address: 123 Main St, City, Country</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';
import navbar from './navbar.vue'

const count = ref(0)

const supabase = createClient('https://ezjpjdoqzdjqcpgyltbo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6anBqZG9xemRqcWNwZ3lsdGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MjQyNDYsImV4cCI6MjAyODUwMDI0Nn0.uvgCZLt0Ok_XUVI7od0M17kcpP2DZQ5H08THYUk0Jc4');

const bestSellers = ref([]);
const products = ref([]);

async function fetchData() {
  console.log('Fetching data...');
  const { data: bestSellersData } = await supabase.from('products').select().limit(6); // Limit to 6 best sellers
  bestSellers.value = bestSellersData;
  
  const { data: productsData } = await supabase.from('products').select();
  products.value = productsData;
}

onMounted(() => {
  fetchData();
})
       
        var swiper = new swiper('.Swiper-container', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 3000,
            },
            effect: 'fade',
        });

</script>


<style>
.swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: #fff;
    background-size: cover;
    background-position: center;
}
.screen {
  height: 600px;
}

.best-sellers, .featured {
  width: 50%;
}

.product-card {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
