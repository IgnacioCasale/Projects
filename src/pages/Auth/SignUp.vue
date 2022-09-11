<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-card-section>
        <login
          v-if="!confirm"
          title="Registro"
          :signUp="true"
          :emailDialog="email"
          :ageDialog="age"
          :dayDialog="day"
          :monthDialog="month"
          :yearDialog="year"
          :nameDialog="name"
        />
      </q-card-section>
    </q-card>
  </q-page>

  <iframe name="dummyframe" id="dummyframe" style="display: none"></iframe>
  <!-- as a target of the submit (form below) and avoid updating the page. ¡CRAZY!  -->
  <q-dialog v-model="confirm" :maximized="true" persistent>
    <q-carousel
      transition-prev="scale"
      transition-next="scale"
      animated
      control-color="primary"
      navigation-icon="radio_button_unchecked"
      navigation
      padding
      v-model="slide"
      class="shadow-1 rounded-borders carousel"
    >
      <template v-slot:navigation-icon="{ active, onClick }">
        <div v-if="slide >= 2 && slide != 6">
          <q-btn
            v-if="active"
            size="md"
            icon="favorite"
            color="primary"
            flat
            round
            dense
            @click="onClick"
          />
          <q-btn
            v-else
            size="sm"
            icon="radio_button_unchecked"
            color="primary"
            flat
            round
            dense
            @click="onClick"
          />
        </div>
      </template>

      <q-carousel-slide :name="1" class="column no-wrap flex-center">
        <q-icon name="contact_mail" color="primary" size="90px" />

        <div class="q-mb-sm">
          <p class="infoText text-center">
            ¡El primer paso para mejorar tu salud!
          </p>
        </div>

        <div class="q-mt-sm text-center">
          <h6>¿Quién eres?</h6>
          <q-input
            style="max-width: 400px; width: 85vw"
            v-model="name"
            filled
            class="col q-mt-sm"
            placeholder="Nombre completo"
            type="text"
          >
          </q-input>
          <q-input
            style="max-width: 400px; width: 85vw"
            v-model="email"
            filled
            class="col q-mt-sm"
            placeholder="Email*"
            type="email"
            lazy-rules
            ref="email"
            :rules="[
              (val) => isValidEmail(val) || 'Introduce un email válido.',
            ]"
          >
          </q-input>
        </div>

        <div class="row flex justify-center">
          <form @submit.prevent="submitEmail">
            <q-btn
              :disable="email.length == 0"
              type="submit"
              style="width: 85vw; max-width: 300px"
              class="col-12 q-mt-md text-white"
              label="Siguiente paso"
              color="primary"
            />
          </form>
          <div class="col-12 q-mt-md flex justify-center">
            <q-btn
              style="width: 85vw; max-width: 400px"
              flat
              label="Volver a Inicio"
              color="primary"
              to="/home"
            />
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="2" class="column no-wrap flex-center">
        <q-icon name="health_and_safety" color="primary" size="90px" />

        <div class="q-mt-md text-start">
          <span class="q-ml-sm text-center">
            <p>
              Actualmente las plazas están límitadas. ¡Pero no te preocupes!
              Contacta conmigo si todavía no tienes el código de acceso.
            </p>
          </span>
        </div>

        <div class="row flex justify-center">
          <div class="col-12 q-mt-md flex justify-center">
            <q-btn
              style="width: 85vw; max-width: 400px"
              @click="slide = 3"
              label="Contactar"
              color="primary"
            />
          </div>

          <div class="col-12 q-mt-md flex justify-center">
            <q-btn
              style="width: 85vw; max-width: 400px"
              @click="slide = 4"
              outline
              label="Tengo el código"
              color="primary"
            />
          </div>

          <div class="col-12 q-mt-md flex justify-center">
            <q-btn
              style="width: 85vw; max-width: 400px"
              flat
              label="Volver a Inicio"
              color="primary"
              to="/home"
            />
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="3" class="column no-wrap flex-center">
        <q-icon name="question_answer" color="primary" size="90px" />
        <div class="q-mt-md text-center">
          <div class="q-pa-md" style="max-width: 400px; width: 100vw"></div>
        </div>

        <q-form
          @submit="sendMessage"
          target="dummyframe"
          action="https://postmail.invotes.com/send"
          method="post"
          id="email_form"
        >
          <input
            type="hidden"
            name="subject"
            :value="sendSubject()"
            placeholder="Subject"
          />

          <input type="hidden" name="access_token" :value="token" />

          <q-input name="text" v-model="text" filled type="textarea" />

          <div class="row flex justify-center">
            <div class="col-12 q-mt-md flex justify-center">
              <q-btn
                :loading="time"
                style="width: 85vw; max-width: 400px"
                type="submit"
                id="submit_form"
                value="Send"
                label="Enviar mensaje"
                color="primary"
              />
            </div>

            <div class="col-12 q-mt-md flex justify-center">
              <q-btn
                style="width: 85vw; max-width: 400px"
                flat
                @click="slide = 2"
                label="Paso anterior"
                color="primary"
              />
            </div>
          </div>
        </q-form>
      </q-carousel-slide>

      <q-carousel-slide :name="4" class="column no-wrap flex-center">
        <q-icon name="enhanced_encryption" color="primary" size="90px" />
        <div class="q-mt-md text-center">
          <q-input
            style="max-width: 400px; width: 85vw"
            class="input"
            filled
            v-model="code"
            label="Código de acceso"
            lazy-rules
            :rules="[
              (val) => code == this.getCode || 'El código es incorrecto',
            ]"
            ref="code"
          />
        </div>

        <div class="row flex justify-center">
          <div class="col-12 q-mt-md flex justify-center">
            <q-btn
              style="width: 85vw; max-width: 400px; display: block"
              @click="validateCode()"
              label="Introducir código"
              color="primary"
            />
          </div>
          <div class="col-12 q-mt-md flex justify-center">
            <q-btn
              style="width: 85vw; max-width: 400px"
              flat
              @click="slide = 2"
              label="Paso anterior"
              color="primary"
            />
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide
        v-if="codeCheck"
        :name="5"
        class="column no-wrap flex-center"
      >
        <q-icon name="cake" color="primary" size="90px" />

        <div class="q-mb-sm text-center">
          <h6>Introduce tu fecha de nacimiento</h6>

          <div class="row q-mt-lg">
            <div class="col-4 flex justify-start">
              <div>
                <p>Día</p>
                <q-input
                  v-model="day"
                  type="number"
                  filled
                  style="max-width: 80px; min-width: 45px"
                  lazy-rules
                  ref="day"
                  :rules="[
                    (val) => !!val || 'requerido',
                    (val) => val.length < 3 || 'no válido',
                    (val) => val < 32 || 'no válido',
                    (val) => val > 0 || 'no válido',
                  ]"
                />
              </div>
            </div>
            <div class="col-4 flex justify-start">
              <div>
                <p>Mes</p>
                <q-input
                  v-model="month"
                  type="number"
                  filled
                  style="max-width: 80px; min-width: 45px"
                  lazy-rules
                  ref="month"
                  :rules="[
                    (val) => !!val || 'requerido',
                    (val) => val.length < 3 || 'no válido',
                    (val) => val < 13 || 'no válido',
                    (val) => val > 0 || 'no válido',
                  ]"
                />
              </div>
            </div>
            <div class="col-4 flex justify-start">
              <div>
                <p>Año</p>
                <q-input
                  v-model="year"
                  type="number"
                  filled
                  style="max-width: 150px; min-width: 90px"
                  lazy-rules
                  ref="year"
                  :rules="[
                    (val) => !!val || 'requerido',
                    (val) => val.length < 5 || 'no válido',
                    (val) => val.length > 3 || 'no válido',
                    (val) => val > 1930 || 'edad max',
                    (val) => val < todayYear - 15 || 'eddad min',
                  ]"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row flex justify-center">
          <q-btn
            style="width: 85vw; max-width: 400px"
            class="col-12 q-mt-lg"
            label="Terminar y revisar datos"
            color="primary"
            :disable="!year"
            @click="confirmCode()"
          />
        </div>
      </q-carousel-slide>

      <q-carousel-slide
        v-if="message"
        :name="6"
        class="column no-wrap flex-center"
      >
        <q-icon name="celebration" color="primary" size="90px" />

        <div class="q-mb-sm row text-center flex justify-center">
          <h6 class="col-12">¡Ya has terminado!</h6>
          <p class="q-mb-xl col-12">
            Pronto contactaré contigo. También puedes seguirme y contactarme por
            mis redes sociales
          </p>
          <FollowButton></FollowButton>
        </div>

        <div class="row flex justify-center">
          <q-btn
            style="width: 85vw; max-width: 300px"
            class="col-12 q-mt-sm"
            label="Volver a Inicio"
            flat
            color="primary"
            to="/home"
          />
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { ref } from "vue";
import FollowButton from "components/FollowButton.vue";

