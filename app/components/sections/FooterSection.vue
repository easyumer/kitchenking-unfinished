<script setup>
import footerLogo from '~/assets/images/Footer KK logo.png'
import facebookLogo from '~/assets/images/logos/Facebook logo.png'
import instagramLogo from '~/assets/images/logos/Instagram Logo.png'

const { contact, timings, social } = useSiteConfig()

const navColumns = [
    [
        { name: "Homepage", path: "/#home" },
        { name: "Our Menu", path: "/menu" },
        { name: "Gallery", path: "/gallery" }
    ],
    [
        { name: "About", path: "/about" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Contact", path: "/contact" }
    ]
]
</script>


<template>

    <footer class="footer">

        <div class="footer__top">

            <!-- Brand -->
            <div class="footer__brand">

                <NuxtLink to="/#home" aria-label="Kitchen King home">
                    <img :src="footerLogo" alt="Kitchen King" class="footer__logo" />
                </NuxtLink>

            </div>


            <!-- Navigate -->
            <div class="footer__column footer__nav">

                <h3>NAVIGATE</h3>

                <div class="footer__nav-columns">

                    <ul v-for="(column, i) in navColumns" :key="i">

                        <li v-for="item in column" :key="item.name">

                            <NuxtLink :to="item.path">
                                {{ item.name }}
                            </NuxtLink>

                        </li>

                    </ul>

                </div>

            </div>


            <!-- Visit -->
            <div class="footer__column footer__visit">

                <h3>VISIT US</h3>

                <p>
                    {{ contact.addressLines[0] }},<br>
                    {{ contact.addressLines[1] }}
                </p>

                <p>
                    {{ contact.email }}<br>
                    {{ contact.phone }}
                </p>

            </div>


            <!-- Hours + Social -->
            <div class="footer__column footer__hours-social">

                <div class="footer__hours">

                    <h3>OPENING HOURS</h3>

                    <p>
                        Monday – Sunday<br>
                        {{ timings }}
                    </p>

                </div>

                <div class="footer__social">

                    <h3>FOLLOW US</h3>

                    <div class="footer__icons">

                        <a :href="social.facebook" aria-label="Facebook" class="footer__social-link">
                            <img :src="facebookLogo" alt="Facebook" />
                        </a>

                        <a :href="social.instagram" aria-label="Instagram" class="footer__social-link">
                            <img :src="instagramLogo" alt="Instagram" />
                        </a>

                    </div>

                </div>

            </div>

        </div>


        <div class="footer__bottom">
            © 2026 Kitchen King. All rights reserved.
        </div>


    </footer>


</template>



<style scoped>
.footer {
    position: relative;
    z-index: 5;

    margin: calc(-100vw * 80 / 1920) 0 0;
    padding: calc(100vw * 110 / 1920) calc(100vw * 45 / 1920) calc(100vw * 20 / 1920);

    background: #1b1b1b;
    border-radius: calc(100vw * 20 / 1920) calc(100vw * 20 / 1920) calc(100vw * 20 / 1920) calc(100vw * 20 / 1920);

    margin-bottom: 10px;
    overflow: hidden;
    color: white;
}


.footer__top {
    display: grid;
    grid-template-columns: 1.6fr 0.8fr 0.7fr 0.6fr;
    align-items: start;
    gap: 40px;
}


.footer__brand {
    display: flex;
    align-items: center;
    align-self: stretch;
}


.footer__logo {
    width: 100%;
    max-width: calc(100vw * 570 / 1920);
}


.footer__column h3 {
    margin: 0 0 22px;

    font-family: var(--font-display);
    font-size: calc(100vw * 20 / 1920);
    font-weight: 600;
    color: white;
}


.footer__column p {
    margin: 0 0 15px;

    font-family: var(--font-body);
    font-size: calc(100vw * 15 / 1920);
    line-height: 1.4;
    color: rgba(255, 255, 255, .45);
}

.footer__column p:last-child {
    margin-bottom: 0;
}


.footer__nav-columns {
    display: flex;
    gap: 50px;
}

.footer__nav-columns ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.footer__nav-columns li {
    margin-bottom: 8px;

    font-family: var(--font-body);
    font-size: calc(100vw * 15 / 1920);
    color: rgba(255, 255, 255, .45);
}

.footer__nav-columns a {
    text-decoration: none;
    color: inherit;
    transition: color .3s ease;
}

.footer__nav-columns a:hover {
    color: white;
}


.footer__hours-social {
    display: flex;
    flex-direction: column;
}

.footer__social {
    margin-top: 22px;
}


.footer__icons {
    display: flex;
    gap: 10px;
}

.footer__icons a {
    width: 32px;
    height: 32px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background: #3a3a3a;
    color: white;
    text-decoration: none;
}

.footer__icons a img {
    width: 16px;
    height: 16px;
    object-fit: contain;
    transition: transform .3s ease;
}

.footer__icons a:hover {
    background: #4a4a4a;
    transform: translateY(-3px);
}

.footer__icons a:hover img {
    transform: scale(1.1);
}


.footer__bottom {
    margin-top: 50px;
    padding-top: 20px;

    border-top: 1px solid rgba(255, 255, 255, .12);

    font-size: 11px;
    color: rgba(255, 255, 255, .35);
}




@media(max-width:768px) {

    .footer {
        margin: 0 16px 16px;
        padding: 40px 24px;
        border-radius: 20px;
    }

    .footer__top {
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "brand brand"
            "nav nav"
            "visit hours"
            "social social";
        column-gap: 20px;
        row-gap: 30px;
    }

    .footer__brand {
        grid-area: brand;
        justify-content: center;
    }

    .footer__nav {
        grid-area: nav;
    }

    .footer__visit {
        grid-area: visit;
    }

    .footer__hours-social {
        display: contents;
    }

    .footer__hours {
        grid-area: hours;
    }

    .footer__social {
        grid-area: social;
        margin-top: 0;
    }

    .footer__logo {
        max-width: 230px;
    }

    .footer__column h3 {
        font-size: 14px;
    }

    .footer__column p,
    .footer__nav-columns li {
        font-size: 12px;
    }

    .footer__bottom {
        margin-top: 35px;
    }

}
</style>
