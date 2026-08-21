<script setup>
useSeoMeta({
  title: 'Kitchen King | Caribbean Restaurant, Nassau Bahamas',
  description: 'Fresh Caribbean flavors in Nassau, Bahamas. Dine in, order online, or reserve a table.',
  ogTitle: 'Kitchen King',
  ogDescription: 'Fresh Caribbean flavors in Nassau, Bahamas.'
})
</script>

<template>
  <main id="menu" class="menu">
    <MenuHeroSection />
    <MenuOrderSection />
    <InstagramLocation />
    <FaqSection />
    <FooterSection />
  </main>
</template>

<style scoped>
.menu {
  min-height: 100vh;
}
</style>
