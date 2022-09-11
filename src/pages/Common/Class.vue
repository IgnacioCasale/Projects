<template>
  <div>
    <div class="row">
      <div class="col">
        <q-btn
          v-if="
            !this.getIdClassesActualUser.hasOwnProperty(this.id) &&
            getRoute.path != '/admin/class'
          "
          class="q-ma-lg btnBack"
          color="primary"
          label="Volver"
          to="/allClasses"
          icon="arrow_back"
        />
        <q-btn
          v-if="
            this.getIdClassesActualUser.hasOwnProperty(this.id) &&
            getRoute.path != '/admin/class'
          "
          class="q-ma-lg btnBack"
          color="primary"
          label="Volver"
          to="/userClasses"
          icon="arrow_back"
        />
        <q-btn
          v-if="getRoute.path == '/admin/class'"
          class="q-ma-lg btnBack"
          color="primary"
          label="Volver"
          to="/admin/classes"
          icon="arrow_back"
        />
      </div>
    </div>

    <div class="q-mb-xl justify-center row">
      <q-card class="card col-12 col-md-6">
        <div class="row">
          <q-img class="imgClass" :src="getImg">
            <div
              class="col title absolute-bottom text-h6 flex text-center justify-center"
            >
              {{ getClass.name }}
            </div>
          </q-img>
        </div>

        <div
          v-if="
            getRoute.path == '/admin/class' ||
            this.getIdClassesActualUser.hasOwnProperty(this.id)
          "
          class="row"
        >
          <div class="col-12 flex justify-center">
            <p class="timeClass text-center q-pa-sm">
              Clases en directo: {{ getClass.time }}
            </p>
          </div>
          <a
            :href="getClass.directLink"
            target="_blank"
            class="col-12 linkDirect flex justify-center"
            >Acceder a la clase</a
          >
        </div>

        <div class="row">
          <b class="col text flex justify-center">{{ getClass.text }}</b>
        </div>

        <div
          v-if="
            getRoute.path == '/admin/class' ||
            this.getIdClassesActualUser.hasOwnProperty(this.id)
          "
          class="row"
        >
          <p class="col textLink flex justify-center">
            Enlace a clase grabada:
          </p>
        </div>

        <div
          v-if="
            getRoute.path == '/admin/class' ||
            this.getIdClassesActualUser.hasOwnProperty(this.id)
          "
          class="row"
        >
          <a
            :href="getClass.link"
            target="_blank"
            class="col link flex justify-center"
            >Acceder a la clase</a
          >
        </div>

        <div class="row" v-if="getRoute.path != '/admin/class'">
          <div class="col-12 flex justify-center">
            <q-btn
              v-if="!this.getIdClassesActualUser.hasOwnProperty(this.id)"
              @click="this.addClass"
              class="q-ma-lg text-black"
              color="secondary"
              label="Apuntarse"
              to="/allClasses"
            />
            <q-btn
              v-else
              @click="this.deleteClassData"
              class="q-ma-lg btnCancel"
              label="Desapuntarse"
              to="/userClasses"
            />
          </div>
        </div>
      </q-card>
    </div>

    <div class="row" v-if="getRoute.path == '/admin/class'">
      <div class="col-12 flex justify-center">
        <q-btn
          @click="editClass"
          class="q-mt-sm q-mr-sm q-ml-sm q-mb-lg"
          color="primary"
          label="Editar clase"
        />
        <q-btn
          @click="this.delete = true"
          class="q-mt-sm q-mr-sm q-ml-sm q-mb-lg btnCancel"
          label="Borrar clase"
        />
      </div>
    </div>

    <q-dialog v-model="this.delete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"
            >¿Deseas borrar esta clase de forma permanente?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            @click="removeClass()"
            flat
            label="Borrar"
            to="/admin/classes"
            class="btnCancel"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm" persistent>
      <q-card class="formClass">
        <q-card-section class="row items-center">
          <span class="q-ml-sm">
            <q-file
              class="input"
              filled
              bottom-slots
              v-model="classData.imgClass"
              label="Subir foto"
              counter
              max-files="1"
              accept=".jpg, image/*"
              max-file-size=" 20971520"
              @rejected="onRejected"
            >
              <template v-slot:append>
                <q-icon name="create_new_folder" @click.stop />
              </template>

              <template v-slot:hint> Archivo (max 20MB) </template>
            </q-file>
            <q-input
              class="input"
              filled
              v-model="classData.nameClass"
              label="Nombre de la clase"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escribe algo',
              ]"
            />
            <q-input
              class="input"
              filled
              v-model="classData.timeClass"
              label="Horario"
              hint="Ejemplo: Martes y Jueves a las 19:00 pm"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escribe algo',
              ]"
            />
            <q-input
              class="input"
              type="textarea"
              filled
              v-model="classData.textClass"
              label="Descripción de la clase"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escribe algo',
              ]"
            />
            <q-input
              class="input"
              filled
              type="url"
              v-model="classData.linkDClass"
              label="Enlace en directo"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escribe algo',
              ]"
            />
            <q-input
              class="input"
              filled
              type="url"
              v-model="classData.linkClass"
              label="Enlace clase grabada"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escribe algo',
              ]"
            />
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            @click="confirmEdit()"
            flat
            label="Editar"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      delete: false, //to control the confirmation dialog to delete a class
      confirm: false, //to display the form dialog
      classData: {
        imgClass: "",
        nameClass: "",
        textClass: "",
        linkDClass: "",
        linkClass: "",
        timeClass: "",
      },

      onRejected(rejectedEntries) {
        $q.notify({
          type: "negative",
          message: `El archivo no es una imagen o es demasiado grande`,
        });
      },

      id: this.$route.query.id,
    };
  },

  computed: {
    ...mapGetters("classController", [
      "getAllClassesData",
      "getIdClassesActualUser",
    ]),
    ...mapGetters("chatController", ["getReadedMsgs"]),
    ...mapGetters("adminController", ["getCurrentUser"]),

    //obtains a class data
    getClass() {
      if (this.getAllClassesData != null) {
        if (Object.keys(this.getAllClassesData).length !== 0) {
          return this.getAllClassesData[this.id];
        }
      }
      return "error";
    },

    getRoute() {
      return useRoute();
    },
    getImg() {
      if (this.getAllClassesData[this.id] != null) {
        return this.getClass.img;
      }
      return "../assets/IconGrid.svg";
    },
  },
  methods: {
    ...mapActions("classController", ["addClassToUser", "removeClassToUser"]),
    ...mapActions("adminController", [
      "updateClass",
      "deleteClass",
      "uploadClassImg",
    ]),

    ...mapActions("chatController", [
      "changeReadedMsg",
      "deleteReadedMsg",
      "removeChat",
    ]),

    //gets the current data of the class to display it in the edit forms and keep the data unchanged by the administrator
    editClass() {
      this.confirm = true;
      this.classData.linkDClass = this.getAllClassesData[this.id].directLink;
      this.classData.imgClass = "";
      this.classData.nameClass = this.getAllClassesData[this.id].name;
      this.classData.textClass = this.getAllClassesData[this.id].text;
      this.classData.linkClass = this.getAllClassesData[this.id].link;
      this.classData.timeClass = this.getAllClassesData[this.id].time;
    },

    //confirm and edit a class
    confirmEdit() {
      var objectAux = {
        img: this.classData.imgClass,
        directLink: this.classData.linkDClass,
        link: this.classData.linkClass,
        name: this.classData.nameClass,
        text: this.classData.textClass,
        time: this.classData.timeClass,
        id: this.id,
      };

      var objectAux2 = {
        id: this.id,
        file: this.classData.imgClass,
      };

      this.updateClass(objectAux);
      if (this.classData.imgClass != "") this.uploadClassImg(objectAux2);
    },

    //add Class to User
    addClass() {
      var obj = {
        id: this.id,
        val: 0,
      };

      this.changeReadedMsg(obj);
      this.addClassToUser(this.id);
    },

    //delete Class to User
    deleteClassData() {
      this.deleteReadedMsg(this.id);
      this.removeClassToUser(this.id);
      var obj = {
        id: this.id,
        val: 0,
      };
      //this.changeReadedMsg(obj);
    },

    //delete a class
    removeClass() {
      setTimeout(() => {
        this.deleteClass(this.id);
        this.removeChat(this.id);
      }, 50);
    },
  },
};
</script>

