import {useQuery} from "@tanstack/react-query";
import {getSearchProducts} from "../../utils/product.js";
import ErrorPage from "../pages/ErrorPage.jsx";
import LoadingIndicator from "./LoadingIndicator.jsx";
import Product from "./Product.jsx";

export default function ConnectedProducts({category}) {

    const {isError, isSuccess, isLoading, data: connectedProducts, error} = useQuery({
        queryKey: ['products', 'connected'],
        queryFn: () => getSearchProducts(category, 0, null, [], 'none', null)
    })
    return (
        <>
            {isError && <ErrorPage error={error}/>}
            {isLoading && <LoadingIndicator />}
            {isSuccess && (
                <ul className='flex flex-wrap justify-center'>
                    {connectedProducts.slice(0, 3).map(product => (
                        <li key={product._id}><Product product={product}/></li>
                    ))}
                </ul>
            )}
        </>
    )
}