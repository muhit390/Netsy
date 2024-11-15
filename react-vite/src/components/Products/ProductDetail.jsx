import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/cart";
import "./Product.css";

function ProductDetail() {
  const product = useSelector((state) => state.products.detail);
  console.log(product)
  const dispatch = useDispatch();




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
  )
}

export default ProductDetail;
