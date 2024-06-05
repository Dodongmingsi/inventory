<template>
  <navbar></navbar>
  <div class="ml-32 mt-10">
    
    <p v-for="prod in products">
      <p class="text-4xl mb-5 font-semibold font-mono"> {{ prod.ProductName }} </p>
      <div class="image text-center text-gray-600 text-3xl"> Product Image</div>
      <p class="mt-5 mb-5 font-mono text-3xl">{{prod.Description}}</p>
      <p class="text-sky-600 text-3xl">${{prod.Price}}</p>
      <button class="checkout font-mono text-2xl font-medium">Checkout</button>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';
const {id}= useRoute().params;// use the passed product id to access the whole data
const supabase = createClient('https://ezjpjdoqzdjqcpgyltbo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6anBqZG9xemRqcWNwZ3lsdGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MjQyNDYsImV4cCI6MjAyODUwMDI0Nn0.uvgCZLt0Ok_XUVI7od0M17kcpP2DZQ5H08THYUk0Jc4');

const products = ref([]);

async function fetchData() {
  const { data } = await supabase.from('products').select().eq('ProductID',id);
  products.value = data;
  console.log(products)
}

onMounted(() => {
  fetchData();
});

</script>

<style scoped>
  .image{
    width: 500px;
    height: 400px;
    border: 1px solid red;
    padding-top: 10%;
  }
  .checkout{
    height: 60px;
    border: 2px 1px solid gray;
    text-align: center;
    width: 160px;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: 1px 5px 2px 0px rgba(0,0,0,0.2);
    background-color: rgb(250, 157, 86)
  }
</style>