<template>
  <div id="q-app">
    <div class="row q-pa-md">
      <div class="col">
        <q-btn
          icon="change_circle"
          class="flex justify-center btn-change-table"
          label="Cambiar visualización"
          color="primary"
          @click="this.gridTable = !this.gridTable"
        />
      </div>
    </div>

    <div class="q-pa-md">
      <q-table
        class="userTable"
        @row-click="goTo"
        :grid="this.gridTable"
        grid-header
        :title="'Alumnas: ' + Object.keys(getUsersData).length"
        :filter="filter"
        :rows="getUsersData"
        :columns="this.columnsTable"
        row-key="name"
        hide-bottom
        virtual-scroll
        :rows-per-page-options="[0]"
      >
        <template v-slot:item="props">
          <q-card
            bordered
            class="q-ma-sm cardUser"
            v-bind:class="{
              cardUser: props.row.state,
              cardUserDelete: !props.row.state,
            }"
            @click="$router.push({ path: '/admin/student/' + props.row.id })"
          >
            <div class="q-ma-sm row">
              <div class="col-12 col-md-6 colImgUser">
                <div class="divImgUser">
                  <img id="myImg" class="imgUser" :src="props.row.url" />
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div>
                  <p class="info">Nombre:</p>
                  <p class="infoData flex justify-start">
                    {{ props.row.name }}
                  </p>
                </div>
                <div>
                  <p class="info">Edad:</p>
                  <p class="infoData">{{ props.row.age }}</p>
                </div>
                <div>
                  <p class="info">Email:</p>
                  <p class="infoData">{{ props.row.email }}</p>
                </div>
              </div>
            </div>
          </q-card>
        </template>

        <template v-slot:top-right>
          <q-input
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar alumnas"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ref } from "vue";

export default {
  data() {
    return {
      gridTable: true, //control the visualization type of the students table
      url: "#/admin/student?id=",
      filter: ref(""),
      images: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/martadeporte-52d1b.appspot.com/o/profileImages%2Fprofile.jpg?alt=media&token=15b7d7ee-d559-4560-8364-27d0a8ef88e7",
        },
      ],
      columnsGrid: [
        {
          name: "age",
          align: "left",
          label: "Edad",
          field: (row) => row.age,
          sortable: true,
        },
        {
          name: "state",
          align: "left",
          label: "Estado",
          field: (row) => row.state,
          sortable: true,
        },
        {
          name: "name",
          field: (row) => row.name,
          sortable: false,
        },
        {
          name: "email",
          field: (row) => row.email,
          sortable: false,
        },
      ],
      columns: [
        {
          name: "name",
          align: "left",
          label: "Name",
          field: (row) => row.name,
          sortable: false,
        },
        {
          name: "email",
          align: "center",
          label: "Email",
          field: (row) => row.email,
          sortable: false,
        },
        {
          name: "age",
          align: "right",
          label: "Edad",
          field: (row) => row.age,
          sortable: true,
        },
        {
          name: "state",
          align: "center",
          label: "Estado",
          field: (row) => row.state,
          sortable: true,
        },
      ],
    };
  },

  mounted() {
    setTimeout(() => {
      if (this.getAllClassesData) {
        for (var i = 0; i < Object.keys(this.getAllClassesData).length; i++) {
          var obj = {
            id: Object.keys(this.getAllClassesData)[i],
            val: 0,
          };
          this.changeReadedMsg(obj);
        }
      }
    });
  },

  computed: {
    ...mapGetters("adminController", ["getUsersData"]),
    ...mapGetters("classController", ["getAllClassesData"]),

    //Show Gridcolums or normal colums depends of gridTable value
    columnsTable() {
      if (this.gridTable) return this.columnsGrid;
      return this.columns;
    },
    getUrl() {
      return this.url;
    },
  },
  methods: {
    ...mapActions("chatController", ["changeReadedMsg"]),
    //To access a student information
    goTo(event, row) {
      this.$router.push({ path: "/admin/student/" + row.id });
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.q-table__grid-content) {
  max-height: 60vh;
  overflow: auto;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
}

:deep(.q-placeholder) {
  font-size: $text20;
}

:deep(.q-table__title) {
  font-size: $text20;
  font-weight: 400;
}

:deep(th) {
  font-size: $text18;
  font-weight: 600;
  padding-top: 30px;
}

:deep(.cursor-pointer) {
  td {
    font-size: $text16;
  }
}

:deep(.cursor-pointer):hover {
  background-color: $secondary;
}

.btn-change-table {
  font-size: $text18;
}

.cardUser {
  min-width: 380px;
  border-radius: 20px;
  background-color: $primary;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.cardUserDelete {
  background-color: $negative;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  .info {
    color: $dark;
  }
  .infoData {
    background-color: $background-dark;
    color: $white !important;
  }
}

.cardUser:hover {
  border: 1px solid $tertiary;
  cursor: pointer;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.imgUser {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.divImgUser {
  width: 150px;
  height: 150px;
  display: inline-block;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.colImgUser {
  width: 170px;
  height: 150px;
}

p {
  margin: 0px;
  max-height: 25px;
  width: 190px;
  overflow: hidden;
}

.info {
  font-weight: 600;
  font-size: $small14;
  color: $white;
}

.infoData {
  background-color: $secondary;
  font-size: $text16;
  margin-bottom: 0px;
  padding-left: 5px;
  border-radius: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1023px) {
  .btn-change-table {
    font-size: $text16;
  }

  .cardUser {
    min-width: 10px;
    width: 190px;
  }

  .colImgUser {
    margin-bottom: 30px;
  }

  p {
    width: 170px;
  }

  .divImgUser {
    width: 170px;
    height: 170px;
  }

  :deep(.q-placeholder) {
    font-size: $text18;
  }

  :deep(.q-table__title) {
    font-size: $text18;
    font-weight: 400;
  }

  :deep(th) {
    font-size: $small14;
    font-weight: 600;
    padding-top: 30px;
  }

  :deep(.cursor-pointer) {
    td {
      font-size: $text16;
    }
  }
}
</style>
