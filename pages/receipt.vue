<template>
  <navbarlogin></navbarlogin>
  <div class="main-container mt-10 p-24 gap-8">
    <!-- Product Details Section -->
    <div class="product-details ml-32 left-side">
      <p class="text-5xl mb-10 font-bold">Your Receipt:</p>
      <div v-for="prod in orders" :key="prod.ProductID" class="border p-4 rounded-lg shadow-sm text-xl flex justify-between">
        <div>
        <p class=" mb-5 font-mono"> {{ prod.ProductName }} </p>
        <p class="text-sky-600 ">{{ prod.quantity}} X {{ prod.price }}</p>
       </div>
        <div class="ml">${{ prod.TotalAmount }}</div>
    </div>
      <p class="text-4xl mt-10 total">Total Amount: <span class="m-5">${{ ordertotal }}</span></p>
    </div>

    <!-- Payment Methods Section -->
    <div class="paypal-container right-side flex flex-col items-center bg-gray-100 p-8 rounded-lg shadow-lg">
      <img src="/public/images/paypal.png" alt="PayPal" class="paypal mb-4">
      <div v-for="cust in customer" :key="cust.CustomerID" class="text-4xl font-arial mt-5 font-semibold">Your Balance: <span class="text-4xl ml-5"> ${{ cust.PayPal }}</span></div>
      <div class="text-3xl mt-10 text-green-800">Successfully paid <span class="m-5 text-black">${{ ordertotal }}</span></div>
    
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';
const { id } = useRoute().params; // use the passed product id to access the whole data
const supabase = createClient('https://ezjpjdoqzdjqcpgyltbo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6anBqZG9xemRqcWNwZ3lsdGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MjQyNDYsImV4cCI6MjAyODUwMDI0Nn0.uvgCZLt0Ok_XUVI7od0M17kcpP2DZQ5H08THYUk0Jc4');
const orders = ref([]);
const ordertotal=ref(0);
const customer = ref([]);


async function fetchData() {
  const { data:ordered } = await supabase.from('orders').select();
  orders.value = ordered;
  console.log(orders);
  getTotal();
  const { data:customers } = await supabase.from('customers').select().eq('CustomerID',1);
  customer.value = customers;
}
async function getTotal(){
  for(const item of orders.value){
    ordertotal.value = ordertotal.value+item.TotalAmount;
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
.confirm-button{
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
.total{
  border:solid rgb(46, 46, 255);
  background-color: aqua;
  padding: 5px;
  box-shadow: 2px;

}
.paypal{
  width: 200px;
  height:200px;
}
</style>
