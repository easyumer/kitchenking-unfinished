<script setup>
defineProps({
  image: { type: String, required: true },
  alt: { type: String, default: '' }
})
</script>

<template>
  <div class="photo-stack">
    <div class="photo-stack__layer photo-stack__layer--back">
      <img :src="image" :alt="alt" loading="lazy" />
    </div>
    <div class="photo-stack__layer photo-stack__layer--mid">
      <img :src="image" :alt="alt" loading="lazy" />
    </div>
    <div class="photo-stack__layer photo-stack__layer--front">
      <img :src="image" :alt="alt" loading="lazy" />
    </div>
  </div>
</template>

<style scoped>
/* Three copies of the same photo, left-aligned and receding in width toward
   the back, so the trailing edge reads as a fanned stack of prints behind
   the top photo — the back two are dimmed with a flat black overlay so the
   front (undimmed) layer reads as the "top of the stack". */
.photo-stack {
  position: relative;
  width: 100%;
  height: 100%;
}

.photo-stack__layer {
  position: absolute;
  inset: 0;
  border-radius: calc(100vw * 24 / 1920);
  overflow: hidden;
}

.photo-stack__layer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-stack__layer--back::after,
.photo-stack__layer--mid::after {
  content: '';
  position: absolute;
  inset: 0;
}

.photo-stack__layer--back::after {
  background: rgba(7, 7, 7, 0.6);
}

.photo-stack__layer--mid {
  right: 5.333%;
}

.photo-stack__layer--mid::after {
  background: rgba(7, 7, 7, 0.4);
}

.photo-stack__layer--front {
  right: 10.667%;
}

@media (max-width: 768px) {
  .photo-stack__layer {
    border-radius: 16px;
  }
}
</style>
