<template>
  <div>
    <q-layout view="hhh lpR ffr">
      <q-header reveal elevated>
        <q-toolbar>
          <q-toolbar-title class="logo"> Marta Hinojosa </q-toolbar-title>

          <q-btn
            v-if="!loggedIn"
            to="/login"
            flat
            class="absolute-left"
            icon-right="account_circle"
            label=""
          />

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
        show-if-above
        bordered
        class="sideBar"
      >
        <q-list>
          <ProfileImg :name="true"></ProfileImg>
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
          class="btn-logout self-end"
          icon-right="logout"
          label="Cerrar sesión"
        />

        <CloseButtonLayout
          @click="this.rightDrawerOpen = false"
        ></CloseButtonLayout>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>

      <q-tabs indicator-color="transparent" class="tabs flex justify-center">
        <a href="#/calendar">
          <q-tab
            :class="this.$route.path == '/calendar' ? 'linkActiveTabs' : 'link'"
            name="mails"
            icon="event"
            :label="this.$route.path == '/calendar' ? '' : 'calendario'"
          />
        </a>

        <a href="#/userClasses">
          <q-tab
            :class="
              this.$route.path == '/userClasses' ? 'linkActiveTabs' : 'link'
            "
            name="alarms"
            icon="school"
            :label="this.$route.path == '/userClasses' ? '' : 'Tus clases'"
          />
        </a>

        <a href="#/chats">
          <q-tab
            :class="this.$route.path == '/chats' ? 'linkActiveTabs' : 'link'"
            name="movies"
            icon="chat"
            :label="this.$route.path == '/chats' ? '' : 'Chat'"
          >
            <q-badge v-if="this.calculatePendingMsgs != 0" floating>{{
              this.calculatePendingMsgs.toString().substring(0, 2)
            }}</q-badge>
          </q-tab>
        </a>
      </q-tabs>
    </q-layout>
  </div>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { mapActions, mapGetters } from "vuex";

const linksList = [
  {
    title: "Tus clases",
    icon: "school",
    link: "#/userClasses",
  },
  {
    title: "Todas las clases",
    icon: "class",
    link: "#/allClasses",
  },
  {
    title: "Chats",
    icon: "chat",
    link: "#/chats",
  },
  {
    title: "Calendario",
    icon: "event",
    link: "#/calendar",
  },
  {
    title: "Ajustes",
    icon: "settings",
    link: "#/settings",
  },
];

import { defineComponent, ref } from "vue";
import { mapState } from "vuex";
import CloseButtonLayout from "components/CloseButtonLayout.vue";
import ProfileImg from "components/ProfileImg.vue";

export default defineComponent({
  name: "UserLayout",

  components: {
    EssentialLink,
    CloseButtonLayout,
    ProfileImg,
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

  mounted() {
    this.rightDrawerOpen = false;
  },

  computed: {
    ...mapState("authController", ["loggedIn"]),
    ...mapGetters("chatController", ["getChats", "getReadedMsgs"]),
    ...mapGetters("classController", ["getIdClassesActualUser"]),
    ...mapGetters("adminController", ["getCurrentUser"]),

    calculatePendingMsgs() {
      if (
        this.getChats != null &&
        this.getReadedMsgs[this.getCurrentUser] != null &&
        this.getCurrentUser != null
      ) {
        var allReadedMsgs = 0;
        var allMsgs = 0;

        let size = Object.keys(this.getReadedMsgs[this.getCurrentUser]).length;

        for (var i = 0; i < size; i++) {
          allReadedMsgs += Object.values(
            this.getReadedMsgs[this.getCurrentUser]
          )[i];
        }

        var keyClass = "";
        for (var i = 0; i < Object.keys(this.getChats).length; i++) {
          keyClass = Object.keys(this.getChats)[i];
          if (this.getIdClassesActualUser[keyClass]) {
            allMsgs += Object.keys(this.getChats[keyClass]).length;
          }
        }

        return allMsgs - allReadedMsgs;
      }
      return 0;
    },
  },

  methods: {
    ...mapActions("authController", ["logOutUser"]),
  },
});
</script>

<style lang="scss" scoped>
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

.tabs {
  position: fixed;
  max-width: 600px;
  width: 95%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: rgba($primary, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0px 2px 5px $dark;
  border-radius: 20px;
  margin: 10px;
  margin-left: 0px;
  overflow: hidden;

  .q-tab {
    width: 100%;
    color: $white;
    min-width: 110px;
  }

  :deep(.q-icon) {
    font-size: 25px;
    transition: all ease-in 0.1s;
  }

  :deep(.q-tab__label) {
    font-size: 16px;
    font-weight: 600;
  }
  a {
    text-decoration: none;
    width: 100%;
  }
}

:deep(.q-list) {
  .q-item {
    padding-bottom: 0px;
  }
}

.linkActiveTabs {
  height: 100%;
  padding: 20px !important;
  border-bottom: 2px solid $white;
  :deep(.q-icon) {
    font-size: 40px;
  }
}

.link {
  padding-top: 5px;
}

.q-badge {
  background-color: $negative !important;
  color: $dark;
  font-weight: 600;
  font-size: $small14;
  border: 3px solid $primary;
  min-width: 22px;
  padding: 4px;
  padding-right: 5px;
  padding-left: 5px;
}
</style>
