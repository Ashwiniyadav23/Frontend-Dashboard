import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignupClick = async (e) => {
    e.preventDefault();
  
    console.log("🔵 Sending Data:", { name, email, password });
  
    try {
      const response = await fetch("https://fullstack-topaz.vercel.app/api/sign",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      console.log("🟢 Response Status:", response.status);
  
      const data = await response.json();
      console.log("🟢 Response from Backend:", data);
  
      if (!response.ok) {
        throw new Error(data.message || "Sign-Up failed!");
      }
  
      alert("✅ Sign-Up Successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("🔴 Error:", error);
      alert(error.message || "Sign-Up failed!");
    }
  };
  

  return (
    <div className="Main-Container">
      <h1>Sign-Up</h1>
      <form onSubmit={handleSignupClick}>
        <div className="input-container">
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            placeholder="Enter your Name....."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <hr />
        <div className="input-container">
          <i className="fa-solid fa-envelope email-icon"></i>
          <input
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
          <i className="fa-solid fa-lock"></i>
          <input
            type="password"
            placeholder="Enter your Password....."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>
        <hr />
        <button className="btn" type="submit">
          Sign-Up
        </button>
      </form>
      <p className="btn2" onClick={() => navigate("/login")}>
        Go to Login
      </p>
    </div>
  );
}

export default Signup;
