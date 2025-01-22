import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign.css";

function Sign() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (name && email && password && confirmPassword) {
      const userData = { name, email, password };
      alert("Sign-Up Successful");
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/login");
    } else {
      alert("Please fill in all fields");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="main-container">
      <h1>Sign-Up</h1>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="input-container">
          <i className="fa fa-user input-icon"></i>
          <input
            id="name"
            type="text"
            placeholder="Enter your Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </div>
        <hr />

        {/* Email Input */}
        <div className="input-container">
          <i className="fa fa-envelope input-icon"></i>
          <input
            id="email"
            type="email"
            placeholder="Enter your Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div>
        <hr />

        {/* Password Input */}
        <div className="input-container">
          <i className="fa fa-lock input-icon"></i>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        <hr />

        {/* Confirm Password Input */}
        <div className="input-container">
          <i className="fa fa-lock input-icon"></i>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        <button className="btn" type="submit">
          Sign-Up
        </button>
      </form>
      <p className="go-to-login" onClick={handleLoginClick}>
        <i className="fa fa-sign-in-alt"></i> Already have an account? Go to Login
      </p>
    </div>
  );
}

export default Sign;
