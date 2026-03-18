import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link ,useNavigate} from "react-router-dom";
import "./product.css";
import BASE_URL from "../config";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
  fetch(`${BASE_URL}/api/product/getproduct/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setProduct(data);
      setMainImage(`${BASE_URL}${data.images?.[0]}`);
      console.log(data);
    })
    .catch((err) => console.log(err));
}, [id]);

  if (!product) return <div>Loading...</div>;

 const addToCart = async () => {
  const token = localStorage.getItem("token");
 if(!token) navigate('/signup')
  try {
    const res = await fetch(`${BASE_URL}/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId: id,   
        quantity: qty,
        token
      })
    });

    const data = await res.json();
    console.log(data);
    
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="product-wrapper">

      <div className="product-box">

        {/* LEFT */}
        <div className="left-section">

          <img src={mainImage} alt="product" className="main-image" />

       <div className="thumbnail-row">
  {product.images?.map((img, i) => (
    <img
      key={i}
      src={`${BASE_URL}${img}`}
      alt="thumb"
      onClick={() => setMainImage(`${BASE_URL}${img}`)}
      className="thumbnail"
    />
  ))}
</div>

        </div>

        {/* RIGHT */}
        <div className="right-section">

          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="price">
            ${product.price}
            <span>$99.99</span>
          </p>

          <div className="quantity">
            <h3>Quantity</h3>
            <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
            <span className="qty">{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

         <button className="add-cart" onClick={addToCart}>Add to Cart</button>
          <Link to={'/cart'}><button className="buy-now">Buy It Now</button></Link>
           </div>
           </div>
          {/* DETAILS */}
          <div>
          <div className="details-section">

            <div className="details-left">
              <h2>Product Details</h2>
              <ul>
                <li><span><i className="fa-solid fa-check"></i></span>Orthopedic memory foam</li>
                <li><span><i className="fa-solid fa-check"></i></span>Machine washable cover</li>
                <li><span><i className="fa-solid fa-check"></i></span>Non-slip bottom</li>
                <li><span><i className="fa-solid fa-check"></i></span>Vet recommended</li>
              </ul>
            </div>

            <div className="details-right">
              <div className="box">
               
                Free Shipping
              </div>
              <div className="box">
              
                30-Day Guarantee
              </div>
            </div>

          </div>

        

      </div>

      {/* BOTTOM BAR */}
      <div className="bottom-bar">
        <div><i className="fa-solid fa-truck"></i> Free Shipping</div>
        <div><i className="fa-sharp fa-solid fa-shield-check"></i> Free Shipping</div>
        <div><i className="fa-solid fa-lock"></i> Secure Checkout</div>
      </div>

      {/* BOTTOM IMAGE */}
      <div className="bottom-product">
        <img src={mainImage} alt="product" />
      </div>

    </div>
  );
}

export default Product;