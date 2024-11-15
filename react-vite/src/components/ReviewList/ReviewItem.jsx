import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, removeReview } from "../../redux/reviews";
import "./Reviews.css";

function ReviewItem({ review, productId }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  const handleDelete = async () => {
    await dispatch(removeReview(review.id, productId)); // Delete review
    await dispatch(fetchReviews(productId))
  };

  return (
    <div className="review-item">
      <div className="review-header">
        <span className="review-username">{review.username}</span>
        <span className="review-rating">Rating: {review.rating} / 5</span>
      </div>
      <p className="review-text">{review.review}</p>
      {currentUser && currentUser.id === review.user_id && (
        <button onClick={handleDelete} className="delete-review-button">
          Delete
        </button>
      )}
    </div>
  );
}

export default ReviewItem;
