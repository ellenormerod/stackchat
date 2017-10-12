import { createStore, applyMiddleware  } from 'redux';
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from '../socket'

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const NEW_USERNAME = 'NEW_USERNAME';


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

export const newUsername = (username) => {
    return {
        type: NEW_USERNAME,
        username: username
    }
}

export function fetchMessages(){
    return function thunk(dispatch){
        axios.get('/api/messages')
        .then(res => res.data)
        .then(messages => dispatch(gotMessagesFromServer(messages)));
    }
}

export function postMessages(message){
    return function thunk(dispatch){
        axios.post('/api/messages', message)
        .then(res => res.data)
        .then(message => {
          dispatch(gotNewMessageFromServer(message));
          socket.emit('new-message', message)
        })
    }
}

const initialState = {
    messages: [],
    newMessageEntry: '',
    username: ''
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case GOT_MESSAGES_FROM_SERVER:
            return Object.assign({}, state, { messages: action.messages });
        case WRITE_MESSAGE:
            return Object.assign({}, state, { newMessageEntry: action.newMessageEntry });
        case GOT_NEW_MESSAGE_FROM_SERVER:
            return Object.assign({}, state, { messages: state.messages.concat(action.message) });
        case NEW_USERNAME:
            return Object.assign({}, state, { username: action.username });
        default:
            return state;
    }
}

// let middleware = applyMiddleware(loggerMiddleware, thunkMiddleware)

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(loggerMiddleware, thunkMiddleware)); 

export default store;