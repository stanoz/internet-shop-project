import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCategories } from "../../../../utils/category.js";
import ErrorPage from "../../../pages/ErrorPage.jsx";
import LoadingIndicator from "../../LoadingIndicator.jsx";
import { Link } from "react-router-dom";
import Button from "../../Button.jsx";
import { useEffect, useState } from "react";
import {adminManagementAction} from "../../../redux/admin-management.jsx";
import {deleteCategory} from "../../../../utils/admin.js";
import {useDispatch} from "react-redux";

export default function ManageCategories() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const queryClient = useQueryClient();
    const dispatch = useDispatch()

    const { error, data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['products', 'categories'],
        queryFn: ({ signal }) => fetchCategories({ signal })
    });

    const { mutate, isSuccess: deleteSuccess, error: deleteError } = useMutation({
        mutationFn: deleteCategory
    });

    const handleDeleteClick = (categoryId) => {
        setCategoryToDelete(categoryId);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        mutate(categoryToDelete);
    };

    useEffect(() => {
        if (deleteSuccess) {
            queryClient.invalidateQueries(['products', 'categories']);
        }
    }, [deleteSuccess]);

    const handleEditClick = (categoryId) => {
        dispatch(adminManagementAction.setId({categoryId: categoryId}));
    }

    return (
        <>
            <div className='flex justify-center'>
                <Link
                    to='/admin-panel'
                    className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md text-center text-xl text-white mt-5'>
                    Return to Admin Panel
                </Link>
            </div>
            {isError && <ErrorPage error={error} />}
            {isLoading && <LoadingIndicator />}
            {isSuccess && (
                <div className='flex flex-col items-center my-4'>
                    <Link to='/add-category'
                          className='bg-sky-300 hover:bg-cyan-300 px-2 py-1 rounded-md text-lg text-white mb-6'>Add
                        Category</Link>
                    {data.length > 0 ? (
                        <ul>
                            {data.map(category => (
                                <li key={category._id}
                                    className='flex space-y-10 items-center border border-gray-500 rounded-sm p-2'>
                                    <div className='flex flex-col'>
                                        <p>ID: {category._id}</p><p>Name: {category.name}</p>
                                    </div>
                                    <div className='flex space-x-4'>
                                        <Link to='/edit-category'
                                              className='bg-orange-400 hover:bg-orange-500 text-center text-white px-2 py-1 rounded-md'
                                              onClick={() => handleEditClick(category._id)}>
                                            Edit
                                        </Link>
                                        <Button
                                            cssClasses='bg-red-600 hover:bg-red-700 text-white text-center px-2 py-1 rounded-md'
                                            onClick={() => handleDeleteClick(category._id)}
                                        >Delete</Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No categories found!</p>
                    )}
                </div>
            )}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <p>Are you sure you want to delete this category?</p>
                        <div className="flex space-x-4 mt-4">
                            <Button cssClasses='bg-red-600 hover:bg-red-700 text-white text-center px-2 py-1 rounded-md'
                                    onClick={confirmDelete}>Yes</Button>
                            <Button
                                cssClasses='bg-gray-600 hover:bg-gray-700 text-white text-center px-2 py-1 rounded-md'
                                onClick={() => setIsModalOpen(false)}>No</Button>
                        </div>
                        {deleteSuccess &&
                            <p className='text-lg text-center text-green-500'>Category deleted successfully!</p>}
                        {deleteError &&
                            <p className='text-lg text-center text-red-600'>{deleteError?.response?.data?.message || 'Error occurred!'}</p>}
                        {(deleteSuccess || deleteError) && <Button onClick={() => setIsModalOpen(false)}
                                                                   cssClasses='text-center px-2 py-1 bg-sky-300 hover:bg-cyan-300 rounded-md'>
                            OK
                        </Button>}
                    </div>
                </div>
            )}
        </>
    );
}
