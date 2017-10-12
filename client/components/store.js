import { createStore } from 'redux';
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';


export const gotMessagesFromServer = (arrOfMess) => {
    return {
        type: GOT_MESSAGES_FROM_SERVER,
        messages: arrOfMess
    };
}

export const writeMessage = (message) => {
    return {
        type: WRITE_MESSAGE,
        newMessageEntry: message
    };
}

export const gotNewMessageFromServer = (message) => {
    return {
        type: GOT_NEW_MESSAGE_FROM_SERVER,
        message: message
    };
}

const initialState = {
    messages: [],
    newMessageEntry: ''
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case GOT_MESSAGES_FROM_SERVER:
            return Object.assign({}, state, { messages: action.messages });
        case WRITE_MESSAGE:
            return Object.assign({}, state, { newMessageEntry: action.newMessageEntry });
        case GOT_NEW_MESSAGE_FROM_SERVER:
            return Object.assign({}, state, { messages: state.concat(action.message) });
        default:
            return state;
    }
}

let store = createStore(reducer); 

export default store;