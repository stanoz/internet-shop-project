import {Outlet} from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

export default function RootLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <div className="flex-grow">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
}