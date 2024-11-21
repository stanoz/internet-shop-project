import {Outlet} from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

export default function RootLayout() {
    return (
        <>
            <Header/>
            <Outlet />
            <Footer />
        </>
    );
}