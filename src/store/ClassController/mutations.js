//Setters-----------------
export function setClassesActualUser(state, payload) {
   state.classesActualUser = payload
}

export function setIdClassesXuser(state, payload) {
   state.idClassesXuser = payload
}

export function setAllClassesData(state, payload) {
   state.allClassesData = payload
}

export function setClassesID(state, payload) {
   state.classesID = payload
}
//----------------------------------

//Adds to the state the information received by the payload
export function addNewClassesID(state, payload) {

   var objectAux = {
      [payload]: true
   };

   var aux = { ...state.classesID, ...objectAux };

   state.classesID = Object.assign({}, aux)
}

//Adds to the state the information received by the payload
export function addNewUserClasses(state, payload) {

   var aux = { ...state.classesActualUser, ...payload };

   state.classesActualUser = Object.assign({}, aux)
}

//Removes from the state the information received by the payload.
export function removeNewClassesID(state, payload) {
   if(state.classesID) delete state.classesID[payload];
}

//Removes from the state the information received by the payload.
export function removeNewUserClasses(state, payload) {
   if(state.classesActualUser) delete state.classesActualUser[payload];
}
