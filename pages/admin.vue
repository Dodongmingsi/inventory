<template>
  <div class="flex gap-80">
  <div class="sidebar">
    <div class="sidebar-top">
      <h2>Admin</h2>
    </div>
    <ul class="sidebar-menu">
      <li><nuxt-link to="/"><fa icon="tachometer-alt" /> Dashboard</nuxt-link></li>
      <li><nuxt-link to="/"><fa icon="users" /> Elements</nuxt-link></li>
      <li><nuxt-link to="/"><fa icon="cogs" /> Settings</nuxt-link></li>
    </ul>
    
  </div>
  <div v-for="stocks in stock" :key="stocks.StockID">
      {{ stocks.ProductID }} {{ stocks.ProductName }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://ezjpjdoqzdjqcpgyltbo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6anBqZG9xemRqcWNwZ3lsdGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MjQyNDYsImV4cCI6MjAyODUwMDI0Nn0.uvgCZLt0Ok_XUVI7od0M17kcpP2DZQ5H08THYUk0Jc4');

const stock = ref([]);

async function fetchData() {
    const { data: stockdata } = await supabase.from('stock').select('*');
    stock.value = stockdata;
    console.log('Fetched data:', stockdata);
  
}    

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.sidebar {
  width: 200px;
  background: #333;
  color: #fff;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
}

.sidebar-top {
  padding: 20px;
  text-align: center;
  background: #444;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

.sidebar-menu li {
  padding: 15px 20px;
}

.sidebar-menu li a {
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.sidebar-menu li a fa {
  margin-right: 10px;
}

.sidebar-menu li a:hover {
  background: #555;
}
</style>
