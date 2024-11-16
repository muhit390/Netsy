import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from "../../redux/favorites";
import "./Favorites.css";
import { useEffect, useState } from "react";

function FavoriteButton({ product }) {
  const dispatch = useDispatch();
  // const favorites = useSelector((state) => state.favorites);
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(
    favorites.some((fav) => fav.id == product)
  );
  const user = useSelector((state) => state.session.user);

  // const isFavorite = favorites.some((fav) => fav.id == product.id);

  console.log(product);

  useEffect(() => {
    const fetchData = async () => {
      let data = await dispatch(fetchFavorites());
      setFavorites(data);
    };
    fetchData();
  }, [dispatch, favorites]);

  const handleFavoriteToggle = async () => {
    // const button = document.getElementById(`favorite-buttasfdafsdasfdfasdfasdfsdagasdon`)
    if (isFavorite) {
      await dispatch(removeFavorite(product, user)); // Remove from favorites
      // button.classList.remove("favorite-button-remove")
      // button.classList.add("favorite-button-add")
      // await dispatch(fetchFavorites())
      setIsFavorite(false);
    } else {
      await dispatch(addFavorite(product, user)); // Add to favorites
      // button.classList.remove("favorite-button-add")
      // button.classList.add("favorite-button-remove")
      // await dispatch(fetchFavorites())
      setIsFavorite(true);
    }
  };

  return (
    <button
      onClick={handleFavoriteToggle}
      className={`favorite-button-${
        isFavorite ? "remove-favorite" : "add-favorite"
      }`}
    >
      {isFavorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
    </button>
  );
}

export default FavoriteButton;
