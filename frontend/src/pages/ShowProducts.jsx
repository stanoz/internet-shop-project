import {useQuery} from "@tanstack/react-query";
import {getSearchProducts} from "../../utils/product.js";
import LoadingIndicator from "../components/LoadingIndicator.jsx";
import Product from "../components/Product.jsx";
import ErrorPage from "./ErrorPage.jsx";
import {useSelector} from "react-redux";
import {useLayoutEffect} from "react";

export default function ShowProducts() {
    const {category, minPrice, maxPrice, sizes, sort, title} = useSelector((state) => state.product)

    const {error, data: products , isLoading, isError, isSuccess} = useQuery({
        queryKey: ['products', 'search', category, minPrice, maxPrice, sizes, sort, title],
        queryFn: () => getSearchProducts(category, minPrice, maxPrice, sizes, sort, title)
    })

    useLayoutEffect(() => {
        if (isSuccess) {
            window.scrollTo(0, 0);
        }
    }, [isSuccess, products]);

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