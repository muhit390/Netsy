export const ADD_TO_FAVORITES = "favorites/addToFavorites";
export const REMOVE_FROM_FAVORITES = "favorites/removeFromFavorites";
export const SET_FAVORITES = "favorites/setFavorites";

// Action creators
export const addToFavorites = (product) => ({
  type: ADD_TO_FAVORITES,
  payload: product,
});

export const removeFromFavorites = (productId) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: productId,
});

export const setFavorites = (favorites) => ({
  type: SET_FAVORITES,
  payload: favorites,
});

// Thunk for fetching favorites from backend
// export const fetchFavorites = () => async (dispatch) => {
//   const response = await fetch("/api/favorites");
//   const data = await response.json();
//   dispatch(setFavorites(data));
// };

export const fetchFavorites = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${userId}/favorites`);
    if (!response.ok) {
      throw new Error("Failed to fetch favorites");
    }
    const data = await response.json();
    dispatch(setFavorites(data));
  } catch (error) {
    console.error("Error fetching favorites:", error);
  }
};

export const addFavoriteToBackend = (userId, product) => async(dispatch) => {
  try {
    const response = await fetch(`/api/users/${userId}/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: product.id }),
    });

    if (!response.ok) {
      throw new Error("Failed to add favorite");
    }

    dispatch(addToFavorites(product));

  } catch (error) {
    console.error("Error adding favorite:", error);
  }
  
}

export const removeFavoriteFromBackend = (userId, productId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${userId}/favorites/${productId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to remove favorite");
    }
    dispatch(removeFromFavorites(productId));
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
};



const initialState = [];

// export default function favoritesReducer(state = initialState, action) {
//   switch (action.type) {
//     case SET_FAVORITES:
//       return action.payload;
//     case ADD_TO_FAVORITES:
//       return [...state, action.payload];
//     case REMOVE_FROM_FAVORITES:
//       return state.filter((item) => item.id !== action.payload);
//     default:
//       return state;
//   }
// }

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FAVORITES:
      return action.payload; // Replace current state with fetched favorites

    case ADD_TO_FAVORITES:
      // Prevent duplicates by checking for existing product
      if (state.some((item) => item.id === action.payload.id)) {
        return state;
      }
      return [...state, action.payload];

    case REMOVE_FROM_FAVORITES:
      // Remove product by filtering out the product with matching ID
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}