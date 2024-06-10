<template>
  <div>
 
    <navbar :cartCount="cartCount" :cartItems="cartItems" :logout="logout"/>
    <hero :cartItems="cartItems" @add-to-cart="addToCart" @update-cart="updateCart"></hero>
    <foot></foot>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://ezjpjdoqzdjqcpgyltbo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6anBqZG9xemRqcWNwZ3lsdGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MjQyNDYsImV4cCI6MjAyODUwMDI0Nn0.uvgCZLt0Ok_XUVI7od0M17kcpP2DZQ5H08THYUk0Jc4');





const channels = supabase.channel('custom-all-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'cart' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()

const cartCount = ref(0);
const cartItems = ref([]);

function addToCart(item) {
  cartItems.value.push(item);
  cartCount.value++;
}

function updateCart(updatedItem) {
  const itemIndex = cartItems.value.findIndex(item => item.ProductID === updatedItem.ProductID);
  if (itemIndex !== -1) {
    cartItems.value[itemIndex] = updatedItem;
  }
}

console.log(cartItems);
</script>

<style>
.router-link-exact-active{

  color:green;

}
</style>