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

export const getFavorites = (favorites) => ({
  type: SET_FAVORITES,
  payload: favorites,
});

// Thunk for fetching favorites from backend
export const fetchFavorites = () => async (dispatch) => {
  const response = await fetch("/api/favorites");
  if (response.ok) {
    const data = await response.json();
    dispatch(getFavorites(data));
    return data;
  } else {
    const errors = await response.json()
    return errors
  }
};

export const addFavorite = (product_id) => async (dispatch) => {
  const response = await fetch(`/api/favorites/${product_id}`, {
    method: 'POST',
    body: {'product_id': product_id},
    headers: {'Content-Type': "application/json"}
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(addToFavorites(data))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
} 

export const removeFavorite = (product_id) => async (dispatch) => {
  const response = await fetch(`/api/favorites/delete/${product_id}`, {
    method: 'DELETE',
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(removeFromFavorites(data))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
} 

const initialState = {};

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FAVORITES:
      return action.payload;
    case ADD_TO_FAVORITES:
      return [...state, action.payload];
    case REMOVE_FROM_FAVORITES:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}
