import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';

// Initialize state for form data and user information
const [formData, setFormData] = useState({
    email: "",
    password: "",
});

const [user, setUser] = useState(null);

// Function to update form data on input change
const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
}

// Function to handle form submission
const handleSubmit = (event) => {
    event.preventDefault();

    // Fetch user data from server
    fetch("https://madukani-server.onrender.com/users")  
        .then((response) => response.json())
        .then((usersData) => {
            const user = usersData.find(
                (user) => user.email === formData.email && user.password === formData.password
            );

            if (user) {
                setUser(user); 
                handleLogin(user);  // Assuming there's a handleLogin function defined elsewhere
                navigate("/");  // Navigates to the homepage
                alert("Login successful");
            } else {
                alert("Lmao wrong email or password. Please try again.");
            }
        })
        .catch((error) => {
            console.log("Error logging in:", error);
            alert("Error logging in. Please try again.");
        });
}

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

export default SignIn;
