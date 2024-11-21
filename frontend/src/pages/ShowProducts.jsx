import {useQuery} from "@tanstack/react-query";
import {fetchProducts} from "../../utils/product.js";
import LoadingIndicator from "../components/LoadingIndicator.jsx";

export default function ShowProducts() {
    const {error, data, isPending, isError} = useQuery({
        queryKey:['products'],
        queryFn: ({signal}) => fetchProducts({signal})
    })

    return (
        <>
            {isPending && <LoadingIndicator />}
        </>
    );
}