import { useEffect, useState } from "react";
import "./shop.css";
import BASE_URL from "../config";
import { Link, useNavigate } from "react-router-dom";

function Shop() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/product/products`);
      const data = await res.json();

      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!products || products.length === 0) return <p>Loading...</p>;

  return (
    <div className="shop-container">
      <h2>Shop</h2>

      <div className="product-grid">
        {products.map((item, index) => (
        <Link to={`/product/check/${item._id}`} className="link"> <div className="product-card" key={index} 
          >

           <img src={`${BASE_URL}${item.images?.[0]}`} />

            <div className="product-info">
              <h4>{item.name}</h4>
              <p className="price">${item.price}</p>
            </div>

            <button
              className="add-btn"
              onClick={async () => {
                try {
                  const token = localStorage.getItem("token");
                  await fetch("http://localhost:8080/api/cart/add", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      productId: item._id,
                      quantity: 1,
                      token
                    })
                  });

                  alert("Added to cart");
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              Add to Cart
            </button>

          </div>
         </Link>
        ))}
      </div>
    </div>
  );
}

export default Shop;