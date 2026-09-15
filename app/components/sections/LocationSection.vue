<script setup>

import 'leaflet/dist/leaflet.css'



import frameIcon from '~/assets/images/Frame.png'
import mapIconPlaceholder from '~/assets/images/logos/Map Icon Placeholder.svg'
import { onMounted, onUnmounted } from 'vue'


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
            maxZoom: 19,
            crossOrigin: true,
            attribution: '© OpenStreetMap contributors'
        }
    ).addTo(map)


    L.default.control.zoom({
        position: 'topright'
    }).addTo(map)


    const defaultIcon = L.default.divIcon({
        className: 'kitchen-king-map-pin',
        html: `
        <div class="kitchen-king-pin-shape">
            <span></span>
        </div>
    `,
        iconSize: [30, 40],
        iconAnchor: [15, 40]
    })

    L.default.marker(
        [25.0781, -77.3388],
        { icon: defaultIcon }
    ).addTo(map)

    mapResizeObserver = new ResizeObserver(() => map.invalidateSize())
    mapResizeObserver.observe(mapEl)

})

onUnmounted(() => {
    mapResizeObserver?.disconnect()
})

</script>

<template>
    <section class="social-location">

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

            <div class="location__map-panel">

                <ClientOnly>

                    <div class="location__map">
                        <div id="map"></div>
                    </div>

                </ClientOnly>

                <div class="location__map-links">

                    <a href="https://www.google.com/maps/search/?api=1&query=West+Bay+Street+Nassau+Bahamas"
                        target="_blank" rel="noopener noreferrer" class="location__map-link">
                        SHOW ON GOOGLE MAPS
                        <img :src="mapIconPlaceholder" alt="" class="location__map-link-icon" />
                    </a>

                    <a href="https://maps.apple.com/?q=West+Bay+Street+Nassau+Bahamas" target="_blank"
                        rel="noopener noreferrer" class="location__map-link">
                        SHOW ON APPLE MAPS
                        <img :src="mapIconPlaceholder" alt="" class="location__map-link-icon" />
                    </a>

                </div>

            </div>

        </div>

    </section>
</template>

<style scoped>
.social-location {

    position: relative;

    padding:
        0 calc(100vw * 48 / 1920) calc(100vw * 120 / 1920);

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
   LOCATION
========================================= */

.location {
    position: relative;
    z-index: 1;
    display: grid;
    margin-top: calc(-100vw * 240 / 1920);
    grid-template-columns: 0.8fr 1.2fr;
    min-height: calc(100vw * 300 / 1920);
    padding: calc(100vw * 80 / 1920);
    padding-top: calc(100vw * 250 / 1920);

    padding-bottom: calc(100vw * 120 / 1920);
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
    justify-content: center;
    gap: calc(100vw * 40 / 1920);
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

    width: 360px;
    height: calc(100vw * 56 / 1920);
    padding: 0 calc(100vw * 20 / 1920);

    border-radius: 10px;
    background: var(--color-deep);
    color: var(--color-white);

    font-family: var(--font-body);
    font-size: calc(100vw * 13 / 1920);
    font-weight: 600;
    text-decoration: none;
}

.location__button-icon {
    width: 14px;
    height: 14px;
    object-fit: contain;
}

.location__map-panel {
    display: flex;
    flex-direction: column;
    gap: 12px;

    background: var(--color-deep);
    border: 5px solid var(--color-deep);
    border-radius: 16px;
    overflow: hidden;
}

.location__map {
    height: calc(100vw * 400 / 1920);
}

.location__map-links {
    display: flex;
    gap: 12px;
}

.location__map-link {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: calc(100vw * 56 / 1920);
    padding: 0 calc(100vw * 20 / 1920);

    background: var(--color-white);
    color: var(--color-deep);
    border-radius: 12px;

    font-family: var(--font-body);
    font-size: calc(100vw * 13 / 1920);
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    text-decoration: none;
}


.location__map-link-icon {
    width: calc(100vw * 20 / 1920);
    height: calc(100vw * 20 / 1920);
    object-fit: contain;
    flex-shrink: 0;
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


:global(.kitchen-king-map-pin) {
    background: transparent;
    border: none;
}

:global(.kitchen-king-pin-shape) {
    position: relative;

    width: 26px;
    height: 26px;

    background: #000;
    border: 3px solid #fff;

    border-radius: 50% 50% 50% 0;

    transform: rotate(-45deg);

    box-sizing: border-box;
}

:global(.kitchen-king-pin-shape span) {
    position: absolute;

    width: 7px;
    height: 7px;

    left: 7px;
    top: 7px;

    background: #fff;
    border-radius: 50%;
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

    .location {
        display: flex;
        flex-direction: column;

        min-height: auto;
        margin-top: -80px;
        padding: 120px 20px 24px;
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
        width: 100%;
        height: 44px;
        padding: 0 16px;
        font-size: 12px;
    }

    .location__button-icon {
        width: 14px;
        height: 14px;
    }

    .location__map-panel {
        gap: 8px;

        border-width: 3px;
        border-radius: 12px;
        border: 5px solid var(--color-deep);
    }

    .location__map {
        height: 220px;
        min-height: 220px;
    }

    .location__map iframe {
        min-height: 220px;
    }

    .location__map-links {
        flex-direction: column;
        gap: 8px;
    }

    .location__map-link {
        height: 44px;
        padding: 10px 16px;
        font-size: 11px;
        border-radius: 8px;
    }

    .location__map-link-icon {
        width: 16px;
        height: 16px;
    }
}
</style>
