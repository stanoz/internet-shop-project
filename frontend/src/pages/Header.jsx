import {FaCartShopping} from "react-icons/fa6"
import {VscAccount} from "react-icons/vsc"
import SearchBar from "../components/SearchBar.jsx";
import Categories from "../components/Categories.jsx";
import Filters from "../components/Filters.jsx";

export default function Header() {
    return (
        <div className="bg-sky-50 p-4 block">
            <div className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 items-center">
                <div className="flex justify-between items-center md:col-span-1">
                    <h1 className="text-2xl font-bold text-blue-500">Clothes Shop</h1>

                </div>
                <div className="md:col-span-2 order-2 md:order-1">
                    <SearchBar/>
                </div>
                <div
                    className="col-span-1 md:col-span-3 flex justify-center gap-6 text-lg font-medium text-gray-700 order-3">
                    <Categories/>
                </div>
                <div className="col-span-1 order-4">
                    <Filters/>
                </div>
                <div className="col-span-3 flex justify-end order-5">
                    <VscAccount className="text-2xl cursor-pointer mr-4"/>
                    <FaCartShopping className="text-2xl cursor-pointer"/>
                </div>
            </div>
        </div>
    );
}

