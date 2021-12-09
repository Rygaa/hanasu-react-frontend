import axios from "axios"
import { roomsActions } from "./room-slice"
import { notificationActions } from "./notification-slice"
import { socket } from '../App'
import { url } from "_globalVar/_ip"

// const base = 'localhost:3005'

const url1 = `${url}/search`
const url2 = `${url}/join`
const url3 = `${url}/subscribe`
const url4 = `${url}/unsubscribe`
const url5 = `${url}/create`

export const search = ({ idToken, roomname }) => {
    return async (dispatch) => {
        const response = await axios.post(url1, {
            idToken,
            roomname,
        })
        const data = response.data
        if (data.error) {
            dispatch(notificationActions.setNotificationLastUpdate('ADDED'))
            dispatch(notificationActions.addNotification(data.error))
            return;
        }
        dispatch(roomsActions.setSearchedRooms(data.rooms))
    };
}


export const join = ({ idToken }) => {
    return async (dispatch) => {
        const response = await axios.post(url2, {
            idToken,
        })
        const data = response.data
        if (data.error) {
            dispatch(notificationActions.setNotificationLastUpdate('ADDED'))
            dispatch(notificationActions.addNotification(data.error))
            return;
        }
        dispatch(roomsActions.setMyRooms(data.rooms))
        
    };
}



export const subscribe = ({ idToken, roomname }) => {
    return async (dispatch) => {
        const response = await axios.post(url3, {
            idToken,
            roomname,
        })
        const data = response.data
        if (data.error) {
            dispatch(notificationActions.setNotificationLastUpdate('ADDED'))
            dispatch(notificationActions.addNotification(data.error))
            return;
        }
        dispatch(notificationActions.setNotificationLastUpdate('ADDED'))
        dispatch(notificationActions.addNotification(data.message))
    }
}

export const unsubscribe = ({ idToken, roomname }) => {
    return async (dispatch) => {
        const response = await axios.post(url4, {
            idToken,
            roomname,
        })
        const data = response.data
        if (data.error) {
            dispatch(notificationActions.setNotificationLastUpdate('ADDED'))
            dispatch(notificationActions.addNotification(data.error))
            return;
        }
        dispatch(notificationActions.setNotificationLastUpdate('ADDED'))
        dispatch(notificationActions.addNotification(data.message))
        dispatch(roomsActions.setMyRooms(data.rooms))

    }
}

export const create = ({ idToken, roomname, maxPlayersNumber }) => {
    return async (dispatch) => {
     
        const response = await axios.post(url5, {
            idToken,
            roomname,
            maxPlayersNumber,
        })
        const data = response.data
        if (data.error) {
            dispatch(notificationActions.setNotificationLastUpdate('ADDED'))
            dispatch(notificationActions.addNotification(data.error))
            return;
        }
        dispatch(notificationActions.setNotificationLastUpdate('ADDED'))
        dispatch(notificationActions.addNotification(data.message))
    }
}


export const connect = ({ idToken, roomname }) => {
    return async (dispatch) => {
        socket.emit('join', idToken, roomname)
    };
}

