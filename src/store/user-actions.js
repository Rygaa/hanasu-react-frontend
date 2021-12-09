import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "./user-slice"
import { socket } from '../App'
import { notificationActions } from "./notification-slice"
import { url } from "_globalVar/_ip"

// const base = 'localhost:3005'

const url1 = `${url}/signUp`
const url2 = `${url}/login`
const url3 = `${url}/updateProfilePhoto`
const url4 = `${url}/checkIdToken`
const url5 = `${url}/updateProfile`
const url6 = `${url}/access-settings`

export const signUp = ({username, password, email}) => {
    return async (dispatch) => {
        const response = await axios.post(url1, {
            username,
            password,
            email
        })
        console.log('sign up');

        const data = response.data
        console.log(data);
        if (data.error) {
            console.log(data);
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
        const response = await axios.post(url2, {
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
        dispatch(userActions.setEmail(data.email));

        const rememberMe = localStorage.getItem('remember-me') === 'true' ? true : false
        if (rememberMe) {
            localStorage.setItem('username', username)
            localStorage.setItem('password', password)
        }
        localStorage.setItem('idToken', data.idToken)
        dispatch(userActions.setProfilePictureUpdated(true));

    }
}
export const confirmUpdate = ({ idToken, password, newUsername, newEmail, newPassword, picture }) => {
    return async (dispatch) => {
        const formData = new FormData();
        formData.append("files", picture);
        formData.append("idToken", idToken);
        formData.append("password", password);
        formData.append("newUsername", newUsername);
        formData.append("newEmail", newEmail);
        formData.append("newPassword", newPassword);
        const response = await axios.post(url6, formData)
        const data = response.data
        if (data.error) {
            console.log(data.error);
            dispatch(notificationActions.setNotificationLastUpdate('ADDED'))
            dispatch(notificationActions.addNotification(data.error))
            return;
        }
        dispatch(notificationActions.setNotificationLastUpdate('ADDED'))
        dispatch(notificationActions.addNotification(data.message))
        dispatch(notificationActions.setNotificationType("success"))
        dispatch(userActions.setSettingsSaved(false));
        window.location.reload(true);

    }
}
export const updateProfile = ({ idToken, username, email }) => {
    return async (dispatch) => {
        const response = await axios.post(url5, {
            idToken,
            username,
            email,
        })
        const data = response.data
        if (data.error) {
            console.log(data.error);
            dispatch(notificationActions.setNotificationLastUpdate('ADDED'))
            dispatch(notificationActions.addNotification(data.error))
            return;
        }
        dispatch(userActions.setUsername(data.username));
        dispatch(userActions.setEmail(data.email));

    }
}
export const updateProfilePicture = ({ idToken, picture }) => {
    return async (dispatch) => {
        const formData = new FormData();
        formData.append("files", picture);
        formData.append("idToken", idToken);
        const response = await axios.post(url3, formData)
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
        const response = await axios.post(url4, {
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
        dispatch(userActions.setEmail(data.email));
        dispatch(userActions.setIsConnected(true));
        dispatch(userActions.setProfilePictureUpdated(true));



    }
}


export const send = ({ roomId, sender, message }) => {
    return async (dispatch) => {
    }
}