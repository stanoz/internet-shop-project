import {useQuery} from "@tanstack/react-query";
import {fetchCategories} from "../../utils/category.js";
import ErrorPage from "../pages/ErrorPage.jsx";
import LoadingIndicator from "./LoadingIndicator.jsx";
import Button from "./Button.jsx";

export default function Categories() {
    const {error, data, isLoading, isError, isSuccess} = useQuery({
        queryKey: ['products', 'categories'],
        queryFn: ({signal}) => fetchCategories({signal})
    })

    return (
        <div className='absolute'>
            {isError && <ErrorPage error={error}/>}
            {isLoading && <LoadingIndicator />}
            {isSuccess && (
                <ul className='flex flex-wrap justify-center'>
                    {data.map(category => (
                        <li className='mx-3 text-2xl font-semibold text-zinc-900 hover:border-b-2 hover:border-cyan-300'
                            key={category._id}><Button>{category.name}</Button></li>
                    ))}
                </ul>
            )}
        </div>
    )
}