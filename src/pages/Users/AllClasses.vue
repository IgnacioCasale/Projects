<template>
  <div class="q-pa-md q-mb-xl q-pb-xl">
    <div class="row">
      <div class="col flex justify-center">
        <h6>Todas las Clases</h6>
      </div>
    </div>
    <div class="row">
      <div class="col flex justify-center">
        <div
          v-if="
            Object.keys(getAllClassesData).length ==
            Object.keys(getIdClassesActualUser).length
          "
        >
          <p>Ya te has apuntado a todas las clase</p>
          <q-btn
            class="flex justify-center"
            to="/userClasses"
            label="Ir a mis clases"
            color="primary"
          />
        </div>
        <classElement
          v-for="(data, key) in getAllClassesData"
          :key="key"
          :ID="key"
          :data="data"
        ></classElement>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("classController", [
      "getAllClassesData",
      "getIdClassesActualUser",
    ]),
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
