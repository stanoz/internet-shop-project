import {useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchCategories} from "../../utils/category.js";
import ErrorPage from "../pages/ErrorPage.jsx";
import LoadingIndicator from "./LoadingIndicator.jsx";
import Button from "./Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {productAction} from "../redux/product.jsx";

export default function Categories() {
    const {error, data, isLoading, isError, isSuccess} = useQuery({
        queryKey: ['products', 'categories'],
        queryFn: ({signal}) => fetchCategories({signal})
    })


    const selectedCategory = useSelector((state) => state.product.category)
    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    const handleCategoryClick = (category) => {
        dispatch(productAction.setSearchParams({category}))
        queryClient.invalidateQueries(['products', 'search'])
    }

    return (
        <div className='absolute'>
            {isError && <ErrorPage error={error}/>}
            {isLoading && <LoadingIndicator/>}
            {isSuccess && (
                <ul className='flex flex-wrap justify-center'>
                    <li className='mx-3 text-2xl font-semibold text-zinc-900 hover:border-b-2 hover:border-cyan-300'
                    key={"all"}>
                        <Button onClick={() =>  handleCategoryClick('all')} cssClasses={selectedCategory === 'all' ? 'border-b-2 border-cyan-300' : undefined}>All</Button>
                    </li>
                    {data.map(category => (
                        <li className='mx-3 text-2xl font-semibold text-zinc-900 hover:border-b-2 hover:border-cyan-300'
                            key={category._id}><Button onClick={() => handleCategoryClick(category.name)} cssClasses={selectedCategory === category.name ? 'border-b-2 border-cyan-300' : undefined}>{category.name}</Button></li>
                    ))}
                </ul>
            )}
        </div>
    )
}