import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/products"; // Assuming you have a thunk for fetching details
import { addToCart } from "../../redux/cart";
import "./Product.css";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.find((p) => p.id === Number(id)));

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id, product]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <img src={product.imageUrl} alt={product.name} className="detail-image" />
      <div className="detail-info">
        <h2 className="detail-name">{product.name}</h2>
        <p className="detail-category">{product.category}</p>
        <p className="detail-price">${product.price}</p>
        <p className="detail-description">{product.description}</p>
        <button onClick={() => dispatch(addToCart(product))} className="add-to-cart-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
