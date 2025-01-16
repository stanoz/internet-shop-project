import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteProduct, getAllProducts} from "../../../../utils/admin.js";
import ErrorPage from "../../../pages/ErrorPage.jsx";
import LoadingIndicator from "../../LoadingIndicator.jsx";
import {Link} from "react-router-dom";
import Button from "../../Button.jsx";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {productDetailsAction} from "../../../redux/product-details.jsx";

export default function ManageProducts() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const queryClient = useQueryClient();

    const dispatch = useDispatch()

    const {isSuccess, isLoading, error, isError, data} = useQuery({
        queryKey: ['products', 'all'],
        queryFn: getAllProducts,
    })

    const {mutate, isSuccess: deleteSuccess, error: deleteError} = useMutation({
        mutationFn: deleteProduct
    })

    const handleDeleteClick = (productId) => {
        setProductToDelete(productId);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        mutate(productToDelete)
    };

    useEffect(() => {
        if (deleteSuccess) {
            queryClient.invalidateQueries(['products', 'all'])
        }
    }, [deleteSuccess]);

    const handleEditClick = (productId) => {
        dispatch(productDetailsAction.setId({id: productId}));
    }

    return (
        <>
            <div className='flex justify-center'>
                <Link
                    to='/admin-panel'
                    className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md text-center text-xl text-white mt-5'>
                    Return to Admin Panel</Link>
            </div>
            {isError && <ErrorPage error={error}/>}
            {isLoading && <LoadingIndicator/>}
            {isSuccess && (
                <div className='flex flex-col items-center my-4'>
                    <Link to='/add-product'
                          className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md text-lg text-white mb-6'>Add
                        Product</Link>
                    {data.data.length > 0 ? (
                        <ul>
                            {data.data.map(product => (
                                <li key={product._id}
                                    className='flex space-y-10 items-center border border-gray-500 rounded-sm p-2'>
                                    <div className='flex flex-col'>
                                        <p>ID: {product._id}</p><p>Title: {product.title}</p>
                                    </div>
                                    <div className='flex space-x-4'>
                                        <Link to='/edit-product'
                                              className='bg-orange-400 hover:bg-orange-500 text-center text-white px-2 py-1 rounded-md'
                                              onClick={() => handleEditClick(product._id)}>Edit</Link>
                                        <Button
                                            cssClasses='bg-red-600 hover:bg-red-700 text-white text-center px-2 py-1 rounded-md'
                                            onClick={() => handleDeleteClick(product._id)}
                                        >Delete</Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No products found!</p>
                    )
                    }
                </div>
            )}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <p>Are you sure you want to delete this product?</p>
                        <div className="flex space-x-4 mt-4">
                            <Button cssClasses='bg-red-600 hover:bg-red-700 text-white text-center px-2 py-1 rounded-md'
                                    onClick={confirmDelete}>Yes</Button>
                            <Button
                                cssClasses='bg-gray-600 hover:bg-gray-700 text-white text-center px-2 py-1 rounded-md'
                                onClick={() => setIsModalOpen(false)}>No</Button>
                        </div>
                        {deleteSuccess &&
                            <p className='text-lg text-center text-green-500'>Product deleted successfully!</p>}
                        {deleteError &&
                            <p className='text-lg text-center text-red-600'>{error?.response?.data?.message || 'Error occurred!'}</p>}
                        {(deleteSuccess || deleteError) && <Button onClick={() => setIsModalOpen(false)}
                                                                   cssClasses='text-center px-2 py-1 bg-sky-300 hover:bg-cyan-300 rounded-md'
                        >OK</Button>}
                    </div>
                </div>
            )}
        </>
    )
}