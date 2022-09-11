export default function () {
    return{   
       allClassesData: {}, //Saves all IDs and class data.
       idClassesXuser: {}, //Stores all registered users. Each user contains only the IDs of the classes he/she is enrolled in. // only used by the admin. 
       classesID: {}, //auxiliary object to facilitate data exchange. Only contains the ids of the current user's classes. // only used by users.
       classesActualUser: {}, //Stores the ids of the classes to which the current user is pointed. Each class contains its own data // only used by users
       adminID: "8ldoyaxdB6PY6aEyRn8TlraBRBJ2" //ADMIN ID 
    }
}
