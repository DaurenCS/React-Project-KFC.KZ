import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    refresh: null,
    name: null,
    surname: null,
    id: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.token = action.payload.token;
            state.refresh = action.payload.refresh;
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.id = action.payload.id;
        },
        removeUser(state) {
            state.token = null;
            state.refresh = null;
            state.name = null;
            state.surname = null;
            state.id = null;
        },
    }
});


export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;