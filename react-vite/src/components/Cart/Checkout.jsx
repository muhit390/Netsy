import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/cart";
import "./Cart.css";

function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    dispatch(clearCart()); // Clears the cart after checkout
    alert("Thank you for your purchase!");
  };

  if (cartItems.length === 0) {
    return <p className="empty-cart">Your cart is empty.</p>;
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Order Summary</h2>
      <ul className="checkout-items">
        {cartItems.map((item) => (
          <li key={item.id} className="checkout-item">
            {item.name} - {item.quantity} x ${item.price}
          </li>
        ))}
      </ul>
      <div className="checkout-total">Total: ${totalAmount}</div>
      <button onClick={handleCheckout} className="confirm-checkout-button">Confirm Purchase</button>
    </div>
  );
}

export default Checkout;
