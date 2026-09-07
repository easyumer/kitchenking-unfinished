<script setup>
const { items, itemCount, subtotal, clearCart } = useCart()
const { confirmOrder } = useOrderConfirmation()
const { taxRate } = useSiteConfig()
const { fadeUp } = useAnimation()

const contactName = ref('')
const contactPhone = ref('')
const paymentMethod = ref('card')
const orderNote = ref('')

const tax = computed(() => subtotal.value * taxRate)
const grandTotal = computed(() => subtotal.value + tax.value)

const handlePlaceOrder = () => {
  confirmOrder(contactName.value, {
    subtotal: subtotal.value,
    tax: tax.value,
    grandTotal: grandTotal.value,
    itemCount: itemCount.value
  })
  clearCart()
  navigateTo('/order-confirmation')
}
</script>

<template>
  <Motion as="section" v-bind="fadeUp" class="cart-checkout">

    <p v-if="!itemCount" class="cart-checkout__empty">
      Your cart is empty —
      <NuxtLink to="/menu">browse the menu</NuxtLink>
      to add something tasty.
    </p>

    <template v-else>

      <div class="cart-checkout__layout">

        <!-- LEFT SIDE -->
        <div class="cart-checkout__main">

          <CartItemsPanel :items="items" />

          <div class="cart-checkout__contact-payment">
            <OrderContactForm v-model:name="contactName" v-model:phone="contactPhone" />

            <PaymentMethodPicker v-model="paymentMethod" />
          </div>

        </div>

        <!-- RIGHT SIDE -->
        <div class="cart-checkout__aside">

          <div class="cart-checkout__notes-summary">
            <OrderNotesBox v-model="orderNote" />

            <OrderSummaryPanel @place-order="handlePlaceOrder" />
          </div>

        </div>

      </div>
    </template>

  </Motion>
</template>

<style scoped>
.cart-checkout {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  /* header clearance */
  padding: 145px 48px 190px;
}


/* ==================================================
   MAIN LAYOUT
================================================== */

.cart-checkout__layout {
  display: grid;

  /* Figma-like proportions */
  grid-template-columns: minmax(0, 1.65fr) minmax(340px, 1fr);

  gap: 24px;

  align-items: start;
}

.cart-checkout__main,
.cart-checkout__aside {
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 20px;
}




/* Divider between cart items */

.cart-checkout__items :deep(> *:not(:last-child)) {
  border-bottom: 1px solid #2b2b2b;
}


/* ==================================================
   CONTACT INFO + PAYMENT METHOD (merged card)
================================================== */

.cart-checkout__contact-payment {
  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 20px;
  background-color: var(--color-section);
}


/* ==================================================
   OTHER LEFT PANELS
================================================== */

.cart-checkout__main> :deep(section:not(.cart-checkout__panel)),
.cart-checkout__main> :deep(div:not(.cart-checkout__panel)) {
  border-radius: 12px;
}


/* ==================================================
   RIGHT SIDE
================================================== */

.cart-checkout__aside {
  position: sticky;
  top: 120px;
}

.cart-checkout__notes-summary {
  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 20px;
  background-color: #181818;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}


/* ==================================================
   NOTICE / EMPTY
================================================== */

.cart-checkout__empty,
.cart-checkout__notice {
  color: #ffffff;
}

.cart-checkout__empty a {
  color: #ffca59;
}


/* ==================================================
   TABLET
================================================== */

@media (max-width: 1100px) {

  .cart-checkout {
    padding: 120px 24px 70px;
  }

  .cart-checkout__layout {
    grid-template-columns: 1fr;
  }

  .cart-checkout__aside {
    position: relative;
    top: auto;
  }

}


/* ==================================================
   MOBILE
================================================== */

@media (max-width: 768px) {

  .cart-checkout {
    padding: 100px 16px 50px;
  }

  .cart-checkout__layout {
    gap: 16px;
  }

  .cart-checkout__main,
  .cart-checkout__aside {
    gap: 16px;
  }

  .cart-checkout__heading {
    height: 48px;
    padding: 0 10px;
  }

  .cart-checkout__heading h1 {
    font-size: 14px;
  }

  .cart-checkout__items {
    padding: 0 10px 8px;
  }

}
</style>