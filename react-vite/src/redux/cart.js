// src/redux/cart.js

// Action Types
export const ADD_TO_CART = "cart/addToCart";
export const REMOVE_FROM_CART = "cart/removeFromCart";
export const UPDATE_QUANTITY = "cart/updateQuantity";
export const CLEAR_CART = "cart/clearCart";

// Action Creators
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, quantity },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

// Initial State
const initialState = [];

// Helper function to check if item already exists in cart
const findCartItem = (cart, productId) => cart.find((item) => item.id === productId);

// Reducer
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = findCartItem(state, action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    }

    case REMOVE_FROM_CART:
      return state.filter((item) => item.id !== action.payload);

    case UPDATE_QUANTITY:
      return state.map((item) =>
        item.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case CLEAR_CART:
      return [];

    default:
      return state;
  }
}
