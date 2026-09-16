<script setup>
import sectionBackground from '~/assets/images/about/Made with care and fresh section background.png'
</script>

<template>
  <div class="story-backdrop" :style="{ backgroundImage: `url('${sectionBackground}')` }">
    <slot />
  </div>
</template>

<style scoped>
/* One tall backdrop image shared across AboutCareSection + AboutFreshSection
   (slotted in as children) rather than each section carrying its own copy —
   the source image is a single tall graphic with black margins around one
   crosshatch band, not a small repeatable tile, so it's stretched once over
   the wrapper's full natural height instead of tiled per-section. */
.story-backdrop {
  background-color: #000;

  background-repeat: no-repeat;

  /* Keep original image proportions */
  background-size: 100% auto;

  /* Start backdrop from its original top */
  background-position: top center;


}

@media (max-width: 768px) {
  .story-backdrop {
    background-size: auto 100%;
    background-position: top center;
    min-height: 1200px;
  }}
</style>
