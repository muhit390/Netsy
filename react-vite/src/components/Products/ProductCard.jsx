import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cart';
import { useNavigate } from 'react-router-dom';
import { fetchProductDetails } from '../../redux/products'; // Assuming you have a thunk for fetching details
import './Product.css';
import { useEffect, useState } from 'react';
import * as favoritesActions from '../../redux/favorites';
import FavoriteButton from '../FavoritesList/FavoriteButton';

function ProductCard({ product }) {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   //  console.log(product);

   const sessionUser = useSelector((state) => state.session.user);
   const favorites = useSelector((state) => state.favorite);
   const [isFav, setIsFav] = useState(false);

   useEffect(() => {
      if (sessionUser) {
         dispatch(favoritesActions.fetchFavorites());
      }
   }, [dispatch, sessionUser]);

   useEffect(() => {
      if (
         sessionUser &&
         favorites?.some((favorite) => favorite.id === product.id)
      ) {
         setIsFav(true);
      } else {
         setIsFav(false);
      }
   }, [favorites, product.id, sessionUser]);

   const handleFavoriteClick = (e) => {
      e.stopPropagation();
      if (!sessionUser) return;
      if (isFav) {
         dispatch(favoritesActions.removeFavorite(product.id));
      } else {
         dispatch(favoritesActions.addFavorite(product.id));
      }
      setIsFav((prevFav) => !prevFav);
   };

   const handleAddToCart = () => {
      const fetchData = async () => {
         await dispatch(addToCart(product));
      };
      fetchData();
   };

   const goToDetails = () => {
      const fetchData = async () => {
         await dispatch(fetchProductDetails(product.id));
         navigate(`/products/${product.id}`);
      };
      fetchData();
   };

   return (
      <div className="product-card" onClick={goToDetails}>
         <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
         />
         <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
         </div>
         <button
            onClick={(e) => {
               e.stopPropagation();
               handleAddToCart();
            }}
            className="add-to-cart-button"
         >
            Add to Cart
         </button>
         <button onClick={handleFavoriteClick} className={`favorite-button`}>
            {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
         </button>
      </div>
   );
}

export default ProductCard;
