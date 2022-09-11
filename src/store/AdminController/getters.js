import { firebaseAuth } from "src/boot/firebase";

export function getUsersData(state) {
    return state.usersData
}

export function getAllUsersDataNoCurrent(state) {
    return state.usersDataButNoCurrentUser
}

export function getCalendarUrl(state) {
    return state.calendarUrl
}

export function getCode(state) {
    return state.code
}

export function getAdminID(state) {
    return state.adminID
}

export function getCurrentUser() {
    if (firebaseAuth.currentUser) return firebaseAuth.currentUser.uid;
}
