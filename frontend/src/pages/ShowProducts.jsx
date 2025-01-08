import {useQuery} from "@tanstack/react-query";
import {getSearchProducts} from "../../utils/product.js";
import LoadingIndicator from "../components/LoadingIndicator.jsx";
import Product from "../components/Product.jsx";
import ErrorPage from "./ErrorPage.jsx";

export default function ShowProducts() {

    const {error, data: products , isLoading, isError, isSuccess} = useQuery({
        queryKey: ['products', 'search'],
        queryFn: getSearchProducts
    })
console.log(products)
    return (
        <>
            {isError && <ErrorPage error={error}/>}
            {isLoading && <LoadingIndicator />}
            {isSuccess && (
                <ul className='flex flex-wrap justify-center'>
                    {products.map(product => (
                        <li key={product._id}><Product product={product}/></li>
                    ))}
                </ul>
            )}
        </>
    );
}