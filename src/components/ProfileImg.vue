<template>
  <div>
    <div class="info-profile reverse" :class="name ? 'row' : ''">
      <h6 v-if="getUsersData[0] && name" class="col-8">
        {{ getUsersData[0].name }}
      </h6>
      <div :class="name ? 'col-4' : ''">
        <q-img
          v-if="getUsersData[0]"
          class="image--cover"
          :src="getUsersData[0].url"
        >
          <div v-if="name" @click="dialog = true" class="divImg">
            <p>Editar</p>
          </div>
        </q-img>
      </div>
    </div>

    <div v-if="!name" class="flex items-center">
      <q-btn
        class="col-12 col-md-2 q-mt-sm"
        color="primary"
        label="Cambiar Imagen"
        @click="dialog = true"
      />
    </div>

    <q-dialog
      v-model="dialog"
      persistent
      v-bind:class="{ showDialog: dialog, noDialog: !dialog }"
    >
      <q-card>
        <q-card-section class="row flex justify-center items-center">
          <q-file
            class="inputFile"
            filled
            bottom-slots
            v-model="model"
            label="Subir foto"
            counter
            max-files="1"
            accept=".jpg, image/*"
            max-file-size="6291456"
            @rejected="onRejected"
          >
            <template v-slot:append>
              <q-icon name="create_new_folder" @click.stop />
            </template>

            <template v-slot:hint> Archivo (max 6MB) </template>
          </q-file>
        </q-card-section>

        <q-card-actions align="center">
          <div class="divBtn">
            <div @click="dialog = false" class="flex justify-center">
              <q-btn
                @click="uploadFile()"
                label="Cambiar foto de perfil"
                color="primary"
                v-close-popup
                class="q-mb-sm q-mr-sm"
              />
              <q-btn flat label="Cancelar" color="primary" v-close-popup />
            </div>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      model: false,
      onRejected(rejectedEntries) {
        $q.notify({
          type: "negative",
          message: `El archivo no es una imagen o es demasiado grande`,
        });
      },
    };
  },

  props: ["name"],

  computed: {
    ...mapGetters("adminController", ["getUsersData"]),
  },

  methods: {
    ...mapActions("adminController", ["changeImgUser"]),
    openFormImg() {
      this.dialog = false;
    },
    uploadFile() {
      this.changeImgUser(this.model);
    },
  },
};
</script>

<style lang="scss" scoped>
.image--cover {
  margin: auto;
  width: 85px;
  height: 85px;
  border-radius: 50%;
}

img {
  object-fit: cover;
}

.divBtn {
  z-index: 2;
}

.divImg {
  width: 200px;
  height: 200px;
  z-index: 1;
  opacity: 0%;
  transition: all ease 0.2s;
  cursor: pointer;
  p {
    position: relative;
    top: 13px;
    left: 7px;
    font-weight: 600;
    font-size: 16px;
  }
}

.divImg:hover {
  opacity: 100%;
}

h6 {
  margin-top: 10px;
  margin-bottom: 0px;
  display: inline;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: $text16;
  padding-left: 10px;
  line-height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 90px;
}

.info-profile {
  margin: 20px;
}

.showDialog {
  display: inline-block;
}

.noDialog {
  display: none;
}

.inputFile {
  min-width: 200px;
}

.q-btn {
  font-size: $small14;
}

@media (max-width: 1023px) {
  .divImg {
    height: 50px;
    z-index: 1;
    opacity: 100%;
    transition: all ease 0.2s;
    top: 50px;
    cursor: pointer;
    p {
      position: relative;
      top: -12px;
      left: 7px;
      font-weight: 600;
    }
  }
}
</style>
