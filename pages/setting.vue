<template>
    <div class="settings-page">
      <div class="settings-header bg-zinc-100 shadow-md flex items-center justify-between p-4">
        <h2 class="text-2xl font-bold">Settings</h2>
        <nuxt-link to="/admin" class="text-blue-500">Back to Dashboard</nuxt-link>
      </div>
  
      <div class="settings-content mt-4 p-4">
        <div class="settings-option mb-4">
          <label for="theme" class="block text-gray-700">Theme:</label>
          <select v-model="selectedTheme" id="theme" class="w-full px-3 py-2 border rounded">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
  
        <div class="settings-option mb-4">
          <label for="notifications" class="block text-gray-700">Notifications:</label>
          <input type="checkbox" id="notifications" v-model="enableNotifications" class="form-checkbox h-5 w-5 text-blue-600">
        </div>
  
        <div class="settings-option mb-4">
          <label for="language" class="block text-gray-700">Language:</label>
          <select v-model="selectedLanguage" id="language" class="w-full px-3 py-2 border rounded">
            <option value="en">English</option>
            <option value="fr">Tagalog</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const selectedTheme = ref('light'); // Default theme
  const enableNotifications = ref(true); // Default notification status
  const selectedLanguage = ref('en'); // Default language
  </script>
  
  <style scoped>
  .settings-page {
    padding: 20px;
  }
  
  .settings-header {
    border-bottom: 1px solid #e5e7eb;
  }
  
  .settings-content {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 20px;
  }
  
  .settings-option label {
    font-weight: bold;
  }
  </style>
  