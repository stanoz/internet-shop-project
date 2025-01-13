import {configureStore} from "@reduxjs/toolkit";
import {productSlice} from "./product.jsx";
import {userDataSlice} from "./user-data.jsx";
import {orderMethodAction, orderMethodSlice} from "./order-methods.jsx";

const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        userData: userDataSlice.reducer,
        orderMethod: orderMethodSlice.reducer,
    }
})

export default store