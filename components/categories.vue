<template>
  <div class="categories bg-white p-10 ">
    <div class="item flex-1"> Food and Beverages</div>
    <div  class="item flex-1"> Household Essentials</div>
    <div  class="item flex-1">Personal Care</div>
    <div  class="item flex-1">Health and Wellness</div>
    <div  class="item flex-1">Beauty and Grooming</div>
  </div>
</template>

<script setup>
import navbar from './navbar.vue';
</script>

<style lang="scss" scoped>

  .categories{
      display: flex;
     justify-content: space-around;
      text-align: center;
      font-size: 20px;
      gap: 20px;


  }
  .item{
    background-color: rgb(44, 120, 243);
    padding: 15px;
    border-radius: 15px;
    color: white;
    transition: background-color 0.5s;
    font-size: 26px;
  }

  .item:hover{
    background-color: rgb(34, 0, 255);
    cursor: pointer;
    
  }

</style>