import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/getAll");
      const users = await response.json();

      const userExists = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!userExists) {
        alert("Invalid credentials. Please Sign-Up first!");
        return;
      }

      alert("Welcome back! You are logged in.");
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("An error occurred. Please try again later.");
    }
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
