import { firebaseDB, firebaseAuth } from "src/boot/firebase";
import { ref, onValue, update, child, get } from "firebase/database";
import { storage } from "src/boot/firebase";
import { ref as sRef } from 'firebase/storage';
import { getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";


//Reads data from the firebase database. User data is added.
export function fbReadDataUsers({ commit, state }) {
  const userID = firebaseAuth.currentUser.uid;
  const usersData = ref(firebaseDB, "usersData/");
  const calendar = ref(firebaseDB, "adminData/calendar");
  const code = ref(firebaseDB, "adminData/code");

  onValue(calendar, (snapshot) => {
    const calendarUrl = snapshot.val();
    commit("calendarUrl", calendarUrl);
  })

  onValue(code, (snapshot) => {
    const codeVal = snapshot.val();
    commit("updateCode", codeVal);
  })

  //Only if you are the administrator, the data of all users are added. Otherwise, only the current one is added. (*For chat system is necesary all users too)
  if (userID == state.adminID) {

    onValue(usersData, (snapshot) => {
      const userData = snapshot.val();
      commit("addUsersData", userData);
    })

  } else {
    onValue(usersData, (snapshot) => {
      let userData = snapshot.val();
      let aux = {
        [userID]: {
          age: userData[userID].age,
          email: userData[userID].email,
          id: userData[userID].id,
          name: userData[userID].name,
          state: userData[userID].state,
          url: userData[userID].url,
        }
      }
      delete userData[userID];
      commit("addAllUsersData", userData); //To add all users but not current user
      commit("addUsersData", aux);
    })
  }
}

//to get the registration code from the database
export function fbReadCode({ commit }) {
  const code = ref(firebaseDB, "adminData/");

  get(child(code, "code")).then((snapshot) => {
    if (snapshot.exists()) {
      commit("updateCode", snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

//Update a class
export function updateClass({ }, payload) {
  var objectAux = {
    img: payload.img,
    directLink: payload.directLink,
    link: payload.link,
    name: payload.name,
    text: payload.text,
    time: payload.time,
  };

  const updates = {}
  updates['allClasses/' + payload.id] = objectAux;
  update(ref(firebaseDB), updates);
}

//Upload a Img
export function changeImgUser({ }, payload) {
  const userID = firebaseAuth.currentUser.uid;

  const storageRef = sRef(storage, 'profileImages/' + userID);

  uploadBytes(storageRef, payload).then((snapshot) => {
    //console.log("Uploaded a blob or file!");
    //Actualiza la url de la foto de perfil en usersData
    getDownloadURL(sRef(storage, 'profileImages/' + userID))
      .then((url) => {
        changeUrlProfileImg(userID, url);
      })
      .catch((error) => {
        console.log(error)
      });
  });
}

//Change url of Profiele img in firebase
function changeUrlProfileImg(userID, payload) {
  const updates = {}
  updates['usersData/' + userID + '/url'] = payload;
  update(ref(firebaseDB), updates);
}

//Change the calendar photo in storage and the url.
export function changeCalendarImg({ }, payload) {
  const storageRef = sRef(storage, 'calendario');

  uploadBytes(storageRef, payload).then((snapshot) => {
    //console.log("Uploaded a blob or file!");
    //Actualiza la url de la foto de perfil en usersData
    getDownloadURL(sRef(storage, 'calendario'))
      .then((url) => {
        changeUrlCalendarImg(url);
      })
      .catch((error) => {
        console.log(error)
      });
  });
}

//Change the url of the calendar in firebase
function changeUrlCalendarImg(payload) {
  const updates = {}
  updates['adminData/calendar'] = payload;
  update(ref(firebaseDB), updates);
}


//Change the registration code in firebase
export function changeCode({ }, payload) {
  const updates = {}
  updates['adminData/code'] = payload;
  update(ref(firebaseDB), updates);
}

//Change user name
export function changeUserName({ }, payload) {
  const userID = firebaseAuth.currentUser.uid;

  const updates = {}
  updates['usersData/' + userID + '/name'] = payload;
  update(ref(firebaseDB), updates);
}

//Upload a class img
export function uploadClassImg({ }, payload) {

  const storageRef = sRef(storage, 'classImages/' + payload.id);

  uploadBytes(storageRef, payload.file).then((snapshot) => {
    //console.log("Uploaded a blob or file!");
    getDownloadURL(sRef(storage, 'classImages/' + payload.id))
      .then((url) => {
        changeUrlClassImg(payload.id, url);
      })
      .catch((error) => {
        console.log(error)
      });
  });


}

//Change the url of a class in firebase
function changeUrlClassImg(id, payload) {
  const updates = {}
  updates['allClasses/' + id + '/img'] = payload;
  update(ref(firebaseDB), updates);
}

//Create a new class
export function createNewClass({ }, payload) {
  const updates = {}
  updates['allClasses/' + payload.id] = payload.object;
  update(ref(firebaseDB), updates);
}

//Delete a class
export function deleteClass({ state, rootGetters }, payload) {
  const desertRef = sRef(storage, 'classImages/' + payload);

  // Delete the file
  deleteObject(desertRef).then(() => {
    // File deleted successfully
  }).catch((error) => {
  });

  const updates = {}
  updates['allClasses/' + payload] = null;
  update(ref(firebaseDB), updates);

  deleteClassAllUsers(state.usersData, rootGetters['classController/getAllClassesData'], payload);
}

//Delete the class in all users
function deleteClassAllUsers(usersData, classData, targetClass) {
  for (var i = 0; i < Object.keys(usersData).length; i++) {
    if (classData[usersData[i].id] != null) {
      for (var j = 0; j < Object.keys(classData[usersData[i].id]).length; j++) {
        if (Object.keys(classData[usersData[i].id])[j] == targetClass) {
          const updates = {}
          updates['idClassesXuser/' + usersData[i].id + '/' + targetClass] = null;
          update(ref(firebaseDB), updates);
        }
      }
    }
  }

  const updates = {}
  updates['idClassesXuser/' + "usuarioID" + "claseID"] = null;
  //update(ref(firebaseDB), updates);
}

//Change student state to false in Firebase
export function blockStudent({ }, payload) {
  const updates = {}
  updates['usersData/' + payload + '/state'] = false;
  update(ref(firebaseDB), updates);
}

//Change student state to true in Firebase
export function activeStudent({ }, payload) {
  const updates = {}
  updates['usersData/' + payload + '/state'] = true;
  update(ref(firebaseDB), updates);
}
