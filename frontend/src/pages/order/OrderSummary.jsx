import {Link} from "react-router-dom";
import Button from "../../components/Button.jsx";
import Steps from "../../components/Steps.jsx";
import {useCart} from "../../reducer/cart-context.jsx";
import {useSelector} from "react-redux";
import {useMutation} from "@tanstack/react-query";
import {sendOrder} from "../../../utils/order.js";

export default function OrderSummary() {
    const {state} = useCart();
    const userData = useSelector((state) => state.userData);
    const {deliveryMethod, address, paymentMethod} = useSelector((state) => state.orderMethod);

    const {mutate, isSuccess, error} = useMutation({
        mutationKey: ['order'],
        mutationFn: sendOrder,
    });

    const handleSendOrder = () => {
        mutate({
            cart: state,
            userData: {
                name: userData.name,
                surname: userData.surname,
                email: userData.email
            },
            deliveryMethod,
            address,
            paymentMethod
        })
    }
console.log(error)
    return (
        <div className='flex flex-col items-center'>
            <Steps step={4}/>
            <div className='border-2 border-violet-600 rounded-sm p-4 mt-6 flex flex-col space-y-6'>
                <h1 className='text-xl text-center'>ORDER SUMMARY</h1>
                <div>
                    <h2 className='text-lg text-center'>Your Cart</h2>
                    <ul>
                        {state.items.length > 0 ? state.items.map((item) => (
                            <li key={item._id} className='flex items-center justify-between'>
                                <span>
                                    {item.title} - ${item.price} x{item.count}
                                </span>
                            </li>
                        )) : <span>Your cart is empty!</span>}
                    </ul>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-lg text-center'>Your Data</h2>
                    <div className='flex'>
                        <p>Name:&nbsp;</p>{userData.name}
                    </div>
                    <div className='flex'>
                        <p>Surname:&nbsp;</p>{userData.surname}
                    </div>
                    <div className='flex'>
                        <p>Email:&nbsp;</p>{userData.email}
                    </div>
                </div>
                <div>
                    <h2 className='text-lg text-center'>Delivery Method</h2>
                    <span className='text-center block'>{deliveryMethod}</span>
                </div>
                <div>
                    <h2 className='text-lg text-center'>Delivery Address</h2>
                    <ul>
                        <li><span>Street: {address.street}</span></li>
                        <li><span>City: {address.city}</span></li>
                        <li><span>State: {address.state}</span></li>
                        <li><span>Zip Code: {address.zipCode}</span></li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-lg text-center'>Payment Method</h2>
                    <span className='text-center block'>{paymentMethod}</span>
                </div>
                <div className='flex space-x-6 mt-6 justify-center'>
                    <Link to='/order/step3'
                          className='hover:bg-violet-500 bg-indigo-500 text-center text-lg text-white px-2 py-1 rounded-md'
                    >Previous</Link>
                    <Button
                        onClick={handleSendOrder}
                        cssClasses='hover:bg-violet-500 bg-indigo-500 text-center text-lg text-white px-2 py-1 rounded-md'
                    >Order&Pay</Button>
                </div>
            </div>
            {isSuccess && (
                <div className='flex flex-col items-center space-y-3 border border-green-500 rounded-sm p-2'>
                    <p>Order created successfully! You should receive confirmation email.</p>
                    <Link to='/' className='hover:bg-blue-400 bg-sky-400 text-center text-lg text-white px-2 py-1 rounded-md'>Return to the main page</Link>
                </div>
            )}
            {error && <p className='border border-yellow-400 rounded-sm p-3 text-lg text-center text-red-600 mt-5 block'>Something went wrong! Please try again later!</p>}
        </div>
    )
}