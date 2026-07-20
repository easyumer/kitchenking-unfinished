<script setup>
const { fadeUp } = useAnimation()
</script>

<template>
  <section class="story">
    <div class="story__inner">
      <Motion as="div" v-bind="fadeUp" class="story__image-wrap">
        <img
          src="~/assets/images/story-prep-counter.jpg"
          alt="Kitchen King prep counter"
          class="story__image"
        />
      </Motion>

      <Motion as="div" v-bind="fadeUp" class="story__text">
        <h2>Bahamian flavors, cooked with tradition and fire.</h2>
        <div class="story__body">
          <p>
            At Kitchen King, we honor the ingredients the sea and the land give us. Every plate
            starts with the day's freshest catch, hand-picked produce from local markets, and
            spice blends passed down through generations.
          </p>
          <p>
            From our cracked conch to our slow-braised oxtail, every dish carries a story. Your
            meal can be a quick plate of <strong>jerk chicken with festival dumplings</strong> or
            a full island feast for the whole table.
          </p>
          <p>
            Whether you are stopping by for lunch or settling in for the evening,
            <strong>the kitchen is always ready.</strong>
          </p>
        </div>
      </Motion>
    </div>
  </section>
</template>

<style scoped>
.story {
  background-color: var(--color-section);
  border-radius: 20px 20px 0 0;
  padding: 100px 48px;
}

.story__inner {
  display: flex;
  align-items: flex-start;
  gap: 178px;
  max-width: 1208px;
  margin: 0 auto;
}

.story__image-wrap {
  flex: none;
  width: 438px;
  max-width: 100%;
}

.story__image {
  width: 100%;
  aspect-ratio: 438 / 585;
  object-fit: cover;
  border-radius: 16px;
}

.story__text {
  position: sticky;
  top: 140px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 592px;
}

.story__text h2 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(28px, 3.5vw, 40px);
  line-height: 1.2;
  color: var(--color-gold-light);
}

.story__body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.story__body p {
  font-family: var(--font-body);
  font-weight: 300;
  font-size: 20px;
  line-height: 1.2;
  color: var(--color-offwhite);
}

.story__body strong {
  font-weight: 700;
}

@media (max-width: 900px) {
  .story__inner {
    flex-direction: column;
    gap: 48px;
  }

  .story__image-wrap {
    width: 100%;
    max-width: 438px;
  }

  .story__text {
    position: static;
  }
}

@media (max-width: 600px) {
  .story {
    padding: 64px 24px;
  }
}
</style>
