import {createBrowserRouter} from 'react-router-dom'
import ErrorPage from "../pages/ErrorPage.jsx";
import RootLayout from "../pages/RootLayout.jsx";
import ShowProducts from "../pages/ShowProducts.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ShowProductDetails from "../pages/ShowProductDetails.jsx";
import OrderShowCart from "../pages/OrderShowCart.jsx";
import OrderUserData from "../pages/OrderUserData.jsx";

const router = createBrowserRouter([{
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children:[
        {index: true, element: <ShowProducts />},
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'register',
            element: <Register />
        },
        {
            path: 'product-details/:productId',
            element: <ShowProductDetails />
        },
        {
            path: 'order/step1',
            element: <OrderShowCart />
        },
        {
            path: 'order/step2',
            element: <OrderUserData />
        },
        {
            path: 'order/step3'
        },
        {
            path: 'order/step4'
        },
    ]
}])

export default router