import {createBrowserRouter} from 'react-router-dom'
import ErrorPage from "../pages/error/ErrorPage.jsx";
import RootLayout from "../pages/RootLayout.jsx";
import ShowProducts from "../pages/ShowProducts.jsx";

const router = createBrowserRouter([{
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children:[
        {index: true, element: <ShowProducts />}
    ]
}])

export default router