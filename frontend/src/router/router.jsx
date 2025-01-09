import {createBrowserRouter} from 'react-router-dom'
import ErrorPage from "../pages/ErrorPage.jsx";
import RootLayout from "../pages/RootLayout.jsx";
import ShowProducts from "../pages/ShowProducts.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

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
        }
    ]
}])

export default router