import { createSlice } from "@reduxjs/toolkit";
import { reduce } from "bluebird";

const initialState = {
    notification: true,
    showMenu: false,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setShowMenu: (state, { payload: status }) => {
            state.showMenu = status;
        },
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;