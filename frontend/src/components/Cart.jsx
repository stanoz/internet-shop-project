import { decrementCount, incrementCount, removeProduct } from "../reducer/cart-actions.jsx";
import { useCart } from "../reducer/cart-context.jsx";

export default function Cart() {
    const { state, dispatch } = useCart();

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
            <div>
                <h2>Cart</h2>
                <ul>
                    {state.items.map((item) => (
                        <li key={item._id}>
                            {item.title} - ${item.price} x {item.count}
                            <button onClick={() => handleIncrement(item._id)}>+</button>
                            <button onClick={() => handleDecrement(item._id)}>-</button>
                            <button onClick={() => handleRemoveProduct(item._id)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <h3>Total: ${state.totalPrice}</h3>
            </div>
        ) : (
            <p>Cart is empty!</p>
        )
    );
}