<template>
  <div>
    <div v-if="getMessages">
      <q-btn
        v-if="this.getAdminID == this.getCurrentUser"
        to="/admin/chats"
        flat
        icon="arrow_back"
        class="backBtn"
        >Volver</q-btn
      >
      <q-btn v-else to="/chats" flat icon="arrow_back" class="backBtn"
        >Volver</q-btn
      >

      <q-btn
        v-if="this.getPinnedMsg[this.id] != ''"
        :class="
          this.lastPinnedMsg == this.getPinnedMsg[(this, id)]
            ? 'pinnedMsgVisited'
            : 'pinnedMsg'
        "
        @click="this.openPinnedMsg"
        icon="push_pin"
        >{{ this.getPinnedMsg[(this, id)] }}</q-btn
      >
      <q-fab
        v-if="this.getAdminID == this.getCurrentUser"
        :color="colorExpandable"
        :text-color="textExpandable"
        :icon="expandableIcon"
        direction="up"
        class="expandable"
      >
        <q-fab-action
          @click="this.adminAlertText"
          class="expandableAlert"
          color="negative"
          icon="feedback"
          external-label
          padding="12px"
          label="Mensaje prioritario"
        />
        <q-fab-action
          @click="this.adminNormalText"
          class="expandableNormal"
          color="primary"
          icon="comment"
          external-label
          padding="12px"
          label="Mensaje normal"
        />
      </q-fab>

      <q-table
        :grid="true"
        grid-header
        :rows="Object.values(getMessages)"
        :columns="columns"
        :filter="filter"
        hide-bottom
        class="tableChat"
        :rows-per-page-options="[0]"
      >
        <template id="divMessages" v-slot:item="props">
          <div class="flex" :class="this.setPosition(props.row)">
            <q-img
              v-if="props.row.first && this.getCurrentUser != props.row.id"
              class="image--cover"
              :src="props.row.urlProfileImg"
            >
            </q-img>

            <div>
              <div v-if="this.getCurrentUser != props.row.id">
                <p
                  v-if="props.row.first && this.getCurrentUser != props.row.id"
                  class="name"
                >
                  {{ props.row.name }}
                </p>
              </div>

              <div
                :id="props.row.idMsg"
                class="message"
                :class="msgBG(props.row)"
                @click="pinnedMsg(props.row.text)"
              >
                <div class="text row flex justify-between">
                  <div class="divText">
                    {{ props.row.text }}
                  </div>

                  <div class="q-ml-sm timeMsg flex self-end">
                    {{ props.row.hour }}:{{ props.row.min }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-slot:top-right>
          <q-input
            class="search"
            dense
            rounded
            outlined
            debounce="300"
            v-model="filter"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>

    <div id="test" class="inputMessage">
      <q-input
        class="q-pa-md"
        rounded
        outlined
        v-model="text"
        placeholder="Escribe un mensaje"
      >
        <template v-slot:before class="divImgProfile">
          <q-avatar size="70px">
            <img
              v-if="this.getCurrentUser == this.getAdminID"
              :src="this.imgAdminUrl"
            />
            <img v-else :src="getUsersData[0].url" />
          </q-avatar>
        </template>

        <template v-slot:after>
          <q-btn
            :disable="!text"
            dense
            flat
            icon="send"
            @click="createMessageToSend"
          />
        </template>
      </q-input>
    </div>

    <q-dialog v-model="showDialog" maximized>
      <q-card>
        <q-card-section>
          <div class="text-h6">Mensaje Fijado</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 70vh" class="scroll">
          <p class="textPinned">
            {{ this.getPinnedMsg[this.id] }}
          </p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            class="full-width"
            label="Volver"
            color="primary"
            v-close-popup
            @click="this.setLastPinnedMsg"
          />
          <q-btn
            v-if="this.getCurrentUser == this.getAdminID"
            class="full-width"
            label="Quitar mensaje"
            flat
            color="primary"
            @click="pinMsg('')"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="pinnedDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">¿Quieres fijar este mensaje?.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            @click="pinMsg(this.clickedMsg)"
            label="Fijar mensaje"
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
import { ref } from "vue";

export default {
  data() {
    return {
      count: "",
      text: "",
      first: true,
      maxMessages: 15, //llevar al state (max msg en un chat)
      filter: ref(""),
      showDialog: false,
      pinnedDialog: false,
      clickedMsg: "",
      lastPinnedMsg: "",
      expandableIcon: "comment",
      colorExpandable: "primary",
      textExpandable: "white",
      prioritaryMsg: false,
      imgAdminUrl:
        "https://firebasestorage.googleapis.com/v0/b/martadeporte-52d1b.appspot.com/o/profileImages%2Fprofile.jpeg?alt=media&token=5a887a10-395c-4d98-9fa2-16953aa46cd1",

      columns: [
        {
          name: "name",
          align: "left",
          field: (row) => row.name,
        },
        {
          name: "text",
          align: "left",
          field: (row) => row.text,
        },
      ],
    };
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters("chatController", [
      "getChats",
      "getReadedMsgs",
      "getPinnedMsg",
    ]),
    ...mapGetters("adminController", [
      "getUsersData",
      "getCurrentUser",
      "getAdminID",
    ]),

    getMessages() {
      if (this.getChats) {
        let classChat = this.getChats[this.id];
        return classChat;
      }
      return {};
    },
  },

  unmounted() {
    //when exit to chat,change readed msg ---------
    var obj = {
      id: this.id,
      val: Object.keys(this.getMessages).length,
    };

    this.changeReadedMsg(obj);
  },

  mounted() {
    this.lastPinnedMsg = localStorage.getItem("pinned");

    //Si he leido todos los mensajes, voy abajo del todo
    if (this.getReadedMsgs[this.getCurrentUser][this.id] == this.maxMessages) {
      setTimeout(() => {
        var element = document.getElementsByClassName(
          "q-table__grid-content "
        )[0];

        window.scrollBy(0, element.scrollHeight);
      });

      //Scroll al mensaje objetivo
    } else if (
      this.getReadedMsgs[this.getCurrentUser][this.id] < this.maxMessages &&
      this.getReadedMsgs[this.getCurrentUser][this.id] >= 0
    ) {
      var targetMsgPos = this.getReadedMsgs[this.getCurrentUser][this.id];
      var msgID = Object.keys(this.getMessages)[targetMsgPos];
      var ele = document.getElementById(msgID);

      //Si existe el mensaje
      if (ele != null) {
        ele.classList.add("newMsg");

        setTimeout(() => {
          ele.scrollIntoView();
          window.scrollBy(0, -100);
        });

        //Si no existe (max tam no alcanzado pero mensaje ya fue leido)
      } else {
        //Scroll to bottom
        setTimeout(() => {
          var element = document.getElementsByClassName(
            "q-table__grid-content "
          )[0];

          window.scrollBy(0, element.scrollHeight);
        });
      }

      //Maximos mensajes sin leer alcanzado (num negativo, ve arriba del todo
    } else {
      setTimeout(() => {
        window.scrollTo({
          behavior: "instant",
          top: 0,
        });
      });
    }

    //when enter to chat,change readed msg ---------
    var obj = {
      id: this.id,
      val: Object.keys(this.getMessages).length,
    };

    this.changeReadedMsg(obj);
  },

  methods: {
    ...mapActions("chatController", [
      "addMessage",
      "removeOldMessage",
      "changeReadedMsg",
      "addPinnedMsg",
    ]),

    //Generate a random code
    generateRandomCode() {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let result1 = "";
      const num = 4;
      const charactersLength = characters.length;
      for (let i = 0; i < num; i++) {
        result1 += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      return result1;
    },

    //change position message depend of the user
    setPosition(row) {
      if (this.getCurrentUser == row.id) {
        return "justify-end";
      } else {
        if (!row.first && this.getCurrentUser != row.id) {
          return "justiy-start textMargin";
        }
        return "justiy-start textTop";
      }
    },

    //change BG color message depend of the user
    msgBG(row) {
      if (row.admin == true) return "adminMsg";

      if (this.getCurrentUser == row.id) {
        return "myText noBottomMargin";
      }

      if (this.getCurrentUser != row.id) {
        return "noBottomMargin";
      }

      return "";
    },

    //change text message depend of the admin mode
    adminNormalText() {
      this.expandableIcon = "comment";
      this.colorExpandable = "primary";
      this.textExpandable = "white";
      this.prioritaryMsg = false;
    },

    //change text message depend of the admin mode
    adminAlertText() {
      this.expandableIcon = "feedback";
      this.colorExpandable = "negative";
      this.textExpandable = "dark";
      this.prioritaryMsg = true;
    },

    //open dialog to pinned a message
    pinnedMsg(text) {
      if (this.getCurrentUser == this.getAdminID) {
        this.pinnedDialog = true;
        this.clickedMsg = text;
      }
    },

    //pinned a message
    pinMsg(message) {
      var object = {
        classID: this.id,
        msg: message,
      };

      this.addPinnedMsg(object);
    },

    //open pinned message to read it
    openPinnedMsg() {
      this.showDialog = true;
      localStorage.setItem("pinned", this.getPinnedMsg[this.id]);
    },

    setLastPinnedMsg() {
      this.lastPinnedMsg = localStorage.getItem("pinned");
    },

    //Create and send a new message -------------------------------------------------------------------
    createMessageToSend() {
      var date = new Date();
      var code = this.generateRandomCode();
      var msUTC = date.getUTCMilliseconds();
      var secUTC = date.getUTCSeconds();
      var minUTC = date.getUTCMinutes();
      var hourUTC = date.getUTCHours();
      var dayUTC = date.getUTCDay();
      var monthUTC = date.getUTCMonth();

      if (secUTC.toString().length < 2) {
        secUTC = "0" + secUTC.toString();
      }

      if (msUTC.toString().length < 3) {
        if (msUTC.toString().length == 2) {
          msUTC = "0" + msUTC.toString();
        } else if (msUTC.toString().length == 1) {
          msUTC = "00" + msUTC.toString();
        }
      }

      if (minUTC.toString().length < 2) {
        minUTC = "0" + minUTC.toString();
      }

      if (hourUTC.toString().length < 2) {
        hourUTC = "0" + hourUTC.toString();
      }

      if (monthUTC.toString().length < 2) {
        monthUTC = "0" + monthUTC.toString();
      }

      var messageID =
        monthUTC.toString() +
        this.weekNumber() +
        dayUTC.toString() +
        hourUTC.toString() +
        minUTC.toString() +
        secUTC.toString() +
        msUTC.toString() +
        "-" +
        code;

      var localHours = date.getHours();
      if (localHours.toString().length < 2) {
        localHours = "0" + localHours.toString();
      }

      var localmin = date.getHours();
      if (localmin.toString().length < 2) {
        localmin = "0" + localmin.toString();
      }

      var objectAux = {
        id: this.getUsersData[0].id,
        name: this.getUsersData[0].name,
        urlProfileImg: this.getUsersData[0].url,
        text: this.text,
        hour: localHours,
        min: localmin,
        first: true,
        admin: false,
        classID: this.id,
        msgID: messageID,
      };

      if (this.getCurrentUser == this.getAdminID) {
        if (this.prioritaryMsg) objectAux.admin = true;
        objectAux.id = this.getAdminID;
        objectAux.name = "Marta Hinojosa";
        objectAux.urlProfileImg = this.imgAdminUrl;
      }

      objectAux = this.checkLastMessage(objectAux);

      this.addMessage(objectAux);

      this.text = "";

      this.checkLengthChat();

      this.scrollToBottom();
    },

    //Check length chat
    checkLengthChat() {
      let classChat = this.getChats[this.id];

      if (classChat) {
        if (Object.keys(classChat).length > this.maxMessages) {
          this.removeOldMessage(this.id);
        }
      }
    },

    //Check the last message of the chat (Is this my message?)
    checkLastMessage(obj) {
      let classChat = this.getChats[this.id];

      if (classChat) {
        var lastMessage =
          classChat[Object.keys(classChat)[Object.keys(classChat).length - 1]];
        if (lastMessage.id == obj.id) {
          obj.first = false;
        } else {
          obj.first = true;
        }
      }

      return obj;
    },

    //Calculate and return week number
    weekNumber() {
      let date = new Date();
      var firstJanuary = new Date(date.getFullYear(), 0, 1);
      var dayNr = Math.ceil((date - firstJanuary) / (24 * 60 * 60 * 1000));
      var weekNr = Math.ceil((dayNr + firstJanuary.getDay()) / 7);
      if (weekNr.toString().length < 2) {
        weekNr = "0" + weekNr.toString();
      }
      return weekNr;
    },

    //scroll to bottom
    scrollToBottom() {
      var element = document.getElementsByClassName(
        "q-table__grid-content "
      )[0];

      if (element.scrollHeight) {
        window.scrollBy(0, element.scrollHeight);
        window.scrollBy(0, 100);
      }
    },
    //-----------------------------------------------------------------------------------------------
  },
};
</script>

<style lang="scss" scoped>
.backBtn {
  position: fixed;
  top: 0;
  margin-top: 5px;
  z-index: 5;
  font-size: 20px;
  letter-spacing: 2px;
  font-weight: 600;
  color: $white;

  :deep(.q-icon) {
    font-size: 32px !important;
    margin-right: 5px;
    color: $white;
  }
}

.pinnedMsg {
  position: fixed;
  top: 60px;
  background-color: rgba($negative, 0.7);
  backdrop-filter: blur(5px);
  width: 100%;
  font-size: 18px;
  color: $dark;
  letter-spacing: 1px;
  z-index: 10;

  :deep(.q-btn__content) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    display: block;
  }

  :deep(.q-icon) {
    font-size: 28px !important;
    margin-right: 5px;
    color: $dark;
    background: none;
  }
}

.textMargin {
  margin-left: 65px;
}

.textPinned {
  font-size: $text16;
}

.textTop {
  margin-top: 15px;
}

.pinnedMsgVisited {
  background-color: rgba($primary, 0.7);
  position: fixed;
  top: 60px;
  right: 0;
  border-radius: 0px 0px 0px 20px;
  backdrop-filter: blur(5px);
  width: 45px;
  height: 10px;

  font-size: 20px;
  letter-spacing: 1px;
  z-index: 10;
  /* Hide the text. */
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;

  :deep(.q-icon) {
    font-size: 25px !important;
    margin-right: 46px;
    margin-top: 3px;
    color: $white;
    background: none;
  }
}

:deep(.q-table__container) {
  z-index: 1 !important;
}

:deep(.q-table__grid-content) {
  display: inline;
  overflow: scroll;
  height: 70%;
  margin-bottom: 100px;
  margin-top: 80px;
  flex-direction: row;
  z-index: -1;
}

:deep(.q-table__top) {
  background-color: rgba($primary, 0.7);
  position: fixed;
  width: 100%;
  backdrop-filter: blur(15px);
  padding: 10px;
  margin: 0px;
  border-radius: 0px;
  z-index: 4;
}

.message {
  margin: 5px;
  padding: 10px;
  color: $white;
  max-width: 80vw;
  border-radius: 10px;
  white-space: nowrap;
  min-width: 100px;
  background-color: $primary;
  margin-top: 0px;
  margin-bottom: 15px;

  position: relative;
  cursor: pointer;

  .timeMsg {
    font-size: $small14;
    position: relative;
    top: 6px;
  }

  .divText {
    max-width: 95%;
  }

  .text {
    font-size: $text16;
    word-break: break-all;
    white-space: pre-line; /* CSS3 */
    white-space: -moz-pre-wrap; /* Firefox */
    white-space: -pre-wrap; /* Opera <7 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word; /* IE */
  }
}

.noBottomMargin {
  margin-bottom: 5px !important;
}

.topMargin {
  margin-top: 10px !important;
}

.myText {
  background-color: gray;
}

.name {
  text-transform: capitalize;
  letter-spacing: 2px;
  font-size: $small14;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  margin-bottom: 0px;
  font-weight: 600;
  margin-left: 10px;
}

.adminMsg {
  background-color: $negative;
  color: $dark;
  margin-top: 5px;
  border: 1px solid $background-dark;
}

.newMsg {
  margin-top: 10px;
  &:before {
    content: "↓ Nuevos mensajes ↓";
    position: relative;
    left: -10px;
    top: -10px;
    border: 3px solid $primary;
    color: $dark;
    background-color: $negative;
    display: block;
    padding: 5px;
    border-radius: 10px;
    text-align: center;
    width: 75vw;
  }
}

.expandable {
  position: fixed;
  bottom: 100px;
  left: 20px;
}

:deep(.q-fab__actions) {
  .expandableAlert {
    color: $dark !important;
  }
}

.image--cover {
  margin: 5px;
  margin-left: 10px;
  margin-top: 25px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

img {
  object-fit: cover;
}

.inputMessage {
  position: fixed;
  bottom: 0;
  left: 0;
  margin-bottom: 20px;
  background-color: rgba($primary, 0);
  backdrop-filter: blur(10px);
  margin: 0px;
  width: 100%;
  z-index: 2 !important;
}

:deep(.q-field__control) {
  background-color: $secondary;
  z-index: 2 !important;
}

:deep(.q-field__native) {
  font-size: $text16;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 2 !important;
}

:deep(.q-field) {
  .q-btn__content > i {
    font-size: 50px;
    color: $secondary;
    background-color: rgba($primary, 0.7);
    border-radius: 10px;
    padding: 5px;
    z-index: 2 !important;
  }
}

.myMessage {
  display: flex;
  align-items: flex-end !important;
  justify-content: flex-end !important;
  display: inline;
}

@media (max-width: 1100px) {
  .message {
    .divText {
      max-width: 90%;
    }
  }
}

@media (max-width: 599px) {
  .q-avatar {
    width: 50px;
    height: 50px;
  }
  :deep(.q-btn__content > i) {
    font-size: 35px;
  }
  .message {
    .divText {
      max-width: 85%;
    }
  }
}

@media (max-width: 425px) {
  .backBtn {
    font-size: 18px;
    margin-top: 8px;

    :deep(.q-icon) {
      font-size: 28px !important;
      color: $white;
    }
  }
  .search {
    width: 200px;
  }
  .message {
    .divText {
      max-width: 83%;
    }
  }
}

@media (max-width: 355px) {
  .backBtn {
    font-size: 16px;
    margin-top: 8px;

    :deep(.q-icon) {
      font-size: 24px !important;
      color: $white;
    }
  }
  .search {
    width: 140px;
  }
  .message {
    .divText {
      max-width: 79%;
    }
  }
}
</style>
