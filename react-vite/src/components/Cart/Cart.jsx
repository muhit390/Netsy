import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import "./Cart.css";

function Cart() {
  const cartItems = useSelector((state) => state.cart); // Access cart items from Redux

  if (cartItems.length === 0) {
    return <p className="empty-cart">Your cart is empty.</p>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="cart-total">
        Total: $
        {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
      </div>
      <button className="checkout-button">Proceed to Checkout</button>
    </div>
  );
}

export default Cart;
