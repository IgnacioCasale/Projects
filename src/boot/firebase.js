import { initializeApp } from 'firebase/app';
import "firebase/auth";
import { getAuth } from 'firebase/auth';
import { getDatabase, ref} from "firebase/database";
import { getStorage} from "firebase/storage";

//Configuración del proyecto de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC8oLiFRLXm_vuCWtI4ru2IODf3oZlQoeU",
  authDomain: "martadeporte-52d1b.firebaseapp.com",
  databaseURL: "https://martadeporte-52d1b-default-rtdb.firebaseio.com",
  projectId: "martadeporte-52d1b",
  storageBucket: "martadeporte-52d1b.appspot.com",
  messagingSenderId: "457340365388",
  appId: "1:457340365388:web:966377d00efedf258362e9",
  measurementId: "G-8RFN7V93SG"
};

//Acceso a la aplicación firebase
const firebaseApp = initializeApp(firebaseConfig);
//Acceso al sistema de Autenticación de firebase
const firebaseAuth = getAuth();
//Acceso a la base de datos en firebase
const firebaseDB =  getDatabase(firebaseApp)
//Referencia obtenida de firebase de todas las clases ofertadas 
const allClasses = ref(firebaseDB, 'allClasses/')

// Create a reference with an initial file path and name
const storage = getStorage();

export { firebaseAuth, firebaseDB, allClasses, storage}

