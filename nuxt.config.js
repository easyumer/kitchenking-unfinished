// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['motion-v/nuxt', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  components: [
    { path: '~/components', pathPrefix: false }
  ],
  fonts: {
    families: [
      { name: 'Hanken Grotesk', provider: 'google', weights: [300, 400, 500, 600, 700, 800] },
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700] }
    ]
  }
  
})
