import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorPage from "../../../pages/ErrorPage.jsx";
import LoadingIndicator from "../../LoadingIndicator.jsx";
import { Link } from "react-router-dom";
import Button from "../../Button.jsx";
import { useEffect, useState } from "react";
import {deleteUser, getAllUsers} from "../../../../utils/admin.js";
import {adminManagementAction} from "../../../redux/admin-management.jsx";
import {useDispatch} from "react-redux";

export default function ManageUsers() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const queryClient = useQueryClient();
    const dispatch = useDispatch()

    const { error, data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['users', 'all'],
        queryFn: ({ signal }) => getAllUsers({ signal })
    });

    const { mutate, isSuccess: deleteSuccess, error: deleteError } = useMutation({
        mutationFn: deleteUser
    });

    const handleDeleteClick = (userId) => {
        setUserToDelete(userId);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        mutate(userToDelete);
    };

    useEffect(() => {
        if (deleteSuccess) {
            queryClient.invalidateQueries(['users', 'all']);
        }
    }, [deleteSuccess]);

    const handleEditClick = (userId) => {
        dispatch(adminManagementAction.setId({userId: userId}));
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
                    {data.data.length > 0 ? (
                        <ul>
                            {data.data.map(user => (
                                <li key={user._id}
                                    className='flex space-y-10 items-center border border-gray-500 rounded-sm p-2'>
                                    <div className='flex flex-col'>
                                        <p>ID: {user._id}</p>
                                        <p>Name: {user.name} {user.surname}</p>
                                        <p>Email: {user.email}</p>
                                        <p>Admin: {user.isAdmin ? "Yes" : "No"}</p>
                                    </div>
                                    <div className='flex space-x-4'>
                                        <Link to='/edit-user'
                                              className='bg-orange-400 hover:bg-orange-500 text-center text-white px-2 py-1 rounded-md'
                                              onClick={() => handleEditClick(user._id)}>
                                            Edit
                                        </Link>
                                        <Button
                                            cssClasses='bg-red-600 hover:bg-red-700 text-white text-center px-2 py-1 rounded-md'
                                            onClick={() => handleDeleteClick(user._id)}
                                        >Delete</Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No users found!</p>
                    )}
                </div>
            )}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <p>Are you sure you want to delete this user?</p>
                        <div className="flex space-x-4 mt-4">
                            <Button cssClasses='bg-red-600 hover:bg-red-700 text-white text-center px-2 py-1 rounded-md'
                                    onClick={confirmDelete}>Yes</Button>
                            <Button
                                cssClasses='bg-gray-600 hover:bg-gray-700 text-white text-center px-2 py-1 rounded-md'
                                onClick={() => setIsModalOpen(false)}>No</Button>
                        </div>
                        {deleteSuccess &&
                            <p className='text-lg text-center text-green-500'>User deleted successfully!</p>}
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
