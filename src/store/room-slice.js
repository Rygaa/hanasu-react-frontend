import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchedRooms: [],
    myRooms: [],
}

const roomsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSearchedRooms: (state, { payload: rooms }) => {
            state.searchedRooms = rooms;
        },
        setMyRooms: (state, { payload: rooms }) => {
            state.myRooms = rooms;
        },
    }
})

export const roomsActions = roomsSlice.actions;
export default roomsSlice.reducer;