import { useState } from "react";
import "./Auth.css";
import BASE_URL from "../config";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const url = isLogin
        ? `${BASE_URL}/api/auth/login`
        : `${BASE_URL}/api/auth/register`;

      const bodyData = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(bodyData)
});

const data = await res.json();

if (!res.ok) {
  alert(data.message); 
  return;
}

if (isLogin) {
  localStorage.setItem("token", data.token);
  navigate("/");
} else {
  setIsLogin(true);
}

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-wrapper">

      <div className="auth-box">

        {/* BRAND */}
        <div className="auth-brand">
          <i className="fa-solid fa-paw"></i>
          <h2>PawNest</h2>
        </div>

        <h3>{isLogin ? "Welcome Back" : "Create Account"}</h3>

        {/* Signup only */}
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>

      </div>

    </div>
  );
}

export default Auth;