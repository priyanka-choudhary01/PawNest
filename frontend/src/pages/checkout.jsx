import { useEffect, useState } from "react";
import "./checkout.css";
import BASE_URL from "../config";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [shipping, setShipping] = useState("standard");
  const [contact , setContact] = useState(null);

  const navigate = useNavigate();

const fetchCart = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BASE_URL}/api/cart?token=${token}`);
      const data = await res.json();

      setCartItems(data.items || []);
     let subtotal = data.totalPrice || 0;

const shippingCostMap = {
  standard: 0,
  express: 10,
  "same-day": 20
};

let shippingCost = shippingCostMap[shipping] || 0;

setTotalPrice(subtotal + shippingCost);
    } catch (err) {
      console.error(err);
    }
  };
 const placeOrder = async () => {
  try {
    const token = localStorage.getItem("token");
    if(!token) navigate('/signup')
    if (contact.length !== 10) {
  alert("Contact number must be exactly 10 digits");
  return;
}
    const res = await fetch(`${BASE_URL}/api/order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token,
        totalPrice,
        shippingAddress: address,
        contact:contact,
        shippingMethod:shipping
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
  }, [shipping]);

  return (
    <div className="checkout-container">

      {/* LEFT SIDE */}
      <div className="checkout-left">
        <h2>Checkout</h2>

        <div className="section">
          <p>Contact information</p>
         <input
  type="text"
  value={contact}
  maxLength={10}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    setContact(value);
  }}
  placeholder="Enter 10 digit number"
/>
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
        <select 
  value={shipping} 
  onChange={(e) => setShipping(e.target.value)
  
  }
>
  
  <option value="standard">Standard Delivery (3–5 days) - $0</option>
  <option value="express">Express Delivery (1–2 days) - $10</option>
  <option value="same-day">Same Day Delivery - $20</option>
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
            {shipping === "standard" && <span>Free</span>}
            {shipping === "express" && <span>$10</span>}
            {shipping === "same-day" && <span>$20</span>}
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