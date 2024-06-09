<template>
  <Navbarlogin/>
  
  <div class="flex justify-center">
      <div class="absolute top-1/2 text-semibold text-5xl mb-5">
        Welcome To StockPilot
      </div>

      <div class="login-container">
        <form class="login-form">
          <div class="form-group">
            <input type="email" class="form-control" placeholder="Email">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Password">
          </div>
          <NuxtLink to="/home"><button class="btn">Register</button></NuxtLink>
          <p class="mt-10 text-xl"> Already have an account? <span class="text-blue-500"><NuxtLink to="/">Log in</NuxtLink></span></p>
        </form>
      
      </div>

  </div>
</template>

<script setup>

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
</style>
