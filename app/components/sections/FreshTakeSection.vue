<script setup>
import bannerImg from '~/assets/images/fresh-take-banner.jpg'
import { ref, onMounted, onUnmounted } from 'vue'

const { fadeUp } = useAnimation()

const sectionRef = ref(null)
const bannerRef = ref(null)
const isLeaving = ref(false)

const handleScroll = () => {
  if (!bannerRef.value) return

  const rect = bannerRef.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  /*
    Start exit animation when we're getting
    close to the bottom of the banner.
  */
  isLeaving.value = rect.bottom < viewportHeight + 250
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section ref="sectionRef" class="fresh-take">
    <div ref="bannerRef" class="fresh-take__banner" :style="{ backgroundImage: `url(${bannerImg})` }">
      <div class="fresh-take__content" :class="{ 'fresh-take__content--leaving': isLeaving }">
        <h2 class="fresh-take__heading">A Fresh Take<br />on Fast Food.</h2>

        <div class="fresh-take__copy">
          <p>
            Kitchen King was founded on a simple idea: fast food should never feel ordinary.
            Working alongside renowned private chef Donovan Smith, we've reimagined familiar
            favorites with quality ingredients, thoughtful recipes, and a commitment to serving
            food that's worth coming back for.
          </p>
          <p>
            From handcrafted burgers to Caribbean-inspired bowls, every item is prepared with the
            same attention to detail you'd expect from a great kitchen, delivered with the speed
            and convenience of your favorite fast-food spot.
          </p>
          <p>
            Today, Kitchen King proudly serves Nassau from our food truck, bringing chef-driven
            comfort food directly to the community we call home.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fresh-take {
  padding: 0 calc(100vw * 20 / 1920) calc(100vw * 80 / 1920);
}

.fresh-take__content--leaving {
  opacity: 0;

  transform:
    translateY(-40px) scale(0.96);

  pointer-events: none;
}

.fresh-take__banner {
  position: relative;

  /* Gives the sticky content enough distance to travel */
  min-height: 220vh;

  border-radius: calc(100vw * 32 / 1920);

  background-size: cover;
  background-position: center;

  /*
    IMPORTANT:
    clip keeps your rounded clipping without breaking sticky
  */
  overflow: clip;
}

.fresh-take__banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(0deg, rgba(7, 7, 7, 0.4), rgba(7, 7, 7, 0.4)),
    linear-gradient(180deg, #070707 -0.21%, rgba(7, 7, 7, 0) 100%);
}

.fresh-take__content {
  position: sticky;

  /*
    This is where the text stays while scrolling.
    Adjust 100px if your navbar needs more room.
  */
  top: 100px;

  z-index: 2;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  gap: calc(100vw * 209 / 1920);

  margin-left: calc(100vw * 68 / 1920);
  margin-right: calc(100vw * 68 / 1920);

  /*
    Don't use large padding-top on the sticky element.
  */
  padding-top: calc(100vw * 80 / 1920);

  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}

.fresh-take__heading {
  flex: 0 0 calc(100vw * 552 / 1920);
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: calc(100vw * 64 / 1920);
  line-height: 1.125;
  text-transform: uppercase;
  color: var(--color-white);
}

.fresh-take__copy {
  flex: 0 0 calc(100vw * 1014 / 1920);
  display: flex;
  flex-direction: column;
  gap: calc(100vw * 20 / 1920);
}

.fresh-take__copy p {
  margin: 0;
  font-family: var(--font-body);
  font-weight: 300;
  font-size: calc(100vw * 20 / 1920);
  line-height: 1.4;
  color: rgba(250, 250, 250, 0.8);
}

.fresh-take__heading,
.fresh-take__copy {
  transition:
    opacity 0.5s ease,
    transform 0.6s cubic-bezier(.22, 1, .36, 1);
}

.fresh-take__content--leaving .fresh-take__heading {
  opacity: 0;

  transform:
    translateX(-50px) rotate(-2deg);
}

.fresh-take__content--leaving .fresh-take__copy {
  opacity: 0;

  transform:
    translateX(50px);
}

/* This scroll-driven "leaving" effect is a motion effect like any other —
   fading/rotating/translating copy purely because the user scrolled past it
   isn't essential to reading the section, so reduced-motion users keep the
   content fully visible and in place instead. */
@media (prefers-reduced-motion: reduce) {
  .fresh-take__content--leaving {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }

  .fresh-take__content--leaving .fresh-take__heading,
  .fresh-take__content--leaving .fresh-take__copy {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 768px) {

  .fresh-take {
    padding: 0 16px 48px;
  }


  .fresh-take__banner {
    /*
      More height so sticky effect has
      enough scrolling space on mobile
    */
    min-height: 200vh;

    aspect-ratio: auto;

    border-radius: 20px;

    background-size: cover;

    background-position: center bottom;

    overflow: clip;
  }


  .fresh-take__banner::before {
    background:
      linear-gradient(0deg,
        rgba(7, 7, 7, 0.45),
        rgba(7, 7, 7, 0.45)),
      linear-gradient(180deg,
        #070707 0%,
        #070707 45%,
        rgba(7, 7, 7, 0) 80%);
  }


  .fresh-take__content {

    /*
      Keep sticky on mobile
      (your old one was disabling it)
    */
    position: sticky;

    top: 80px;

    z-index: 2;


    display: flex;

    flex-direction: column;


    gap: 24px;


    margin: 0;


    padding:
      32px 20px;
  }



  .fresh-take__heading {

    flex: none;

    font-size: 32px;

    line-height: 1.1;

  }



  .fresh-take__copy {

    flex: none;

    width: 100%;

    gap: 16px;

  }



  .fresh-take__copy p {

    font-size: 15px;

    line-height: 1.45;

  }



  /*
     Mobile exit animation
     smaller movement because
     screen is narrow
  */

  .fresh-take__content--leaving .fresh-take__heading {

    opacity: 0;

    transform:
      translateX(-20px) translateY(-15px);

  }



  .fresh-take__content--leaving .fresh-take__copy {

    opacity: 0;

    transform:
      translateX(20px) translateY(-15px);

  }

}
</style>
