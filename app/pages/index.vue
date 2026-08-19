<script setup>
useSeoMeta({
  title: 'Kitchen King | Caribbean Restaurant, Nassau Bahamas',
  description: 'Fresh Caribbean flavors in Nassau, Bahamas. Dine in, order online, or reserve a table.',
  ogTitle: 'Kitchen King',
  ogDescription: 'Fresh Caribbean flavors in Nassau, Bahamas.'
})
</script>

<template>
  <main id="home" class="home">
    <HeroSection />
    <StorySection />
    <ExploreMenuSection />
    <BestsellersSection />
    <DealsSection />
    <FreshTakeSection />
    <InstagramLocation />
    <FaqSection />
    <FooterSection />
  </main>
</template>

<style scoped>
.home {
  min-height: 100vh;
}
</style>
