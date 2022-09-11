<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col flex justify-center">
        <h6>Tus Clases</h6>
      </div>
    </div>
    <div class="row">
      <div class="col flex justify-center q-mb-xl q-pb-xl">
        <div v-if="Object.keys(getIdClassesActualUser).length == 0">
          <p>Todavia no te has apuntado a ninguna clase</p>
          <q-btn
            class="flex justify-center"
            to="/allClasses"
            label="Apuntarse"
            color="primary"
          />
        </div>
        <classElement
          v-for="(data, key) in getIdClassesActualUser"
          :key="key"
          :ID="key"
          :data="data"
        ></classElement>
      </div>
    </div>
    <q-dialog v-model="account" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"
            >Actualmente tu cuenta está desactivada. Habla con Marta si deseas
            activarla.</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Volver al Home"
            color="primary"
            to="/home"
            @click="logOutUser"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("classController", ["getIdClassesActualUser"]),
    ...mapGetters("adminController", ["getUsersData"]),
    //see if the user is activated or deactivated
    account() {
      if (this.getUsersData[0]) {
        return !this.getUsersData[0].state;
      }
      return false;
    },
  },
  methods: {
    ...mapActions("authController", ["logOutUser"]),
  },
  components: {
    classElement: require("components/Classes/ClassElement.vue").default,
  },
};
</script>

<style lang="scss" scoped>
h6 {
  margin: 0px;
  margin-bottom: 20px;
  font-size: 30px;
  color: $primary;
  text-transform: uppercase;
  font-family: "Bebas Neue";
}
</style>
