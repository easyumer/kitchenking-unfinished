<script setup>
useSeoMeta({
  title: 'About | Kitchen King',
  description: 'Good food, made for you. Learn the story behind Kitchen King and visit us in Nassau, Bahamas.',
  ogTitle: 'About Kitchen King',
  ogDescription: 'Good food, made for you. Learn the story behind Kitchen King.'
})
</script>

<template>
  <main id="about" class="about">
    <AboutHeroSection />
    <AboutStoryBackdrop>
      <AboutCareSection />
      <AboutFreshSection />
    </AboutStoryBackdrop>
    <LocationSection />
    <FaqSection />
    <FooterSection />
  </main>
</template>

<style scoped>
.about {
  min-height: 100vh;
}
</style>
