import { firebaseDB, firebaseAuth, allClasses } from "src/boot/firebase";
import { ref, onValue, update, remove } from "firebase/database";

//Reads data from the firebase database. Sends a payload to
// addClasses from the mutations.js file.
export function fbReadData({ commit, state }) {
  const userID = firebaseAuth.currentUser.uid;
  const userClass = ref(firebaseDB, "idClassesXuser/" + userID);
  const allUserClass = ref(firebaseDB, "idClassesXuser/");

  //Accesses the user classes (IDs only) and calls the addClassesID mutation.
  //to save the information in the state
  onValue(userClass, (snapshot) => {
    const classes = snapshot.val();
    commit("setClassesID", classes);
    updateClassesUser(state, commit)
  })

  //If you are the administrator: you get the class IDs of ALL students
  if (userID == state.adminID) {
    onValue(allUserClass, (snapshot) => {
      const allClasses = snapshot.val();
      commit("setIdClassesXuser", allClasses);
    })
  }
}

//Add all offered classes (All information). Compare with the IDs of the
//classes of the user. Call the mutation addClases to add to the state the 
//classes that the user has.
export function updateClassesUser(state, commit) {
  onValue(allClasses, (snapshot) => {
    const allClasses = snapshot.val()
    var userClasses = {};
    var classes = state.classesID

    for (var ID in classes) {
      for (var key in allClasses) {
        if (key == ID) userClasses[key] = allClasses[key];
      }
    }

    commit("setAllClassesData", allClasses);
    commit("setClassesActualUser", userClasses);
  })
}

//It is called when a user enrolls in a new class. Adds to the state the new class
//in classesID and the class information in classData.
export function addClassToUser({ commit, state }, id) {
  commit("addNewClassesID", id)

  var objectAux = {
    [id]: state.allClassesData[id]
  };

  commit("addNewUserClasses", objectAux)

  const userID = firebaseAuth.currentUser.uid;
  const updates = {}
  updates['idClassesXuser/' + userID] = state.classesID;
  update(ref(firebaseDB), updates);
}

//It is called when a user un-enrolls from a new class. Removes from the state
//the new class in classesID and the class information in classData.
export function removeClassToUser({ commit }, id) {
  const userID = firebaseAuth.currentUser.uid;

  const updates = {}
  updates[ 'idClassesXuser/' + userID + '/' + id] = null;
  update(ref(firebaseDB), updates);

  commit("removeNewClassesID", id)
  commit("removeNewUserClasses", id)
}