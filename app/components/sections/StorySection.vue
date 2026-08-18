<script setup>
const { fadeUp } = useAnimation()
</script>

<template>
  <section class="story">
    <Motion as="div" v-bind="fadeUp" class="story__panel">
      <img
        class="story__image"
        src="~/assets/images/story-prep-counter.jpg"
        alt="Ingredients and prep counter at Kitchen King"
      />

      <div class="story__content">
        <h2 class="story__heading">Kitchen King brings together handcrafted</h2>

        <div class="story__body">
          <p class="story__text">
            burgers, Caribbean-inspired bowls, crispy wings, and crave-worthy sides, all created
            under the culinary direction of renowned private chef Donovan Smith.
          </p>
          <p class="story__text">
            Whether you're grabbing lunch on the go or satisfying a late-night craving, every
            order is made fresh and packed with flavor.
          </p>
        </div>
      </div>
    </Motion>
  </section>
</template>

<style scoped>
/* Figma "Frame 8": 1824x433 panel at left 48 / top (varies with whatever
   precedes it) on a 1920px canvas — 48px side margins, height and every
   internal value scale off the same 1920 reference the hero uses. */
.story {
  padding: calc(100vw * 64 / 1920) calc(100vw * 48 / 1920) calc(100vw * 80 / 1920);
}

.story__panel {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  gap: calc(100vw * 178 / 1920);
  padding: calc(100vw * 40 / 1920);
  height: calc(100vw * 433 / 1920);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: calc(100vw * 24 / 1920);
}

/* flex-grow — the image is the flexible element in this layout, the text
   column next to it is a fixed width (see .story__content). */
.story__image {
  flex: 1 1 calc(100vw * 706 / 1920);
  height: calc(100vw * 353 / 1920);
  min-width: 0;
  object-fit: cover;
  border-radius: calc(100vw * 8 / 1920);
}

/* align-self: stretch — matches the image's height (the panel's own fixed
   height minus its padding) so justify-content: space-between below can pin
   the heading to the top and the body copy to the bottom of that space. */
.story__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  flex: 0 0 calc(100vw * 860 / 1920);
}

.story__heading {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: calc(100vw * 32 / 1920);
  line-height: 1.2;
  text-transform: uppercase;
  color: var(--color-white);
}

.story__body {
  display: flex;
  flex-direction: column;
  gap: calc(100vw * 24 / 1920);
}

.story__text {
  margin: 0;
  font-family: var(--font-body);
  font-weight: 400;
  font-size: calc(100vw * 20 / 1920);
  line-height: 1.2;
  color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .story {
    padding: 32px 16px 48px;
  }

  /* No mobile spec yet — stacked, full-width, auto height instead of the
     desktop's fixed-height side-by-side panel. */
  .story__panel {
    flex-direction: column;
    height: auto;
    gap: 24px;
    padding: 16px;
    border-radius: 16px;
  }

  .story__image {
    flex: none;
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
  }

  .story__content {
    flex: none;
    gap: 20px;
  }

  .story__heading {
    font-size: 24px;
  }

  .story__text {
    font-size: 16px;
  }
}
</style>
