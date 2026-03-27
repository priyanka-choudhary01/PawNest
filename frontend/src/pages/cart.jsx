import { useEffect, useState } from "react";
import "./cart.css";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../config";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/auth");
        return;
      }

      const res = await fetch(`${BASE_URL}/api/cart?token=${token}`);
      const data = await res.json();

      setCartItems(data.items || []);
      setTotalPrice(data.totalPrice || 0);
      setLoading(false);

    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (productId) => {
    const token = localStorage.getItem("token");

    try {
      await fetch(
        `${BASE_URL}/api/cart/removeitem/${productId}?token=${token}`,
        { method: "DELETE" }
      );

      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);


  if (loading) {
    return (
      <div className="cart-container center">
        <p className="loading-text">Loading your cart...</p>
      </div>
    );
  }

  
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <i className="fa-solid fa-cart-shopping"></i>
        <h2>Your cart is empty</h2>
        <p>Start adding products your pet will love 🐾</p>

        <button onClick={() => navigate("/shop")}>
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">

      <h2>Your Cart</h2>

      {cartItems.map((item, index) => (
        <div className="cart-item" key={index}>

          <img
            src={`${BASE_URL}${item.product?.images?.[0]}`}
            className="cart-img"
            alt={item.product?.name}
          />

          <div className="cart-details">
            <h4>{item.product?.name}</h4>
            <p className="stock">In Stock</p>
            <p className="qty">Qty: {item.quantity}</p>
          </div>

          <div className="cart-price">
            ${item.product?.price}
          </div>

          <div className="cart-price total-item">
            ${(item.product?.price * item.quantity).toFixed(2)}
          </div>

          <button
            className="remove-btn"
            onClick={() => removeItem(item.product._id)}
          >
            Remove
          </button>

        </div>
      ))}

      {/* DISCOUNT */}
      <div className="discount">
        <input type="text" placeholder="Enter discount code" />
        <button>Apply</button>
      </div>

      {/* SUMMARY */}
      <div className="summary">
        <div className="row">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <div className="row">
          <span>Shipping</span>
          <span className="free">Free</span>
        </div>

        <div className="total">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="buttons">
        <Link to="/shop" style={{textDecoration:"none"}}>
          <button className="continue">Continue Shopping</button>
        </Link>

        <Link to="/checkout">
          <button className="checkout">Proceed to Checkout</button>
        </Link>
      </div>

      {/* TRUST BAR */}
      <div className="footer-bar">
        <div className="footer-item">
          <i className="fa-solid fa-truck"></i> Free Shipping
        </div>

        <div className="footer-item">
          <i className="fa-solid fa-rotate-left"></i> Easy Returns
        </div>

        <div className="footer-item">
          <i className="fa-solid fa-shield"></i> Secure Payment
        </div>
      </div>

    </div>
  );
}

export default Cart;