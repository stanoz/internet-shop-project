import {useQuery} from "@tanstack/react-query";
import {fetchProducts} from "../../../utils/product.js";
import ErrorPage from "../../pages/ErrorPage.jsx";
import {useState} from "react";
import {RiArrowDropDownLine} from "react-icons/ri";
import styles from './Filters.module.css';

export default function Filters() {
    const {data, isError, error} = useQuery({
        queryKey: ['products', 'sizes'],
        queryFn: ({signal}) => fetchProducts({signal})
    })

    const sizes = Array.from(new Set(data?.map(p => (p.size)))) || null;

    const [showSizes, setShowSizes] = useState(false)

    return (
        <>
            {isError && <ErrorPage error={error}/>}
            <div className='flex flex-col'>
                <form>
                    <label className='text-lg'>Filter by:&nbsp;</label>
                    <select className='pl-1.5 rounded-sm bg-slate-100 border border-slate-950' defaultValue='none'>
                        <option value='none'>None</option>
                        <option value='price-ascending'>Price ascending</option>
                        <option value='price-descending'>Price descending</option>
                    </select>
                    <div>
                        <span className='inline-flex items-center cursor-pointer text-lg'
                              onClick={() => setShowSizes((prevState => !prevState))}>
                            Size:<RiArrowDropDownLine size={32} className={showSizes ? styles.rotate180 : styles.rotate0}/>
                        </span>
                    </div>
                    {showSizes && (<ul className='absolute bg-sky-100 p-2 rounded-sm'>
                        {sizes && sizes.map(size => (
                            <li key={size}>
                                <label>
                                    <input id={size} name={size} type='checkbox' value={size}/>&nbsp;{size}
                                </label>
                            </li>
                        ))}
                    </ul>)}
                </form>
            </div>
        </>
    )
}