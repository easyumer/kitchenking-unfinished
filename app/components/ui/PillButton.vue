<script setup>
defineProps({
  variant: { type: String, default: 'outline' }, // 'outline' | 'accent' | 'solid'
  to: { type: String, default: null }
})
</script>

<template>
  <component :is="to ? 'NuxtLink' : 'button'" :to="to" class="pill-button" :class="`pill-button--${variant}`">
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
  transition: var(--transition-base);
}

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
  background-color: var(--color-section);
}

.pill-button--solid {
  border-color: var(--color-gold);
  background-color: var(--color-gold);
  color: var(--color-deep);
}

.pill-button--solid:hover {
  background-color: var(--color-gold-200);
  border-color: var(--color-gold-200);
}

.pill-button--dark {
  border-color: var(--color-section);
  color: var(--color-section);
}

.pill-button--dark:hover {
  background-color: color-mix(in srgb, var(--color-section) 12%, transparent);
}

.pill-button :deep(svg) {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
</style>
