import axios from "axios"
import { roomsActions } from "./room-slice"
import { notificationActions } from "./notification-slice"
import { socket } from '../App'

export const search = ({ idToken, roomname }) => {
    return async (dispatch) => {
        const response = await axios.post('https://api.hanasu.me/search', {
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
        const response = await axios.post('https://api.hanasu.me/join', {
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
        const response = await axios.post('https://api.hanasu.me/subscribe', {
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
        const response = await axios.post('https://api.hanasu.me/unsubscribe', {
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
     
        const response = await axios.post('https://api.hanasu.me/create', {
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

