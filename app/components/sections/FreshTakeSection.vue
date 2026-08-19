<script setup>
import bannerImg from '~/assets/images/fresh-take-banner.jpg'
const { fadeUp } = useAnimation()
</script>

<template>
  <section class="fresh-take">
    <Motion as="div" v-bind="fadeUp" class="fresh-take__banner" :style="{ backgroundImage: `url(${bannerImg})` }">
      <div class="fresh-take__content">
        <h2 class="fresh-take__heading">A Fresh Take<br />on Fast Food.</h2>

        <div class="fresh-take__copy">
          <p>
            Kitchen King was founded on a simple idea: fast food should never feel ordinary.
            Working alongside renowned private chef Donovan Smith, we've reimagined familiar
            favorites with quality ingredients, thoughtful recipes, and a commitment to serving
            food that's worth coming back for.
          </p>
          <p>
            From handcrafted burgers to Caribbean-inspired bowls, every item is prepared with the
            same attention to detail you'd expect from a great kitchen, delivered with the speed
            and convenience of your favorite fast-food spot.
          </p>
          <p>
            Today, Kitchen King proudly serves Nassau from our food truck, bringing chef-driven
            comfort food directly to the community we call home.
          </p>
        </div>
      </div>
    </Motion>
  </section>
</template>

<style scoped>
.fresh-take {
  padding: 0 calc(100vw * 20 / 1920) calc(100vw * 80 / 1920);
}

.fresh-take__banner {
  position: relative;
  aspect-ratio: 1880 / 1864;
  border-radius: calc(100vw * 32 / 1920);
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.fresh-take__banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(0deg, rgba(7, 7, 7, 0.4), rgba(7, 7, 7, 0.4)),
    linear-gradient(180deg, #070707 -0.21%, rgba(7, 7, 7, 0) 100%);
}

.fresh-take__content {
  position: absolute;
  left: calc(100vw * 68 / 1920);
  right: calc(100vw * 68 / 1920);
  top: calc(100vw * 160 / 1920);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: calc(100vw * 209 / 1920);
}

.fresh-take__heading {
  flex: 0 0 calc(100vw * 552 / 1920);
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: calc(100vw * 64 / 1920);
  line-height: 1.125;
  text-transform: uppercase;
  color: var(--color-white);
}

.fresh-take__copy {
  flex: 0 0 calc(100vw * 1014 / 1920);
  display: flex;
  flex-direction: column;
  gap: calc(100vw * 20 / 1920);
}

.fresh-take__copy p {
  margin: 0;
  font-family: var(--font-body);
  font-weight: 300;
  font-size: calc(100vw * 20 / 1920);
  line-height: 1.4;
  color: rgba(250, 250, 250, 0.8);
}

@media (max-width: 768px) {
  .fresh-take {
    padding: 0 16px 48px;
  }

  .fresh-take__banner {
    aspect-ratio: auto;
    min-height: clamp(1000px, 170vw, 700px);
    border-radius: 20px;
    background-position: center bottom;
  }

  .fresh-take__banner::before {
    background:
      linear-gradient(0deg, rgba(7, 7, 7, 0.4), rgba(7, 7, 7, 0.4)),
      linear-gradient(180deg, #070707 0%, #070707 55%, rgba(7, 7, 7, 0) 78%);
  }

  .fresh-take__content {
    position: relative;
    display: flex;
    z-index: 1;
    flex-direction: column;
    gap: 24px;
    padding: 32px 20px;
  }

  .fresh-take__heading {
    flex: none;
    font-size: 32px;
  }

  .fresh-take__copy {
    flex: none;
    gap: 16px;
  }

  .fresh-take__copy p {
    font-size: 15px;
  }
}
</style>
