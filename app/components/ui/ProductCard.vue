<script setup>
defineProps({
  image: { type: String, default: null },
  price: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true }
})
</script>

<template>
  <article class="product-card">
    <img v-if="image" class="product-card__image" :src="image" :alt="name" loading="lazy" />
    <div v-else class="product-card__image product-card__image--placeholder">
      <span>Photo coming soon</span>
    </div>

    <div class="product-card__content">
      <div class="product-card__text">
        <div class="product-card__title">
          <span class="product-card__price">{{ price }}</span>
          <h3 class="product-card__name">{{ name }}</h3>
        </div>
        <p class="product-card__description">{{ description }}</p>
      </div>

      <AddToCartButton />
    </div>
  </article>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(100vw * 16 / 1920);
  padding: calc(100vw * 8 / 1920) calc(100vw * 8 / 1920) calc(100vw * 12 / 1920);
  background-color: var(--color-section);
  border-radius: calc(100vw * 16 / 1920);
}

.product-card__image {
  width: 100%;
  height: calc(100vw * 280 / 1920);
  object-fit: cover;
  border-radius: calc(100vw * 8 / 1920);
  display: block;
}

/* Stands in for the two menu items with no real photography yet, rather than
   showing an unrelated stock image in its place. */
.product-card__image--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-deep);
  font-family: var(--font-body);
  font-size: calc(100vw * 14 / 1920);
  color: rgba(250, 250, 250, 0.4);
}

.product-card__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(100vw * 32 / 1920);
  width: 100%;
  padding: 0 calc(100vw * 16 / 1920) calc(100vw * 12 / 1920);
}

.product-card__text {
  display: flex;
  flex-direction: column;
  gap: calc(100vw * 12 / 1920);
  width: 100%;
}

.product-card__title {
  display: flex;
  flex-direction: column;
  gap: calc(100vw * 8 / 1920);
}

.product-card__price {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: calc(100vw * 28 / 1920);
  line-height: 1.14;
  color: var(--color-white);
}

.product-card__name {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: calc(100vw * 24 / 1920);
  line-height: 1.33;
  color: var(--color-offwhite);
}

.product-card__description {
  margin: 0;
  font-family: var(--font-body);
  font-weight: 300;
  font-size: calc(100vw * 14 / 1920);
  line-height: 1.14;
  color: rgba(250, 250, 250, 0.6);
}

@media (max-width: 768px) {
  .product-card {
    gap: 12px;
    padding: 8px 8px 12px;
    border-radius: 12px;
  }

  .product-card__image {
    height: 200px;
    border-radius: 8px;
  }

  .product-card__image--placeholder {
    font-size: 13px;
  }

  .product-card__content {
    gap: 20px;
    padding: 0 8px 8px;
  }

  .product-card__price {
    font-size: 20px;
  }

  .product-card__name {
    font-size: 18px;
  }

  .product-card__description {
    font-size: 13px;
  }
}
</style>
