<script setup>
const { fadeUp } = useAnimation()
const { contact } = useSiteConfig()
</script>

<template>
  <footer class="footer">
    <img
      src="~/assets/images/footer-burger-stack.png"
      alt=""
      class="footer__image"
    />
    <div class="footer__scrim" />

    <div class="footer__content">
      <Motion as="div" v-bind="fadeUp" class="footer__cta">
        <span class="footer__cta-label">Do you have a question?</span>
        <a :href="`mailto:${contact.email}`" class="footer__cta-link">
          <span class="footer__cta-heading">Contact the restaurant</span>
          <span class="footer__cta-email">{{ contact.email }}</span>
        </a>
      </Motion>

      <FooterLinks />
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  overflow: hidden;
  background-color: var(--color-deep);
}

.footer__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  z-index: 0;
}

.footer__scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(157.79deg, rgba(0, 0, 0, 0.7) 16.4%, rgba(0, 0, 0, 0) 84.86%),
    rgba(0, 0, 0, 0.18);
}

.footer__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.footer__cta {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: clamp(24px, 9vw, 178px);
  max-width: 1208px;
  width: 100%;
  margin: 0 auto;
  padding: clamp(120px, 11vw, 209px) 48px clamp(96px, 11vw, 208px);
}

.footer__cta-label {
  flex: 1 1 200px;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 24px;
  line-height: 1.33;
  color: var(--color-gold-light);
}

.footer__cta-link {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: transform 0.4s var(--ease-out-expo);
}

.footer__cta-link:hover {
  transform: translateX(6px);
}

.footer__cta-heading,
.footer__cta-email {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(28px, 5vw, 48px);
  line-height: 1.17;
  letter-spacing: -0.04em;
}

.footer__cta-heading {
  color: var(--color-gold-light);
}

.footer__cta-email {
  color: var(--color-gold);
}

@media (max-width: 768px) {
  .footer__cta {
    padding: 80px 24px 64px;
  }
}
</style>
