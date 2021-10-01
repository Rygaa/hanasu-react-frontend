import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user-slice'
import roomsReducer from './room-slice'
import notificiationsReducer from './notification-slice'
import uiReducer from './ui-slice'
const store = configureStore({
    reducer: {
        user: userReducer,
        rooms: roomsReducer,
        notifications: notificiationsReducer,
        ui: uiReducer,
    }
})

export default store