import {useQuery} from "@tanstack/react-query";
import {fetchProducts} from "../../utils/product.js";
import LoadingIndicator from "../components/LoadingIndicator.jsx";
import Product from "../components/Product.jsx";

export default function ShowProducts() {
    const {error, data, isPending, isError, isSuccess} = useQuery({
        queryKey:['products'],
        queryFn: ({signal}) => fetchProducts({signal})
    })

    return (
        <>
            {isPending && <LoadingIndicator />}
            {isSuccess && (
                <ul>
                    {data.map(product => (
                        <li key={product.id}><Product product={product}/></li>
                    ))}
                </ul>
            )}
        </>
    );
}