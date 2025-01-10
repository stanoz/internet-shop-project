import {FaCartPlus} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

export default function Product({product}) {

    const navigate = useNavigate();

    const handleClickProduct = (productId) => {
        navigate(`/product-details/${productId}`)
    }

    return (
        <div
            onClick={() => handleClickProduct(product._id)}
            className='border-2 border-neutral-300 block m-2.5 rounded-md hover:border-neutral-500 cursor-pointer '>

            <img className='w-64 h-64 object-cover  rounded-t-md' src={product.image} alt={product.title}/>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='ml-1 mt-0.5 mb-1'>{product.title}</h2>
                    <span className='ml-1 mb-1 block'>{product.price}</span>
                </div>
                <FaCartPlus className='ml-2 mr-4 hover:text-green-400' size={30}/>
            </div>
        </div>
    )
}