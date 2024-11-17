import { useNavigate } from "react-router-dom";

import "./Product.css";

function ProductOwnerCard({ product }) {
  const navigate = useNavigate();
  console.log(product);

  const handleEdit = (id) => {
    navigate(`/products/${id}/edit`);
  };

  const handleDelete = (id) => {
    
  };

  try {
    if (product.id)
      return (
        <div className="product-card-owner">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image-owner"
          />
          <div className="product-info-owner">
            <h3 className="product-name-owner">{product.name}</h3>
            <p className="product-price-owner">${product.price}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(product.id);
            }}
            className="edit-product-button"
          >
            Edit Product
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(product.id);
            }}
            className="delete-product-button"
          >
            Delete Product
          </button>
        </div>
      );
  } catch (error) {
    return <h1>No current spots!</h1>;
  }
}

export default ProductOwnerCard;
