<script setup>
defineProps({
  index: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  note: { type: String, required: true },
  image: { type: String, required: true },
  active: { type: Boolean, default: false }
})
defineEmits(['toggle'])
</script>

<template>
  <div
    class="menu-item"
    :class="{ 'menu-item--active': active }"
    role="button"
    tabindex="0"
    :aria-expanded="active"
    @click="$emit('toggle')"
    @keydown.enter="$emit('toggle')"
    @keydown.space.prevent="$emit('toggle')"
  >
    <div class="menu-item__main">
      <div class="menu-item__left">
        <div class="menu-item__heading">
          <span class="menu-item__index">{{ index }}</span>
          <h4 class="menu-item__title">{{ title }}</h4>
          <span class="menu-item__price">{{ price }}</span>
        </div>
        <div class="menu-item__reveal">
          <div class="menu-item__reveal-inner">
            <p class="menu-item__description">{{ description }}</p>
            <p class="menu-item__note">&bull; {{ note }}</p>
            <PillButton variant="solid" class="menu-item__cta" @click.stop>
              <span>Add to Cart</span>
              <IconPlus />
            </PillButton>
          </div>
        </div>
      </div>

      <div class="menu-item__visual-wrap">
        <img :src="image" :alt="title" class="menu-item__visual" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-item {
  border-bottom: 1px solid rgba(245, 166, 35, 0.12);
  cursor: pointer;
  outline: none;
}

.menu-item__main {
  display: flex;
  align-items: flex-start;
  gap: 40px;
}

.menu-item__left {
  flex: 1 1 auto;
  min-width: 0;
  padding: 16px 0;
}

.menu-item__heading {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.menu-item__index {
  flex-shrink: 0;
  width: 20px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 12px;
  color: rgba(245, 166, 35, 0.28);
}

.menu-item__title {
  flex: 1 1 auto;
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 32px;
  line-height: 1.25;
  color: var(--color-offwhite);
  transition: color 0.5s var(--ease-out-expo);
}

.menu-item__price {
  flex-shrink: 0;
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 24px;
  line-height: 1;
  color: var(--color-gold-light);
  transition: color 0.5s var(--ease-out-expo), font-size 0.5s var(--ease-out-expo);
}

.menu-item--active .menu-item__title,
.menu-item--active .menu-item__price {
  color: var(--color-gold);
}

.menu-item--active .menu-item__price {
  font-size: 32px;
}

.menu-item__reveal {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.6s var(--ease-out-expo);
}

.menu-item--active .menu-item__reveal {
  grid-template-rows: 1fr;
}

.menu-item__reveal-inner {
  overflow: hidden;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding-top: 24px;
}

.menu-item__description,
.menu-item__note {
  max-width: 402px;
  font-family: var(--font-body);
  color: rgba(252, 254, 254, 0.6);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.4s var(--ease-out-expo) 0.05s, transform 0.4s var(--ease-out-expo) 0.05s;
}

.menu-item__description {
  font-weight: 300;
  font-size: 14px;
  line-height: 1.3;
}

.menu-item__note {
  font-weight: 500;
  font-size: 12px;
  transition-delay: 0.1s;
}

.menu-item__cta {
  margin-top: 8px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(8px);
  transition: opacity 0.4s var(--ease-out-expo) 0.15s, transform 0.4s var(--ease-out-expo) 0.15s;
}

.menu-item--active .menu-item__description,
.menu-item--active .menu-item__note,
.menu-item--active .menu-item__cta {
  opacity: 1;
  transform: translateY(0);
}

.menu-item--active .menu-item__cta {
  pointer-events: auto;
}

.menu-item__visual-wrap {
  flex-shrink: 0;
  width: 438px;
  max-width: 60vw;
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  transition: height 0.6s var(--ease-out-expo);
}

.menu-item--active .menu-item__visual-wrap {
  height: 292px;
}

.menu-item__visual {
  display: block;
  width: 100%;
  height: 292px;
  object-fit: cover;
  border-radius: 12px;
  opacity: 0;
  transform: scale(0.96);
  transition: opacity 0.5s var(--ease-out-expo) 0.1s, transform 0.5s var(--ease-out-expo) 0.1s;
}

.menu-item--active .menu-item__visual {
  opacity: 1;
  transform: scale(1);
}

@media (hover: hover) and (pointer: fine) {
  .menu-item:hover .menu-item__title,
  .menu-item:hover .menu-item__price {
    color: var(--color-gold);
  }

  .menu-item:hover .menu-item__price {
    font-size: 32px;
  }

  .menu-item:hover .menu-item__reveal {
    grid-template-rows: 1fr;
  }

  .menu-item:hover .menu-item__description,
  .menu-item:hover .menu-item__note,
  .menu-item:hover .menu-item__cta {
    opacity: 1;
    transform: translateY(0);
  }

  .menu-item:hover .menu-item__cta {
    pointer-events: auto;
  }

  .menu-item:hover .menu-item__visual-wrap {
    height: 292px;
  }

  .menu-item:hover .menu-item__visual {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .menu-item__main {
    flex-direction: column;
  }

  .menu-item__visual-wrap {
    width: 100%;
    max-width: 100%;
  }
}
</style>
