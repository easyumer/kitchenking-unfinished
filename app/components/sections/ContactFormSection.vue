<script setup>

import contactImage from '~/assets/images/contact/Contact Page pic.png'

const { fadeIn, fadeUp } = useAnimation()

const name = ref('')
const phone = ref('')
const email = ref('')
const message = ref('')

function handleSubmit() { }

</script>


<template>

  <section class="contact-hero">

    <h1 class="contact-hero__sr-heading">
      Contact Kitchen King
    </h1>


    <div class="contact-frame">


      <!-- GREY MASKED CARD -->
      <Motion as="div" v-bind="fadeIn" class="contact-card">


        <div class="contact-grid">


          <!-- IMAGE -->

          <div class="contact-image">

            <img :src="contactImage" alt="Kitchen King food truck" class="contact-media" />

            <div class="contact-overlay" />


            <h2 class="contact-image__title">
              WE’D LOVE TO<br>
              HEAR FROM YOU.
            </h2>


          </div>



          <!-- FORM -->

          <Motion as="form" v-bind="fadeUp" class="contact-form" @submit.prevent="handleSubmit">


            <div class="contact-row">


              <label class="contact-field">

                <span>Name</span>

                <input v-model="name" type="text" placeholder="John Doe" />

              </label>



              <label class="contact-field">

                <span>Phone number</span>

                <input v-model="phone" type="tel" placeholder="-" />

              </label>


            </div>



            <label class="contact-field">

              <span>Email</span>

              <input v-model="email" type="email" placeholder="-" />

            </label>




            <label class="contact-field">

              <span>Message</span>

              <textarea v-model="message" rows="4" placeholder="Type your message here..." />

            </label>



          </Motion>


        </div>


      </Motion>



      <!-- BUTTON IN NOTCH -->

      <Motion as="div" v-bind="fadeUp" class="contact-submit">

        <SubmitButton label="Submit" />

      </Motion>



    </div>


  </section>

</template>



<style scoped>
.contact-hero {

  position: relative;

  padding:
    150px calc(100vw * 50 / 1920) calc(100vw * 300 / 1920);

  background: var(--color-deep);

}

.contact-image__title {

  position: absolute;

  left: calc(100vw * 38 / 1920);

  bottom: calc(100vw * 35 / 1920);


  z-index: 2;


  width: calc(100vw * 500 / 1920);


  margin: 0;


  font-family: var(--font-display);

  font-weight: 500;


  font-size: calc(100vw * 56 / 1920);


  line-height: 1.05;


  letter-spacing: -0.02em;


  text-transform: uppercase;


  color: var(--color-white);

}

.contact-hero__sr-heading {

  position: absolute;

  width: 1px;
  height: 1px;

  overflow: hidden;

  clip: rect(0 0 0 0);

}



/* ============================
   FRAME
============================ */


.contact-frame {

  position: relative;

}



/* ============================
   MASKED GREY CARD
============================ */


.contact-card {


  position: relative;

  width: 100%;

  aspect-ratio: 1880 / 700;


  background: var(--color-section);



  -webkit-mask:

    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1880 700'%3E%3Cpath d='M1880 560C1880 577 1866 590 1848 590H1290C1274 590 1260 604 1260 620V668C1260 686 1246 700 1228 700H32C14 700 0 686 0 668V32C0 14 14 0 32 0H1848C1866 0 1880 14 1880 32V560Z' fill=\"white\"/%3E%3C/svg%3E") center / 100% 100% no-repeat;



  mask:

    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1880 700'%3E%3Cpath d='M1880 560C1880 577 1866 590 1848 590H1290C1274 590 1260 604 1260 620V668C1260 686 1246 700 1228 700H32C14 700 0 686 0 668V32C0 14 14 0 32 0H1848C1866 0 1880 14 1880 32V560Z' fill=\"white\"/%3E%3C/svg%3E") center / 100% 100% no-repeat;


}




/* ============================
   CONTENT GRID
============================ */


.contact-grid {


  position: absolute;

  inset:

    calc(100vw * 28 / 1920);


  display: grid;

  grid-template-columns: 900fr 884fr;

  gap:

    calc(100vw * 40 / 1920);


}



/* ============================
 IMAGE
============================ */


.contact-image {


  position: relative;

  height: 100%;


  border-radius:

    calc(100vw * 20 / 1920);


  overflow: hidden;


}



