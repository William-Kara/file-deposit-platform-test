// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: 
  [    ['@nuxtjs/google-fonts', {
    families: {
      Montserrat: true,
      Poppins: true,
    }
}],],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
