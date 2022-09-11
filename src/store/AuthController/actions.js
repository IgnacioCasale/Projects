import { firebaseAuth, firebaseDB } from "src/boot/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { LocalStorage } from "quasar";
import { showDialog } from "src/globalFunctions/general";
import { ref, onValue, update } from "firebase/database";


//Log in to the application with an email and password. If the data does not 
//exist in firebase, a dialog is displayed informing about the error.
export function logInUser({ }, payload) {
    signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
        .then(response => {
            //execute code after login
        })
        .catch(error => {
            showDialog("Usuario o Contraseña incorrecta.");
        })
}

//Register a user in firebase.
export function signUpUser({ }, payload) {
    createUserWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            const usersData = ref(firebaseDB, "usersData/" + user.uid);
            onValue(usersData, (snapshot) => {
                let profileImages = {
                    '0': "https://firebasestorage.googleapis.com/v0/b/martadeporte-52d1b.appspot.com/o/profileImages%2FProfile1.jpg?alt=media&token=b973e981-ba8b-4ddc-ac0c-d9bc1b12249f",
                    '1': "https://firebasestorage.googleapis.com/v0/b/martadeporte-52d1b.appspot.com/o/profileImages%2FProfile2.jpg?alt=media&token=a24870cc-9852-4740-9166-b4fae7825304",
                    '2': "https://firebasestorage.googleapis.com/v0/b/martadeporte-52d1b.appspot.com/o/profileImages%2FProfile3.jpg?alt=media&token=0408c9c5-218b-4732-be0d-6c19fb3e738a"
                }

                // A post entry.
                const postData = {
                    age: payload.age,
                    birthday: payload.day+"/"+payload.month+"/"+payload.year,
                    email: payload.email,
                    id: user.uid,
                    name: payload.name,
                    state: true,
                    url: profileImages[Math.floor(Math.random() * 3)],
                };

                const updates = {}
                updates['usersData/' + user.uid] = postData;
                update(ref(firebaseDB), updates);
            })
        })
        .catch((error) => {
            showDialog(error.message);
        });

}

//It is triggered each time the user logs in or logs out (or reloads the page). If logged in, 
//the profile page is loaded and the loggedIn variable is updated to true. 
export function handleAuthStateChange({ commit, dispatch, rootGetters }) {
    onAuthStateChanged(firebaseAuth, user => {

        if (user) {
            let adminID = rootGetters['adminController/getAdminID'];

            commit('setLoggedIn', true);
            LocalStorage.set('loggedIn', true); //Variable stored locally in the client. It is used to guarantee the privacy of the routes.
            if (user.uid == adminID) {
                this.$router.push('/admin/students');
            } else {
                this.$router.push('/userClasses');
            }
            //The action fbReadData is called
            dispatch('classController/fbReadData', null, { root: true })
            dispatch('adminController/fbReadDataUsers', null, { root: true })
            dispatch('chatController/fbReadDataChats', null, { root: true })
            dispatch('chatController/fbReadlocalMsgs', null, { root: true })


        } else {
            commit('setLoggedIn', false)
            LocalStorage.set('loggedIn', false);
        }

    })

    dispatch('adminController/fbReadCode', null, { root: true })
}

//To logout (firebase keeps the user's session active even if the user closes the web page)
export function logOutUser() {
    signOut(firebaseAuth)
}
