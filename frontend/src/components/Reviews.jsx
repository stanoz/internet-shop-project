import Review from "./Review.jsx";
import { Rate } from "antd";
import {useMemo} from "react";

export default function Reviews({reviews}) {
    const averageRating = useMemo(() => {
        return reviews.reduce((sum, review) => sum + review.rate, 0) / reviews.length;
    }, [reviews]);

    return (
        reviews.length > 0 ?
            (
                <div>
                    <p>Average rating: <Rate allowHalf disabled defaultValue={averageRating}/></p>
                    <ul>
                        {reviews.map((review) => (
                            <li key={review._id}><Review review={review}/></li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className='text-xl text-center'>There are no reviews for this product!</p>
            )

    )
}