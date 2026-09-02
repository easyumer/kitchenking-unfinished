<script setup>
const note = defineModel({ type: String, default: '' })
</script>

<template>
  <div class="order-notes">
    <h3 class="order-notes__heading">Note to the Truck</h3>
    <textarea v-model="note" class="order-notes__textarea" placeholder="e.g Extra napkins, allergy notes" rows="6" />
  </div>
</template>

<style scoped>
.order-notes__heading {
  margin: 0 0 16px;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 14px;
  color: #FFEFAD;
}

.order-notes__textarea {
  width: 100%;
  resize: vertical;
  min-height: 140px;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  background-color: #181818;
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-offwhite);
  transition: border-color 0.3s var(--ease-out-expo);
}

.order-notes__textarea::placeholder {
  color: rgba(250, 250, 250, 0.35);
}

.order-notes__textarea:focus {
  outline: none;
  border-color: var(--color-gold);
}
</style>
