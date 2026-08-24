<script setup>
import { ref } from 'vue'

import faqImage from '~/assets/images/faq-burger.png'

const activeIndex = ref(0)

const faqs = [
    {
        question: 'WHERE IS KITCHEN KING LOCATED?',
        answer: "We're proudly serving Nassau, Bahamas from our food truck."
    },
    {
        question: 'DO YOU ACCOMMODATE DIETARY REQUESTS?',
        answer: "Yes, we offer options for different dietary needs. Please ask our team."
    },
    {
        question: 'WHAT KIND OF FOOD DO YOU SERVE?',
        answer: "We specialize in Caribbean-inspired comfort food including burgers, sliders and bowls."
    },
    {
        question: 'IS EVERYTHING MADE FRESH?',
        answer: "Yes, all meals are prepared fresh using quality ingredients."
    },
    {
        question: 'DO YOU OFFER CATERING OR PRIVATE EVENTS?',
        answer: "Yes, we provide catering options and private event services."
    }
]


const toggleFaq = (index) => {

    if (activeIndex.value === index) {
        activeIndex.value = null
    }
    else {
        activeIndex.value = index
    }

}

</script>


<template>

    <section class="faq" :style="{ backgroundImage: `url(${faqImage})` }">

        <div class="faq__overlay"></div>


        <div class="faq__container">


            <!-- LEFT -->
            <div class="faq__intro">

                <h2>
                    GOT QUESTIONS?
                    <br>
                    WE'VE GOT
                    <br>
                    ANSWERS.
                </h2>

            </div>



            <!-- RIGHT -->
            <div class="faq__list">


                <div v-for="(item, index) in faqs" :key="index" class="faq__item">


                    <button class="faq__question" @click="toggleFaq(index)">

                        <span>
                            {{ item.question }}
                        </span>


                        <span class="faq__icon" :class="{ open: activeIndex === index }">
                            +
                        </span>

                    </button>



                    <Transition name="faq-expand">

                        <div v-if="activeIndex === index" class="faq__answer">
                            {{ item.answer }}
                        </div>

                    </Transition>


                </div>


            </div>


        </div>


    </section>


</template>



<style scoped>
.faq {

    position: relative;

    min-height: 700px;


    margin-top: -80px;

    padding-top: 80px;
    padding-bottom: 120px;

    background-size: cover;
    background-position: center;

    color: white;

    overflow: visible;

}

.faq::before {

    content: "";

    position: absolute;

    top: -1px;
    left: 0;

    width: 100%;

    height: 250px;


    background:
        linear-gradient(to bottom,
            #050505 0%,
            rgba(5, 5, 5, .85) 35%,
            transparent 100%);


    z-index: 3;

    pointer-events: none;

}


.faq__overlay {

    position: absolute;

    inset: 0;

    z-index: 1;

    background:
        linear-gradient(90deg,
            rgba(0, 0, 0, .85),
            rgba(0, 0, 0, .65));

}


.faq__container {

    position: relative;
    z-index: 2;

    display: grid;

    grid-template-columns:
        0.8fr 1.2fr;

    gap: 80px;

    padding:
        100px 48px;

}




/* LEFT */

.faq__intro h2 {

    margin: 0;

    font-family: var(--font-display);

    font-size:
        clamp(42px, 4vw, 72px);

    line-height: 1.05;

    font-weight: 700;

}



/* RIGHT */


.faq__list {

    width: 100%;

}



.faq__item {

    border-bottom:
        1px solid rgba(255, 255, 255, .15);

}



.faq__question {


    width: 100%;

    display: flex;

    justify-content: space-between;

    align-items: center;


    background: none;

    border: none;

    color: white;

    cursor: pointer;


    padding:
        24px 0;


    font-family: var(--font-display);

    font-size:
        clamp(18px, 1.5vw, 26px);

    font-weight: 600;

    text-align: left;

}



.faq__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 30px;
    font-weight: 300;

    transition:
        transform .35s ease;
}


.faq__icon.open {
    transform: rotate(45deg);
}


.faq__answer {


    max-width: 600px;

    padding-bottom: 20px;


    color: #cfcfcf;


    font-family: var(--font-body);

    font-size: 15px;

    line-height: 1.5;

}

/* FAQ smooth opening animation */

.faq-expand-enter-active,
.faq-expand-leave-active {

    transition:
        opacity .6s ease,
        transform .6s cubic-bezier(.22, 1, .36, 1),
        max-height .7s ease;

    overflow: hidden;
}


.faq-expand-enter-from {
    opacity: 0;
    filter: blur(5px);
    transform: translateY(-20px);
}

.faq-expand-leave-to {

    opacity: 0;

    transform:
        translateY(-15px);

    max-height: 0;

}

.faq-expand-enter-to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
}

.faq-expand-leave-from {

    opacity: 1;

    transform:
        translateY(0);

    max-height: 200px;

}



/* MOBILE */


@media(max-width:768px) {


    .faq {

        min-height: auto;
        margin-top: -24px;
        padding-top: 24px;

    }

    .faq::before {

        height: 60px;

    }



    .faq__container {


        display: flex;

        flex-direction: column;


        gap: 50px;


        padding:

            60px 24px;


    }



    .faq__intro h2 {

        font-size: 38px;

    }



    .faq__question {


        font-size: 18px;

        padding: 18px 0;

    }



    .faq__answer {

        font-size: 14px;

    }


}
</style>