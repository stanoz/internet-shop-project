import {configureStore} from "@reduxjs/toolkit";
import {productSlice} from "./product.jsx";
import {userDataSlice} from "./user-data.jsx";
import {orderMethodAction, orderMethodSlice} from "./order-methods.jsx";
import {accountSlice} from "./account.jsx";
import {productDetailsSlice} from "./product-details.jsx";
import {adminManagementSlice} from "./admin-management.jsx";

const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        userData: userDataSlice.reducer,
        orderMethod: orderMethodSlice.reducer,
        account: accountSlice.reducer,
        productDetail: productDetailsSlice.reducer,
        adminManagement: adminManagementSlice.reducer,
    }
})

export default store