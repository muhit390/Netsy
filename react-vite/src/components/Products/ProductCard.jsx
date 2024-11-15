import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart";
import { useNavigate } from "react-router-dom";
import { fetchProductDetails } from "../../redux/products"; // Assuming you have a thunk for fetching details
import "./Product.css";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(product);

  const handleAddToCart = () => {
    const fetchData = async () => {
      await dispatch(addToCart(product));
    };
    fetchData();
  };

  const goToDetails = () => {
    const fetchData = async () => {
      await dispatch(fetchProductDetails(product.id));
      navigate(`/products/${product.id}`)
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
    </div>
  );
}

export default ProductCard;
