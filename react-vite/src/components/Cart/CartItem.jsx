import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/cart";
import "./Cart.css";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id)); // Remove item from cart
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    dispatch(updateQuantity(item.id, newQuantity)); // Update quantity
  };

  return (
    <div className="cart-item">
      <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">${item.price}</p>
        <label className="quantity-label">
          Quantity:
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
          />
        </label>
        <button onClick={handleRemove} className="remove-button">Remove</button>
      </div>
    </div>
  );
}

export default CartItem;