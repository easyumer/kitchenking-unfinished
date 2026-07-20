<script setup>
const { contact, hours, social } = useSiteConfig()

const navLinks = [
  { label: 'Homepage', to: '/' },
  { label: 'Our Menu', to: '/menu' },
  { label: 'Order Online', to: '/order' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Merge', to: '/merge' },
  { label: 'Contact', to: '/contact' }
]
</script>

<template>
  <div class="footer-links">
    <div class="footer-links__col footer-links__col--left">
      <h3 class="footer-links__title">Visit Us</h3>
      <div class="footer-links__stack">
        <p class="footer-links__address">{{ contact.addressLines[0] }}<br />{{ contact.addressLines[1] }}</p>
        <a :href="`mailto:${contact.email}`" class="footer-links__link">{{ contact.email }}</a>
        <a :href="contact.phoneHref" class="footer-links__link">{{ contact.phone }}</a>
      </div>
    </div>

    <div class="footer-links__col">
      <h3 class="footer-links__title">Opening Hours</h3>
      <div class="footer-links__stack">
        <p v-for="h in hours" :key="h.days" class="footer-links__hours">
          <span>{{ h.days }}</span>
          <span>{{ h.time }}</span>
        </p>
      </div>
    </div>

    <div class="footer-links__col">
      <h3 class="footer-links__title">Navigate</h3>
      <div class="footer-links__stack footer-links__stack--tight">
        <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" class="footer-links__link">
          {{ link.label }}
        </NuxtLink>
      </div>
    </div>

    <div class="footer-links__col">
      <h3 class="footer-links__title">Follow Us</h3>
      <div class="footer-links__socials">
        <a :href="social.facebook" class="footer-links__icon" aria-label="Facebook"><IconFacebook /></a>
        <a :href="social.instagram" class="footer-links__icon" aria-label="Instagram"><IconInstagram /></a>
      </div>
      <p class="footer-links__copyright">© 2025 Kitchen King. All rights reserved.</p>
    </div>
  </div>
</template>

<style scoped>
.footer-links {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 120px 48px 64px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.footer-links::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(55.34% 53.39% at 42.71% 50%, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
  pointer-events: none;
}

.footer-links__col {
  flex: 1 1 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;
  text-align: right;
}

.footer-links__col--left {
  align-items: flex-start;
  text-align: left;
}

.footer-links__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  line-height: 1.25;
  color: var(--color-gold-light);
}

.footer-links__stack {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.footer-links__stack--tight {
  gap: 8px;
}

.footer-links__address,
.footer-links__link {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 14px;
  line-height: 1.43;
  color: rgba(252, 254, 254, 0.45);
  text-decoration: none;
  transition: color 0.3s var(--ease-out-expo);
}

.footer-links__link:hover {
  color: var(--color-gold-light);
}

.footer-links__hours {
  display: flex;
  flex-direction: column;
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 14px;
  line-height: 1.43;
  color: rgba(252, 254, 254, 0.45);
  text-align: right;
}

.footer-links__socials {
  display: flex;
  gap: 12px;
}

.footer-links__icon {
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

.footer-links__icon svg {
  width: 18px;
  height: 18px;
}

.footer-links__icon:hover {
  background-color: var(--color-gold);
  border-color: var(--color-gold);
  color: var(--color-deep);
}

.footer-links__copyright {
  margin-top: 96px;
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 12px;
  line-height: 1.33;
  color: rgba(252, 254, 254, 0.5);
}

@media (max-width: 900px) {
  .footer-links {
    flex-direction: column;
    align-items: flex-start;
    padding: 48px 24px;
  }

  .footer-links__col,
  .footer-links__col--left {
    align-items: flex-start;
    text-align: left;
    width: 100%;
  }

  .footer-links__hours {
    text-align: left;
  }

  .footer-links__copyright {
    margin-top: 24px;
  }
}
</style>
