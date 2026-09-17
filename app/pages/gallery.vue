<script setup>
useSeoMeta({
  title: 'Gallery | Kitchen King',
  description: 'A look inside Kitchen King — Caribbean flavors in Nassau, Bahamas.'
})
</script>

<template>
  <main id="gallery" class="gallery">
    <GalleryHeroSection />
    <AboutStoryBackdrop>
    <GalleryCookingSection />
    <GalleryExperienceSection />
    <InstagramSection />
    </AboutStoryBackdrop>
    <LocationSection />
    <FaqSection />
    <FooterSection />
  </main>
</template>

<style scoped>
.gallery {
  min-height: 100vh;
}
</style>
