<template>
  <div class="flex justify-center">
    <div
      unelevated
      :class="this.quasar.dark.isActive ? 'themeChoice' : 'themeChoice-active'"
      clickable
      @click="light"
    >
      <div
        class="light"
        :class="this.quasar.dark.isActive ? 'circle' : 'circle-active'"
      ></div>
      Tema Claro
    </div>
    <div
      unelevated
      clickable
      @click="dark"
      :class="this.quasar.dark.isActive ? 'themeChoice-active' : 'themeChoice'"
    >
      <div
        class="dark"
        :class="this.quasar.dark.isActive ? 'circle-active' : 'circle'"
      ></div>
      Tema Oscuro
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";

export default {
  data() {
    const $q = useQuasar();

    return {
      quasar: $q,
    };
  },

  methods: {
    //Change the theme of the application to dark. Upgrade local storage
    light() {
      this.quasar.dark.set(false);
      localStorage.setItem("theme", "false");
    },
    //Change the theme of the application to light. Upgrade local storage
    dark() {
      this.quasar.dark.set(true);
      localStorage.setItem("theme", "true");
    },
  },
};
</script>

<style lang="scss" scoped>
.circle {
  margin: auto;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: 2px solid $dark;
}

.circle-active {
  margin: auto;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: 3.5px solid $dark;
}

.light {
  background-color: $tertiary;
}

.dark {
  background-color: $background-dark;
}

.themeChoice {
  margin: 20px;
  font-weight: 400;
}

.themeChoice-active {
  margin: 20px;
  font-weight: 700;
}
</style>
