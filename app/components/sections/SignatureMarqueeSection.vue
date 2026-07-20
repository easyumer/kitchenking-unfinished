<script setup>
import promoVideo from '~/assets/video/signature-oxtail-sliders.mp4'
import promoPoster from '~/assets/video/signature-oxtail-sliders-poster.jpg'

const { fadeUp } = useAnimation()
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
  <section class="signature">
    <Motion as="p" v-bind="fadeUp" class="signature__subtitle">See what defines us.</Motion>

    <div class="signature__marquee">
      <div class="ticker-track signature__track">
        <div v-for="group in 2" :key="group" class="signature__group">
          <div v-for="slide in 2" :key="slide" class="signature__slide">
            <span class="signature__text">Oxtail Sliders</span>

            <div class="signature__card-anchor">
              <Motion as="div" v-bind="pitRise" class="signature__card-unit">
                <div class="signature__video-wrap">
                  <video
                    class="signature__video"
                    :src="promoVideo"
                    :poster="promoPoster"
                    :autoplay="!prefersReduced"
                    muted
                    loop
                    playsinline
                    aria-hidden="true"
                  />
                </div>
                <span class="signature__text-outline">Oxtail Sliders</span>
              </Motion>
            </div>
          </div>
        </div>
      </div>
      <div class="signature__fade signature__fade--left" />
      <div class="signature__fade signature__fade--right" />
    </div>
  </section>
</template>

<style scoped>
.signature {
  position: relative;
  background-color: var(--color-section);
  padding: 120px 0;
  overflow: hidden;
}

.signature__subtitle {
  display: block;
  text-align: center;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(20px, 2.2vw, 32px);
  line-height: 1.25;
  color: var(--color-gold-light);
  margin-bottom: 60px;
}

.signature__marquee {
  position: relative;
}

.signature__group {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.signature__slide {
  position: relative;
  flex-shrink: 0;
  width: clamp(320px, 56vw, 1078px);
  height: clamp(280px, 40vw, 782px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.signature__text {
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

.signature__card-anchor {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: clamp(107px, 22.9vw, 439.88px);
  aspect-ratio: 9 / 16;
}

.signature__card-unit {
  position: relative;
  width: 100%;
  height: 100%;
}

.signature__video-wrap {
  position: absolute;
  inset: 0;
  border-radius: 32px;
  overflow: hidden;
}

.signature__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.signature__text-outline {
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

.signature__fade {
  position: absolute;
  top: 0;
  bottom: 0;
  width: clamp(60px, 10vw, 200px);
  pointer-events: none;
  z-index: 3;
}

.signature__fade--left {
  left: 0;
  background: linear-gradient(90deg, var(--color-section) 0%, transparent 100%);
}

.signature__fade--right {
  right: 0;
  background: linear-gradient(270deg, var(--color-section) 0%, transparent 100%);
}
</style>
