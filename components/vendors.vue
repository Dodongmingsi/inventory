<template>
  <div class="vendors-container m-10">
    <h2 class="vendor-header font-serif font-bold">Vendors</h2>
    <div v-if="vendors.length > 0" class="vendor-list">
      <div v-for="vendor in vendors" :key="vendor.VendorID" class="vendor-item">
        <span class="vendor-id">ID: {{ vendor.VendorID }}</span>
        <span class="vendor-name">{{ vendor.VendorName }}</span>
      </div>
    </div>
    <p v-else>No vendors available.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://ezjpjdoqzdjqcpgyltbo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6anBqZG9xemRqcWNwZ3lsdGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MjQyNDYsImV4cCI6MjAyODUwMDI0Nn0.uvgCZLt0Ok_XUVI7od0M17kcpP2DZQ5H08THYUk0Jc4');

const vendors = ref([]);

async function fetchData() {
  try {
    const { data: vendorData } = await supabase.from('vendors').select('VendorID, VendorName');
    vendors.value = vendorData;
  } catch (error) {
    console.error('Error fetching vendors:', error.message);
  }
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.vendors-container {
  margin-bottom: 30px;
}

.vendor-header {
  color: #2c3e50; /* Dark blue */
  font-size: 24px;
  margin-bottom: 15px;
}

.vendor-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.vendor-item {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

.vendor-id {
  font-weight: bold;
  color: #3498db; /* Blue */
}

.vendor-name {
  color: #555; /* Dark gray */
}
</style>
