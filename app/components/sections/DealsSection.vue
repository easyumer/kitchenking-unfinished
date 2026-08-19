<script setup>
import bannerImg from '~/assets/images/Dealandoffers.png'
</script>

<template>
  <section class="deals">
    <h2 class="deals__heading">Deals &amp; Offers</h2>

    <div class="deals__banner" :style="{ backgroundImage: `url(${bannerImg})` }">

      <div class="deals__content">
        <div class="deals__title">
          <h3>FAMILY</h3>
          <span>COMBO DEAL</span>
        </div>

        <p class="deals__copy">
          *Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.
        </p>
      </div>

    </div>

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
  aspect-ratio: 1824 / 720;
  border-radius: calc(100vw * 24 / 1920);
  background-size: cover;
  background-position: center 70%;
  overflow: hidden;
}

.deals__banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(266.58deg, var(--color-gold) 27.5%, rgba(255, 202, 89, 0) 73.46%);
}

.deals__title {
  position: absolute;
  top: calc(100vw * 80 / 1920);
  right: calc(100vw * 95 / 1920);
  text-align: center;
  color: var(--color-deep);
}

.deals__content {
  color: var(--color-deep);
}


.deals__title h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: calc(100vw * 200 / 1920);
  font-weight: 600;
  line-height: 0.9;
  letter-spacing: 2px;
}


.deals__title span {
  display: block;
  margin-top: calc(100vw * 10 / 1920);
  font-family: var(--font-body);
  font-size: calc(100vw * 75 / 1920);
  font-weight: 300;
  letter-spacing: calc(100vw * 20 / 1920);
}

.deals__copy {
  position: absolute;
  right: calc(100vw * 78 / 1920);
  bottom: calc(100vw * 60 / 1920);
  width: calc(100vw * 651 / 1920);
  margin: 0;
  font-family: var(--font-body);
  font-size: calc(100vw * 20 / 1920);
  line-height: 1.2;
  color: var(--color-deep);
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
  }

  .deals__content {
    position: absolute;
    top: 50%;
    right: 16px;
    width: 58%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    transform: translateY(-50%);
  }

  .deals__title {
    position: static;
  }

  .deals__copy {
    position: static;
    right: auto;
    bottom: auto;
    width: 100%;
    font-size: 10px;
    text-align: right;
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

  .deals__title h3 {
    font-size: 26px;
    letter-spacing: 1px;
  }

  .deals__title span {
    margin-top: 4px;
    font-size: 10px;
    letter-spacing: 3px;
  }
}
</style>
