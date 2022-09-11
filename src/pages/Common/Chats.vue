<template>
  <div class="divChats">
    <div v-for="(data, key) in getChats" :key="key" class="flex justify-center">
      <q-btn
        v-if="
          this.getIdClassesActualUser[key] ||
          this.getAdminID == this.getCurrentUser
        "
        :to="'/chat/' + key"
      >
        <q-avatar size="700px" class="col-2 image--cover">
          <img :src="this.getAllClassesData[key].img" />
        </q-avatar>
        <div class="col-8 divInfoChat">
          <p class="q-ml-md chatTittle flex text-start">
            Chat {{ this.getAllClassesData[key].name }}
          </p>

          <p v-if="getChats[key]" class="q-ml-md chatText flex text-start">
            <span
              v-if="
                this.getUsersData[0].id !=
                getChats[key][
                  Object.keys(getChats[key])[
                    Object.keys(getChats[key]).length - 1
                  ]
                ].id
              "
            >
              {{
                getChats[key][
                  Object.keys(getChats[key])[
                    Object.keys(getChats[key]).length - 1
                  ]
                ].name
              }}
            </span>
            <span v-else>Tú</span>
            :
            <span style="text-transform: none">
              {{
                getChats[key][
                  Object.keys(getChats[key])[
                    Object.keys(getChats[key]).length - 1
                  ]
                ].text
              }}
            </span>
          </p>
        </div>
        <div
          v-if="
            Object.keys(this.getChats[key]).length - this.getReadedMsgs[this.getCurrentUser][key] > 0
          "
          class="pendingMsg"
        >
          {{
            (
              Object.keys(this.getChats[key]).length -
              this.getReadedMsgs[this.getCurrentUser][key]
            )
              .toString()
              .substring(0, 2)
          }}
        </div>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters("chatController", ["getChats", "getReadedMsgs"]),
    ...mapGetters("classController", [
      "getAllClassesData",
      "getIdClassesActualUser",
    ]),
    ...mapGetters("adminController", [
      "getUsersData",
      "getAdminID",
      "getCurrentUser",
    ]),
  },
};
</script>

<style lang="scss" scoped>
:deep( .q-btn__content) {
  justify-content: flex-start;
  align-items: flex-start;
  white-space: nowrap !important;
}

.image--cover {
  margin-left: 10px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

img {
  object-fit: cover;
}

.chatTittle {
  font-size: $text18;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  text-align: start;
  font-weight: 600;
}

.chatText {
  font-size: $text16;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  text-align: start;
  width: 100%;
}

.q-btn {
  padding-top: 20px;
  padding-bottom: 10px;
  width: 100%;
  background-color: $primary;
  color: $white;
  border-radius: 0px;
  border-top: 1px solid $tertiary;
}

.divChats {
  border-top: 3px solid $primary;
  overflow: scroll;
}

.pendingMsg {
  background-color: $negative;
  border-radius: 40%;
  width: auto;
  min-width: 30px;
  padding: 3px;
  padding-right: 5px;
  padding-left: 5px;

  display: inline;
  margin-left: auto;
  color: $dark;
  font-weight: 600;
  font-size: $small14;
}

@media (max-width: 425px) {
  .q-btn {
    width: 425px;
  }
}

@media (max-width: 410px) {
  .q-btn {
    width: 410px;
  }
}

@media (max-width: 390px) {
  .q-btn {
    width: 390px;
  }
}

@media (max-width: 380px) {
  .q-btn {
    width: 380px;
  }
}

@media (max-width: 375px) {
  .q-btn {
    width: 375px;
  }
}

@media (max-width: 365px) {
  .q-btn {
    width: 365px;
  }
}

@media (max-width: 345px) {
  .q-btn {
    width: 320px;
  }
}

@media (max-width: 320px) {
  .q-btn {
    width: 320px;
  }
}

@media (max-width: 300px) {
  .q-btn {
    width: 280px;
  }
}
</style>
