import {useQuery} from "@tanstack/react-query";
import ErrorPage from "../../../pages/ErrorPage.jsx";
import LoadingIndicator from "../../LoadingIndicator.jsx";
import {Link} from "react-router-dom";
import {adminManagementAction} from "../../../redux/admin-management.jsx";
import {useDispatch} from "react-redux";
import {getAllOrders} from "../../../../utils/admin.js";

export default function ManageOrders() {
    const dispatch = useDispatch()

    const {error, data, isLoading, isError, isSuccess} = useQuery({
        queryKey: ['orders', 'all'],
        queryFn: ({signal}) => getAllOrders({signal})
    });

    const handleEditClick = (orderId) => {
        dispatch(adminManagementAction.setId({orderId: orderId}));
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
            {isError && <ErrorPage error={error}/>}
            {isLoading && <LoadingIndicator/>}
            {isSuccess && (
                <div className='flex flex-col items-center my-4'>
                    {data.data.length > 0 ? (
                        <ul>
                            {data.data.map(order => (
                                <li key={order._id}
                                    className='flex space-y-10 items-center border border-gray-500 rounded-sm p-2'>
                                    <div className='flex flex-col space-y-2'>
                                        <p className='text-lg'>Order ID: {order._id}</p>
                                        <p>Status: {order.orderStatus}</p>
                                        <p>User: {order.user.name} {order.user.surname}</p>
                                        <p>Email: {order.user.email}</p>
                                        <p>Total Price: ${order.payment.price}</p>
                                        <p>Payment Status: {order.payment.paymentStatus}</p>
                                        <p>Delivery Method: {order.delivery.method}</p>
                                        <p>Delivery Status: {order.delivery.deliveryStatus}</p>
                                    </div>
                                    <div className='flex '>
                                        <Link to='/edit-order'
                                              className='bg-orange-400 hover:bg-orange-500 text-center text-white px-2 py-1 rounded-md'
                                              onClick={() => handleEditClick(order._id)}>
                                            Edit
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No orders found!</p>
                    )}
                </div>
            )}
        </>
    );
}
