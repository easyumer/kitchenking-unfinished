<script setup>
import bannerImg from '~/assets/images/Banner.png'
</script>

<template>
  <section class="deals">
    <h2 class="deals__heading">Deals &amp; Offers</h2>

    <div class="deals__banner" :style="{ backgroundImage: `url(${bannerImg})` }"></div>

    <div class="deals__nav">
      <button class="deals__nav-btn" type="button" aria-label="Previous deal" disabled>
        <IconArrowRight class="deals__nav-icon deals__nav-icon--prev" />
      </button>
      <button class="deals__nav-btn deals__nav-btn--active" type="button" aria-label="Next deal">
        <IconArrowRight class="deals__nav-icon" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.deals {
  padding: 0 calc(100vw * 48 / 1920) calc(100vw * 80 / 1920);
}

.deals__heading {
  margin: 0 0 calc(100vw * 45 / 1920);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: calc(100vw * 64 / 1920);
  line-height: 1.125;
  text-transform: uppercase;
  color: var(--color-white);
}

.deals__banner {
  position: relative;
  width: 100%;
  aspect-ratio: 1824 / 720;
  border-radius: calc(100vw * 24 / 1920);
  background-size: cover;
  background-position: center;
  overflow: hidden;
}


.deals__nav {
  display: flex;
  align-items: center;
  gap: calc(100vw * 24 / 1920);
  margin-top: calc(100vw * 32 / 1920);
}

.deals__nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw * 56 / 1920);
  height: calc(100vw * 56 / 1920);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: calc(100vw * 12 / 1920);
  background: none;
  color: var(--color-white);
  cursor: pointer;
  transition:
    background-color 0.3s var(--ease-out-expo),
    border-color 0.3s var(--ease-out-expo),
    color 0.3s var(--ease-out-expo);
}

.deals__nav-btn--active {
  background-color: var(--color-white);
  border-color: var(--color-white);
  color: var(--color-deep);
}

.deals__nav-btn:disabled {
  cursor: not-allowed;
}

.deals__nav-icon {
  width: calc(100vw * 24 / 1920);
  height: calc(100vw * 24 / 1920);
}

.deals__nav-icon--prev {
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .deals {
    padding: 0 16px 48px;
  }

  .deals__heading {
    font-size: 32px;
    margin-bottom: 20px;
  }

  .deals__banner {
    border-radius: 16px;
    background-position: center;
  }

  .deals__nav {
    gap: 12px;
    margin-top: 20px;
  }

  .deals__nav-btn {
    width: 44px;
    height: 44px;
    border-radius: 10px;
  }

  .deals__nav-icon {
    width: 20px;
    height: 20px;
  }


}
</style>
