import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ProductList from '../components/Products/ProductList'; // Importing ProductList
import ProductDetail from '../components/Products/ProductDetail'; // Importing ProductDetail
import FavoritesList from '../components/FavoritesList/FavoritesList'; // Importing FavoritesList
import ReviewList from '../components/ReviewList/ReviewList'; // Importing ReviewList
import Cart from '../components/Cart/Cart';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProductList />, // Display ProductList as the home page
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "favorites",
        element: <FavoritesList />, // Route for favorites list
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "products/:productId",
        element: <ProductDetail />, // Route for product detail page
      },
      {
        path: "products/:productId/reviews",
        element: <ReviewList />, // Route for reviews of a specific product
      },
    ],
  },
]);
