<script setup>
defineProps({
  hidden: {
    type: Boolean,
    default: false
  }
})

const { timings } = useSiteConfig()
const { fadeIn } = useAnimation()
</script>

<template>
  <!-- Outer element owns the centring transform; the Motion child only fades
       opacity, so Motion's inline transform can't clobber the centring. -->
  <div class="app-timings" :class="{ hidden }">
    <Motion as="p" v-bind="fadeIn" class="app-timings__inner">
      <span class="app-timings__dot" />
      <span class="app-timings__text">Timings: {{ timings }}</span>
    </Motion>
  </div>
</template>

<style scoped>
.app-timings {
  position: fixed;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 60;

  transition:
    transform .45s ease,
    opacity .35s ease;
}



.app-timings.hidden {
  transform:
    translate(-50%, -40px);
  opacity: 0;
}

.app-timings__inner {
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-timings__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-gold);
  flex-shrink: 0;
}

.app-timings__text {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.8);
  white-space: nowrap;
}

/* Designer's mobile spec ("Frame 7"), measured on a 390px canvas: box 152x16,
   centred, top 8; dot 4x4; text 10px/500/16 line-height/0.05em, 4px gap. */
@media (max-width: 768px) {
  .app-timings {
    top: 8px;
  }

  .app-timings__inner {
    gap: 4px;
  }

  .app-timings__dot {
    width: 4px;
    height: 4px;
  }

  .app-timings__text {
    font-size: 10px;
    line-height: 16px;
  }
}
</style>
