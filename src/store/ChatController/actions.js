import { firebaseDB, firebaseAuth } from "src/boot/firebase";
import { ref, onValue, update, remove, get, child } from "firebase/database";


//Reads data chat from the firebase database.
export function fbReadDataChats({ commit }) {
    const chats = ref(firebaseDB, "chats/");
    const pinnedMsg = ref(firebaseDB, "pinnedMsg/");

    onValue(chats, (snapshot) => {
        const chatsData = snapshot.val();
        commit("setChats", chatsData);
    })

    onValue(pinnedMsg, (snapshot) => {
        const msgs = snapshot.val();
        commit("setPinnedMsg", msgs);
    })

}

//Reads data of Readed messages from the firebase database.
export function fbReadlocalMsgs({ commit }) {
    //Control messages---------------------------------
    const readedMsg = ref(firebaseDB, "readedMsg/");


    onValue(readedMsg, (snapshot) => {
        const msgs = snapshot.val();
        commit("setReadedMsg", msgs);
    })

    //---------------------------------------------------
}

//add a msg to firebase
export function addMessage({ }, payload) {
    var objectAux = {
        id: payload.id,
        idMsg: payload.msgID,
        name: payload.name,
        urlProfileImg: payload.urlProfileImg,
        text: payload.text,
        hour: payload.hour,
        first: payload.first,
        admin: payload.admin,
        min: payload.min,
    };

    const updates = {}
    updates['chats/' + payload.classID + '/' + payload.msgID] = objectAux;
    update(ref(firebaseDB), updates);
}

//Delete the last message (The first in Firebase bbdd) and update unreaded msg in all users.
export function removeOldMessage({ state, rootGetters }, payload) {
    var chat = state.chats[payload];
    var messageID = Object.keys(chat)[0];
    remove(ref(firebaseDB, 'chats/' + payload + '/' + messageID), null);


    //To remove one readed msg in all users
    const userID = firebaseAuth.currentUser.uid;
    var adminID = rootGetters['adminController/getAdminID'];

    var allUsers = rootGetters['adminController/getAllUsersDataNoCurrent'];

    var aux = { ...allUsers, ...payload };

    Object.assign({}, aux)

    if (userID == adminID) allUsers = rootGetters['adminController/getUsersData'];

    if (userID != adminID) {
        var user = adminID;

        const updates = {}
        updates['readedMsg/' + user + "/" + payload] = state.readedMsg[user][payload] - 1;
        update(ref(firebaseDB), updates);
    }

    for (var i = 0; i < Object.keys(allUsers).length; i++) {
        var user = Object.values(allUsers)[i].id;

        if (state.readedMsg[user][payload]) {
            const updates = {}
            updates['readedMsg/' + user + "/" + payload] = state.readedMsg[user][payload] - 1;
            update(ref(firebaseDB), updates);
        }

    }
}

//Change readed messages
export function changeReadedMsg({ commit }, payload) {
    const userID = firebaseAuth.currentUser.uid;

    var obj = {
        uid: userID,
        id: payload.id,
        val: payload.val
    };

    const updates = {}
    updates['readedMsg/' + obj.uid + "/" + obj.id] = obj.val;
    update(ref(firebaseDB), updates);

    commit("setMsg", obj)
}

//Delete readed messages (this delete a chat for a user)
export function deleteReadedMsg({ commit }, payload) {

    const userID = firebaseAuth.currentUser.uid;

    var obj = {
        uid: userID,
        id: payload,
    };

    const updates = {}
    updates['readedMsg/' + obj.uid + "/" + obj.id] = null;
    update(ref(firebaseDB), updates);

    commit("deleteMsgs", obj)
}

//Add a new chat
export function addNewChat({ }, payload) {

    var objectAux = {
        id: "0000000000000000000000000A",
        idMsg: "000000000000000000000000000A",
        name: "Mensaje Automático",
        urlProfileImg: "",
        text: payload.msg,
        first: false,
        admin: true,
        hour: "",
        min: "",
    };

    const updates = {}
    updates['chats/' + payload.classID + "/0000000000000000000A"] = objectAux;
    update(ref(firebaseDB), updates);
}

//Detele a chat
export function removeChat({ }, payload) {
    const updates = {}
    updates['chats/' + payload] = null;
    update(ref(firebaseDB), updates);
}

//Add a new pinned Msg
export function addPinnedMsg({ }, payload) {
    const updates = {}
    updates['pinnedMsg/' + payload.classID] = payload.msg;
    update(ref(firebaseDB), updates);
}
