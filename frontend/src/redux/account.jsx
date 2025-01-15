import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAdmin: localStorage.getItem("role") === "true",
};

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setIsAdmin(state, action) {
            localStorage.setItem("role", action.payload.role);
            state.isAdmin = action.payload.role;
        },
        signOut(state) {
            localStorage.removeItem("role");
            state.isAdmin = false;
        },
    },
});

export const accountAction = accountSlice.actions;