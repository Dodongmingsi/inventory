<template>
  <div class="profile-page">
    <div class="profile-header bg-zinc-100 shadow-md flex items-center justify-between p-4">
      <h2 class="text-2xl font-bold">Profile Dashboard</h2>
      <nuxt-link to="/admin" class="text-blue-500">Back to Dashboard</nuxt-link>
    </div>

    <div class="profile-content mt-4 p-4">
      <div class="profile-picture flex justify-center mb-4">
        <img src="../public/images/puppy.jpg" alt="Profile Picture" class="w-32 h-32 rounded-full">
      </div>

      <div class="profile-info flex justify-center mb-4">
      
        <div class="mb-4">
          <label for="fullname" class="block text-gray-700">Name:</label>
          <input type="text" id="fullname" v-model="profile.Name" class="w-full px-3 py-2 border rounded" readonly>
        </div>

        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email:</label>
          <input type="email" id="email" v-model="profile.Email" class="w-full px-3 py-2 border rounded" readonly>
        </div>

        <div class="mb-4">
          <label for="address" class="block text-gray-700">Address:</label>
          <input type="text" id="address" v-model="profile.Address" class="w-full px-3 py-2 border rounded" readonly>
        </div>

        <div class="mb-4">
          <label for="city" class="block text-gray-700">City:</label>
          <input type="text" id="city" v-model="profile.City" class="w-full px-3 py-2 border rounded" readonly>
        </div>

        <div class="mb-4">
          <label for="country" class="block text-gray-700">Country:</label>
          <input type="text" id="country" v-model="profile.Country" class="w-full px-3 py-2 border rounded" readonly>
        </div>

        <div class="mb-4">
          <label for="postalCode" class="block text-gray-700">Postal Code:</label>
          <input type="text" id="postalCode" v-model="profile.PostalCode" class="w-full px-3 py-2 border rounded" readonly>
        </div>

        <div class="mb-4">
          <label for="paypal" class="block text-gray-700">Paypal Balance:</label>
          <input type="text" id="paypal" v-model="profile.Paypal" class="w-full px-3 py-2 border rounded" readonly>
        </div>

        <div class="mb-4">
          <label for="gcash" class="block text-gray-700">GCash Balance:</label>
          <input type="text" id="gcash" v-model="profile.GCash" class="w-full px-3 py-2 border rounded" readonly>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://ezjpjdoqzdjqcpgyltbo.supabase.co', 'YOUR_SUPABASE_ANON_KEY');

const profile = ref({
  Name: 'Shane Cale',
  Email: 'shanecale10@gmail.com',
  Address: 'Sta. Irene',
  City: 'Prosperidad',
  Country: 'Philippines',
  PostalCode: '8500',
  Paypal: 50000,
  GCash: 20000
});
const profilePicture = ref('../public/images/puppy.jpg'); // Example picture path

async function fetchProfile() {
  try {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from('customers')
      .select('*')
      .eq('Email', user.email)
      .single();
    
    if (data) {
      profile.value = data;
    }
  } catch (error) {
    console.error('Error fetching profile data:', error.message);
  }
}

onMounted(() => {
  fetchProfile();
});
</script>

<style scoped>
.profile-page {
  padding: 20px;
}

.profile-header {
  border-bottom: 1px solid #e5e7eb;
}

.profile-content {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
}

.profile-picture img {
  border: 4px solid #e5e7eb;
  cursor: pointer;
}

.profile-info label {
  font-weight: bold;
}
</style>
