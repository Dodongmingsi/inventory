<template>
  <div>
  </div>
  <div>
    <!-- Header Section -->
    <div class="relative">
       <slider></slider>
    </div>
    <!-- Main Content Section -->

<div class="flex justify-between bg-blue-100 py-10">
  <!-- Best Sellers Section -->


  <div class="mt-20 ml-5 best-sellers flex flex-col items-center justify-center gap-10">
    <div class="text-4xl font-bold font-sans">Best Sellers</div>
    <div class="grid grid-cols-2 gap-8">
      <div v-for="prod in bestSellers" :key="prod.id" class="product bg-white p-4 rounded-lg shadow-md">
        <img :src="prod.url" class="h-48 w-full object-cover rounded-md mb-4" alt="Product Image">
        <div class="text-lg font-semibold">{{ prod.ProductName }}</div>
        <div class="text-gray-500 mb-2">{{ prod.Description }}</div>
        <div class="text-red-500 font-bold">${{ prod.Price }}</div>
        <button class="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"><NuxtLink :to="`/products/${prod.ProductID}`">Buy now</NuxtLink></button>
      </div>
    </div>
  </div>

  <!-- Featured Items Section -->
  <div>
  <div class="text-4xl font-semibold text-center mt-20">Featured Items</div>
  <div class="feature ml-40 mr-20 mt-5 font-bold grid grid-cols-1 gap-5" >
      <features></features>
  </div>
  <div class="feature ml-40 mr-20 font-bold grid grid-cols-2 gap-5" >
      <feature1></feature1>
      <feature4></feature4>
      <feature2></feature2>
      <feature3></feature3>
  </div>
  </div>

  
</div>

<!--Categories-->
<div class="flex justify-between ml-20 mr-20 items-center p-5 text-xl font-semibold gap-10">
        <div class="categories">Food and Beverages</div>
        <div class="categories ">Household Essentials</div>
        <div class="categories ">Personal Care</div>
        <div class="categories ">Health and Wellness</div>
        <div class="categories ">Beauty and Grooming</div>
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
          <button class="bg-amber-500 text-white px-4 py-2 rounded-md mt-4" @click="addItemToCart(prod)">Add to cart</button>
          
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
import { defineProps, defineEmits } from 'vue';

defineProps({
  cartItems: Array,
  addToCart: Function,
});
const emits = defineEmits(['add-to-cart']);


const supabase = createClient('https://ezjpjdoqzdjqcpgyltbo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6anBqZG9xemRqcWNwZ3lsdGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MjQyNDYsImV4cCI6MjAyODUwMDI0Nn0.uvgCZLt0Ok_XUVI7od0M17kcpP2DZQ5H08THYUk0Jc4');

const bestSellers = ref([]);
const products = ref([]);

async function addItemToCart(prod) {
  // Check if the product already exists in the cart
  const { data: existingProduct } = await supabase
    .from('cart')
    .select('quantity')
    .eq('ProductName', prod.ProductName)
    .single();

  if (existingProduct) {
    // If the product exists, update the quantity
    const newQuantity = existingProduct.quantity + 1;
    let newTotal = newQuantity * prod.Price;
    const { error } = await supabase
      .from('cart')
      .update({ quantity: newQuantity,total:newTotal })
      .eq('ProductID', prod.ProductID);
      
    if (error) {
      console.error("Error updating product quantity", error.message);
      return;
    }
  } else {
    // If the product doesn't exist, insert a new record
    const { error } = await supabase.from('cart').insert([
      {
        ProductID:prod.ProductID,
        ProductName: prod.ProductName,
        price: prod.Price,
        quantity: 1, // Initial quantity for a new product
        total:prod.Price
      }
    ]);

    if (error) {
      console.error("Error inserting a new product", error.message);
      return;
    }
  }
}



async function fetchData() {
  console.log('Fetching data...');
  const { data: bestSellersData } = await supabase.from('products').select().limit(6); // Limit to 6 best sellers
  bestSellers.value = bestSellersData;
 
  const { data: productsData } = await supabase.from('products').select();
  products.value = productsData;
}

onMounted(() => {
  fetchData();
});
</script>

<style>
.screen {
  height: 600px;
}

.best-sellers, .featured {
  width: 50%;
}

.product-card {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.categories:hover{
  color: rgb(0, 187, 255);
  cursor: pointer;

}
.categories{
  color:white;
  width:fit-content;
  text-align: center;
  padding: 15px;
  max-height: 60px;
  border-radius: 5px;
  background-color: rgb(47, 85, 117);
}

.features{
  margin-right: 50px;
}
</style>
