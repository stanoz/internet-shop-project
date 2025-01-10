import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {getProductDetails} from "../../utils/product.js";
import ErrorPage from "./ErrorPage.jsx";
import LoadingIndicator from "../components/LoadingIndicator.jsx";
import ProductDetails from "../components/ProductDetails.jsx";
import ConnectedProducts from "../components/ConnectedProducts.jsx";

export default function ShowProductDetails() {
    const {productId} = useParams()

    const {isSuccess, isLoading, data: product, isError, error} = useQuery({
        queryKey: ['product', 'details', productId],
        queryFn: () => getProductDetails(productId)
    })

    return (
        <>
            {isError && <ErrorPage error={error}/>}
            {isLoading && <LoadingIndicator/>}
            {isSuccess && (
                <>
                    <ProductDetails product={product}/>
                    <ConnectedProducts category={product.category} />
                </>
            )}
        </>
    )
}