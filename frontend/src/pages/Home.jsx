import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import dogImg from "../assets/dog-image.png";
import { Link } from "react-router-dom";
import BASE_URL from "../config";

function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/product/best-sellers`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="home-page">

      {/* HERO */}
      <div className="hero">

        <div className="hero-left">
          <h1>
            Premium Comfort <br /> For Your Dog 🐶
          </h1>

          <p>
            Give your pet the luxury they deserve with our vet-approved beds.
          </p>

          <div className="hero-buttons">
            <Link to="/shop">
              <button className="primary-btn">Shop Now</button>
            </Link>

            <Link to="/about">
              <button className="secondary-btn">Learn More</button>
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <img src={dogImg} alt="Dog" />
        </div>

      </div>

      {/* TRUST BAR */}
      <div className="features">

        <div className="feature">
          <i className="fa-solid fa-truck"></i>
          <p>Free Shipping</p>
        </div>

        <div className="feature">
          <i className="fa-solid fa-rotate-left"></i>
          <p>30-Day Returns</p>
        </div>

        <div className="feature">
          <i className="fa-solid fa-clock"></i>
          <p>Fast Delivery</p>
        </div>

        <div className="feature">
          <i className="fa-solid fa-lock"></i>
          <p>Secure Checkout</p>
        </div>

      </div>

      {/* BEST SELLERS */}
      <div className="best-sellers">

        <div className="section-header">
          <h2>Best Sellers</h2>
          <Link to="/shop">View All →</Link>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <Link
              to={`/product/check/${product._id}`}
              key={product._id}
              className="product-link"
            >
              <div className="product-card">

                <img src={`${BASE_URL}${product.images?.[0]}`} alt={product.name} />

                <div className="card-body">
                  <h4>{product.name}</h4>
                  <p className="price">${product.price}</p>
                  <p className="rating">⭐ {product.rating || 4.5}</p>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* WHY CHOOSE */}
      <div className="why-section">

        <h2>Why Choose PawNest?</h2>

        <div className="why-grid">

          <div className="why-card">
            <i className="fa-solid fa-bed"></i>
            <h4>Orthopedic Support</h4>
            <p>Memory foam comfort for healthy joints</p>
          </div>

          <div className="why-card">
            <i className="fa-solid fa-soap"></i>
            <h4>Easy to Clean</h4>
            <p>Machine washable covers</p>
          </div>

          <div className="why-card">
            <i className="fa-solid fa-paw"></i>
            <h4>Pet Approved</h4>
            <p>Loved by thousands of pets</p>
          </div>

        </div>

      </div>

      {/* CTA SECTION */}
      <div className="cta">

        <h2>Give Your Pet the Comfort They Deserve</h2>
        <p>Shop now and upgrade your pet’s lifestyle 🐾</p>

        <Link to="/shop">
          <button>Shop Now</button>
        </Link>

      </div>

    </div>
  );
}

export default Home;