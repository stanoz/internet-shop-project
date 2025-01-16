import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: null
}

export const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    reducers: {
        setId(state, action) {
            state.id = action.payload.id
        }
    }
})

export const productDetailsAction = productDetailsSlice.actions