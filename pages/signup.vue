<template>
  <Navbarlogin/>

  <div class="flex justify-center">
    <div class="absolute top-1/4 text-semibold text-5xl">
      Welcome To StockPilot
    </div>

    <div class="login-container">
      <form class="login-form" @submit.prevent="signUp">
        <div class="form-group">
          <input type="email" class="form-control" placeholder="Email" v-model="email">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Password" v-model="password">
        </div>
        <button class="btn" type="submit">Register</button>
        <p class="mt-10 text-xl">Already have an account? 
          <span class="text-blue-500">
            <NuxtLink to="/">Log in</NuxtLink>
          </span>
        </p>
        <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
        <div v-if="successMsg" class="success">{{ successMsg }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const client = useSupabaseClient();
const email = ref('');
const password = ref('');
const errorMsg = ref(null);
const successMsg = ref(null);

async function signUp() {
  if (!email.value || !password.value) {
    errorMsg.value = 'Please fill out all fields.';
    successMsg.value = null;
    return;
  }

  try {
    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    successMsg.value = "Check your email to confirm your account.";
    errorMsg.value = null;
  } catch (error) {
    errorMsg.value = error.message;
    successMsg.value = null;
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  background-color: #f8f9fa;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 600px;
  height: 500px; /* Increased height */
}

.form-group {
  margin-bottom: 30px;
}

.form-control {
  width: 100%;
  padding: 20px; /* Increased padding */
  font-size: 20px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  height: 60px; /* Increased height */
}

.btn {
  width: 100%;
  padding: 20px; /* Increased padding */
  font-size: 20px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>
