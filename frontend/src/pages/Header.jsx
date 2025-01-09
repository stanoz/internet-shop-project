import {FaCartShopping} from "react-icons/fa6"
import {VscAccount} from "react-icons/vsc"
import SearchBar from "../components/SearchBar.jsx";
import Categories from "../components/Categories.jsx";
import Filters from "../components/Filters/Filters.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";
import Button from "../components/Button.jsx";
import {logout} from "../../utils/account.js";

export default function Header() {
    const {isLoggedIn} = useAuth()
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const handleClickAccount = () => {
        setIsMenuVisible(!isMenuVisible);
    }

    const handleClickLink = () => {
        setIsMenuVisible(false);
    }

    const handleLogoutClick = () => {
        setIsMenuVisible(false)
        logout();
    }
    return (
        <div className="bg-sky-50 p-4 block mb-2">
            <div className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 items-center">
                <div className="flex justify-between items-center md:col-span-1">
                    <h1 className="text-2xl font-bold text-blue-500"><Link to='/'>Clothes Shop</Link></h1>

                </div>
                <div className="md:col-span-3 order-2 flex justify-center mb-1">
                    <SearchBar/>
                </div>
                <div
                    className="col-span-1 md:col-span-3 flex justify-center gap-6 text-lg font-medium text-gray-700 order-3">
                    <Categories/>
                </div>
                <div className="col-span-1 order-4">
                    <Filters/>
                </div>
                <div className="md:col-span-3 col-span-1 flex justify-end order-5">
                    <VscAccount className="text-2xl cursor-pointer mr-4" onClick={handleClickAccount}/>
                    {isMenuVisible && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                            {!isLoggedIn ? (
                                <ul>
                                    <li onClick={handleClickLink}><Link to='/login'>Login</Link></li>
                                    <li onClick={handleClickLink}><Link to='/register'>Register</Link></li>
                                </ul>
                            ) : (
                                <Button onClick={handleLogoutClick}>Log out</Button>
                            )
                            }
                        </div>
                    )}
                    <FaCartShopping className="text-2xl cursor-pointer"/>
                </div>
            </div>
        </div>
    );
}

