<script setup>
import { computed } from 'vue'

const props = defineProps({
  to: { type: String, default: '/order' },
  label: { type: String, default: 'Order Online' }
})

const characters = computed(() => props.label.split(''))
</script>

<template>
  <NuxtLink :to="to" class="cta-button">
    <span class="cta-button__label" :aria-label="label">
      <span v-for="(char, index) in characters" :key="index" class="cta-button__char" :style="{
        '--i': index,
        '--total': characters.length
      }" aria-hidden="true">
        {{ char === ' ' ? '\u00A0' : char }}
      </span>
    </span>

    <span class="cta-button__icon-wrap">
      <IconArrowUpRight class="cta-button__icon" />
    </span>
  </NuxtLink>
</template>

<style scoped>
.cta-button {
  position: relative;
  overflow: hidden;

  display: flex;
  width: 100%;
  height: 100%;

  align-items: flex-end;
  justify-content: space-between;

  gap: calc(100vw * 24 / 1920);
  padding: calc(100vw * 40 / 1920);

  border-radius: calc(100vw * 8 / 1920);

  background: var(--color-gold);

  transition:
    background-color 0.35s var(--ease-out-expo),
    box-shadow 0.35s var(--ease-out-expo),
    transform 0.25s ease;
}

.cta-button:hover {
  background-color: var(--color-gold-200);

  box-shadow:
    0 8px 24px color-mix(in srgb, var(--color-gold) 45%, transparent);
}


/* =====================================================
   TEXT
===================================================== */

.cta-button__label {
  display: flex;
  align-items: flex-end;

  font-family: var(--font-display);
  font-weight: 700;

  font-size: calc(100vw * 32 / 1920);
  line-height: 1.2;

  letter-spacing: 0.05em;
  text-transform: uppercase;

  color: var(--color-deep);

  white-space: nowrap;

  /*
    Important:
    keep the label's original space so moving letters
    don't affect layout.
  */
  position: relative;
}

.cta-button__char {
  display: inline-block;

  position: relative;

  transform-origin: bottom center;

  will-change: transform;

  /*
    Each follower gets a slightly different destination.

    First letters have to travel farther because
    they start farther away from the arrow.
  */
  --destination:
    calc((100vw * 330 / 1920) - (var(--i) * (100vw * 15 / 1920)));
}


/* =====================================================
   ARROW
===================================================== */

.cta-button__icon-wrap {
  position: relative;

  flex-shrink: 0;

  display: grid;
  place-items: center;

  width: calc(100vw * 40 / 1920);
  height: calc(100vw * 40 / 1920);

  overflow: visible;
}

.cta-button__icon {
  width: 100%;
  height: 100%;

  color: var(--color-deep);

  transform-origin: center;
}


/* =====================================================
   HOVER SEQUENCE
===================================================== */

@media (prefers-reduced-motion: no-preference) {

  /*
    FIRST LETTER

    It runs first by itself.
  */
  .cta-button:hover .cta-button__char:first-child {
    animation:
      leaderRun 3.3s cubic-bezier(.3, .8, .2, 1) both;
  }


  /*
    EVERY OTHER LETTER

    They wait until the leader reaches
    the arrow and calls them.
  */
  .cta-button:hover .cta-button__char:not(:first-child) {
    animation:
      followerRun 1.7s cubic-bezier(.3, .8, .2, 1) both;

    animation-delay:
      calc(950ms + ((var(--i) - 1) * 95ms));
  }


  .cta-button:hover .cta-button__icon {
    animation:
      arrowWaiting 3.3s ease-in-out both;
  }


  .cta-button:active {
    transform: scale(0.97);
  }
}


/* =====================================================
   FIRST LETTER — LEADER

   O:
   run → run → arrive → turn around →
   "COME!" → wait for everyone → return
===================================================== */

@keyframes leaderRun {

  0% {
    transform:
      translateX(0) translateY(0) rotate(0deg) scale(1);
  }


  /* first running step */
  8% {
    transform:
      translateX(calc(100vw * 40 / 1920)) translateY(-7px) rotate(-8deg) scale(1.02);
  }


  16% {
    transform:
      translateX(calc(100vw * 90 / 1920)) translateY(2px) rotate(7deg);
  }


  24% {
    transform:
      translateX(calc(100vw * 145 / 1920)) translateY(-7px) rotate(-6deg);
  }


  32% {
    transform:
      translateX(calc(100vw * 205 / 1920)) translateY(2px) rotate(6deg);
  }


  40% {
    transform:
      translateX(calc(100vw * 265 / 1920)) translateY(-7px) rotate(-5deg);
  }


  /*
    LEADER REACHES THE ARROW
  */
  48% {
    transform:
      translateX(calc(100vw * 330 / 1920)) translateY(0) rotate(0deg) scale(0.96);
  }


  /*
    Turns around to look at
    the other letters.
  */
  55% {
    transform:
      translateX(calc(100vw * 330 / 1920)) translateY(0) rotate(-18deg) scale(1.04);
  }


  /*
    "COME ON!"
  */
  61% {
    transform:
      translateX(calc(100vw * 320 / 1920)) translateY(-11px) rotate(12deg) scale(1.1);
  }


  67% {
    transform:
      translateX(calc(100vw * 330 / 1920)) translateY(2px) rotate(-11deg) scale(1.03);
  }


  /*
    Another tiny call
  */
  73% {
    transform:
      translateX(calc(100vw * 323 / 1920)) translateY(-6px) rotate(8deg);
  }


  /*
    Now leader stays next to arrow
    while everyone follows.
  */
  88% {
    transform:
      translateX(calc(100vw * 330 / 1920)) translateY(0) rotate(0deg) scale(0.95);
  }


  94% {
    transform:
      translateX(calc(100vw * 330 / 1920)) translateY(-3px) rotate(2deg) scale(0.95);
  }


  /*
    Everyone returns
  */
  100% {
    transform:
      translateX(0) translateY(0) rotate(0deg) scale(1);
  }
}


