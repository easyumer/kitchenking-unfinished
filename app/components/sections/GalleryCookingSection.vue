<script setup>
import cookingImage1 from '~/assets/images/gallery/Take a look at whats cooking image(1).png'
import cookingImage2 from '~/assets/images/gallery/Take a look at whats cooking image(2).png'
import cookingImage3 from '~/assets/images/gallery/Take a look at whats cooking image(3).png'
import cookingImage4 from '~/assets/images/gallery/Take a look at whats cooking image(4).png'
import cookingImage5 from '~/assets/images/gallery/Take a look at whats cooking image(5).png'

const { fadeUp } = useAnimation()

const photos = [
  { image: cookingImage1, alt: 'Kitchen King kitchen at work' },
  { image: cookingImage2, alt: 'Fresh ingredients being prepped' },
  { image: cookingImage3, alt: 'A Kitchen King spread on the table' },
  { image: cookingImage4, alt: 'A Kitchen King burger unwrapped' },
  { image: cookingImage5, alt: 'Kitchen King food truck service' }
]

const trackRef = ref(null)
const activeIndex = ref(0)

// Same reasoning as ExploreMenuSection.vue: the cards fit unevenly, so the
// dots/buttons target positions spread evenly across the real scrollable
// range instead of stepping by a fixed card width.
function maxScroll() {
  const track = trackRef.value
  return track ? track.scrollWidth - track.clientWidth : 0
}

function scrollToIndex(index) {
  const track = trackRef.value
  if (!track) return
  const clamped = Math.max(0, Math.min(photos.length - 1, index))
  const target = (maxScroll() * clamped) / (photos.length - 1)
  track.scrollTo({ left: target, behavior: 'smooth' })
}

function updateActiveIndex() {
  const max = maxScroll()
  if (max <= 0) {
    activeIndex.value = 0
    return
  }
  const ratio = trackRef.value.scrollLeft / max
  activeIndex.value = Math.max(0, Math.min(photos.length - 1, Math.round(ratio * (photos.length - 1))))
}

let scrollSettleTimer
function onScroll() {
  clearTimeout(scrollSettleTimer)
  scrollSettleTimer = setTimeout(updateActiveIndex, 100)
}
</script>

<template>
  <Motion as="section" v-bind="fadeUp" class="cooking">
    <h2 class="cooking__heading">Take a look at<br />what's cooking.</h2>

    <CarouselNav
      class="cooking__nav"
      :prev-disabled="activeIndex === 0"
      :next-disabled="activeIndex === photos.length - 1"
      @prev="scrollToIndex(activeIndex - 1)"
      @next="scrollToIndex(activeIndex + 1)"
    >
      <template #prev-icon>
        <IconArrowRight class="cooking__nav-icon cooking__nav-icon--prev" />
      </template>
      <template #next-icon>
        <IconArrowRight class="cooking__nav-icon" />
      </template>
    </CarouselNav>

    <div ref="trackRef" class="cooking__track" @scroll="onScroll">
      <div v-for="(photo, index) in photos" :key="index" class="cooking__card">
        <img :src="photo.image" :alt="photo.alt" loading="lazy" />
      </div>
    </div>
  </Motion>
</template>

<style scoped>
.cooking {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: "heading nav" "track track";
  padding: calc(100vw * 140 / 1920) calc(100vw * 48 / 1920) calc(100vw * 160 / 1920);
}

.cooking__heading {
  grid-area: heading;
  align-self: end;
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: calc(100vw * 64 / 1920);
  line-height: 1.125;
  text-transform: uppercase;
  color: var(--color-white);
}

.cooking__nav {
  grid-area: nav;
  align-self: end;
}

.cooking__nav-icon {
  width: calc(100vw * 24 / 1920);
  height: calc(100vw * 24 / 1920);
}

.cooking__nav-icon--prev {
  transform: rotate(180deg);
}

.cooking__track {
  grid-area: track;
  display: flex;
  gap: calc(100vw * 24 / 1920);
  margin-top: calc(100vw * 40 / 1920);
  height: calc(100vw * 506 / 1920);
  overflow-x: auto;
  scrollbar-width: none;
}

.cooking__track::-webkit-scrollbar {
  display: none;
}

.cooking__card {
  flex-shrink: 0;
  height: 100%;
  border-radius: calc(100vw * 24 / 1920);
  overflow: hidden;
}

.cooking__card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cooking__card:nth-child(1) {
  width: calc(100vw * 900 / 1920);
}

.cooking__card:nth-child(2) {
  width: calc(100vw * 285 / 1920);
}

.cooking__card:nth-child(3) {
  width: calc(100vw * 506 / 1920);
}

.cooking__card:nth-child(4) {
  width: calc(100vw * 380 / 1920);
}

.cooking__card:nth-child(5) {
  width: calc(100vw * 900 / 1920);
}

@media (max-width: 768px) {
  .cooking {
    grid-template-columns: 1fr;
    grid-template-areas: "heading" "track" "nav";
    padding: 48px 16px calc(100vw * 136 / 390);
  }

  .cooking__heading {
    font-size: 36px;
    line-height: 1.222;
  }

  .cooking__nav {
    justify-self: start;
    align-self: auto;
    margin-top: 16px;
  }

  .cooking__nav-icon {
    width: 18px;
    height: 18px;
  }

  .cooking__track {
    gap: calc(100vw * 24 / 390);
    margin-top: 20px;
    height: calc(100vw * 280 / 390);
    padding: 0 16px;
    margin-left: -16px;
    margin-right: -16px;
  }

  .cooking__card:nth-child(1) {
    width: calc(100vw * 498 / 390);
  }

  .cooking__card:nth-child(2) {
    width: calc(100vw * 158 / 390);
  }

  .cooking__card:nth-child(3) {
    width: calc(100vw * 280 / 390);
  }

  .cooking__card:nth-child(4) {
    width: calc(100vw * 210 / 390);
  }

  .cooking__card:nth-child(5) {
    width: calc(100vw * 498 / 390);
  }
}
</style>
