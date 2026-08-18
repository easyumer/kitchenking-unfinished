<script setup>
import burgersImg from '~/assets/images/menu-category-burgers.jpg'
import bowlsImg from '~/assets/images/menu-category-bowls.jpg'
import wingsImg from '~/assets/images/menu-category-wings.jpg'
import dessertsImg from '~/assets/images/menu-category-desserts.jpg'

const categories = [
  { label: 'Burgers & Sandwiches', image: burgersImg },
  { label: 'Caribbean Bowls', image: bowlsImg },
  { label: 'Wings', image: wingsImg },
  { label: 'Desserts', image: dessertsImg }
]

const trackRef = ref(null)
const activeIndex = ref(0)

// Almost 3 of the 4 cards fit on screen at once, so the track's real
// scrollable distance is much shorter than (cards - 1) * card-width — using
// card-width as the step overshoots the browser's actual max scroll for the
// last couple of indexes, so two dots ended up mapped to the *same* clamped
// scroll position (verified: from the end, "prev" produced zero movement,
// since its target and the current position both clamped to maxScroll).
// Splitting the real scrollable range into (count - 1) equal parts instead
// guarantees every index is a distinct, always-reachable stop.
function maxScroll() {
  const track = trackRef.value
  return track ? track.scrollWidth - track.clientWidth : 0
}

function scrollToIndex(index) {
  const track = trackRef.value
  if (!track) return
  const clamped = Math.max(0, Math.min(categories.length - 1, index))
  const target = (maxScroll() * clamped) / (categories.length - 1)
  track.scrollTo({ left: target, behavior: 'smooth' })
}

function updateActiveIndex() {
  const max = maxScroll()
  if (max <= 0) {
    activeIndex.value = 0
    return
  }
  const ratio = trackRef.value.scrollLeft / max
  activeIndex.value = Math.max(0, Math.min(categories.length - 1, Math.round(ratio * (categories.length - 1))))
}

let scrollSettleTimer
function onScroll() {
  clearTimeout(scrollSettleTimer)
  scrollSettleTimer = setTimeout(updateActiveIndex, 100)
}
</script>

<template>
  <section class="menu">
    <div class="menu__header">
      <h2 class="menu__heading">Explore Menu</h2>

      <CarouselNav
        :prev-disabled="activeIndex === 0"
        :next-disabled="activeIndex === categories.length - 1"
        @prev="scrollToIndex(activeIndex - 1)"
        @next="scrollToIndex(activeIndex + 1)"
      />
    </div>

    <div ref="trackRef" class="menu__track" @scroll="onScroll">
      <MenuCategoryCard
        v-for="category in categories"
        :key="category.label"
        class="menu__card"
        :label="category.label"
        :image="category.image"
      />
    </div>

    <CarouselDots :count="categories.length" :active-index="activeIndex" @select="scrollToIndex" />
  </section>
</template>

<style scoped>
/* Figma "Frame 32": 1824px wide at left 48 on a 1920px canvas — same side
   margins and 1920-reference scaling as the hero and story panel. */
.menu {
  padding: 0 calc(100vw * 48 / 1920) calc(100vw * 80 / 1920);
}

.menu__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: calc(100vw * 40 / 1920);
}

.menu__heading {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: calc(100vw * 64 / 1920);
  line-height: 1.2;
  text-transform: uppercase;
  color: var(--color-white);
}

.menu__track {
  display: flex;
  gap: calc(100vw * 24 / 1920);
  margin-bottom: calc(100vw * 24 / 1920);
  overflow-x: auto;
  /* No CSS scroll-snap here — verified it fights programmatic scrolling
     outright, even set to `proximity`: since ~3 of 4 cards fit on screen at
     once, the dots/buttons target positions spread evenly across the real
     scrollable range (see scrollToIndex) rather than sitting on a card
     boundary, and the browser immediately snapped any such scrollLeft change
     — even a same-tick direct assignment, not just scrollTo() — straight back
     to the nearest card edge. The primary way to navigate this carousel is
     the buttons/dots (JS-driven) rather than freeform swipe, so the tradeoff
     favors dropping snap over fighting it. */
  scrollbar-width: none;
}

.menu__track::-webkit-scrollbar {
  display: none;
}

.menu__card {
  flex: 0 0 calc(100vw * 592 / 1920);
  height: calc(100vw * 319 / 1920);
}

@media (max-width: 768px) {
  .menu {
    padding: 0 16px 48px;
  }

  .menu__header {
    margin-bottom: 20px;
  }

  .menu__heading {
    font-size: 28px;
  }

  .menu__track {
    gap: 12px;
    margin-bottom: 16px;
    padding: 0 16px;
    margin-left: -16px;
    margin-right: -16px;
  }

  .menu__card {
    flex-basis: 78vw;
    height: 260px;
  }
}
</style>