/* =====================================================
   FOLLOWERS

   Each one runs toward the leader.
   Because every letter uses --destination,
   they don't all pile at exactly one point.
===================================================== */

@keyframes followerRun {

  0% {
    transform:
      translateX(0) translateY(0) rotate(0deg) scale(1);
  }


  /*
    Notice leader calling
  */
  8% {
    transform:
      translateX(0) translateY(-4px) rotate(-5deg) scale(1.03);
  }


  /*
    Start running
  */
  18% {
    transform:
      translateX(calc(var(--destination) * 0.15)) translateY(-8px) rotate(7deg);
  }


  30% {
    transform:
      translateX(calc(var(--destination) * 0.32)) translateY(2px) rotate(-7deg);
  }


  42% {
    transform:
      translateX(calc(var(--destination) * 0.50)) translateY(-7px) rotate(6deg);
  }


  54% {
    transform:
      translateX(calc(var(--destination) * 0.66)) translateY(2px) rotate(-6deg);
  }


  67% {
    transform:
      translateX(calc(var(--destination) * 0.82)) translateY(-6px) rotate(5deg);
  }


  /*
    Final little jump
  */
  79% {
    transform:
      translateX(calc(var(--destination) * 0.94)) translateY(-8px) rotate(-4deg) scale(0.96);
  }


  /*
    Arrives near the arrow
  */
  88% {
    transform:
      translateX(var(--destination)) translateY(0) rotate(0deg) scale(0.9);
  }


  /*
    Wait there briefly
  */
  94% {
    transform:
      translateX(var(--destination)) translateY(-2px) rotate(2deg) scale(0.9);
  }


  /*
    Reset
  */
  100% {
    transform:
      translateX(0) translateY(0) rotate(0deg) scale(1);
  }
}


/* =====================================================
   ARROW

   It reacts when leader arrives,
   then gets excited while followers come.
===================================================== */

@keyframes arrowWaiting {

  0%,
  30% {
    transform:
      translate(0, 0) rotate(0deg) scale(1);
  }


  /* sees leader approaching */
  38% {
    transform:
      translate(3px, -3px) rotate(-7deg) scale(1.05);
  }


  /* leader arrives */
  46% {
    transform:
      translate(6px, -6px) rotate(5deg) scale(1.1);
  }


  53% {
    transform:
      translate(1px, -1px) rotate(-5deg) scale(1.04);
  }


  /*
    Followers are coming.
  */
  64% {
    transform:
      translate(5px, -5px) rotate(6deg) scale(1.08);
  }


  73% {
    transform:
      translate(1px, -1px) rotate(-5deg) scale(1.04);
  }


  82% {
    transform:
      translate(6px, -6px) rotate(5deg) scale(1.1);
  }


  /*
    Everyone arrived.
  */
  90% {
    transform:
      translate(10px, -10px) rotate(0deg) scale(1.15);
  }


  100% {
    transform:
      translate(0, 0) rotate(0deg) scale(1);
  }
}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 768px) {

  .cta-button {
    gap: calc(100vw * 24 / 390);

    padding: calc(100vw * 24 / 390);

    border-radius:
      calc(100vw * 12 / 390);
  }


  .cta-button__label {
    font-size:
      calc(100vw * 24 / 390);
  }


  .cta-button__icon-wrap {
    width:
      calc(100vw * 32 / 390);

    height:
      calc(100vw * 32 / 390);
  }


  /*
    Smaller travel distance for
    the 285px mobile CTA.
  */
  .cta-button__char {
    --destination:
      calc((100vw * 145 / 390) - (var(--i) * (100vw * 6 / 390)));
  }
}


/* =====================================================
   MOBILE LEADER OVERRIDE
===================================================== */

@media (max-width: 768px) and (prefers-reduced-motion: no-preference) {

  .cta-button:hover .cta-button__char:first-child {
    animation-name: leaderRunMobile;
  }
}


/* =====================================================
   MOBILE LEADER
===================================================== */

@keyframes leaderRunMobile {

  0% {
    transform:
      translateX(0) translateY(0) rotate(0deg);
  }


  10% {
    transform:
      translateX(calc(100vw * 22 / 390)) translateY(-6px) rotate(-7deg);
  }


  20% {
    transform:
      translateX(calc(100vw * 50 / 390)) translateY(2px) rotate(7deg);
  }


  30% {
    transform:
      translateX(calc(100vw * 82 / 390)) translateY(-6px) rotate(-6deg);
  }


  40% {
    transform:
      translateX(calc(100vw * 112 / 390)) translateY(2px) rotate(6deg);
  }


  48% {
    transform:
      translateX(calc(100vw * 145 / 390)) translateY(0) rotate(0deg) scale(0.95);
  }


  56% {
    transform:
      translateX(calc(100vw * 145 / 390)) translateY(0) rotate(-18deg) scale(1.05);
  }


  63% {
    transform:
      translateX(calc(100vw * 138 / 390)) translateY(-8px) rotate(10deg) scale(1.08);
  }


  70% {
    transform:
      translateX(calc(100vw * 145 / 390)) translateY(0) rotate(-10deg);
  }


  88% {
    transform:
      translateX(calc(100vw * 145 / 390)) translateY(0) rotate(0deg) scale(0.95);
  }


  100% {
    transform:
      translateX(0) translateY(0) rotate(0deg) scale(1);
  }
}
</style>