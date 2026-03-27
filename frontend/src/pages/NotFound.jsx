import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-box">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>

        <div className="notfound-buttons">
          <button 
            className="home-btn"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>

          <button 
            className="shop-btn"
            onClick={() => navigate("/shop")}
          >
            Go to Shop
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;