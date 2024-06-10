<template>
  <Navbarlogin/>
  <div class="flex justify-center">
    <div class="absolute top-1/4 text-semibold text-5xl">
      Welcome To StockPilot
    </div>

    <div class="login-container">
      <form class="login-form" @submit.prevent="signIn">
        <div class="form-group">
          <input type="email" class="form-control" placeholder="Email" v-model="email">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Password" v-model="password">
        </div>
        <button class="btn" type="submit">Login</button>
        <p class="mt-10 text-xl">No account? 
          <span class="text-blue-500"><NuxtLink to="/signup">Sign up</NuxtLink></span>
        </p>
        <p class="font-serif italic pt-5 text-blue-400">
          <NuxtLink to="/adminlogin">Are you an administrator?</NuxtLink>
        </p>
        <!-- Display error message -->
        <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const router = useRouter();
const client = useSupabaseClient();
const email = ref('');
const password = ref('');
const errorMsg = ref(null);

async function signIn() {
  errorMsg.value = null; // Clear previous error message

  try {
    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;

    router.push("/home");
  } catch (error) {
    errorMsg.value = error.message; // Display the error message directly from Supabase
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
  height: 500px;
}

.form-group {
  margin-bottom: 30px;
}

.form-control {
  width: 100%;
  padding: 20px;
  font-size: 20px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  height: 60px;
}

.btn {
  width: 100%;
  padding: 20px;
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
</style>
