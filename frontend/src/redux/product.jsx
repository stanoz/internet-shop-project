import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    category: 'all',
    minPrice: 0,
    maxPrice: null,
    sizes: [],
    sort: 'none'
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSearchParams(state, action) {
            state.category = action.payload.category || state.category
            state.minPrice = action.payload.minPrice || state.minPrice
            state.maxPrice = action.payload.maxPrice || state.maxPrice
            state.sizes = action.payload.sizes || state.sizes
            state.sort = action.payload.sort || state.sort
        }
    }
})

export const productAction = productSlice.actions