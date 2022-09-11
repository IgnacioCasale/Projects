<template>
  <div class="q-pa-md q-mb-xl q-pb-xl">
    <q-tabs
      v-model="tab"
      class="text-dark"
      active-color="dark"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      inline-label
    >
      <q-tab name="cuenta" icon="account_circle" label="Cuenta" />
      <q-tab name="general" icon="settings" label="General" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated class="bg-transparent settingsPanel">
      <q-tab-panel name="cuenta">
        <div class="q-mb-xl row flex justify-center">
          <div>
            <div class="text-h6">Imagen de perfil</div>
            <p>Los demás usuarios te verán así</p>

            <ProfileImg
              class="col-12 col-md-2 flex justify-start"
              :name="false"
            ></ProfileImg>
          </div>
        </div>

        <div class="row flex justify-center">
          <div>
            <div class="text-h6">Nombre de perfil</div>
            <p>Los demás usuarios podrán ver tu nombre</p>

            <q-input
              v-if="getUsersData[0]"
              v-model="nameValue"
              filled
              style="max-width: 400px"
              :placeholder="getUsersData[0].name"
              type="text"
              lazy-rules
              ref="name"
              :rules="[(val) => val.length > 0 || 'Introduce un nombre']"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <div class="flex items-center">
              <q-btn
                class="col-12 col-md-2 q-mt-md"
                color="primary"
                label="Cambiar Nombre"
                @click="changeUserName(nameValue)"
              />
            </div>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="general">
        <div class="row">
          <div class="col-12 flex justify-center">
            <ThemeSettings></ThemeSettings>
          </div>
          <div class="col-12 flex justify-center">
            <FontSettings></FontSettings>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import ThemeSettings from "components/ThemeSettings.vue";
import FontSettings from "components/FontSettings.vue";
import ProfileImg from "components/ProfileImg.vue";
import { ref } from "vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      tab: ref("cuenta"),
      nameValue: "",
    };
  },

  computed: {
    ...mapGetters("adminController", ["getUsersData"]),
  },

  methods: {
    ...mapActions("adminController", ["changeUserName"]),
  },

  components: {
    ThemeSettings,
    FontSettings,
    ProfileImg,
  },
};
</script>

<style lang="scss" scoped>
:deep( .q-tab__label) {
  font-size: $text16;
}

.q-btn {
  font-size: $small14;
}

.q-input {
  font-size: $small14;
}

h6 {
  margin: 0px;
  margin-bottom: 20px;
  font-size: 30px;
  color: $primary;
  text-transform: uppercase;
  font-family: "Bebas Neue";
}
</style>
