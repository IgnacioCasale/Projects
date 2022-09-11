<template>
  <form @submit.prevent="submitForm" class="formAuth">
    <div class="row flex justify-center text-center">
      <h3 class="title col">{{ title }}</h3>
    </div>
    <div class="row q-mb-lg" v-if="signUp">
      <q-input
        v-model="formData.name"
        class="col"
        placeholder="Nombre Completo"
        type="text"
        lazy-rules
        ref="name"
        :rules="[(val) => val.length > 0 || 'Introduce un nombre']"
      >
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
    </div>
    <div class="row q-mb-lg" v-if="signUp">
      <div class="row q-mt-lg birthdayInput">
        <div class="col-4 flex justify-start">
          <div>
            <p>Día</p>
            <q-input
              v-model="formData.day"
              type="number"
              filled
              style="max-width: 85px; min-width: 40px; heigth: 20px"
              lazy-rules
              ref="day"
              class="q-mr-xs"
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
              v-model="formData.month"
              type="number"
              filled
              style="max-width: 85px; min-width: 40px"
              lazy-rules
              ref="month"
              class="q-mr-xs"
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
              v-model="formData.year"
              type="number"
              filled
              style="max-width: 170px; min-width: 80px"
              lazy-rules
              ref="year"
              class="q-mr-xs"
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
    <div class="row q-mb-md">
      <q-input
        v-model="formData.email"
        class="col"
        placeholder="Email"
        type="email"
        lazy-rules
        ref="email"
        :rules="[(val) => isValidEmail(val) || 'Introduce un email válido.']"
      >
        <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
      </q-input>
    </div>
    <div class="row q-mb-lg">
      <q-input
        v-model="formData.password"
        class="col"
        placeholder="Contraseña"
        type="password"
        lazy-rules
        ref="password"
        :rules="[
          (val) =>
            val.length >= 6 ||
            'Necesario mínimo 6 carácteres.',
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
      </q-input>
    </div>
    <div class="row q-mb-lg" v-if="signUp">
      <q-input
        v-model="formData.password2"
        class="col"
        placeholder="Vuelve a escribir la contraseña"
        type="password"
        lazy-rules
        ref="password2"
        :rules="[
          (val) =>
            formData.password == formData.password2 ||
            'Las contraseñas no coinciden',
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
      </q-input>
    </div>
    <div class="row q-mb-md">
      <q-btn class="col q-mt-sm" color="primary" :label="title" type="submit" />
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["title", "signUp", "emailDialog", "nameDialog", "ageDialog", "dayDialog", "monthDialog", "yearDialog"],

  data() {
    return {
      todayYear: new Date().getFullYear(),

      formData: {
        day: this.dayDialog,
        month: this.monthDialog,
        year: this.yearDialog,
        name: this.nameDialog,
        email: this.emailDialog,
        password: "",
        password2: "",
        age: this.ageDialog,
      },
    };
  },

  methods: {
    ...mapActions("authController", ["logInUser", "signUpUser"]),

    //Check if the email has a valid email structure
    isValidEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    //Validates the form and calls the loginUser action of the authController module (storeauthController) to log in.
    submitForm() {
      //Log In
      if (this.$refs) {
        this.$refs.email.validate();
        this.$refs.password.validate();
        if (
          !this.$refs.email.hasError &&
          !this.$refs.password.hasError &&
          !this.signUp
        ) {
          this.logInUser(this.formData);
        }
        //Sign Up
        if (this.signUp) {
          this.$refs.password2.validate();
          this.$refs.day.validate();
          this.$refs.month.validate();
          this.$refs.year.validate();
          this.$refs.name.validate();

          if (
            !this.$refs.email.hasError &&
            !this.$refs.password.hasError &&
            !this.$refs.password2.hasError &&
            !this.$refs.day.hasError &&
            !this.$refs.month.hasError &&
            !this.$refs.year.hasError &&
            !this.$refs.name.hasError &&
            this.signUp
          ) {
            this.signUpUser(this.formData);
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.formAuth {
  min-width: 400px;
}

.title {
  text-transform: uppercase;
  letter-spacing: 6px;
  margin-top: 30px;
  font-weight: 600;
  color: $primary;
}

.q-field {
  font-size: $text16;
}

.q-btn {
  font-size: $small14;
}

.row {
  margin-bottom: 4px;
  margin-top: 0px;
}

.birthdayInput {
  p {
    margin-bottom: 0px;
  }
  :deep(.q-field__control) {
    height: 40px;
  }
  :deep(.q-field__append) {
    font-size: 0px;
    padding: 0px;
    height: 40px;
  }
}

@media (max-width: 499px) {
  .formAuth {
    min-width: 80vw;
    max-width: 400px;
    .title {
      font-size: 32px;
      text-align: center;
    }
  }
  :deep(.q-field__append) {
    font-size: 15px !important;
  }
}
</style>
