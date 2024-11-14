import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart";
import { useNavigate } from "react-router-dom";
import "./Product.css";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const goToDetails = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="product-card" onClick={goToDetails}>
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>
      </div>
      <button onClick={(e) => { e.stopPropagation(); handleAddToCart(); }} className="add-to-cart-button">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
