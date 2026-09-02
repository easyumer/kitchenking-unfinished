<script setup>
defineProps({
    items: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <div class="cart-panel">

        <div class="cart-panel__heading">

            <NuxtLink to="/menu" class="cart-panel__back">
                <IconChevronLeft />
            </NuxtLink>

            <h1>Your Cart</h1>

        </div>


        <div class="cart-panel__items">

            <CartOrderLineItem v-for="item in items" :key="item.id" :item="item" />

        </div>

    </div>
</template>


<style scoped>
.cart-panel {

    width: 100%;

    background: #181818;

    border: 1px solid #222;

    border-radius: 12px;

    overflow: hidden;

}


/* HEADER */

.cart-panel__heading {

    height: 54px;

    display: flex;

    align-items: center;

    gap: 10px;

    padding: 0 14px;

    border-bottom: 1px solid #262626;

}


.cart-panel__heading h1 {

    margin: 0;

    font-family: var(--font-display);

    font-size: 15px;

    font-weight: 600;

    color: #FFEFAD;

}



/* BACK BUTTON */

.cart-panel__back {

    width: 27px;

    height: 27px;

    display: flex;

    justify-content: center;

    align-items: center;

    border: 1px solid #FFEFAD;

    border-radius: 6px;

    color: #FFEFAD;

}



.cart-panel__back :deep(svg) {

    width: 14px;

    height: 14px;

}



/* ============================
   CART SCROLL AREA
============================ */


.cart-panel__items {


    height: 330px;


    overflow-y: auto;


    padding: 0 14px 12px 14px;


    box-sizing: border-box;


}



/* keep scrollbar inside */

.cart-panel__items::-webkit-scrollbar {

    width: 5px;

}



.cart-panel__items::-webkit-scrollbar-track {

    background: transparent;

}



.cart-panel__items::-webkit-scrollbar-thumb {

    background: #4a4a4a;

    border-radius: 20px;

}



.cart-panel__items::-webkit-scrollbar-thumb:hover {

    background: #666;

}



/* Firefox */

.cart-panel__items {

    height: 315px;

    overflow-y: auto;

    padding: 0 18px 8px 14px;

    box-sizing: border-box;

}



/* ITEMS DIVIDER */

.cart-panel__items:deep(> *:not(:last-child)) {

    border-bottom: 1px solid #292929;

}





/* REMOVE DEFAULT BUTTON FOCUS */

:deep(button:focus) {

    outline: none;

}
</style>