export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', "@nuxtjs/supabase"],

  supabase: {
      redirect: false,
  },
  
  redirectOptions: {
    login: '/login',
    callback: '/home',
    include: undefined,
    exclude: [],
    cookieRedirect: false,
  },
})