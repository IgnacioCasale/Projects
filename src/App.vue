<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { useQuasar } from "quasar";
import { changeFontSize } from "src/globalFunctions/general";

export default defineComponent({
  name: "App",

  methods: {
    ...mapActions("authController", ["handleAuthStateChange"]),
  },

  mounted() {
    //Controls login, (See AuthController in Actions.js)
    this.handleAuthStateChange();

    //to control the app theme ----------------------------------
    const $q = useQuasar();
    $q.dark.mode = false; // "auto", true, false
    $q.dark.set(true);

    //To know user preferences in the os.
    if (window.matchMedia && !localStorage.getItem("theme")) {
      // Check if the dark-mode Media-Query matches
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        //dark
        $q.dark.set(true);
        localStorage.setItem("theme", "true");
      } else {
        //light
        $q.dark.set(false);
        localStorage.setItem("theme", "false");
      }
    }

    //Check local storage to change the theme
    if (localStorage.getItem("theme")) {
      if (localStorage.getItem("theme") === "true") {
        $q.dark.set(true);
        localStorage.setItem("theme", "true");
      } else if (localStorage.getItem("theme") === "false") {
        $q.dark.set(false);
        localStorage.setItem("theme", "false");
      }
    }
    //-----------------------------------------------------------------

    //To control Font-size------------------------------------------------

    //When the component is mounted it gets from local storage the value
    if (localStorage.getItem("fontSize")) {
      if (localStorage.getItem("fontSize") === "M") {
        changeFontSize("M");
      } else if (localStorage.getItem("fontSize") === "L") {
        changeFontSize("L");
      } else if (localStorage.getItem("fontSize") === "XL") {
        changeFontSize("XL");
      }
    }
    //--------------------------------------------------

  },
});
</script>
