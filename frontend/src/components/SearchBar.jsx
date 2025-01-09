import {LiaSearchSolid} from "react-icons/lia";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {productAction} from "../redux/product.jsx";
import {fetchProductNames} from "../../utils/product.js";

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredNames, setFilteredNames] = useState([]);
    const [showHints, setShowHints] = useState(false);

    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const {data: productNames = [], isLoading, isError} = useQuery({
        queryKey:['productNames'],
        queryFn: fetchProductNames
    });


    useEffect(() => {
        if (searchTerm) {
            const hints = productNames.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredNames(hints);
            setShowHints(true);
        } else {
            setShowHints(false);
        }
    }, [searchTerm, productNames]);

    const handleSearch = (event) => {
        event.preventDefault();
        dispatch(productAction.setSearchParams({title: searchTerm}));
        queryClient.invalidateQueries(['products', 'search']);
    }

    const handleHintClick = (hint) => {
        setSearchTerm(hint);
        dispatch(productAction.setSearchParams({title: hint}));
        queryClient.invalidateQueries(['products', 'search']);
        setShowHints(false);
    }

    return (
        <div className='bg-white w-fit p-1 border-b border-neutral-950'>
            <form onSubmit={handleSearch} className='inline-flex'>
                <LiaSearchSolid size={18} className='mr-2 mt-1'/> <input
                type='text'
                placeholder='Search...'
                value={searchTerm}
                onBlur={() => setShowHints(false)}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </form>
            {showHints && filteredNames.length > 0 && (
                <ul className='absolute bg-white border border-neutral-950 mt-1 w-fit z-50 ml-8 pl-2'>
                    {filteredNames.map((name) => (
                        <li
                            key={name}
                            className='p-2 cursor-pointer hover:bg-gray-200'
                            onMouseDown={() => handleHintClick(name)}
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}