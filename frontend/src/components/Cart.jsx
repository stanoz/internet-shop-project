import {decrementCount, incrementCount, removeProduct} from "../reducer/cart-actions.jsx";
import {useCart} from "../reducer/cart-context.jsx";
import {FiPlusCircle} from "react-icons/fi";
import {HiOutlineMinusCircle} from "react-icons/hi";
import {FaRegTrashAlt} from "react-icons/fa";
import {Link} from "react-router-dom";

export default function Cart() {
    const {state, dispatch} = useCart();

    const handleRemoveProduct = (productId) => {
        dispatch(removeProduct(productId));
    };

    const handleIncrement = (productId) => {
        dispatch(incrementCount(productId));
    };

    const handleDecrement = (productId) => {
        dispatch(decrementCount(productId));
    };

    return (
        state.items.length > 0 ? (
            <div className='bg-sky-50 border border-violet-600 p-2'>
                <h2 className='text-center text-lg'>Your Cart</h2>
                <ul>
                    {state.items.map((item) => (
                        <li key={item._id} className='flex items-center justify-between'>
                            <div>
                                {item.title} - ${item.price} x{item.count}
                            </div>
                            <div className='flex'>
                            <FiPlusCircle
                                size={20}
                                className='cursor-pointer text-green-500 hover:text-green-600 ml-1'
                                onClick={() => handleIncrement(item._id)}/>
                            <HiOutlineMinusCircle
                                size={22}
                                className='cursor-pointer text-red-600 hover:text-red-800'
                                onClick={() => handleDecrement(item._id)}/>
                            <FaRegTrashAlt
                                size={20}
                                className='cursor-pointer hover:text-red-600'
                                onClick={() => handleRemoveProduct(item._id)}/>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className='flex justify-between mt-3 items-center'>
                    <h3 className='underline decoration-2 decoration-blue-500 text-lg'>Total:
                        ${state.totalPrice.toFixed(2)}</h3>
                    <Link to='/order/step1'
                          className='bg-violet-500 hover:bg-violet-600 text-lg text-center text-white py-0.5 px-1 rounded-md'>ORDER</Link>
                </div>
            </div>
        ) : (
            <p className='bg-sky-50 border border-amber-500 rounded-sm p-2 ml-20'>Cart is empty!</p>
        )
    );
}