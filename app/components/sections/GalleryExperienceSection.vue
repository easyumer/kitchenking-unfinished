<script setup>
import experienceImage1 from '~/assets/images/gallery/A collection of experience image(1).png'
import experienceImage2 from '~/assets/images/gallery/A collection of experience image(2).png'
import experienceImage3 from '~/assets/images/gallery/A collection of experience image(3).png'

const { fadeUp } = useAnimation()

const photos = [
  { image: experienceImage1, alt: 'Guests sharing a Kitchen King meal' },
  { image: experienceImage2, alt: 'Kitchen King food truck lit up at night' },
  { image: experienceImage3, alt: 'Guests ordering at the Kitchen King truck' }
]
</script>

<template>
  <Motion as="section" v-bind="fadeUp" class="experience">
    <h2 class="experience__heading">A collection<br />of Experiences</h2>

    <div class="experience__grid">
      <PhotoAlbumStack
        v-for="(photo, index) in photos"
        :key="index"
        class="experience__item"
        :image="photo.image"
        :alt="photo.alt"
      />
    </div>
  </Motion>
</template>

<style scoped>
.experience {
  padding: 0 calc(100vw * 48 / 1920) calc(100vw * 80 / 1920);
}

.experience__heading {
  margin: 0 0 calc(100vw * 45 / 1920);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: calc(100vw * 64 / 1920);
  line-height: 1.125;
  text-transform: uppercase;
  color: var(--color-white);
}

.experience__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: calc(100vw * 24 / 1920);
}

.experience__item {
  aspect-ratio: 1 / 1;
}

@media (max-width: 768px) {
  .experience {
    padding: 0 16px 48px;
  }

  .experience__heading {
    font-size: 36px;
    line-height: 1.222;
    margin-bottom: 20px;
  }

  .experience__grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
