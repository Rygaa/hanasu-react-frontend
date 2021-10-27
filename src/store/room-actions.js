import axios from "axios"
import { roomsActions } from "./room-slice"
import { notificationActions } from "./notification-slice"
import { socket } from '../App'

const url1 = `http://localhost:3005/search`
const url2 = `http://localhost:3005/join`
const url3 = `http://localhost:3005/subscribe`
const url4 = `http://localhost:3005/unsubscribe`
const url5 = `http://localhost:3005/create`

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

