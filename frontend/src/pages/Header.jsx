import {FaCartShopping} from "react-icons/fa6"
import {VscAccount} from "react-icons/vsc"
import SearchBar from "../components/SearchBar.jsx";
import Categories from "../components/Categories.jsx";
import Filters from "../components/Filters/Filters.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Button from "../components/Button.jsx";
import {logout} from "../../utils/account.js";
import {useMutation} from "@tanstack/react-query";
import Cart from "../components/Cart.jsx";
import {useDispatch, useSelector} from "react-redux";
import {accountAction} from "../redux/account.jsx";

export default function Header() {
    const {isLoggedIn, setIsLoggedIn} = useAuth()
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [showCart, setShowCart] = useState(false)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const {pathname} = useLocation()

    const {mutate, isSuccess} = useMutation({
        mutationFn: logout,
    });

    const isAdmin = useSelector(state => state.account.isAdmin)

    const handleClickAccount = () => {
        setIsMenuVisible(!isMenuVisible);
    }

    const handleClickLink = (navigateTo) => {
        setIsMenuVisible(false);
        navigate(navigateTo)
    }

    const handleLogoutClick = () => {
        setIsMenuVisible(false)
        mutate()
        setIsMenuVisible(false)
    }

    const handleClickCart = () => {
        setShowCart(!showCart)
    }

    useEffect(() => {
        if (isSuccess) {
            setIsLoggedIn(false)
            dispatch(accountAction.signOut())
        }
    }, [isSuccess]);

    return (
        <div className="bg-sky-50 p-4 block">
            <div className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 items-center">
                <div className="flex justify-between items-center md:col-span-1">
                    <h1 className="text-2xl font-bold text-blue-500"><Link to='/'>Clothes Shop</Link></h1>

                </div>
                {pathname === '/' && (
                    <>
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
                    </>)}
                <div className="md:col-span-3 col-span-1 flex justify-end order-5">
                    <VscAccount className="text-2xl cursor-pointer mr-4 hover:text-zinc-600"
                                onClick={handleClickAccount}/>
                    {isMenuVisible && (
                        <div className="absolute mt-12 w-fit bg-white border rounded shadow-lg">
                            {!isLoggedIn ? (
                                <ul>
                                    <li onClick={() => handleClickLink('/login')}
                                        className='px-4 py-2 cursor-pointer hover:bg-stone-100'>Login
                                    </li>
                                    <li onClick={() => handleClickLink('/register')}
                                        className='px-4 py-2 cursor-pointer hover:bg-stone-100'>Register
                                    </li>
                                </ul>
                            ) : (
                                <ul>
                                    <li className='hover:bg-stone-100 text-center'><Button cssClasses='p-2' onClick={handleLogoutClick}>Log out</Button></li>
                                    <li className='hover:bg-stone-100 p-2'>{isAdmin && (
                                        <Link to='/admin-panel' className='text-center'>Admin Panel</Link>
                                    )}</li>
                                </ul>
                            )
                            }
                        </div>
                    )}
                    <FaCartShopping onClick={handleClickCart} className="text-2xl cursor-pointer hover:text-zinc-600"/>
                    {showCart && <div className='absolute w-fit h-fit mt-10 right-0'><Cart/></div>}
                </div>
            </div>
        </div>
    );
}

