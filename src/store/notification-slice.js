import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notificationDisplay: true,
    notificationsLastUpdate: null,
    notifications: [],
    notificationType: null,
}

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotificationDisplay: (state, { payload: status }) => {
            state.notificationDisplay = status;
        },
        addNotification: (state, {payload: notification}) => {
            state.notifications.push(notification);
        },
        removeNotification: (state, {payload: r}) => {
            state.notifications.shift();
        },
        setNotificationLastUpdate: (state, {payload: status}) => {
            state.notificationsLastUpdate = status;
        },
        setNotificationType: (state, { payload: status }) => {
            state.notificationType = status;
        }
    }
})

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;