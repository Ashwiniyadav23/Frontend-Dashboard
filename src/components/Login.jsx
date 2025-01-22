import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!userExists) {
      alert("First Sign-Up!");
      return;
    }

    alert("Welcome! You did it!");
    setEmail("");
    setPassword("");
    navigate("/dashboard");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="Main-Container">
      <h1>Login</h1>
      <form onSubmit={handleLoginClick}>
        <div className="input-container">
          <i className="fa-solid fa-envelope email-icon"></i>
          <input
            className="E"
            type="email"
            placeholder="Enter your Email....."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <hr />
        <div className="input-container">
          <i className={`fa-solid ${showPassword ? "fa-unlock" : "fa-lock"}`}></i>
          <input
            className="P"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password....."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          <span
            className="toggle-password"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        <hr />
        <button className="btn" type="submit">
          Login
        </button>
      </form>
      <p className="btn2" onClick={() => navigate("/")}>
        Go to Sign-Up
      </p>
    </div>
  );
}

export default Login;