export default {
  data() {
    return {
      //birthday---
      day: "",
      month: "",
      year: "",
      todayYear: new Date().getFullYear(),
      //----
      confirm: true, //keeps the dialog open
      code: "",
      slide: ref(1),
      email: "",
      age: "",
      name: "",
      codeCheck: false,
      message: false,
      formCheck: false,
      time: false,
      //token from postmail ---------------------------------------------
      token: "xrvrvzbjpf2enz4oif3usbzw",
      //----------------------------------------------------
      subject: "Petición de registro de: ",
      text: "¡Hola Marta! Me gustaría dar clases contigo y empezar a sentirme mejor. ¿Cuándo puedo empezar?",
    };
  },

  components: {
    login: require("components/Auth/AuthForm.vue").default,
    FollowButton,
  },

  computed: {
    ...mapGetters("adminController", ["getCode"]),
  },

  methods: {
    //Get age by birthday date.
    getAge() {
      let today = new Date();
      let age = today.getFullYear() - this.year;
      let m = (today.getMonth()+1) - this.month;
      if (m < 0 || (m === 0 && today.getDate() < this.day)) {
        age--;
      }
      this.age = age;
    },

    //To send by mail as subject name and email address
    sendSubject() {
      return this.subject + this.name + ", " + this.email;
    },

    //Send the form (send mail to the specified token). Set the button to load and wait 1 second.
    sendMessage(e) {
      e.target.submit();
      this.time = true;
      setTimeout(this.changeSlide, 1000); //A bug made it necessary to wait, not in the last update.
    },

    //Called in sendMessage. Change slide
    changeSlide() {
      this.message = true;
      this.slide = 6;
      this.time = false;
    },

    //Validate the code and change slide
    validateCode() {
      this.$refs.code.validate();

      if (this.code == this.getCode && !this.$refs.code.hasError) {
        this.slide = 5;
        this.codeCheck = true;
      }
    },
    //If the code has been previus marked as correct, close the dialog box. And go to the form
    confirmCode() {
      this.$refs.day.validate();
      this.$refs.month.validate();
      this.$refs.year.validate();

      if (
        !this.$refs.day.hasError &&
        !this.$refs.month.hasError &&
        !this.$refs.year.hasError
      ) {
        if (this.codeCheck) {
          this.getAge();
          this.confirm = false;
        }
      }
    },

    //Comprueba si el email tiene la estructura de un email válido
    isValidEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    //For slide 1. Check the email for errors.
    submitEmail() {
      this.$refs.email.validate();
      if (!this.$refs.email.hasError) this.slide = 2;
    },
  },
};
</script>

<style lang="scss" scoped>
h6 {
  font-size: $text18;
  margin: 10px;
  margin-bottom: 0px;
}

.infoText {
  font-size: $text18;
}

.q-btn {
  font-size: $text16;
}

.my-card {
  margin-top: 30px;
  margin-bottom: 30px;
}

.q-field {
  font-size: $text16;
}

:deep(.q-field__append) {
  font-size: 20px;
  padding: 0px;
}

@media (max-width: 599px) {
  .infoText {
    font-size: $text16;
  }
  .q-btn {
    font-size: $small14;
  }
}
</style>
