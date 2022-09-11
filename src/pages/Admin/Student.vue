<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col">
        <q-btn
          class="q-mb-lg"
          color="primary"
          label="Volver"
          to="/admin/students"
        />
      </div>
    </div>
    <div class="row flex justify-center">
      <q-card
        flat
        bordered
        class="col-12"
        v-bind:class="{
          'my-card': this.getUsersData[this.getUser()].state,
          'my-card-delete': !this.getUsersData[this.getUser()].state,
        }"
      >
        <q-card-section>
          <div class="text-h6 tittle">
            {{ this.getUsersData[this.getUser()].name }}
          </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="flex justify-center items-start">
          <div class="row q-mb-lg imgDiv">
            <img
              class="imgProfile"
              :src="this.getUsersData[this.getUser()].url"
              alt="Perfil"
            />
          </div>

          <div class="row q-pl-sm flex justify-center dataUser">
            <div class="col-12">
              <p>Edad</p>
              {{ this.getUsersData[this.getUser()].age }}
            </div>
            <q-separator />

            <div class="col-12">
              <p>Fecha de Nacimiento</p>
              {{ this.getUsersData[this.getUser()].birthday }}
            </div>
            <q-separator />

            <div class="col-12">
              <p>Email</p>
              {{ this.getUsersData[this.getUser()].email }}
            </div>
            <q-separator />

            <div class="col-12">
              <p @click="getDataUserClasses">
                Apuntada en
                {{ Object.keys(this.getUserClasses()).length }} clases:
              </p>
              <div v-if="Object.keys(this.getUserClasses()).length > 0">
                <small
                  class="classesName flex justify-start"
                  v-for="(data, key) in classesDataAux"
                  :key="key"
                >
                  - {{ data }}
                </small>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="row">
      <div class="col-12 flex justify-center q-mt-md">
        <q-btn
          v-if="this.getUsersData[this.getUser()].state == true"
          label="Desactivar alumna"
          class="btnCancel"
          @click="this.delete = true"
        />
        <q-btn
          v-else
          label="Activar alumna"
          color="primary"
          to="/admin/students"
          @click="activeS"
        />
      </div>
    </div>

    <q-dialog v-model="this.delete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"
            >¿Deseas desactivar a esta alumna? No podrá acceder a tus clases
            hasta que vuelvas a activarla.</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            @click="deleteS"
            flat
            class="btnCancel"
            label="Desactivar"
            to="/admin/students"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { useQuasar } from "quasar";

export default {
  data() {
    const $q = useQuasar();

    return {
      delete: false, //Control delete dialog
      id: this.$route.params.id,
      index: "",
      users: this.getUsersData,
      classesData: "", //To check that the method getDataUserClasses is only performed once (needed before, maybe not anymore)
      classesDataAux: [], //Aux object of classes

      notifyNegative() {
        $q.notify({
          type: "negative",
          message: `Alumna desactivada.`,
        });
      },
      notifyPositive() {
        $q.notify({
          type: "positive",
          message: `Alumna activada.`,
        });
      },
    };
  },
  computed: {
    ...mapGetters("adminController", ["getUsersData"]),
    ...mapGetters("classController", ["getIdClassesXuser"]),
    ...mapGetters("classController", ["getAllClassesData"]),
  },

  mounted() {
    this.getDataUserClasses();
  },

  methods: {
    ...mapActions("adminController", ["blockStudent", "activeStudent"]),

    //Gets the index in getUserData that corresponds to the id of the user
    getUser() {
      if (this.index == "") {
        for (var i = 0; i < Object.keys(this.getUsersData).length; i++) {
          if (this.getUsersData[i].id == this.id) {
            this.index = i;
            return i;
          }
        }
      } else {
        return this.index;
      }
      return "";
    },
    //gets the classes that the user has
    getUserClasses() {
      if (this.getIdClassesXuser[this.id] == null) {
        return {};
      }
      return this.getIdClassesXuser[this.id];
    },
    //obtains the user's class information
    getDataUserClasses() {
      var userID = this.id;

      if (Object.keys(this.getUserClasses()).length > 0) {
        var classesUser = Object.keys(this.getIdClassesXuser[userID]);
        var allClassesDataID = Object.keys(this.getAllClassesData);

        if (this.classesData == "") {
          for (var i = 0; i < classesUser.length; i++) {
            for (var j = 0; j < allClassesDataID.length; j++) {
              if (classesUser[i] == allClassesDataID[j]) {
                var objectAux = this.getAllClassesData[allClassesDataID[j]];
                this.classesDataAux.push(objectAux.name);
              }
            }
          }
          this.classesData = this.classesDataAux;
        }
        return this.classesData;
      }
    },

    //blocks the student
    deleteS() {
      this.notifyNegative();
      this.blockStudent(this.id);
    },

    //unblocks the student
    activeS() {
      this.notifyPositive();
      this.activeStudent(this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 500px;
  background-color: $primary;
  color: $secondary;
}

.my-card-delete {
  width: 100%;
  max-width: 500px;
  background-color: $negative;
  color: $dark;
  font-weight: 600;
  .dataUser {
    p {
      border-bottom: 2px solid $dark;
    }
  }
  .imgProfile {
    border: 2px solid $dark;
  }
}

.classesName {
  margin: 0px;
}

.imgDiv {
  width: 200px;
  height: 200px;
  overflow: hidden;
}

.imgProfile {
  border-radius: 5px;
  width: 100%;
  object-fit: cover;
  padding: 5px;
  border: 2px solid $white;
}

.dataUser {
  p {
    border-bottom: 2px solid $white;
    margin-bottom: 2px;
    margin-top: 10px;
  }
}

small {
  font-size: $text16;
}

.tittle {
  text-transform: uppercase;
}

.btnCancel {
  background-color: $negative;
  color: $dark;
  letter-spacing: 1px;
  font-weight: 600;
}
</style>
