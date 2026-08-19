<script setup>
defineEmits(['navigate'])

const { social } = useSiteConfig()

const navLinks = [
  { label: 'Our Menu', to: '/menu', strong: true },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' }
]

const socialColumns = [
  [{ label: 'Instagram', href: social.instagram }, { label: 'TikTok', href: social.tiktok }],
  [{ label: 'Facebook', href: social.facebook }, { label: 'Linkedin', href: social.linkedin }]
]
</script>

<template>
  <div class="nav-links">
    <nav class="nav-links__list">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="nav-links__link"
        :class="{ 'nav-links__link--strong': link.strong }"
        @click="$emit('navigate')"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>

    <div class="nav-links__socials">
      <span class="nav-links__socials-label">Social</span>
      <div class="nav-links__socials-grid">
        <div v-for="(col, i) in socialColumns" :key="i" class="nav-links__socials-col">
          <a v-for="item in col" :key="item.label" :href="item.href" class="nav-links__social-link">
            {{ item.label }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-links {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
}

.nav-links__list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.nav-links__link {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(36px, 7vw, 48px);
  line-height: 1.17;
  color: var(--color-section);
  text-decoration: none;
  transition: opacity 0.3s var(--ease-out-expo);
}

.nav-links__link--strong {
  font-weight: 700;
}

.nav-links__link:hover {
  opacity: 0.6;
}

.nav-links__socials {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 17px;
  padding-top: 32px;
  border-top: 1px solid var(--color-section);
}

.nav-links__socials-label {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  line-height: 1.25;
  color: var(--color-section);
}

.nav-links__socials-grid {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.nav-links__socials-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1 1 183px;
}

.nav-links__social-link {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 24px;
  line-height: 1.33;
  color: var(--color-section);
  text-decoration: none;
  transition: opacity 0.3s var(--ease-out-expo);
}

.nav-links__social-link:hover {
  opacity: 0.6;
}

@media (min-width: 768px) {
  .nav-links__link {
    font-size: clamp(40px, 4vw, 64px);
  }
}
</style>
