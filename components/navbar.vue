<template>
  <div class="bg-blue-50 flex justify-between p-10 text-xl">

    <div class="flex gap-5 h-20 w-20">
      <div class="pt-2" ><img src="/images/logo.png"></div>
    </div>

    <div class="flex gap-8">
    <div class="pt-2"><NuxtLink to="/">Home</NuxtLink></div>
    <div class="pt-2"><NuxtLink to="/shop">Shop</NuxtLink></div>
    <div class="flex items-center space-x-4">
    <input type="text" placeholder="Search..." class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-100">
    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Search</button>
    </div>

    <div class="p-1 h-12 w-12"><img src="/images/cart.png">{{ msg }}</div>
    </div> 

    <div class="flex gap-5">
    <div class="pt-2"><NuxtLink to="/about">About us</NuxtLink></div>
    <div class="pt-2">Contact us</div>
    </div>
    
  </div>
</template>

<script setup>
const props = defineProps({
  msg: Number
})
</script>

<style lang="scss" scoped>

</style>