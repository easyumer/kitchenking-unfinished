<script setup>
import promoVideo from '~/assets/video/signature-oxtail-sliders.mp4'
import promoPoster from '~/assets/video/signature-oxtail-sliders-poster.jpg'

defineProps({
  label: { type: String, default: 'Oxtail Sliders' }
})

const prefersReduced = useReducedMotion()

const pitRise = computed(() => prefersReduced.value
  ? { initial: false }
  : {
      initial: { y: 480, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    })
</script>

<template>
  <div class="signature-slide">
    <span class="signature-slide__text">{{ label }}</span>

    <div class="signature-slide__card-anchor">
      <Motion as="div" v-bind="pitRise" class="signature-slide__card-unit">
        <div class="signature-slide__video-wrap">
          <video
            class="signature-slide__video"
            :src="promoVideo"
            :poster="promoPoster"
            :autoplay="!prefersReduced"
            muted
            loop
            playsinline
            aria-hidden="true"
          />
        </div>
        <span class="signature-slide__text-outline">{{ label }}</span>
      </Motion>
    </div>
  </div>
</template>

<style scoped>
.signature-slide {
  position: relative;
  flex-shrink: 0;
  width: clamp(320px, 56vw, 1078px);
  height: clamp(280px, 40vw, 782px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.signature-slide__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  width: clamp(291px, 63vw, 1208px);
  text-align: center;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(48px, 10.4vw, 200px);
  line-height: 1;
  text-transform: uppercase;
  color: var(--color-gold-light);
}

.signature-slide__card-anchor {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: clamp(107px, 22.9vw, 439.88px);
  aspect-ratio: 9 / 16;
}

.signature-slide__card-unit {
  position: relative;
  width: 100%;
  height: 100%;
}

.signature-slide__video-wrap {
  position: absolute;
  inset: 0;
  border-radius: 32px;
  overflow: hidden;
}

.signature-slide__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.signature-slide__text-outline {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(291px, 63vw, 1208px);
  text-align: center;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(48px, 10.4vw, 200px);
  line-height: 1;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 1px var(--color-gold-light);
  clip-path: inset(0% 31.79% 0% 31.79%);
}
</style>
