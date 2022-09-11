<template>
  <div class="q-pa-md">
    <div class="btnAddClass">
      <div class="col flex justify-center">
        <q-btn
          class="btn"
          @click="confirm = true"
          label="Añadir Nueva Clase"
          color="primary"
        />
      </div>
    </div>

    <div class="row classes">
      <div class="col flex justify-center">
        <classElement
          v-for="(data, key) in this.getAllClassesData"
          :key="key"
          :ID="key"
          :data="data"
        ></classElement>
      </div>
    </div>

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
            label="Crear"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { uid } from "quasar";

export default {
  data() {
    return {
      confirm: false, //control the dialog
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
    };
  },
  computed: {
    ...mapGetters("classController", ["getAllClassesData"]),
  },
  components: {
    classElement: require("components/Classes/ClassElement.vue").default,
  },
  methods: {
    ...mapActions("adminController", ["createNewClass", "uploadClassImg"]),
    ...mapActions("chatController", ["addNewChat"]),

    //create a new class
    confirmEdit() {
      var newID = uid();

      var newClass = {
        img: "https://firebasestorage.googleapis.com/v0/b/martadeporte-52d1b.appspot.com/o/classImages%2FIconGrid.svg?alt=media&token=b2077677-0cde-456a-8b1e-337742aa3087",
        directLink: this.classData.linkDClass,
        link: this.classData.linkClass,
        name: this.classData.nameClass,
        text: this.classData.textClass,
        time: this.classData.timeClass,
      };

      var objectAux = {
        id: newID,
        object: newClass,
      };

      var objectAux2 = {
        id: newID,
        file: this.classData.imgClass,
      };

      this.createNewClass(objectAux);

      if (this.classData.imgClass != "") this.uploadClassImg(objectAux2);

      var obj = {
        classID: newID,
        msg: "¡Nuevo grupo para la clase de " + newClass.name + "!",
      };
      this.addNewChat(obj);
    },
  },
};
</script>

<style lang="scss" scoped>
.btnAddClass {
  position: fixed;
  z-index: 999;
  background-color: $secondary;
  align-items: flex-end;
  justify-content: flex-end;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 70px;
  box-shadow: 0px 0px 10px gray;
  display: flex;
  .btn {
    margin-bottom: 10px;
    font-size: 18px;
  }
}

.classes {
  margin-bottom: 80px;
}

.formClass {
  min-width: 400px;
  .input {
    min-width: 400px;
    margin-bottom: 18px;
  }
}

@media (max-width: 499px) {
  .formClass {
    min-width: 300px;
    .input {
      min-width: 250px;
      margin-bottom: 18px;
    }
  }

  .btnAddClass {
    height: 60px;

    .btn {
      font-size: 16px;
    }
  }
}
</style>
