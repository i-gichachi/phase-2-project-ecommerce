// SignIn.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';

function SignIn({ handleLogin }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("https://madukani-server.onrender.com/users")  
      .then((response) => response.json())
      .then((usersData) => {
        const user = usersData.find(
          (user) => user.email === formData.email && user.password === formData.password
        );

        if (user) {
          setUser(user); 
          handleLogin(user); 
          navigate("/");
          alert("Login successful");
        } else {
          alert("Lmao wrong email or password. Please try again.");
        }
      })
      .catch((error) => {
        console.log("Error logging in:", error);
        alert("Error logging in. Please try again.");
      });
  };

  return (
    <div className="signIn-container">
      <h2>Login</h2>
      <form className="signIn-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      
      {/* Display user data if logged in */}
      {user && (
        <div className="user-data">
          <h3>Welcome, {user.name}!</h3>
          <p>Email: {user.email}</p>
          {/* Display other user data as needed */}
        </div>
      )}
      
      <p>Don't have an account? <Link to="/signup"><button className="register-button">Register here</button></Link></p>
    </div>
  );
}

export default SignIn;

