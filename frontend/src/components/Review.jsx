import { Rate } from "antd";

export default function Review({review}) {
    return (
        <div className='border-2 m-2 p-2 rounded-sm'>
            <Rate allowHalf disabled defaultValue={review.rate}/>
            <div>
                <p>Author: {review.author}</p>
                <p className='max-w-96'>{review.description}</p>
            </div>
        </div>
    )
}