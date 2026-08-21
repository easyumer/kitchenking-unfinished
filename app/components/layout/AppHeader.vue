<script setup>
defineEmits(['toggle-nav'])
const { fadeIn } = useAnimation()
const { contact } = useSiteConfig()
const { itemCount } = useCart()
</script>

<template>
  <Motion as="header" v-bind="fadeIn" class="app-header">
    <NuxtLink to="/" class="app-header__logo" aria-label="Kitchen King home">
      <img src="~/assets/images/kitchen-king-logo.png" alt="Kitchen King" />
    </NuxtLink>

    <div class="app-header__tray">
      <button class="app-header__pill app-header__pill--location" type="button">
        <span>{{ contact.addressLines[1] }}</span>
        <IconLocation />
      </button>

      <button class="app-header__pill" type="button" :aria-label="`Cart, ${itemCount} items`">
        <span>{{ itemCount }}</span>
        <IconCart />
      </button>

      <button class="app-header__pill app-header__pill--menu" type="button" aria-label="Open menu" @click="$emit('toggle-nav')">
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
  /* Figma: logo at left 41 / top 56 (its crown overhangs 7px past the 48px
     content margin), pills at right 48 / top 76. */
  padding: 56px 48px 0 41px;
  /* Minimum breathing room between logo and pills at any width — without this,
     space-between lets them close to a 0px gap (verified at 320px) instead of
     wrapping or shrinking further. */
  gap: 16px;
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
  }

  .app-header__tray {
    position: absolute;
    right: calc(100vw * 20 / 390);
    top: calc(32px + 100vw * 12 / 390);
    gap: calc(100vw * 8 / 390);
    margin-top: 0;
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
}
</style>
