<script setup>
import reel1 from '~/assets/video/signature-oxtail-sliders.mp4'
import reel2 from '~/assets/video/SaveVid.Net_AQPOOjfL4XUgsHlTxqK0VkfEKyExw7HEqoj8OB8kygekCATFfNpDl5eWmWZxF3RC_8-3SKXUliFmQg-Xe_ZM85-f4oKnWcSiqLB86iM.mp4'
import frameIcon from '~/assets/images/Frame.png'
import { onMounted, onUnmounted } from 'vue'


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
let mapResizeObserver

onMounted(async () => {

    const L = await import('leaflet')

    const mapEl = document.getElementById('map')

    const map = L.default.map(mapEl, {
        zoomControl: false
    }).setView(
        [25.0781, -77.3388],
        16
    )


    L.default.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution: ''
        }
    ).addTo(map)


    L.default.control.zoom({
        position: 'topright'
    }).addTo(map)


    L.default.marker([
        25.0781,
        -77.3388
    ]).addTo(map)

    mapResizeObserver = new ResizeObserver(() => map.invalidateSize())
    mapResizeObserver.observe(mapEl)

})

onUnmounted(() => {
    mapResizeObserver?.disconnect()
})

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

        <!-- Location -->
        <div class="location">

            <div class="location__content">
                <h2 class="location__title">
                    VISIT<br />
                    KITCHEN KING
                </h2>

                <div class="location__details">

                    <div>
                        <strong>Location:</strong>
                        <span>West Bay St,<br />Nassau, Bahamas</span>
                    </div>

                    <div>
                        <strong>Hours:</strong>
                        <span>Monday - Sunday<br />11:00 AM - 8:00 PM</span>
                    </div>

                </div>

                <a href="https://www.google.com/maps/search/?api=1&query=West+Bay+Street+Nassau+Bahamas" target="_blank"
                    rel="noopener noreferrer" class="location__button">
                    CONTACT US
                    <img :src="frameIcon" alt="open location" class="location__button-icon" />
                </a>
            </div>

            <ClientOnly>

                <div class="location__map">
                    <div id="map"></div>
                </div>

            </ClientOnly>

        </div>

    </section>
</template>

<style scoped>
.social-location {

    position: relative;

    padding:
        0 calc(100vw * 48 / 1920) calc(100vw * 160 / 1920);

    background: #050505;

}

.social-location::after {

    content: "";

    position: absolute;

    bottom: 0;
    left: 0;

    width: 100%;

    height: 220px;


    background:
        linear-gradient(to bottom,
            transparent,
            #050505);

    pointer-events: none;

}

/* =========================================
   INSTAGRAM
========================================= */

.instagram {
    margin-bottom: calc(100vw * 48 / 1920);
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
   LOCATION
========================================= */

.location {
    position: relative;
    z-index: 1;
    display: grid;
    margin-top: calc(-100vw * 240 / 1920);
    grid-template-columns: 0.8fr 1.2fr;
    min-height: calc(100vw * 300 / 1920);
    padding: calc(100vw * 50 / 1920);
    padding-top: calc(100vw * 300 / 1920);

    padding-bottom: calc(100vw * 150 / 1920);
    gap: calc(100vw * 48 / 1920);

    border-radius: calc(100vw * 16 / 1920);
    overflow: hidden;

    background:
        repeating-linear-gradient(-8deg,
            rgba(255, 255, 255, 0.08) 0,
            rgba(255, 255, 255, 0.08) 2px,
            transparent 2px,
            transparent 22px),
        var(--color-gold);
}

.location__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: var(--color-deep);
}

.location__title {
    margin: 0;
    font-family: var(--font-display);
    font-size: calc(100vw * 45 / 1920);
    line-height: 0.95;
    font-weight: 750;
}

.location__details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;

    font-family: var(--font-body);
    font-size: calc(100vw * 18 / 1920);
}

.location__details div {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.location__details strong {
    font-weight: 700;
}

.location__details span {
    line-height: 1.3;
}

.location__button {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: calc(100vw * 600 / 1920);
    min-height: calc(100vw * 40 / 1920);
    padding: 0 12px;

    border-radius: 4px;
    background: var(--color-deep);
    color: var(--color-white);

    font-family: var(--font-body);
    font-size: calc(100vw * 11 / 1920);
    font-weight: 600;
    text-decoration: none;
}

.location__button-icon {
    width: 12px;
    height: 12px;
    object-fit: contain;
}

.location__map {
    height: calc(100vw * 400 / 1920);
    overflow: hidden;
    border-radius: 8px;
    border: 3px solid var(--color-deep);
}

:global(#map) {
    width: 100%;
    height: 100%;
}


:global(.leaflet-control-zoom) {
    border: none;
}


:global(.leaflet-control-zoom a) {
    width: 38px;
    height: 38px;

    background: white;
    color: black;

    font-size: 22px;

    border-radius: 6px;
    margin: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
}


:global(.leaflet-marker-icon) {
    filter: hue-rotate(140deg);
}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 768px) {
    .social-location {
        padding: 0 16px 48px;
    }

    .social-location::after {
        height: 48px;
    }

    .instagram {
        margin-bottom: 16px;
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
        height: auto;
        aspect-ratio: 0.78;
        scroll-snap-align: start;
        border-radius: 12px;
    }

    .location {
        display: flex;
        flex-direction: column;

        min-height: auto;
        margin-top: -80px;
        padding: 150px 20px 24px;
        gap: 24px;

        border-radius: 12px;
    }

    .location__content {
        gap: 20px;
    }

    .location__title {
        font-size: 28px;
    }

    .location__details {
        font-size: 12px;
        gap: 14px;
    }

    .location__button {
        width: auto;
        height: 34px;
        min-height: 34px;
        padding: 0 16px;
        font-size: 11px;
    }

    .location__button-icon {
        width: 14px;
        height: 14px;
    }

    .location__map {
        height: 220px;
        min-height: 220px;
        border-radius: 8px;
    }

    .location__map iframe {
        min-height: 220px;
    }
}
</style>