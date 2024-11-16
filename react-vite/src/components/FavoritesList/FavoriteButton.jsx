import { useDispatch, useSelector } from "react-redux";
import { addFavoriteToBackend, removeFavoriteFromBackend } from "../../redux/favorites";
import "./Favorites.css";

function FavoriteButton({ product, userId }) {

  console.log("User ID:", userId); // Debugging
  console.log("Product:", product);
  
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {

      dispatch(removeFavoriteFromBackend(userId, product.id));
    } else {

      dispatch(addFavoriteToBackend(userId, product));
    }
  };

  return (
    <button
      onClick={handleFavoriteToggle}
      className={`favorite-button ${isFavorite ? "remove-favorite" : "add-favorite"}`}
    >
      {isFavorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
    </button>
  );
}

export default FavoriteButton;
