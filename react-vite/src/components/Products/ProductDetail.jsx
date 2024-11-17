import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/cart";
import "./Product.css";
import ReviewList from "../ReviewList/ReviewList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/products";
import FavoriteButton from "../FavoritesList/FavoriteButton";

function ProductDetail() {
  let id = useParams()
  id = id.productId
  const [product, setProduct] = useState({})
  console.log(product)
  const dispatch = useDispatch();
  
  useEffect(() => {
      const fetchData = async () => {
        let data = await dispatch(fetchProductDetails(id))
        setProduct(data)
      }
      fetchData()
  }, [dispatch, id, setProduct])



  return (
    <div className="product-detail">
      <img src={product.imageUrl} alt={product.name} className="detail-image" />
      <div className="detail-info">
        <h2 className="detail-name">{product.name}</h2>
        <p className="detail-category">{product.category}</p>
        <p className="detail-price">${product.price}</p>
        <p className="detail-description">{product.description}</p>
        <button onClick={() => dispatch(addToCart(product))} className="add-to-cart-button">
          Add to Cartsss
        </button>
        <FavoriteButton product={product} />
      </div>
      <ReviewList productId={id}/>
    </div>
  )
}

export default ProductDetail;
