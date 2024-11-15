import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviews } from "../../redux/reviews"; // Assuming you have a fetchReviews thunk
import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm";
import "./Reviews.css";

function ReviewList({ productId }) {
  console.log(productId)
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  let reviews = useSelector((state) => Object.values(state.reviews));

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchReviews(productId)); // Fetch reviews for the product
    };
    fetchData();
  }, [dispatch, productId]);

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
      {user ? (
        <ReviewForm productId={productId} />
      ) : (
        <p>Sign in to post a review!</p>
      )}
    </div>
  ) || <p>Loading...</p>;
}

export default ReviewList;
