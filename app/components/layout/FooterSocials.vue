<script setup>
defineProps({
  social: { type: Object, required: true }
})
</script>

<template>
  <div class="footer-socials">
    <h3 class="footer-socials__title">Follow Us</h3>
    <div class="footer-socials__icons">
      <a :href="social.facebook" class="footer-socials__icon" aria-label="Facebook"><IconFacebook /></a>
      <a :href="social.instagram" class="footer-socials__icon" aria-label="Instagram"><IconInstagram /></a>
    </div>
    <p class="footer-socials__copyright">© 2025 Kitchen King. All rights reserved.</p>
  </div>
</template>

<style scoped>
.footer-socials {
  flex: 1 1 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;
  text-align: right;
}

.footer-socials__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  line-height: 1.25;
  color: var(--color-gold-light);
}

.footer-socials__icons {
  display: flex;
  gap: 12px;
}

.footer-socials__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: rgba(252, 254, 254, 0.1);
  border: 1px solid rgba(252, 254, 254, 0.22);
  color: var(--color-offwhite);
  transition: background-color 0.3s var(--ease-out-expo), border-color 0.3s var(--ease-out-expo), color 0.3s var(--ease-out-expo);
}

.footer-socials__icon svg {
  width: 18px;
  height: 18px;
}

.footer-socials__icon:hover {
  background-color: var(--color-gold);
  border-color: var(--color-gold);
  color: var(--color-deep);
}

.footer-socials__copyright {
  margin-top: 96px;
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 12px;
  line-height: 1.33;
  color: rgba(252, 254, 254, 0.5);
}

@media (max-width: 900px) {
  .footer-socials {
    align-items: flex-start;
    text-align: left;
    width: 100%;
  }

  .footer-socials__copyright {
    margin-top: 24px;
  }
}
</style>
