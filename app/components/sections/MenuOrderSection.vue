<script setup>
const categories = useMenuData()
const activeId = ref(categories[0].id)
const sectionRefs = {}

const setSectionRef = (id, el) => {
  if (el) sectionRefs[id] = el
}

const scrollToCategory = (id) => {
  sectionRefs[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

let observer
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting)
      if (visible) activeId.value = visible.target.dataset.categoryId
    },
    { rootMargin: '-180px 0px -70% 0px' }
  )
  Object.values(sectionRefs).forEach((el) => observer.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="menu-order">
    <MenuCategoryTabs :categories="categories" :active-id="activeId" @select="scrollToCategory" />

    <div class="menu-order__layout">
      <div class="menu-order__categories">
        <div
          v-for="category in categories"
          :key="category.id"
          :ref="(el) => setSectionRef(category.id, el)"
          :data-category-id="category.id"
          class="menu-order__category"
        >
          <h2 class="menu-order__heading">{{ category.label }}</h2>
          <div class="menu-order__grid">
            <ProductCard v-for="item in category.items" :key="item.id" v-bind="item" />
          </div>
        </div>
      </div>

      <CartSidebar class="menu-order__sidebar" />
    </div>
  </section>
</template>

<style scoped>
.menu-order__layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: calc(100vw * 32 / 1920);
  padding: 0 calc(100vw * 48 / 1920) calc(100vw * 80 / 1920);
}

.menu-order__category {
  scroll-margin-top: 220px;
}

.menu-order__category + .menu-order__category {
  margin-top: calc(100vw * 56 / 1920);
}

.menu-order__heading {
  margin: 0 0 calc(100vw * 24 / 1920);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: calc(100vw * 40 / 1920);
  line-height: 1.15;
  text-transform: uppercase;
  color: var(--color-white);
}

.menu-order__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: calc(100vw * 20 / 1920);
}

.menu-order__sidebar {
  position: sticky;
  top: 220px;
  align-self: start;
}

@media (max-width: 1024px) {
  .menu-order__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .menu-order__layout {
    display: flex;
    flex-direction: column;
    padding: 0 16px 48px;
    gap: 32px;
  }

  .menu-order__category {
    scroll-margin-top: 76px;
  }

  .menu-order__category + .menu-order__category {
    margin-top: 32px;
  }

  .menu-order__heading {
    font-size: 24px;
    margin-bottom: 16px;
  }

  .menu-order__grid {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .menu-order__sidebar {
    position: static;
  }
}
</style>
