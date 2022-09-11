<template>
  <q-layout view="hhh lpR ffr">
    <q-header reveal elevated>
      <q-toolbar>
        <q-toolbar-title class="logo"> Marta Hinojosa </q-toolbar-title>

        <div class="flex">
          <q-btn
            class="absolute-right btn-account"
            v-if="!loggedIn"
            to="/login"
            flat
            icon-right="account_circle"
            label=""
          />

          <q-btn
            class="absolute-right q-pr-md material-icons-round"
            flat
            icon="menu"
            aria-label="Menu"
            @click="toggleRightDrawer"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      elevated
      class="sideBar"
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          @click="this.rightDrawerOpen = false"
        />
      </q-list>

      <q-btn
        v-if="loggedIn"
        @click="logOutUser"
        to="/home"
        unelevated
        class="btn-logout self-start"
        icon-right="logout"
        label="Cerrar sesión"
      />

      <ThemeSettings />
      <FontSettings class="fontSettings" />
      <CloseButtonLayout
        @click="this.rightDrawerOpen = false"
      />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import ThemeSettings from "components/ThemeSettings.vue";
import FontSettings from "components/FontSettings.vue";
import CloseButtonLayout from "components/CloseButtonLayout.vue";

const linksList = [
  {
    title: "Inicio",
    icon: "home",
    link: "#section1",
  },
  {
    title: "Sobre mí",
    icon: "girl",
    link: "#section2",
  },
  {
    title: "Clases",
    icon: "fitness_center",
    link: "#section3",
  },
  {
    title: "Iniciar sesión",
    icon: "account_circle",
    link: "#/login",
  },
];

import { defineComponent, ref } from "vue";
import { mapState, mapActions } from "vuex";

export default defineComponent({
  name: "HomeLayout",

  components: {
    EssentialLink,
    ThemeSettings,
    FontSettings,
    CloseButtonLayout,
  },

  data() {
    const rightDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },

  computed: {
    ...mapState("authController", ["loggedIn"]),
  },

  methods: {
    ...mapActions("authController", ["logOutUser"]),
  },
});
</script>

<style lang="scss" scoped>
.fontSettings {
  margin-bottom: 150px;
}

.btn-account {
  right: 60px;
}

img {
  object-fit: cover;
}

h6 {
  margin-top: 10px;
  display: inline;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: $small14;
  padding-left: 10px;
}

.info-profile {
  margin: 20px;
}

.q-header {
  background-color: $primary;
  color: $secondary;
  font-family: "GlacialR";
}

.logo {
  font-family: "Bebas Neue";
  font-size: $tittle32;
}

.btn-logout {
  display: block;
  border-radius: 0px;
  padding: 13px;
  color: $red;
  font-weight: 600;
  letter-spacing: 2px;
  font-size: $small14;
}

.btn-logout:hover {
  background-color: $negative;
  color: $white;
  font-weight: 600;
}

.q-header {
  background: rgba($primary, 0.7);
  backdrop-filter: blur(2px);
  color: $white;
}
@media (max-width: 599px) {
  .logo {
    font-size: $tittle24;
  }
}
</style>
