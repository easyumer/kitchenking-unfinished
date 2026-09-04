<script setup>
const props = defineProps({
  id: { type: String, default: null },
  image: { type: String, default: null },
  price: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  customization: { type: Object, default: null }
})

const showCustomize = ref(false)

// Falls back to the item name so cards used without an explicit id (e.g.
// existing BestsellersSection entries) still work as a stable cart key.
const modalItem = computed(() => ({
  id: props.id ?? props.name,
  name: props.name,
  price: props.price,
  image: props.image,
  description: props.description,
  customization: props.customization
}))
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

      <AddToCartButton @click="showCustomize = true" />
    </div>

    <ItemCustomizeModal :open="showCustomize" :item="modalItem" @close="showCustomize = false" />
  </article>
</template>

<style scoped>
.product-card {

  display: flex;
  flex-direction: column;

  height: calc(100vw * 540 / 1920);

  align-items: stretch;

  gap: 0;

  padding: calc(100vw * 8 / 1920);

  background-color: var(--color-section);

  border-radius: calc(100vw * 16 / 1920);

  overflow: hidden;
}

.product-card__image {

  width: 100%;

  height: calc(100vw * 280 / 1920);

  flex-shrink: 0;

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

  flex: 1;

  width: 100%;

  padding:
    calc(100vw * 16 / 1920) calc(100vw * 16 / 1920) calc(100vw * 12 / 1920);

}

.product-card__text {

  display: flex;

  flex-direction: column;

  width: 100%;

}

.product-card__title {

  display: flex;

  flex-direction: column;

  height: calc(100vw * 95 / 1920);

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
  padding-top: 9px;
  font-weight: 400;
  font-size: calc(100vw * 24 / 1920);
  line-height: 1.33;
  color: var(--color-offwhite);
}

.product-card__description {

  margin: 0;

  height: calc(100vw * 65 / 1920);

  overflow: hidden;


  font-family: var(--font-body);

  font-weight: 300;

  font-size: calc(100vw * 14 / 1920);

  line-height: 1.25;

  color: rgba(250, 250, 250, .6);

}

@media (max-width:768px) {

  .product-card {

    height: 290px;
    padding: 6px;
    border-radius: 12px;
  }


  .product-card__image {

    height: 100px;
    width: 100%;

    border-radius: 8px;

    object-fit: cover;

  }


  .product-card__image--placeholder {

    height: 100px;

  }


  .product-card__content {

    padding: 10px 6px 6px;

  }


  .product-card__title {

    height: 70px;

    gap: 2px;

  }


  .product-card__price {

    font-size: 18px;
    margin-top: 10px;
    padding-bottom: 2px;
    line-height: 1;

  }


  .product-card__name {

    padding-top: 4px;

    font-size: 15px;

    line-height: 1.2;

  }


  .product-card__description {

    margin-top: 6px;

    height: 31px;

    font-size: 12px;

    color: rgba(250, 250, 250, 0.4);

    display: -webkit-box;

    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    overflow: hidden;

    text-overflow: ellipsis;

    line-height: 1.25;

  }


  .product-card__content :deep(button) {

    margin-top: auto;

  }

}
</style>
