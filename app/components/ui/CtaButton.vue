<script setup>
defineProps({
  to: { type: String, default: '/order' },
  label: { type: String, default: 'Order Online' }
})
</script>

<template>
  <NuxtLink :to="to" class="cta-button">
    <span class="cta-button__label">{{ label }}</span>
    <IconArrowUpRight class="cta-button__icon" />
  </NuxtLink>
</template>

<style scoped>
/* Sizing scales off a 1920px reference (matching whatever section currently
   places it, e.g. the hero's own card scaling) rather than fixed px, so it
   stays proportionally correct at any viewport width. */
.cta-button {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: flex-end;
  justify-content: space-between;
  gap: calc(100vw * 24 / 1920);
  padding: calc(100vw * 40 / 1920);
  border-radius: calc(100vw * 8 / 1920);
  background-color: var(--color-gold);
  transition:
    background-color 0.35s var(--ease-out-expo),
    box-shadow 0.35s var(--ease-out-expo);
}

.cta-button:hover {
  background-color: var(--color-gold-200);
  box-shadow: 0 8px 24px color-mix(in srgb, var(--color-gold) 45%, transparent);
}

.cta-button__label {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: calc(100vw * 32 / 1920);
  line-height: 1.2;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-deep);
  /* The label's available width is sized to fit it exactly (verified: a
     sub-1px margin) — real font metrics can round the wrong way and wrap it,
     so pin it to one line rather than let that knife-edge fit flip. */
  white-space: nowrap;
}

.cta-button__icon {
  flex-shrink: 0;
  width: calc(100vw * 40 / 1920);
  height: calc(100vw * 40 / 1920);
  color: var(--color-deep);
}

@media (prefers-reduced-motion: no-preference) {
  .cta-button__icon {
    transition: transform 0.35s var(--ease-out-expo);
  }

  .cta-button:hover .cta-button__icon {
    transform: translateX(4px);
  }

  .cta-button:active {
    transform: scale(0.97);
  }
}

/* Designer's mobile spec: 285x80 button (sizing owned by HeroSection.vue's
   .hero__cta-wrap), scaled off the same 390px canvas — same row layout as
   desktop, just smaller: 24px padding/gap, 12px radius, 24px label, 32px icon. */
@media (max-width: 768px) {
  .cta-button {
    gap: calc(100vw * 24 / 390);
    padding: calc(100vw * 24 / 390);
    border-radius: calc(100vw * 12 / 390);
  }

  .cta-button__label {
    font-size: calc(100vw * 24 / 390);
  }

  .cta-button__icon {
    width: calc(100vw * 32 / 390);
    height: calc(100vw * 32 / 390);
  }
}
</style>
