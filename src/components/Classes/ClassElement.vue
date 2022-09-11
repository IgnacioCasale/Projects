<template>
  <a
    v-if="
      !this.getIdClassesActualUser.hasOwnProperty(ID) ||
      getRoute.path == '/userClasses' ||
      getRoute.path == '#/admin/classes'
    "
    class="card-a"
    v-bind:href="getHref + ID"
  >
    <q-card class="my-cardClassElement">
      <q-img :src="data.img">
        <div class="absolute-bottom text-h6 flex justify-center">
          {{ data.name }}
        </div>
      </q-img>

      <q-card-section>
        <p class="description">
          {{ data.text }}
        </p>
        <small> {{ data.time }}</small>
      </q-card-section>
    </q-card>
  </a>
</template>

<script>
import { mapGetters } from "vuex";
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      url: "#/class?id=",
      urlAdmin: "#/admin/class?id=",
    };
  },
  props: ["data", "ID"],
  computed: {
    ...mapGetters("classController", ["getIdClassesActualUser"]),
    getRoute() {
      return useRoute();
    },
    getHref() {
      if (this.getRoute.path == "/admin/classes") {
        return this.urlAdmin;
      }
      return this.url;
    },
  },
};
</script>

<style lang="sass" scoped>
a
  border-radius: 5%

.text-h6
  font-weight: 600
  padding: 12px
  letter-spacing: 2px

.my-cardClassElement
  border-radius: 5%
  width: 100%
  min-width: 340px
  max-width: 340px
  height: 100%
  max-height: 450px
  transition: all ease 0.2s
  background-color: $primary
  color: $secondary
  font-size: $text16
  font-weight: 600


.description
  height: 150px
  padding: 0px
  overflow: auto


.description::-webkit-scrollbar-track
    background-color: $primary !important

.card-a
  margin: 8px
  text-decoration: none
  color: black
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.24)
  .q-img
    transition: all ease 0.2s
    filter: grayscale(50%)
    object-fit: cover
    width: 100%
    height: 200px
  &:hover
    .q-img
      filter: grayscale(5%)
    .my-card
      transform: scale(1.05)
      z-index: 100

.description
  text-align: start

@media (max-width: 499px)
  .my-cardClassElement
    width: 100%
    min-width: 85vw
    max-width: 85vw
    height: 100%
    max-height: 450px
</style>
