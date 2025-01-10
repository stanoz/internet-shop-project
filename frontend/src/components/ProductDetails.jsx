import Reviews from "./Reviews.jsx";
import {FaCartPlus} from "react-icons/fa";
import AddToCartForm from "./AddToCartForm.jsx";

export default function ProductDetails({product}) {
    return (
        <div className='flex justify-center space-y-5'>
            <div className='flex flex-col bg-cyan-50 w-fit p-4'>
                <h3 className='text-lg'>{product.title}</h3>
                <p>Size: {product.size}</p>
                <div>Price: {product.price}</div>
                <div className='flex justify-center'>
                    <img src={product.image} alt={product.title} className='w-44 my-2'/>
                </div>
                <p>Category: {product.category}</p>
                <div className='max-w-96 mb-4'>
                    <p>Description:</p>
                    <p>{product.description}</p>
                </div>
                <Reviews reviews={product.reviews}/>
            </div>
            <AddToCartForm product={product} />
        </div>
    )
}