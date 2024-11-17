// src/redux/products.js
export const FETCH_PRODUCTS = "products/fetchProducts";
export const FETCH_PRODUCT_DETAILS = "products/fetchProductDetails";
export const PRODUCT_DELETE = "products/delete";
export const PRODUCT_EDIT = "products/edit";
export const PRODUCT_CREATE = "products/new";
export const PRODUCT_IMAGE_CREATE = "products/images/new";

export const fetchProducts = () => async (dispatch) => {
  const response = await fetch("/api/products");
  const data = await response.json();
  console.log(data);
  dispatch({ type: FETCH_PRODUCTS, payload: data });
  return data;
};

export const fetchProductDetails = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}`);
  const data = await response.json();
  console.log(data);
  await dispatch({ type: FETCH_PRODUCT_DETAILS, payload: data });
  return data;
};

export const productCreate = (product) => async (dispatch) => {
  let body = {
    category: product.category,
    description: product.description,
    name: product.name,
    owner_id: product.owner_id,
    price: product.price,
    quantity: product.quantity,
  };
  try {
    const response = await fetch("/api/products", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      let data = response.json();
      await dispatch({ type: PRODUCT_CREATE, payload: data });
      return data;
    }
  } catch (error) {
    let shoe = await error
    console.log(await shoe.json())
  }
};

export const productEdit = (product) => async (dispatch) => {
  const response = await fetch(`/api/products/${product.id}/edit`, {
    method: "PUT",
    body: product,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  await dispatch({ type: PRODUCT_EDIT, payload: data });
  return data;
};

export const productDelete = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}/delete`);
  const data = await response.json();
  console.log(data);
  await dispatch({ type: PRODUCT_DELETE, payload: data });
  return data;
};

export const productImageCreate = (image, productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}/images`, {
    method: "POST",
    body: image,
  });
  if (response.ok) {
    const { resPost } = await response.json();
    await dispatch({ type: PRODUCT_IMAGE_CREATE, payload: resPost });
  } else {
    console.log("There was an error making your image!");
  }
};

const initialState = {};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return [...action.payload];
    case FETCH_PRODUCT_DETAILS:
      return { ...state, detail: action.payload };
    case PRODUCT_DELETE:
      delete state.products[action.payload.productId];
      return {
        ...state,
      };
    case PRODUCT_EDIT:
      state.products[action.payload.id] = action.payload;
      return { ...state };
    case PRODUCT_CREATE:
      state.products[action.payload.id] = action.payload;
      return { ...state };
    case PRODUCT_IMAGE_CREATE:
      state.products.images[action.payload.id] = action.payload;
      return { ...state };
    default:
      return state;
  }
}
