<script setup>
defineEmits(['toggle-nav'])
const { fadeIn } = useAnimation()
</script>

<template>
  <Motion as="header" v-bind="fadeIn" class="app-header">
    <PillButton variant="outline" @click="$emit('toggle-nav')">
      <IconMenu />
      <span>Menu</span>
    </PillButton>

    <p class="app-header__location">West Bay St &middot; Nassau, Bahamas</p>

    <PillButton to="/order" variant="accent">
      <span>Order Now</span>
      <IconArrowRight />
    </PillButton>
  </Motion>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 48px;
}

.app-header__location {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-offwhite);
  opacity: 0.75;
}

@media (max-width: 768px) {
  .app-header {
    padding: 20px 24px;
  }

  .app-header__location {
    display: none;
  }
}
</style>
