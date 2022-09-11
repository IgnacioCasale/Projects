<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col flex justify-center">
        <h6>Código de registro</h6>
      </div>
    </div>
    <div class="row">
      <div class="col flex justify-center">
        <p>
          Entrega el siguiente código de registro a aquellos usuarios que
          quieras que se registren. Puedes cambiar el código cuando desees para
          evitar que se comparta.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col flex justify-center q-mt-xl">
        <h6>{{ getCode }}</h6>
        <q-btn
          @click="copyText()"
          class="q-ml-md icon"
          label=""
          color="primary"
          icon="content_copy"
        />
      </div>
    </div>
    <div class="row">
      <div class="col flex justify-center q-mt-md">
        <q-btn
          @click="generateRandomCode()"
          label="Generar nuevo código"
          color="primary"
          class="btn-change-code"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from "quasar";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      code: "",
    };
  },
  mounted() {
    this.code = this.getCode;
  },
  computed: {
    ...mapGetters("adminController", ["getCode"]),
  },
  methods: {
    ...mapActions("adminController", ["changeCode"]),

    //Generate a random code
    generateRandomCode() {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result1 = "";
      const num = 6;
      const charactersLength = characters.length;
      for (let i = 0; i < num; i++) {
        result1 += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      this.code = result1;
      this.changeCode(result1);
    },

    //Copy the code to de clipboard
    copyText() {
      copyToClipboard(this.code)
        .then(() => {
          // success!
        })
        .catch(() => {
          // fail
        });
    },
  },
};
</script>

<style lang="scss" scoped>
h6 {
  margin: 10px;
  font-size: 30px;
  color: $primary;
  text-transform: uppercase;
  font-family: "Bebas Neue";
}

.btn-change-code {
  font-size: 18px;
}

p {
  font-size: 16px;
  text-align: justify;
  margin-top: 10px;
}

.icon {
  font-size: 10px;
  padding: 8px;
  margin-top: 5px;
  max-height: 35px;
}

@media (max-width: 599px) {
  .btn-change-code {
    font-size: 16px;
  }
}
</style>
