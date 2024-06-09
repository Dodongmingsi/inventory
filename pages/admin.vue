<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

  <div class="dashboard-container bg-zinc-100">
    <div class="sidebar shadow-md">
      <div class="sidebar-top">
        <h2><img src="../public/images/logo.jpg" alt="Logo"></h2>
      </div>
      <ul class="sidebar-menu">
        <li><nuxt-link to="/admin"><fa icon="tachometer-alt text-black" /> Dashboard</nuxt-link></li>
        <li><nuxt-link to="/profile"><fa icon="user text-black" /> Profile</nuxt-link></li>
        <li><nuxt-link to="/setting"><fa icon="cogs text-black" /> Settings</nuxt-link></li>
      </ul>
    </div>
    <div class="main-content">
      <div class="header flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Overview</h2>
        <div class="flex items-center space-x-4">
          <!--Notification-->
          <div class="relative">
            <button @click="toggleNotificationDropdown" class="relative inline-flex justify-center w-full rounded-full px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
              <i class="fas fa-bell"></i>
              <span class="absolute top-0 right-0 inline-block w-3 h-3 bg-red-600 rounded-full"></span>
            </button>
            <div v-show="notificationDropdownOpen" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="notification-menu-button" tabindex="-1">
              <div class="py-1" role="none">
                <p class="text-gray-700 block px-4 py-2 text-sm">No new notifications</p>
              </div>
            </div>
          </div>
          <!--PROFILE-->
          <div class="relative inline-block text-left">
            <div>
              <button @click="toggleDropdown" class="inline-flex justify-center w-full rounded-full px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" id="menu-button" aria-expanded="true" aria-haspopup="true">
                <img src="../public/images/puppy.jpg" alt="Profile" class="w-10 h-10 rounded-full">
              </button>
            </div>
            <div v-show="dropdownOpen" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
              <div class="py-1" role="none">
                <nuxt-link to="/adminlogin" @click="logout" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Logout</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-evenly"> 
        <div class="cards border-10px shadow-md flex-wrap rounded-md text-center text-gray-300">
          <i class="fas fa-chart-line text-black"></i>
          <span class="text-black">Total Sales:</span>
        </div>
        <div class="cardo border shadow-md rounded-md text-center text-gray-300">
          <i class="fas fa-shopping-cart text-black"></i>
          <span class="text-black">Orders:</span>
        </div>
      </div>
      <div class="border shadow-md">
        <canvas id="stockChart" width="800" height="400"></canvas>
        <canvas id="salesChart" width="800" height="400"></canvas>
      </div>

    </div>

    <div class="main-content border shadow-md">
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
const sales = ref([]);
const dropdownOpen = ref(false);
const notificationDropdownOpen = ref(false);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function toggleNotificationDropdown() {
  notificationDropdownOpen.value = !notificationDropdownOpen.value;
}

function logout() {
  // Perform logout logic here
  console.log('Logout clicked');
}

async function fetchData() {
  try {
    const { data: stockdata } = await supabase.from('stock').select('*');
    stock.value = stockdata;
    renderStockChart(stockdata);
  } catch (error) {
    console.error('Error fetching stock data:', error.message);
  }

  // Sales part
  try {
    const { data: salesdata } = await supabase.from('sales').select('*');
    sales.value = salesdata;
    renderSalesChart(salesdata);      
  } catch (error) {
    console.error('Error fetching sales data:', error.message);
  }
}

function renderStockChart(data) {
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
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
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

// Sales section
function renderSalesChart(data) {
  const labels = data.map(item => item.sales);
  const amounts = data.map(item => item.amount);

  const ctx = document.getElementById('salesChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Sales Amount',
        data: amounts,
        backgroundColor: '#e28585',
        borderColor: '#db8484',
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
  width: 200px; /* Blue */
  color: #000;
  height: 100vh;
  flex-shrink: 0; /* Prevent sidebar from shrinking */
}

.sidebar-top {
  padding: 20px;
  text-align: center;
  background: #f0f0f0; /* Dark blue */
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
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.sidebar-menu li a fa {
  margin-right: 10px;
}

.sidebar-menu li a:hover {
  color: #58ce64; /* Dark blue */
  background: white;
}

.router-link-exact-active {
  color: #58ce64;
}

.cards, .cardo {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  margin: 10px;
  cursor: pointer;
}

.main-content {
  flex-grow: 1; /* Allow main content to grow */
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  margin-bottom: 20px;
}

.relative .dropdown-menu {
  display: none;
}

.relative:hover .dropdown-menu {
  display: block;
}
</style>
