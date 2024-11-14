import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "../../redux/favorites"; // Assuming you have a fetchFavorites thunk
import FavoriteButton from "./FavoriteButton";
import "./Favorites.css";

function FavoritesList() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(fetchFavorites()); // Fetch favorite products from the backend
  }, [dispatch]);

  if (favorites.length === 0) {
    return <p className="empty-favorites">No favorites yet.</p>;
  }

  return (
    <div className="favorites-list">
      {favorites.map((product) => (
        <div key={product.id} className="favorite-item">
          <img src={product.imageUrl} alt={product.name} className="favorite-image" />
          <div className="favorite-details">
            <h3 className="favorite-name">{product.name}</h3>
            <p className="favorite-price">${product.price}</p>
          </div>
          <FavoriteButton product={product} />
        </div>
      ))}
    </div>
  );
}

export default FavoritesList;
