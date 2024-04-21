<template>
  <div>
    <ul>
    <li v-for="country in countries" :key="country.id">{{ country.name }}</li>
  </ul>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://ezjpjdoqzdjqcpgyltbo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6anBqZG9xemRqcWNwZ3lsdGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MjQyNDYsImV4cCI6MjAyODUwMDI0Nn0.uvgCZLt0Ok_XUVI7od0M17kcpP2DZQ5H08THYUk0Jc4')
const countries = ref([])

async function getCountries() {
  const { data } = await supabase.from('countries').select() //mura i select tanan data aron naa access
  countries.value = data //isulod sa array ang data na naaccess
}

onMounted(() => {
  getCountries()
})
</script>

<style lang="scss" scoped>

</style>