<template>
  <div class="dashboard-container">
    <div class="sidebar">
      <div class="sidebar-top">
        <h2>Dashboard</h2>
      </div>
      <ul class="sidebar-menu">
        <li><nuxt-link to="/"><fa icon="tachometer-alt" /> Home</nuxt-link></li>
        <li><nuxt-link to="/elements"><fa icon="cubes" /> Elements</nuxt-link></li>
        <li><nuxt-link to="/settings"><fa icon="cogs" /> Settings</nuxt-link></li>
      </ul>
    </div>
    <div class="main-content">
      <h2 class="text-2xl font-bold mb-4">Stock Overview</h2>
      <canvas id="stockChart" width="800" height="400"></canvas>
    </div>
    <div class="main-content">
      <h2 class="text-2xl font-bold mb-4">Vendors</h2>
      <vendors></vendors>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';
import Chart from 'chart.js/auto';

const supabase = createClient('https://ezjpjdoqzdjqcpgyltbo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6anBqZG9xemRqcWNwZ3lsdGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MjQyNDYsImV4cCI6MjAyODUwMDI0Nn0.uvgCZLt0Ok_XUVI7od0M17kcpP2DZQ5H08THYUk0Jc4');

const stock = ref([]);

async function fetchData() {
  try {
    const { data: stockdata } = await supabase.from('stock').select('*');
    stock.value = stockdata;
    renderChart(stockdata);
  } catch (error) {
    console.error('Error fetching stock data:', error.message);
  }
}

function renderChart(data) {
  const labels = data.map(item => item.ProductName);
  const quantities = data.map(item => item.Quantity);

  const ctx = document.getElementById('stockChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Stock Quantity',
        data: quantities,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.dashboard-container {
  display: flex;
}

.sidebar {
  width: 200px;
  background: #000000; /* Blue */
  color: #fff;
  height: 100vh;
  flex-shrink: 0; /* Prevent sidebar from shrinking */
}

.sidebar-top {
  padding: 20px;
  text-align: center;
  background: #026bb1; /* Dark blue */
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
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
  background: #000000; /* Dark blue */
}

.main-content {
  flex-grow: 1; /* Allow main content to grow */
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}
</style>
