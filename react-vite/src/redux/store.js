import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import cartReducer from "./cart";
import favoritesReducer from "./favorites";
import reviewsReducer from "./reviews";
import productsReducer from "./products"; // Assumes you have a products reducer for product state

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  session: sessionReducer,
  cart: cartReducer,
  favorites: favoritesReducer,
  reviews: reviewsReducer,
  products: productsReducer, // Assuming you have this reducer
});

// Configure middleware
let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// Configure store with the root reducer and middleware
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