<style lang="scss" scoped>
.btnBack {
  width: 100%;
  margin: 0px;
  font-size: $text16;
  position: fixed;
  bottom: 0;
  letter-spacing: 2px;
  padding-top: 10px;
  padding-bottom: 10px;
  z-index: 10;
  background: rgba($primary, 0.6) !important;
  backdrop-filter: blur(4px);
  font-weight: 600;
}

.card {
  padding: 0px;
  overflow: hidden;
  background-color: $primary;
  color: $secondary;
  margin-top: 0px;
  margin-bottom: 25px;
}

.imgClass {
  max-height: 35vh;
  width: 100%;
  object-fit: cover;
  font-family: "Bebas Neue";
}

.title {
  font-size: $tittle32;
}

.timeClass {
  font-size: $tittle24;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 0px;
}

.text {
  margin: 10px;
  margin-left: 20px;
  margin-right: 20px;
}

.linkDirect {
  font-size: $text20;
  color: $tertiary;
  font-weight: 600;
  margin-bottom: 20px;
}

.textLink {
  margin-top: 20px;
  font-size: $text20;
  margin-bottom: 0px;
}

.link {
  color: $tertiary;
  font-weight: 600;
  font-size: $text16;
  margin-bottom: 20px;
}

.formClass {
  min-width: 400px;
  .input {
    min-width: 400px;
    margin-bottom: 18px;
  }
}

.btnCancel {
  background-color: $negative;
  color: $dark;
  letter-spacing: 1px;
  font-weight: 600;
}

@media (max-width: 499px) {
  .timeClass {
    font-size: $text18;
  }

  .text {
    font-size: $text16;
  }

  .linkDirect {
    font-size: $text16;
  }

  .textLink {
    font-size: $text16;
  }

  .link {
    font-size: $text16;
  }

  .formClass {
    min-width: 300px;
    .input {
      min-width: 250px;
      margin-bottom: 18px;
    }
  }
}
</style>
