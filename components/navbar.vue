<template>
  <div class="bg-blue-50 flex justify-between p-10 text-xl relative">
    <div>
      <div class="pt-2">Logo</div>
    </div>
    <div class="flex gap-8">
      <div class="pt-2"><NuxtLink to="/">Home</NuxtLink></div>
      <div class="pt-2"><NuxtLink to="/">Shop</NuxtLink></div>
      <div class="flex items-center space-x-4">
        <input type="text" placeholder="Search..." class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-100">
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Search</button>
      </div>
      <div class="flex relative">
  <div class="p-1 h-12 w-12 cursor-pointer flex items-center justify-center" @click="toggleContent">
    <img src="/images/cart.png" class="w-10 h-10">
    <span class="text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center absolute top-0 right-0 -mt-2 -mr-2">{{ cartCount }}</span>
  </div>


  <div v-if="content" class="cart-popup bg-white shadow-lg rounded-lg w-72">
  <ul class="divide-y divide-gray-200 overflow-y-auto max-h-60">
    <li v-for="item in cart" :key="item.ProductID" class="py-2">
      <div class="flex items-center justify-between">
        <span class="text-lg font-semibold">{{ item.ProductName }}</span>
        <span class="text-lg font-semibold">${{ item.total }}</span>
      </div>
      <div class="flex items-center justify-between text-gray-500 text-sm">
        <span>{{ item.quantity }} x ${{ item.price }}</span>
        <button @click="removeItem(item.ProductID)" class="text-red-500 hover:text-red-600 focus:outline-none">Remove</button>
      </div>
    </li>
  </ul>
  <div class="flex flex-col gap-5 mt-5">
    <span class="text-lg font-semibold mr">Total Amount: <span class="text-2xl ml-5">${{ totalAmount }}</span></span>
    <button class="bg-blue-600 text-white checkout rounded-md font-bold font-mono text-2xl">Checkout</button>
  </div>
</div>


</div>

    </div>
    <div class="flex gap-5">
      <div class="pt-2"><NuxtLink to="/about">About us</NuxtLink></div>
      <div class="pt-2">Contact us</div>
    </div>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://ezjpjdoqzdjqcpgyltbo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6anBqZG9xemRqcWNwZ3lsdGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MjQyNDYsImV4cCI6MjAyODUwMDI0Nn0.uvgCZLt0Ok_XUVI7od0M17kcpP2DZQ5H08THYUk0Jc4');

defineProps({ cartCount: Number, cartItems: Array });
const content = ref(false);
const cart = ref([]);
const cartCount= ref(0);
const totalAmount= ref(0);

async function getcartdata() {
  const { data } = await supabase.from('cart').select();
  cart.value = data; // Populate cart with data
  // Update cart count
  cartCount.value = cart.value.length;
  totalAmount.value = cart.value.reduce((acc, cur) => acc + cur.total, 0);
}

function toggleContent() {
  content.value = !content.value;
}

onMounted(() => {
  getcartdata();

  const channels = supabase.channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'cart' },
      (payload) => {
          getcartdata();
      }
    )
    .subscribe()
})
</script>

<style lang="scss" scoped>
.cartcount {
  width: 20px;
  height: 20px;
  margin-left: -15px;
  border-radius: 10px;
  font-size: 25px;
  color: red;
  font-weight: bold;
}

.cart-popup {
  position: absolute;
  top: 100%;
  right: 20%;
  z-index: 1000;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  min-width: 200px;
}

.cart-popup ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-popup li {
  margin-bottom: 5px;
}
.checkout{
  height :50px;
  width :px;
}
</style>
