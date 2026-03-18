import { useEffect, useState } from "react";
import "./checkout.css";
import BASE_URL from "../config";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

const fetchCart = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BASE_URL}/api/cart?token=${token}`);
      const data = await res.json();

      setCartItems(data.items || []);
      setTotalPrice(data.totalPrice || 0);
    } catch (err) {
      console.error(err);
    }
  };
 const placeOrder = async () => {
  try {
    const token = localStorage.getItem("token");
    if(!token) navigate('/signup')
    const res = await fetch(`${BASE_URL}/api/order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token,
        shippingAddress: address
      })
    });

    const data = await res.json();

    alert(data.message);

  } catch (err) {
    console.error(err);
  }
};
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="checkout-container">

      {/* LEFT SIDE */}
      <div className="checkout-left">
        <h2>Checkout</h2>

        <div className="section">
          <p>Contact information</p>
          <input type="text" />
        </div>

        <div className="section">
          <p>Shipping address</p>
         <input 
  type="text" 
  value={address}
  onChange={(e) => setAddress(e.target.value)}
/>
        
        </div>

        <div className="section">
          <p>Shipping Method</p>
          <select>
            <option>Select shipping</option>
          </select>
        </div>

        <div className="payment-icons">
          <img src="https://img.icons8.com/color/48/visa.png" alt="visa" />
          <img src="https://img.icons8.com/color/48/mastercard.png" alt="mc" />
          <img src="https://img.icons8.com/color/48/amex.png" alt="amex" />
          <img src="https://img.icons8.com/color/48/discover.png" alt="disc" />
          <img src="https://img.icons8.com/color/48/paypal.png" alt="paypal" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="checkout-right">

        {cartItems.map((item) => {
          const product = item.product; 

          const imagePath = product?.images?.[0];

          return (
            <div className="product-box" key={item._id}>
              <img
                src={
                  imagePath
                    ? `${BASE_URL}${imagePath}`
                    : "/default.png"
                }
                alt={product?.name || "product"}
                className="cart-image"
              />

              <div>
                <h4>{product?.name}</h4>
                <p>${product?.price}</p>
                <p>Qty: {item.quantity}</p>
              </div>
            </div>
          );
        })}

        <div className="summary">
          <div className="row">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
         <div className="checkout-buttons">

  {/* Back to Cart */}
  <button onClick={() => navigate("/cart")} className="back-btn">
    Back to Cart
  </button>

  {/* Place Order */}
  <button onClick={placeOrder} className="place-btn">
    Place Order
  </button>

</div>
      </div>
    </div>
  );
}

export default Checkout;