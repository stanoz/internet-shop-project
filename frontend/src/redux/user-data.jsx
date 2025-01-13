import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    name: "",
    surname: "",
    email: "",
}

export const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setData(state, action) {
            state.name = action.payload.name || state.name
            state.surname = action.payload.surname || state.surname
            state.email = action.payload.email || state.email
        }
    }
})

export const userDataAction = userDataSlice.actions