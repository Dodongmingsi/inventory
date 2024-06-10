<template>
  <navbarlogin></navbarlogin>
  <div class="main-container flex justify-evenly mt-10">
    <!-- Product Details Section -->
    <div class="product-details ml-32 left-side">
      <p class="text-5xl mb-10 font-bold">Your Orders:</p>
      <div v-for="prod in orders" :key="prod.ProductID" class="border p-4 mb-4 rounded-lg shadow-sm">
        <p class="text-3xl mb-5 font-mono">{{ prod.ProductName }}</p>
        <p class="text-sky-600 text-3xl">${{ prod.price }}</p>
      </div>
      <p class="text-4xl mt-10 total">Total Amount: <span class="m-5">${{ ordertotal }}</span></p>
    </div>

    <!-- Payment Methods Section -->
    <div class="payment-methods ml-32 right-side p-8 bg-gray-100 shadow-lg rounded-lg flex flex-col items-center mr-10">
      <h2 class="text-4xl mb-8 font-semibold font-mono text-gray-800">Payment Methods</h2>
      <form class="w-full space-y-6" @submit.prevent="handleSubmit">
        <label class="payment-option flex items-center p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 transition duration-300">
          <input type="radio" name="payment" value="credit-card" v-model="selectedPayment" class="form-radio h-5 w-5 text-blue-600 mr-4">
          <i class="fas fa-credit-card text-2xl text-blue-600 mr-4"></i>
          <span class="text-2xl font-medium text-gray-700">Credit Card</span>
        </label>
        <label class="payment-option flex items-center p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 transition duration-300">
          <input type="radio" name="payment" value="paypal" v-model="selectedPayment" class="form-radio h-5 w-5 text-blue-600 mr-4">
          <i class="fab fa-paypal text-2xl text-blue-600 mr-4"></i>
          <span class="text-2xl font-medium text-gray-700">PayPal</span>
        </label>
        <label class="payment-option flex items-center p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 transition duration-300">
          <input type="radio" name="payment" value="bank-transfer" v-model="selectedPayment" class="form-radio h-5 w-5 text-blue-600 mr-4">
          <i class="fas fa-university text-2xl text-blue-600 mr-4"></i>
          <span class="text-2xl font-medium text-gray-700">Bank Transfer</span>
        </label>
        <button type="submit" class="checkout w-full text-white bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-800 hover:to-blue-600 py-3 rounded-full transition duration-300">Proceed to Payment</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';
import { useRoute, useRouter } from 'vue-router';

// Initialize Supabase client
const supabase = createClient('https://ezjpjdoqzdjqcpgyltbo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6anBqZG9xemRqcWNwZ3lsdGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MjQyNDYsImV4cCI6MjAyODUwMDI0Nn0.uvgCZLt0Ok_XUVI7od0M17kcpP2DZQ5H08THYUk0Jc4');

const orders = ref([]);
const ordertotal = ref(0);
const selectedPayment = ref(''); // Initialize as an empty string
const router = useRouter(); // Get the router instance

// Fetch data from Supabase
async function fetchData() {
  const { data, error } = await supabase.from('orders').select();
  if (error) {
    console.error('Error fetching orders:', error);
    return;
  }
  orders.value = data;
  console.log(orders);
  getTotal();
}

// Calculate total amount
function getTotal() {
  ordertotal.value = orders.value.reduce((acc, item) => acc + item.price, 0);
}

// Handle form submission
function handleSubmit() {
  if (!selectedPayment.value) {
    alert('Please select a payment method');
    return;
  }
  if (selectedPayment.value === 'paypal') {
    console.log('User selected PayPal as the payment method');
    router.push('/paypal'); // Redirect to the PayPal page
  } else {
    console.log(`User selected ${selectedPayment.value} as the payment method`);
    // Handle other payment methods here
  }
}

onMounted(() => {
  fetchData();
});
</script>


<style scoped>
.left-side,.right-side,.description{
  width: 50%;
  max-width: 50%;
}
.description{
  width: 70%;
}
.main-container {
  display: flex;
  justify-content: space-between;
}

.product-details {
  flex: 2;
}

.payment-methods {
  flex: 1;
  margin-left: 20px;
}

.image {
  width: 500px;
  height: 400px;
  border: 1px solid red;
  padding-top: 10%;
}

.checkout {
  height: 60px;
  border: 2px 1px solid gray;
  text-align: center;
  width: 160px;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 1px 5px 2px 0px rgba(0, 0, 0, 0.2);
  background-color: rgb(250, 157, 86);
}

.payment-methods form {
  display: flex;
  flex-direction: column;
}

.payment-methods label {
  font-size: 1.5rem;
  margin-bottom: 10px;
}
.total{
  border:solid rgb(46, 46, 255);
  background-color: aqua;
  padding: 5px;
  box-shadow: 2px;

}
</style>
