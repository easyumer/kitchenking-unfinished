<script setup>

const navigation = [
    {
        name: "Homepage",
        path: "/#home"
    },
    {
        name: "Our Menu",
        path: "/menu"
    },
    {
        name: "Order Online",
        path: "/order"
    },
    {
        name: "Gallery",
        path: "/gallery"
    },
    {
        name: "About",
        path: "/about"
    },
    {
        name: "Portfolio",
        path: "/portfolio"
    },
    {
        name: "Contact",
        path: "/contact"
    }
]

</script>


<template>

    <footer class="footer">


        <div class="footer__grid">


            <!-- Visit -->
            <div class="footer__column">

                <h3>
                    VISIT US
                </h3>

                <p>
                    West Bay St,<br>
                    Nassau, Bahamas
                </p>


                <p>
                    info@kitchenking.com<br>
                    +1 242 000 0000
                </p>


            </div>




            <!-- Hours -->
            <div class="footer__column footer__hours">

                <h3>
                    OPENING HOURS
                </h3>


                <p>
                    Monday - Sunday<br>
                    11:00 AM - 8:00 PM
                </p>


            </div>





            <!-- Navigation -->
            <div class="footer__column footer__nav">


                <h3>
                    NAVIGATE
                </h3>


                <ul>

                    <li v-for="item in navigation" :key="item.name">

                        <NuxtLink :to="item.path">
                            {{ item.name }}
                        </NuxtLink>

                    </li>

                </ul>


            </div>






            <!-- Social -->
            <div class="footer__column footer__social">


                <h3>
                    FOLLOW US
                </h3>



                <div class="footer__icons">


                    <a href="#">
                        f
                    </a>


                    <a href="#">
                        ◎
                    </a>


                </div>



            </div>



        </div>



        <div class="footer__copyright">

            © 2026 Kitchen King. All rights reserved.

        </div>


    </footer>


</template>



<style scoped>
.footer {


    position: relative;

    z-index: 5;

    margin:
        calc(-100vw * 80 / 1920) 0 0;


    padding:

        calc(100vw * 50 / 1920) calc(100vw * 45 / 1920) calc(100vw * 10 / 1920);


    background: #1b1b1b;


    border-radius:
        calc(100vw * 20 / 1920) calc(100vw * 20 / 1920) 0 0;


    overflow: hidden;


    color: white;

}




.footer__grid {


    display: grid;


    grid-template-columns:

        1.2fr 1fr 1fr .8fr;


    gap: 40px;


}




.footer__column h3 {


    margin: 0 0 22px;


    font-family: var(--font-display);


    font-size:

        calc(100vw * 20 / 1920);


    font-weight: 600;


    color: white;


}



.footer__column p {


    margin: 0 0 15px;


    font-family: var(--font-body);


    font-size:

        calc(100vw * 15 / 1920);


    line-height: 1.4;


    color: rgba(255, 255, 255, .45);


}




.footer__hours {


    text-align: center;

}



.footer__nav {


    text-align: center;

}



.footer__nav ul {


    list-style: none;

    padding: 0;

    margin: 0;


}



.footer__nav li {


    margin-bottom: 8px;


    font-family: var(--font-body);


    font-size:

        calc(100vw * 15 / 1920);


    color: rgba(255, 255, 255, .45);


}

.footer__nav a {

    text-decoration: none;

    color: rgba(255, 255, 255, .45);

    transition:
        color .3s ease;

}


.footer__nav a:hover {

    color: white;

}




.footer__social {


    text-align: right;

}



.footer__icons {


    display: flex;

    justify-content: flex-end;

    gap: 10px;


}



.footer__icons a {


    width: 32px;

    height: 32px;


    border-radius: 50%;


    display: flex;

    justify-content: center;

    align-items: center;


    background: #3a3a3a;


    color: white;


    text-decoration: none;


    font-size: 14px;


}




.footer__copyright {


    margin-top: 20px;


    text-align: right;


    font-size: 10px;


    color: rgba(255, 255, 255, .35);


}




@media(max-width:768px) {


    .footer {


        margin: 0 16px 16px;


        padding: 40px 24px;


    }



    .footer__grid {


        grid-template-columns: 1fr;


        gap: 35px;


    }



    .footer__hours,
    .footer__nav,
    .footer__social {


        text-align: left;

    }



    .footer__icons {


        justify-content: flex-start;

    }



    .footer__copyright {


        text-align: left;

    }


    .footer__column h3 {

        font-size: 14px;

    }


    .footer__column p,
    .footer__nav li {


        font-size: 12px;

    }



}
</style>