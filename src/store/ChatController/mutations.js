
//Change chats Data
export function setChats(state, value) {
    state.chats = value;
}

//Change chats Data
export function setPinnedMsg(state, value) {
    state.pinnedMsg = value;
}

//Change msgs Data
export function setMsg(state, value) {
    state.readedMsg[value.id] = value.val;
}

//Change chats Data
export function setReadedMsg(state, value) {
    state.readedMsg = value;
}

//Change chats Data
export function deleteMsgs(state, value) {
   if(state.readedMsg) delete state.readedMsg[value.id];
}
