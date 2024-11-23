import {useQuery} from "@tanstack/react-query";
import {fetchProducts} from "../../utils/product.js";
import LoadingIndicator from "../components/LoadingIndicator.jsx";
import Product from "../components/Product.jsx";
import ErrorPage from "./ErrorPage.jsx";

export default function ShowProducts() {
    const {error, data, isLoading, isError, isSuccess} = useQuery({
        queryKey:['products'],
        queryFn: ({signal}) => fetchProducts({signal})
    })

    return (
        <>
            {isError && <ErrorPage error={error}/>}
            {isLoading && <LoadingIndicator />}
            {isSuccess && (
                <ul>
                    {data.map(product => (
                        <li key={product._id}><Product product={product}/></li>
                    ))}
                </ul>
            )}
        </>
    );
}