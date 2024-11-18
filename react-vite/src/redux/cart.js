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

// Thunks
export const fetchCartItemsThunk = () => async (dispatch) => {
  try {
    const res = await fetch(`/api/cart`);
    if (!res.ok) throw new Error("Failed to fetch cart items");

    const data = await res.json();
    data.forEach((item) => {
      dispatch(addToCart({ ...item, quantity: item.quantity || 1 }));
    });
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
};

export const addToCartThunk = (product) => async (dispatch) => {
  try {
    const res = await fetch(`/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!res.ok) throw new Error("Failed to add item to cart");

    const data = await res.json();
    dispatch(addToCart({ ...data, quantity: data.quantity || 1 }));
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

export const removeFromCartThunk = (productId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/cart/${productId}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to remove item from cart");

    dispatch(removeFromCart(productId));
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

export const updateQuantityThunk = (productId, quantity) => async (dispatch) => {
  try {
    const res = await fetch(`/api/cart/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });

    if (!res.ok) throw new Error("Failed to update cart item quantity");

    const data = await res.json();
    dispatch(updateQuantity(productId, data.quantity));
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
  }
};

export const clearCartThunk = () => async (dispatch) => {
  try {
    const res = await fetch(`/api/cart/clear`, {
      method: "POST",
    });

    if (!res.ok) throw new Error("Failed to clear the cart");

    dispatch(clearCart());
  } catch (error) {
    console.error("Error clearing the cart:", error);
  }
};

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
