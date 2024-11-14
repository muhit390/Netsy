import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../../redux/reviews";
import "./Reviews.css";

function ReviewForm({ productId }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { review, rating, productId };
    dispatch(addReview(newReview));
    setReview("");
    setRating(1);
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h4>Add a Review</h4>
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review here..."
        required
        className="review-textarea"
      ></textarea>
      <button type="submit" className="submit-review-button">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
