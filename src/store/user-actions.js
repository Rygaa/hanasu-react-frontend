import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "./user-slice"
import { socket } from '../App'
import { notificationActions } from "./notification-slice"

export const signUp = ({username, password, email}) => {
    return async (dispatch) => {
        const response = await axios.post('https://api.hanasu.me/signUp', {
            username,
            password,
            email
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

export const login = ({ username, password }) => {
    return async (dispatch) => {
        const response = await axios.post('https://api.hanasu.me/login', {
            username,
            password,
        })
        const data = response.data
        if (data.error) {
            dispatch(notificationActions.setNotificationType("error"))
            dispatch(notificationActions.setNotificationLastUpdate('ADDED'))
            dispatch(notificationActions.addNotification(data.error))

            return;
        } 
        const usernamee = data.username
        dispatch(notificationActions.setNotificationLastUpdate('ADDED'))
        dispatch(notificationActions.addNotification(data.message))
        dispatch(notificationActions.setNotificationType("success"))
        dispatch(userActions.setToken(data.idToken));
        dispatch(userActions.setUsername(usernamee));
        dispatch(userActions.setIsConnected(true));
        localStorage.setItem('idToken', data.idToken)
        dispatch(userActions.setProfilePictureUpdated(true));

    }
}
export const updateProfilePicture = ({ idToken, picture }) => {
    return async (dispatch) => {
        const formData = new FormData();
        formData.append("files", picture);
        formData.append("idToken", idToken);
        const response = await axios.post('https://api.hanasu.me/updateProfilePhoto', formData)
        const data = response.data
        if (data.error) {
            console.log(data.error);
            dispatch(notificationActions.setNotificationLastUpdate('ADDED'))
            dispatch(notificationActions.addNotification(data.error))
            return;
        }
        dispatch(userActions.setProfilePictureUpdated(true));

    }
}
export const checkIdToken = ({ idToken }) => {
    return async (dispatch) => {
        const response = await axios.post('https://api.hanasu.me/checkIdToken', {
            idToken,
        })

        const data = response.data
        if (data.error) {
            console.log(data.error);
            dispatch(notificationActions.setNotificationLastUpdate('ADDED'))
            dispatch(notificationActions.addNotification(data.error))
            dispatch(userActions.setIsConnected(false));

            return;
        }
        const username = data.username
        dispatch(userActions.setUsername(username));
        dispatch(userActions.setIsConnected(true));
        dispatch(userActions.setProfilePictureUpdated(true));



    }
}


export const send = ({ roomId, sender, message }) => {
    return async (dispatch) => {
    }
}