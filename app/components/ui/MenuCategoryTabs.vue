<script setup>
const props = defineProps({
  categories: { type: Array, required: true },
  activeId: { type: String, required: true }
})

defineEmits(['select'])

const tabRefs = {}
const indicatorStyle = ref({ opacity: 0 })

const setTabRef = (id, el) => {
  if (el) tabRefs[id] = el
}

// Measures the active pill's own box and positions the floating indicator to
// match, rather than transitioning each pill's background in place — that's
// what turns the highlight into something that visibly slides between tabs.
const updateIndicator = () => {
  const el = tabRefs[props.activeId]
  if (!el) return
  indicatorStyle.value = {
    left: `${el.offsetLeft}px`,
    top: `${el.offsetTop}px`,
    width: `${el.offsetWidth}px`,
    height: `${el.offsetHeight}px`,
    opacity: 1
  }
}

watch(() => props.activeId, () => nextTick(updateIndicator))

onMounted(() => {
  updateIndicator()
  window.addEventListener('resize', updateIndicator)
})

onUnmounted(() => window.removeEventListener('resize', updateIndicator))
</script>

<template>
  <nav class="menu-tabs">
    <span class="menu-tabs__indicator" :style="indicatorStyle" />

    <button v-for="category in categories" :key="category.id" :ref="(el) => setTabRef(category.id, el)" type="button"
      class="menu-tabs__pill" :class="{ 'menu-tabs__pill--active': category.id === activeId }"
      @click="$emit('select', category.id)">
      {{ category.label }}
    </button>
  </nav>
</template>

<style scoped>
.menu-tabs {
  position: sticky;
  top: 80px;
  z-index: 10;
  display: flex;
  justify-content: center;
  gap: 12px;
  overflow-x: auto;
  padding: 16px calc(100vw * 48 / 1920) 24px;
  scrollbar-width: none;
  background:
    rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(1px);
}

.menu-tabs::-webkit-scrollbar {
  display: none;
}

.menu-tabs__indicator {
  position: absolute;
  border-radius: 8px;
  background-color: var(--color-gold);
  transition:
    left 0.35s var(--ease-out-expo),
    width 0.35s var(--ease-out-expo);
  pointer-events: none;
}

.menu-tabs__pill {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  padding: 12px 65px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  background: none;
  cursor: pointer;
  white-space: nowrap;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-offwhite);
  transition:
    color 0.3s var(--ease-out-expo),
    border-color 0.3s var(--ease-out-expo);
}

.menu-tabs__pill:hover {
  border-color: rgba(255, 255, 255, 0.35);
}

.menu-tabs__pill--active {
  border-color: var(--color-gold);
  color: var(--color-deep);
}

@media (max-width: 768px) {
  .menu-tabs {
    top: 64px;
    justify-content: flex-start;
    gap: 8px;
    padding: 12px 16px 16px;
    background:
      rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(1px);
    z-index: 1;
  }

  .menu-tabs__pill {
    padding: 10px 16px;
    font-size: 12px;
  }
}
</style>
