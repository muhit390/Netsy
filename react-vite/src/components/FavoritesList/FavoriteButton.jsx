import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../redux/favorites";
import "./Favorites.css";

function FavoriteButton({ product }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id)); // Remove from favorites
    } else {
      dispatch(addToFavorites(product)); // Add to favorites
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
