<script setup>

const props = defineProps({
  scrolled: {
    type: Boolean,
    default: false
  }
})

import { ref, onMounted, onBeforeUnmount } from 'vue'
import { locations } from '~/data/locations'
import { watch } from 'vue'


defineEmits(['toggle-nav'])


const { fadeIn } = useAnimation()
const { itemCount } = useCart()


const showLocationPicker = ref(false)


const selectedLocation = ref(
  locations[0]
)


watch(showLocationPicker, (value) => {

  if (value) {
    document.body.style.overflow = "hidden"
  }
  else {
    document.body.style.overflow = ""
  }

})

function changeLocation(location) {

  selectedLocation.value = location

  showLocationPicker.value = false

}



function handleOutsideClick(event) {

  const picker = document.querySelector('.location-wrapper')

  if (
    picker &&
    !picker.contains(event.target)
  ) {

    showLocationPicker.value = false

  }

}



onMounted(() => {

  document.addEventListener(
    'click',
    handleOutsideClick
  )

})


onBeforeUnmount(() => {

  document.removeEventListener(
    'click',
    handleOutsideClick
  )

})

</script>

<template>
  <Motion as="header" v-bind="fadeIn" class="app-header" :class="{ 'app-header--scrolled': props.scrolled }">
    <NuxtLink to="/" class="app-header__logo" aria-label="Kitchen King home">
      <img src="~/assets/images/kitchen-king-logo.png" alt="Kitchen King" />
    </NuxtLink>

    <div class="app-header__tray">
      <div class="location-wrapper">

        <button class="app-header__pill app-header__pill--location"
          @click.stop="showLocationPicker = !showLocationPicker">

          <span>
            {{ selectedLocation.name }}
          </span>

          <IconLocation />

        </button>


        <LocationPicker v-if="showLocationPicker" @close="showLocationPicker = false" @select="changeLocation" />

      </div>

      <NuxtLink to="/order" class="app-header__pill" :aria-label="`Cart, ${itemCount} items`">
        <span>{{ itemCount }}</span>
        <IconCart />
      </NuxtLink>

      <button class="app-header__pill app-header__pill--menu" type="button" aria-label="Open menu"
        @click="$emit('toggle-nav')">
        <span>Menu</span>
        <IconMenu />
      </button>
    </div>
  </Motion>
</template>

<style scoped>
.app-header {

  position: fixed;

  top: 0;
  left: 0;
  right: 0;

  z-index: 55;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;


  padding: 56px 48px 0 41px;

  gap: 16px;


  transition:
    padding .45s ease,
    background-color .45s ease,
    backdrop-filter .45s ease,
    box-shadow .45s ease;

}

.app-header--scrolled {


  padding-top: 20px;
  padding-bottom: 15px;


  background:

    linear-gradient(to bottom,
      rgba(0, 0, 0, .85),
      rgba(0, 0, 0, .45));


  backdrop-filter: blur(10px);


  box-shadow:

    0 10px 30px rgba(0, 0, 0, .35);


}

.app-header__logo img {

  transition:
    height .45s ease;

}


.app-header--scrolled .app-header__logo img {

  height: 42px;

}

.app-header__tray {

  transition:
    transform .45s ease,
    margin-top .45s ease;

}


.app-header--scrolled .app-header__tray {

  margin-top: 8px;
  transform: translateY(-5px);

}

.location-wrapper {
  position: relative;
}

.app-header__logo img {
  /* Figma logo box 171.57 x 56; height drives it and width follows the asset's
     aspect (~169px) so the logo is never distorted. */
  height: 56px;
  width: auto;
  display: block;
}

.app-header__tray {
  display: flex;
  align-items: center;
  gap: 8px;
  /* Figma places the pills 20px below the logo top (top 76 vs logo top 56). */
  margin-top: 20px;
}

.app-header__pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 40px;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 16px;
  line-height: 1;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-white);
  transition: background-color 0.3s var(--ease-out-expo);
}

.app-header__pill--location {
  border-color: transparent;
  background-color: rgba(255, 255, 255, 0.22);
}

.app-header__pill:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.app-header__pill :deep(svg) {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* Designer's mobile spec, measured on a 390px canvas — logo and tray get
   explicit positions (left/top, right/top) rather than the desktop's
   flex/padding layout, so they're converted 1:1 instead of approximated. */
@media (max-width: 768px) {
  .app-header {
    padding: 0;
  }

  /* top uses "32px fixed + proportional remainder" (matching the hero's own
     fixed-32px mobile top padding in HeroSection.vue) rather than a plain
     calc(100vw * 38/390) — a purely proportional top shrinks faster than the
     video's fixed-32px start as the viewport narrows, so below ~330px the
     logo would end up starting *above* where the video begins (verified: it
     did, at 320px). This keeps it locked to always sit inside the video. */
  .app-header__logo {
    position: absolute;
    left: calc(100vw * 14 / 390);
    top: calc(32px + 100vw * 6 / 390);
  }

  .app-header__logo img {

    height: calc(100vw * 36 / 390);

    transition:
      height .45s ease;

  }

  .app-header__tray {
    position: absolute;
    right: calc(100vw * 20 / 390);
    top: calc(32px + 100vw * 12 / 390);
    gap: calc(100vw * 8 / 390);
    margin-top: 0;
    transition:
      top .45s ease,
      transform .45s ease;
  }

  .app-header__pill {
    height: calc(100vw * 28 / 390);
    padding: calc(100vw * 8 / 390) calc(100vw * 12 / 390);
    gap: calc(100vw * 8 / 390);
    border-radius: calc(100vw * 6 / 390);
    font-size: calc(100vw * 12 / 390);
  }

  /* Mobile has no distinct location-pill treatment — all three pills share
     the same subtle background/border. */
  .app-header__pill--location {
    border-color: rgba(255, 255, 255, 0.12);
    background-color: rgba(255, 255, 255, 0.1);
  }

  /* Location keeps its (truncated) label on mobile; unlike desktop, it's the
     menu label that hides, leaving that pill icon-only. */
  .app-header__pill--location span {
    display: block;
    max-width: calc(100vw * 62 / 390);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .app-header__pill--menu span {
    display: none;
  }

  .app-header__pill :deep(svg) {
    width: calc(100vw * 12 / 390);
    height: calc(100vw * 12 / 390);
  }

  /* Mobile scroll state */
  .app-header--scrolled {

    height: 64px;

    background:
      linear-gradient(to bottom,
        rgba(0, 0, 0, 0.85),
        rgba(0, 0, 0, 0.45));

    backdrop-filter: blur(10px);

    box-shadow:
      0 8px 25px rgba(0, 0, 0, .35);

  }


  /* shrink logo when scrolled */
  .app-header--scrolled .app-header__logo {

    top: 18px;

  }


  .app-header--scrolled .app-header__logo img {

    height: 28px;

  }


  /* move buttons slightly up */
  .app-header--scrolled .app-header__tray {

    top: 16px;

  }


  /* slightly compact buttons */
  .app-header--scrolled .app-header__pill {

    height: 32px;

  }
}
</style>
