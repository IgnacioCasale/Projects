<template>
  <q-layout view="hhh lpR ffr">
    <q-header fixed elevated>
      <q-toolbar>
        <q-toolbar-title class="logo"> Marta Hinojosa </q-toolbar-title>

        <q-btn
          class="absolute-right q-pr-md"
          flat
          icon="menu"
          aria-label="Menu"
          @click="toggleRightDrawer"
        />
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
        />
      </q-list>

      <q-btn
        v-if="loggedIn"
        @click="logOutUser"
        to="/home"
        unelevated
        class="btn-logout self-end"
        icon-right="logout"
        label="Cerrar sesión"
      />

      <ThemeSettings />
      <FontSettings class="fontSettings" />

      <CloseButtonLayout
        @click="this.rightDrawerOpen = false"
      ></CloseButtonLayout>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { defineComponent, ref } from "vue";
import { mapState, mapActions } from "vuex";
import CloseButtonLayout from "components/CloseButtonLayout.vue";
import ThemeSettings from "components/ThemeSettings.vue";
import FontSettings from "components/FontSettings.vue";

const linksList = [
  {
    title: "Alumnas",
    icon: "people",
    link: "#/admin/students",
  },
  {
    title: "Clases",
    icon: "class",
    link: "#/admin/classes",
  },
  {
    title: "Calendario",
    icon: "event",
    link: "#/admin/calendar",
  },
  {
    title: "Código de registro",
    icon: "pin",
    link: "#/admin/code",
  },
    {
    title: "Chats",
    icon: "chat",
    link: "#/admin/chats",
  },
];

export default defineComponent({
  name: "AdminLayout",

  components: {
    EssentialLink,
    CloseButtonLayout,
    ThemeSettings,
    FontSettings,
  },

  setup() {
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
.image--cover {
  margin: auto;
  width: 75px;
  height: 75px;
  border-radius: 50%;
}

img {
  object-fit: cover;
}

h6 {
  margin-top: 10px;
  display: inline;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 14px;
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
  font-size: 30px;
}

.btn-logout {
  display: block;
  border-radius: 0px;
  padding: 10px;
  color: $negative;
  font-weight: 600;
  background-color: $background-dark;
  letter-spacing: 2px;
  transition: all ease 0.2s;
  font-size: $small14;
}

.btn-logout:hover {
  color: $white;
  background-color: $negative;
  color: $dark;
}

.btn-close {
  display: block;
  letter-spacing: 3px;
  font-size: 14px;
  padding: 10px;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: underline;
  position: fixed;
  bottom: 0px;
}

.btn-close:hover {
  font-weight: 600;
}

@media (max-width: 599px) {
  .logo {
    font-size: 24px;
  }
}
</style>
