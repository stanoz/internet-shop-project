import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    deliveryMethod: '',
    address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
    },
    paymentMethod: '',
};

export const orderMethodSlice = createSlice({
    name: 'orderMethod',
    initialState,
    reducers: {
        setDeliveryMethod: (state, action) => {
            state.deliveryMethod = action.payload
        },
        setAddress: (state, action) => {
            state.address = { ...state.address, ...action.payload }
        },
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
        },
    },
})

export const orderMethodAction = orderMethodSlice.actions
