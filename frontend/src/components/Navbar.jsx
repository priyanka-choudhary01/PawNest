import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {

const [menuOpen , setMenuOpen] = useState(false);
 const [showMenu, setShowMenu] = useState(false);
 const navigate = useNavigate();

const token = localStorage.getItem("token");

const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signup");
  };
return (

<nav className="navbar">

<div className="logo">
<i className="fa-solid fa-paw"></i>
<span>PawNest</span>
</div>

<ul className={menuOpen ? "nav-links active" : "nav-links"}>

<li><Link to="/">Home</Link></li>
<li><Link to="/shop">Shop</Link></li>
<li><Link to="/about">About Us</Link></li>
<li><Link to="/faq">FAQ</Link></li>
<li><Link to="/contact">Contact</Link></li>

  <li className="icon user-menu">
      <i
        className="fa-regular fa-user"
        onClick={() => {
          if (!token) {
            navigate("/signup"); 
          } else {
            setShowMenu(!showMenu); 
          }
        }}
      ></i>

      {token && showMenu && (
        <div className="dropdown">
          <p onClick={() => navigate("/orders")}>My Orders</p>
          <p onClick={handleLogout}>Logout</p>
        </div>
      )}
    </li>

<li className="icon">
<Link to="/cart">
<i className="fa-solid fa-cart-shopping"></i>
</Link>
</li>

</ul>

<div className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)}>
<i className="fa-solid fa-bars"></i>
</div>

</nav>

)

}

export default Navbar