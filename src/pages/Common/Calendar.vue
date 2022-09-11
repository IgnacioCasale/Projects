<template>
  <div class="q-pa-md">
    <div class="row" v-if="getRoute.path == '/admin/calendar'">
      <div class="col flex justify-center">
        <q-btn
          class="q-ma-sm btn-change-img"
          color="primary"
          label="Cambiar foto"
          @click="dialog = true"
        />
      </div>
    </div>
    <div class="row">
      <div class="col flex justify-center">
        <div class="divImg">
          <img :src="getCalendarUrl" alt="calendario" />
        </div>
      </div>
    </div>
    <q-dialog v-model="dialog" persistent>
      <q-card class="formClass">
        <q-card-section class="row items-center">
          <span class="q-ml-sm">
            <q-file
              class="input"
              filled
              bottom-slots
              v-model="imgCalendar"
              label="Subir foto"
              counter
              max-files="1"
              accept=".jpg, image/*"
              max-file-size=" 20971520"
            >
              <template v-slot:append>
                <q-icon name="create_new_folder" @click.stop />
              </template>

              <template v-slot:hint> Archivo (max 20MB) </template>
            </q-file>
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            @click="changeImg()"
            flat
            label="Cambiar"
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
      dialog: false,
      imgCalendar: "",
    };
  },
  computed: {
    ...mapGetters("adminController", ["getCalendarUrl"]),
    getRoute() {
      return useRoute();
    },
  },
  methods: {
    ...mapActions("adminController", ["changeCalendarImg"]),
    changeImg() {
      this.changeCalendarImg(this.imgCalendar);
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  margin-top: 30px;
  border: 2px solid $primary;
  width: 1000px;
}

.btn-change-img{
  font-size: 18px;
}

.divImg {
  padding: 10px;
  overflow: auto;
}

.formClass {
  min-width: 300px;
  .input {
    min-width: 250px;
    margin-bottom: 18px;
  }
}

@media (max-width: 599px) {
  img {
    width: 600px;
    margin-top: 10px;
  }

  .btn-change-img{
  font-size: 16px;
}
}
</style>
