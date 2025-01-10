import Review from "./Review.jsx";

export default function Reviews({reviews}) {
    return (
        reviews.length > 0 ?
            (
                <div>
                    <p>Average rating:&nsbp;</p>
                    <ul>
                        {reviews.map((review) => {
                            <li key={review._id}><Review review={review}/></li>
                        })}
                    </ul>
                </div>
            ) : (
                <p className='text-xl text-center'>There are no reviews for this product!</p>
            )

    )
}