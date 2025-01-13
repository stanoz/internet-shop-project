import {useCart} from "../../reducer/cart-context.jsx";
import Steps from "../../components/Steps.jsx";
import {Link} from "react-router-dom";

export default function OrderShowCart() {
    const {state} = useCart();

    return (
        <div className='flex flex-col items-center'>
            <Steps step={1}/>
            <h2>Your Cart:</h2>
            {state.items.length > 0 ? (
                <ul>
                    {state.items.map((item) => (
                        <li key={item._id}>
                            {item.title} - ${item.price} x{item.count}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Cart is empty!</p>
            )}
            <h3>Total: ${state.totalPrice.toFixed(2)}</h3>
            <div className='flex space-x-6 mt-6'>
                <Link to='/order/step2'
                      className='hover:bg-violet-500 bg-indigo-500 text-center text-lg text-white px-2 py-1 rounded-md'
                >Next</Link>
            </div>
        </div>
    );
}