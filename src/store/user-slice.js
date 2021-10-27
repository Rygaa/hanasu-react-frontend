import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    idToken: '',
    isConnected: null,
    socketId: '',
    roomname: '',
    inRoom: false,
    messages: [],
    profilePicture: null,
    profilePictureUpdated: true,
    notification: true,
    previousRoomname: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, { payload: username }) => {
            state.username = username;
        },
        setIsConnected: (state, { payload: status }) => {
            state.isConnected = status;
        },
        setToken: (state, {payload: idToken}) => {
            state.idToken = idToken;
            localStorage.setItem('idToken', idToken)
        },
        setSocketId: (state, { payload: socketId }) => {
            state.socketId = socketId;
        },
        setInRoom: (state, { payload: status }) => {
            state.status = status;
        },
        addMessage: (state, { payload }) => {
            state.messages = [...state.messages, { sender: payload.sender, message: payload.message }];

        },
        setRoomname: (state, { payload: roomname}) => {
            state.roomname = roomname;
        },
        setPreviousRoomname: (state, { payload: roomname }) => {
            state.previousRoomname = roomname;
        },
        cleanMessages: (state, { payload: roomId }) => {
            state.messages = [];
        },
        setProfilePictureUpdated: (state, { payload: profilePictureUpdated }) => {
            state.profilePictureUpdated = profilePictureUpdated;
        },
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;