import {useQuery} from "@tanstack/react-query";
import {fetchProducts} from "../../utils/product.js";
import ErrorPage from "../pages/ErrorPage.jsx";

export default function Filters() {
    const {data, isError, error} = useQuery({
        queryKey: ['products', 'sizes'],
        queryFn: ({signal}) => fetchProducts({signal})
    })

    const sizes = Array.from(new Set(data?.map(p => (p.size)))) || null;

    return (
        <form>
            {isError && <ErrorPage error={error}/>}
            <label>Filter by:</label>
            <select>
                <option>None</option>
                <option>Price ascending</option>
                <option>Price descending</option>
            </select>
            <ul>
                {sizes && sizes.map(size => (
                    <li key={size}><label>
                        <input id={size} name={size} type='checkbox' value={size}/>{size}
                    </label></li>
                ))}
            </ul>
        </form>
    )
}