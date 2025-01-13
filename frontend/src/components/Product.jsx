import {FaCartPlus} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useCart} from "../reducer/cart-context.jsx";
import {addProduct} from "../reducer/cart-actions.jsx";
import {useCallback} from "react";

export default function Product({product}) {
    const {dispatch} = useCart();
    const navigate = useNavigate();

    const handleClickProduct = (productId) => {
        navigate(`/product-details/${productId}`)
    }

    const handleClickCart = useCallback(() => {
        dispatch(addProduct(product))
    }, [dispatch]);

    return (
        <div className='border-2 border-neutral-300 block m-2.5 rounded-md hover:border-neutral-500 cursor-pointer'>
            <div onClick={() => handleClickProduct(product._id)}>
                <img className='w-64 h-64 object-cover  rounded-t-md' src={product.image} alt={product.title}/>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='ml-1 mt-0.5 mb-1'>{product.title}</h2>
                        <span className='ml-1 mb-1 block'>{product.price.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <div className='relative'>
                <FaCartPlus className='ml-2 mr-4 hover:text-green-400 absolute right-0 bottom-2' size={30}
                            onClick={handleClickCart}/>
            </div>
        </div>
    )
}