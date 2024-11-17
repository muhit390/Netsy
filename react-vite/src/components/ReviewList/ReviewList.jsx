import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviews } from "../../redux/reviews"; // Assuming you have a fetchReviews thunk
import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm";
import "./Reviews.css";

function ReviewList({ productId }) { 
  console.log(productId)
  const user = useSelector((state) => state.session.user)
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews[productId] || []);

  useEffect(() => {
    dispatch(fetchReviews(productId)); // Fetch reviews for the product
  }, [dispatch, productId]);

  try {
    return (
      <div className="review-list">
        <h3 className="review-list-title">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <ReviewItem key={review.id} review={review} productId={productId} />
          ))
        )}
        {user ? (<ReviewForm productId={productId} />) : <p>Sign in to post a review!</p>}
        
      </div>
    );
  } catch (error) {
    return <h1></h1>
  }
}

export default ReviewList;
