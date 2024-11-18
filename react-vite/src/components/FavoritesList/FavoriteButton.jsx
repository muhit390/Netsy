import { useDispatch, useSelector } from "react-redux";
import { addFavorite, fetchFavorites, removeFromFavorites } from "../../redux/favorites";
import "./Favorites.css";
import { useEffect, useState } from "react";

function FavoriteButton({ product }) {
  const user = useSelector((state) => state.session.user)
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([])
  const isFavorite = favorites.some((fav) => fav.product_id === product.id);

  useEffect(() => {
    const fetchData = async () => {
      let res = await dispatch(fetchFavorites(user.id))
      setFavorites(res)
    }
    fetchData()
  })

  const handleFavoriteToggle = async () => {
    if (isFavorite) {
      await dispatch(removeFromFavorites(product, user)); // Remove from favorites
    } else {
      await dispatch(addFavorite(product, user)); // Add to favorites
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
