<template>
  <div>
<navbar></navbar>
<div> <slot/> </div>
<footer></footer>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .router-link-exact-active {
    color: blue;
  }
</style>