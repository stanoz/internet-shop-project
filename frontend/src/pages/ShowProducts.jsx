import {useMutation, useQuery} from "@tanstack/react-query";
import {fetchProducts} from "../../utils/product.js";
import LoadingIndicator from "../components/LoadingIndicator.jsx";
import Product from "../components/Product.jsx";
import ErrorPage from "./ErrorPage.jsx";
import {fetchCategories} from "../../utils/category.js";

export default function ShowProducts() {
    let products = []
    const {error, data, isLoading, isError, isSuccess} = useQuery({
        queryKey:['products'],
        queryFn: ({signal}) => fetchProducts({signal})
    })

    // const {error: searchError, mutateAsync: data , isLoading: searchIsLoading, isError: searchIsError, isSuccess: searchIsSuccess} = useMutation({
    //     mutateKey: ['products', 'search'],
    //     mutateFn: ({signal}) => fetchCategories({signal})
    // })

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