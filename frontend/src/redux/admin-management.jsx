import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categoryId: null,
    orderId: null,
    userId: null,
}

export const adminManagementSlice = createSlice({
    name: 'adminManagement',
    initialState,
    reducers: {
        setId(state, action) {
            state.categoryId = action.payload.categoryId || state.categoryId
            state.orderId = action.payload.orderId || state.orderId
            state.userId = action.payload.userId || state.userId
        }
    }
})

export const adminManagementAction = adminManagementSlice.actions