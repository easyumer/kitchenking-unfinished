<script setup>

import reel1 from '~/assets/video/signature-oxtail-sliders.mp4'
import reel2 from '~/assets/video/SaveVid.Net_AQPOOjfL4XUgsHlTxqK0VkfEKyExw7HEqoj8OB8kygekCATFfNpDl5eWmWZxF3RC_8-3SKXUliFmQg-Xe_ZM85-f4oKnWcSiqLB86iM.mp4'


const instagramPosts = [
    {
        video: reel1,
        alt: 'Kitchen King Instagram post'
    },
    {
        video: reel2,
        alt: 'Kitchen King Instagram post'
    },
    {
        video: reel1,
        alt: 'Kitchen King Instagram post'
    },
    {
        video: reel2,
        alt: 'Kitchen King Instagram post'
    }
]

</script>

<template>
    <section class="social-location">

        <!-- Instagram -->
        <div class="instagram">
            <h2 class="instagram__heading">
                YES WE'RE ON INSTAGRAM!
            </h2>

            <div class="instagram__grid">
                <a v-for="(post, index) in instagramPosts" :key="index" href="#" class="instagram__card"
                    aria-label="View Kitchen King Instagram post">
                    <video :src="post.video" autoplay muted loop playsinline />
                </a>
            </div>
        </div>

    </section>
</template>

<style scoped>
.social-location {

    position: relative;

    padding:
        0 calc(100vw * 48 / 1920) 0;

    background: #050505;

}

/* =========================================
   INSTAGRAM
========================================= */

.instagram {
    margin-bottom: calc(100vw * 70 / 1920);
}

.instagram__heading {
    margin: 0 0 calc(100vw * 45 / 1920);
    font-family: var(--font-display);
    font-weight: 700;
    font-size: calc(100vw * 64 / 1920);
    line-height: 1.125;
    text-transform: uppercase;
    color: var(--color-white);
}

.instagram__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: calc(100vw * 20 / 1920);

    width: 94%;
    margin: 0 auto;
}

.instagram__card {
    position: relative;
    z-index: 2;

    margin-bottom: 0;
    display: block;
    aspect-ratio: 1 / 1.25;
    height: 500px;
    width: 100%;
    overflow: hidden;
    border-radius: calc(100vw * 12 / 1920);
    background: #222;
}




.instagram__card video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s var(--ease-out-expo);
}

.instagram__card:hover video {
    transform: scale(1.04);
}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 768px) {
    .social-location {
        padding: 0 16px 0;
    }

    .instagram {
        margin-bottom: 10px;
    }

    .instagram__heading {
        font-size: 32px;
        margin-bottom: 20px;
    }

    .instagram__grid {
        display: flex;
        grid-template-columns: none;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        gap: 12px;
    }

    .instagram__grid::-webkit-scrollbar {
        display: none;
    }

    .instagram__card {
        flex: 0 0 82%;
        height: 400px;
        aspect-ratio: 0.78;
        scroll-snap-align: start;
        border-radius: 12px;
    }
}
</style>
