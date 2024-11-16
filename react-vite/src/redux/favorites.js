export const ADD_TO_FAVORITES = "favorites/addToFavorites";
export const REMOVE_FROM_FAVORITES = "favorites/removeFromFavorites";
export const GET_FAVORITES = "favorites/setFavorites";

// Action creators
export const addToFavorites = (product) => ({
  type: ADD_TO_FAVORITES,
  payload: product,
});

export const removeFromFavorites = (product) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: product,
});

export const getFavorites = (favorites) => ({
  type: GET_FAVORITES,
  payload: favorites,
});

// Thunk for fetching favorites from backend
export const fetchFavorites = (user_id) => async (dispatch) => {
  const response = await fetch(`/api/${user_id}/favorites`);
  const data = await response.json();
  await dispatch(getFavorites(data));
  return data
};

export const addFavorite = (product_id, user_id) => async (dispatch) => {
  const response = await fetch(`/favorites/users/${user_id}`, {
    method: 'POST',
    body: {'product_id': product_id},
    headers: {'Content-Type': "application/json"}
  })

  if (response.ok) {
    const data = await response.json()
    await dispatch(addToFavorites(data))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
} 

export const removeFavorite = (product_id, user_id) => async (dispatch) => {
  const response = await fetch(`/favorites/users/${user_id}/${product_id}`, {
    method: 'DELETE',
  })

  if (response.ok) {
    const data = await response.json()
    await dispatch(removeFromFavorites(data))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
} 




const initialState = {};

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITES:
      return {...state, ...action.payload};
    case ADD_TO_FAVORITES:
      return {...state, ...action.payload};
    case REMOVE_FROM_FAVORITES:
      delete state.favorites[action.payload.id]
      return {...state}
    default:
      return state;
  }
}