.contact-media {


  position: absolute;

  inset: 0;


  width: 100%;

  height: 100%;


  object-fit: cover;


}



.contact-overlay {


  position: absolute;

  inset: 0;


  background:

    linear-gradient(0deg,
      rgba(0, 28, 24, .45),
      rgba(0, 28, 24, 0)),

    rgba(0, 0, 0, .2);


}




/* ============================
 FORM
============================ */


.contact-form {


  display: flex;

  flex-direction: column;


  gap:

    calc(100vw * 20 / 1920);


}




.contact-row {


  display: grid;

  grid-template-columns: 1fr 1fr;


  gap:

    calc(100vw * 24 / 1920);


}



.contact-field {


  display: flex;

  flex-direction: column;


  gap:

    calc(100vw * 10 / 1920);


}



.contact-field span {


  font-family: var(--font-display);

  font-size:

    calc(100vw * 16 / 1920);


  font-weight: 500;


  letter-spacing: .05em;


  color: white;


}




.contact-field input,
.contact-field textarea {


  width: 100%;


  padding:

    calc(100vw * 12 / 1920);



  background: transparent;


  border:

    1px solid rgba(255, 255, 255, .2);



  border-radius:

    calc(100vw * 8 / 1920);


  color: white;


  font-family: var(--font-body);


  font-size:

    calc(100vw * 14 / 1920);


}



.contact-field textarea {


  min-height:

    calc(100vw * 100 / 1920);


  resize: none;


}





.contact-field input::placeholder,
.contact-field textarea::placeholder {

  color:
    rgba(255, 255, 255, .6);

}



/* ============================
 BUTTON
============================ */


.contact-submit {


  position: absolute;


  right: 0;


  bottom: 0;


  width:

    calc(100vw * 596 / 1920);


  height:

    calc(100vw * 120 / 1920);



  z-index: 5;


}



.contact-submit :deep(.submit-button__text) {


  font-size:

    calc(100vw * 32 / 1920);


  letter-spacing: .05em;


}



.contact-submit :deep(.submit-button__icon-wrap) {


  width:

    calc(100vw * 40 / 1920);


  height:

    calc(100vw * 40 / 1920);


}



/* ============================
 MOBILE
============================ */


@media(max-width:768px) {



  .contact-hero {
    height: auto;

    padding:

      100px 18px 100px;

  }



  .contact-card {


    height: 1200px;

    aspect-ratio: auto;
    -webkit-mask:

      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 374 1200'%3E%3Cpath d='M374 1090C374 1103 363 1114 350 1114H100C87 1114 77 1125 77 1138V1176C77 1189 66 1200 53 1200H24C10 1200 0 1189 0 1176V24C0 10 10 0 24 0H350C363 0 374 10 374 24V1090Z' fill='white'/%3E%3C/svg%3E") center / 100% 100% no-repeat;



    mask:

      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 374 1200'%3E%3Cpath d='M374 1090C374 1103 363 1114 350 1114H100C87 1114 77 1125 77 1138V1176C77 1189 66 1200 53 1200H24C10 1200 0 1189 0 1176V24C0 10 10 0 24 0H350C363 0 374 10 374 24V1090Z' fill='white'/%3E%3C/svg%3E") center / 100% 100% no-repeat;
  }




  .contact-grid {

    position: absolute;

    top: 50px;
    left: 20px;
    right: 20px;

    display: flex;

    flex-direction: column;

    gap: 32px;

  }



  .contact-image {

    height: 660px;

    border-radius: 16px;

  }



  .contact-row {

    grid-template-columns: 1fr;

    gap: 20px;

  }



  .contact-field span {

    font-size: 12px;

  }



  .contact-field input,
  .contact-field textarea {

    font-size: 12px;

    padding: 12px;

  }



  .contact-submit {


    width: 285px;

    height: 80px;


    right: 0;

    bottom: 0;


  }



  .contact-submit :deep(.submit-button__text) {

    font-size: 24px;

  }



  .contact-submit :deep(.submit-button__icon-wrap) {

    width: 32px;

    height: 32px;

  }

  .contact-media {

    object-fit: cover;

    object-position: center top;

  }

  .contact-image__title {

    left: 18px;

    bottom: 24px;


    width: 270px;


    font-size: 34px;


    line-height: 1;

    font-weight: 500;

  }


}
</style>