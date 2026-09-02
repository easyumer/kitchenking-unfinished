<script setup>
import { computed } from 'vue'

const props = defineProps({
  to: { type: String, default: '/order' },
  label: { type: String, default: 'Order Online' }
})
</script>

<template>

  <NuxtLink :to="to" class="cta-button">

    <span class="cta-button__text-wrap">

      <span class="cta-button__text">
        {{ label }}
      </span>

      <span class="cta-button__text cta-button__text--hover">
        {{ label }}
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
  min-height:70px;
  align-items: center;
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


.cta-button__text-wrap {

  position: relative;

  overflow: hidden;

  display: block;

  height: 2em;

  line-height: 1.5;

}


.cta-button__text {


  display: block;

  font-family: var(--font-display);

  font-weight: 700;

  font-size: calc(100vw * 32 / 1920);

  line-height: 1.5;

  letter-spacing: .05em;

  text-transform: uppercase;

  color: var(--color-deep);


  transition:
    transform .55s cubic-bezier(.76, 0, .24, 1);

}



.cta-button__text--hover {

  position: absolute;

  left: 0;

  top: 0;

  transform: translateY(100%);

}



/* hover */

.cta-button:hover .cta-button__text {

  transform: translateY(-100%);

}


.cta-button:hover .cta-button__text--hover {

  transform: translateY(0);

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



@media(max-width:768px) {

  .cta-button {

    width: 100%;

    height: 80px;

    align-items: center;

    gap: 0;

    padding:

      0 20px;

    border-radius: 12px;

  }



  .cta-button__text-wrap {

    height: 1.8em;

    flex: 1;

  }



  .cta-button__text {

    font-size: 24px;

    line-height: 1.2;

  }



  .cta-button__icon-wrap {

    width: 24px;

    height: 24px;

  }

}
</style>