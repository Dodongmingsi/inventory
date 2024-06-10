<template>
  <navbarlogin></navbarlogin>
  <div class="main-container mt-10 p-24">
    <div class="product-details ml-32 left-side">
      <p class="text-5xl mb-10 font-bold">Your Orders:</p>
      <div v-for="prod in orders" :key="prod.ProductID" class="border p-4 mb-4 rounded-lg shadow-sm">
        <p class="text-3xl mb-5 font-mono">{{ prod.ProductName }}</p>
        <p class="text-sky-600 text-3xl">${{ prod.price }}</p>
      </div>
      <p class="text-4xl mt-10 total">Total Amount: <span class="m-5">${{ ordertotal }}</span></p>
    </div>

    <div class="paypal-container right-side flex flex-col items-center bg-gray-100 p-8 rounded-lg shadow-lg">
      <img src="/public/images/paypal.png" alt="PayPal" class="paypal mb-4">
      <div v-for="cust in customer" :key="cust.CustomerID" class="text-4xl font-arial mt-5 font-semibold">Your Balance: <span class="text-4xl ml-5">${{ cust.PayPal }}</span></div>
      <div class="text-2xl mt-10">Total Amount: <span class="m-5">${{ ordertotal }}</span></div>
      <button class="text-2xl mt-10 bg-blue-500 text-white p-5 pr-10 pl-10 confirm-button" @click="confirmpayment">Confirm Payment</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'vue-router';

const supabase = createClient('https://ezjpjdoqzdjqcpgyltbo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6anBqZG9xemRqcWNwZ3lsdGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MjQyNDYsImV4cCI6MjAyODUwMDI0Nn0.uvgCZLt0Ok_XUVI7od0M17kcpP2DZQ5H08THYUk0Jc4');
const orders = ref([]);
const ordertotal = ref(0);
const customer = ref([]);
const router = useRouter();

async function fetchData() {
  const { data: ordered, error: orderError } = await supabase.from('orders').select();
  if (orderError) {
    console.error('Error fetching orders:', orderError);
    return;
  }
  orders.value = ordered;
  getTotal();

  const { data: customers, error: customerError } = await supabase.from('customers').select().eq('CustomerID', 1);
  if (customerError) {
    console.error('Error fetching customer:', customerError);
    return;
  }
  customer.value = customers;
}

function getTotal() {
  ordertotal.value = orders.value.reduce((acc, item) => acc + item.price, 0);
}

async function confirmpayment() {
  if (customer.value.length === 0) {
    console.error('Customer not found');
    return;
  }
 for (const items of orders.value){
  addItemToadminOrders(items);
 }



  const currentBalance = customer.value[0].PayPal;
  if (typeof currentBalance !== 'number' || typeof ordertotal.value !== 'number') {
    console.error('Invalid balance or order total');
    return;
  }

  const newBalance = currentBalance - ordertotal.value;
  if (newBalance < 0) {
    alert('Insufficient balance');
    return;
  }


  console.log('Current Balance:', currentBalance);
  console.log('Order Total:', ordertotal.value);
  console.log('New Balance:', newBalance);

  const { data, error } = await supabase
    .from('customers')
    .update({ PayPal: newBalance })
    .eq('CustomerID', 1)
    .select();

  if (error) {
    console.error('Error updating balance:', error);
    return;
  }

  customer.value[0].PayPal = newBalance; // Update the local state to reflect the new balance
  router.push('/receipt');
}

async function addItemToadminOrders(prod) {
  // Check if the product already exists in the cart
  const { data: existingProduct } = await supabase
    .from('adminOrders')
    .select('quantity')
    .eq('ProductName', prod.ProductName)
    .single();

  if (existingProduct) {
    // If the product exists, update the quantity
    const newQuantity = existingProduct.quantity + 1;
    let newTotal = newQuantity * prod.price;
    const { error } = await supabase
      .from('adminOrders')
      .update({ quantity: newQuantity,TotalAmount:newTotal })
      .eq('ProductID', prod.ProductID);
      
    if (error) {
      console.error("Error updating product quantity", error.message);
      return;
    }
  } else {
    // If the product doesn't exist, insert a new record
    const currentDate = new Date().toISOString()
    const { error } = await supabase.from('adminOrders').insert([
      {
        ProductID:prod.ProductID,
        ProductName: prod.ProductName,
        CustomerID:1,
        price: prod.price,
        quantity: 1, // Initial quantity for a new product
        TotalAmount:prod.price,
        OrderDate:currentDate,
      }
    ]);

    if (error) {
      console.error("Error inserting a new product", error.message);
      return;
    }
  }
}


onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.left-side, .right-side, .description {
  width: 50%;
  max-width: 50%;
}
.description {
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
.confirm-button {
  border-radius: 10px;
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
.total {
  border: solid rgb(46, 46, 255);
  background-color: aqua;
  padding: 5px;
  box-shadow: 2px;
}
.paypal {
  width: 200px;
  height: 200px;
}
</style>
