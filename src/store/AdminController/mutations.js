import { firebaseDB, firebaseAuth } from "src/boot/firebase";
import { ref, update } from "firebase/database";

//Adds to the state the user data
export function addUsersData(state, payload) {

      var tempData = [];
      for (const index in payload) {
            tempData.push(payload[index]);
      }

      state.usersData = tempData;
}

//Adds to the state the user data for all users (necesary for chat)
export function addAllUsersData(state, payload) {
      
      state.usersDataButNoCurrentUser = payload;
}

//Change the calendar url of the state
export function calendarUrl(state, payload) {
      state.calendarUrl = payload;
}

//Change state code
export function updateCode(state, payload) {
      state.code = payload;
}

//Change url profile of the state
export function changeUrlProfileImg({}, payload) {
      const userID = firebaseAuth.currentUser.uid;
      const updates = {}
      updates['usersData/' + userID + '/url'] = payload;
      update(ref(firebaseDB), updates);
}

//Change url class img of the state
export function changeUrlClassImg({}, payload) {
      const userID = firebaseAuth.currentUser.uid;
      const updates = {}
      updates['allClasses/' + userID + '/img'] = payload;
      update(ref(firebaseDB), updates);
}
