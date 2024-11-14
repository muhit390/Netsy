// src/redux/reviews.js
export const SET_REVIEWS = "reviews/setReviews";
export const ADD_REVIEW = "reviews/addReview";
export const DELETE_REVIEW = "reviews/deleteReview";

export const setReviews = (reviews, productId) => ({
  type: SET_REVIEWS,
  payload: { reviews, productId },
});

export const addReview = (review) => ({
  type: ADD_REVIEW,
  payload: review,
});

export const deleteReview = (reviewId, productId) => ({
  type: DELETE_REVIEW,
  payload: { reviewId, productId },
});

// Thunks
export const fetchReviews = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}/reviews`);
  const data = await response.json();
  dispatch(setReviews(data, productId));
};

export const postReview = (review) => async (dispatch) => {
  const response = await fetch(`/api/products/${review.productId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  const data = await response.json();
  dispatch(addReview(data));
};

const initialState = {};

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return { ...state, [action.payload.productId]: action.payload.reviews };
    case ADD_REVIEW:
      return {
        ...state,
        [action.payload.productId]: [
          ...(state[action.payload.productId] || []),
          action.payload,
        ],
      };
    case DELETE_REVIEW:
      return {
        ...state,
        [action.payload.productId]: state[action.payload.productId].filter(
          (review) => review.id !== action.payload.reviewId
        ),
      };
    default:
      return state;
  }
}
