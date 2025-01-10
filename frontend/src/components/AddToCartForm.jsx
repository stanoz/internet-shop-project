import {FaCartPlus} from "react-icons/fa";
import {useRef} from "react";
import {addProductWithCount} from "../reducer/cart-actions.jsx";
import {useCart} from "../reducer/cart-context.jsx";

export default function AddToCartForm({product}) {
    const { dispatch } = useCart();
    const quantityRef = useRef(1);

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(addProductWithCount(product, parseInt(quantityRef.current.value)));
    };

    return (
        <div className='border h-fit flex flex-col'>
            <form className='flex items-center p-2 ml-2 space-x-5' onSubmit={handleSubmit}>
                <input
                    type='number'
                    step={1}
                    min={1}
                    max={product.quantity}
                    ref={quantityRef}
                    defaultValue={1}
                    />
                <FaCartPlus onClick={handleSubmit} className='ml-2 mr-4 hover:text-green-400 cursor-pointer' size={30}/>
            </form>
            <p className='ml-2'>{product.quantity} left!</p>
        </div>
    )
}