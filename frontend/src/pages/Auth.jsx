import { useState, useEffect, useRef } from "react";
import "./Auth.css";
import BASE_URL from "../config";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [useOTP, setUseOTP] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(0);
  const inputsRef = useRef([]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
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
        alert("Signup successful");
        setIsLogin(true);
      }

    } catch (err) {
      console.error(err);
    }
  };

  const sendOTP = async () => {
    const res = await fetch(`${BASE_URL}/api/auth/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: formData.email })
    });

    const data = await res.json();
    if (!res.ok) {
    alert(data.message);
    return;
  }
    alert(data.message);
    setTimer(60);
  };

  const resendOTP = async () => {
    const res = await fetch(`${BASE_URL}/api/auth/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: formData.email })
    });

    const data = await res.json();
    if (!res.ok) {
    alert(data.message);
    return;
  }
    alert(data.message);
    setTimer(60);
  };

  const verifyOTP = async () => {
    const finalOtp = otp.join("");

    const res = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: formData.email,
        otp: finalOtp
      })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">

        <div className="auth-brand">
          <i className="fa-solid fa-paw"></i>
          <h2>PawNest</h2>
        </div>

        <h3>{isLogin ? "Welcome Back" : "Create Account"}</h3>

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

        {/* Password only hidden in OTP login mode */}
        {(!isLogin || !useOTP) && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        )}

        {/* Normal login/signup button */}
        {!useOTP && (
          <button onClick={handleSubmit}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        )}

        {/* OTP Section */}
        {isLogin && useOTP && (
          <>
            <button onClick={sendOTP}>Send OTP</button>

            <div className="otp-container">
              {otp.map((val, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={val}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            <button onClick={verifyOTP}>Verify OTP</button>

            <button disabled={timer > 0} onClick={resendOTP}>
              {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
            </button>
          </>
        )}

        {isLogin && (
          <p className="toggle" onClick={() => setUseOTP(!useOTP)}>
            {useOTP ? "Login with Password" : "Login with OTP"}
          </p>
        )}
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