<script setup>
defineProps({
  variant: { type: String, default: 'outline' }, // 'outline' | 'accent' | 'solid'
  to: { type: String, default: null }
})

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <component :is="to ? NuxtLink : 'button'" :to="to" class="pill-button" :class="`pill-button--${variant}`">
    <slot />
  </component>
</template>

<style scoped>
.pill-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 24px;
  border-radius: 22px;
  border: 1px solid;
  background: none;
  cursor: pointer;
  white-space: nowrap;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition:
    background-color 0.35s var(--ease-out-expo),
    border-color 0.35s var(--ease-out-expo),
    color 0.35s var(--ease-out-expo),
    box-shadow 0.35s var(--ease-out-expo);
}

/* Secondary/utility variants: a background/border fade is enough feedback —
   deliberately kept quieter than --solid (primary) so hierarchy stays legible. */
.pill-button--outline {
  border-color: var(--color-offwhite);
  color: var(--color-offwhite);
}

.pill-button--outline:hover {
  background-color: color-mix(in srgb, var(--color-offwhite) 12%, transparent);
}

.pill-button--accent {
  border-color: var(--color-gold);
  color: var(--color-gold);
  background-color: color-mix(in srgb, var(--color-section) 60%, transparent);
}

.pill-button--accent:hover {
  /* Gold-tinted, not flat --color-section — this variant sits on
     --color-section backgrounds everywhere it's used, so a same-color fill
     would be visually invisible against its own backdrop. */
  background-color: color-mix(in srgb, var(--color-gold) 18%, var(--color-section));
}

.pill-button--dark {
  border-color: var(--color-section);
  color: var(--color-section);
}

.pill-button--dark:hover {
  background-color: color-mix(in srgb, var(--color-section) 12%, transparent);
}

/* Primary: the one variant that gets a lift + glow, per hierarchy — it should
   read as more inviting than any secondary button on the same screen. */
.pill-button--solid {
  border-color: color-mix(in srgb, var(--color-deep) 60%, transparent);
  background-color: var(--color-gold);
  color: var(--color-deep);
}

.pill-button--solid:hover {
  background-color: var(--color-gold-200);
  border-color: var(--color-gold-200);
  box-shadow: 0 8px 24px color-mix(in srgb, var(--color-gold) 45%, transparent);
}

.pill-button :deep(svg) {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* Transform-based feedback (icon nudge, lift, press) only runs when motion is
   allowed — color/shadow feedback above already covers the no-motion case. */
@media (prefers-reduced-motion: no-preference) {
  .pill-button {
    transition-property: background-color, border-color, color, box-shadow, transform;
  }

  .pill-button :deep(svg) {
    transition: transform 0.35s var(--ease-out-expo);
  }

  .pill-button:hover :deep(svg),
  .pill-button:focus-visible :deep(svg) {
    transform: translateX(3px);
  }

  .pill-button--solid:hover {
    transform: translateY(-2px);
  }

  .pill-button:active {
    transform: scale(0.96);
  }
}
</style>
