import {LiaSearchSolid} from "react-icons/lia";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useQueryClient} from "@tanstack/react-query";
import {productAction} from "../redux/product.jsx";

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const handleSearch = (event) => {
        event.preventDefault();
        dispatch(productAction.setSearchParams({title: searchTerm}));
        queryClient.invalidateQueries(['products', 'search']);
    };

    return (
        <div className='bg-white w-fit p-1 border-b border-neutral-950'>
            <form onSubmit={handleSearch} className='inline-flex'>
                <LiaSearchSolid size={18} className='mr-2 mt-1'/> <input
                type='text'
                placeholder='Search...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </form>
        </div>
    )
}