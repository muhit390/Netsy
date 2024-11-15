// src/redux/products.js
export const FETCH_PRODUCTS = "products/fetchProducts";
export const FETCH_PRODUCT_DETAILS = "products/fetchProductDetails";

export const fetchProducts = () => async (dispatch) => {
  const response = await fetch("/api/products");
  const data = await response.json();
  console.log(data)
  dispatch({ type: FETCH_PRODUCTS, payload: data });
  return data
};

export const fetchProductDetails = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}`);
  const data = await response.json();
  console.log(data)
  dispatch({ type: FETCH_PRODUCT_DETAILS, payload: data });
};

const initialState = {};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return [...action.payload];
    case FETCH_PRODUCT_DETAILS:
      return {...state, detail: action.payload};
    default:
      return state;
  }
}
