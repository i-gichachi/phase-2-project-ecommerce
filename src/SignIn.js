import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css'; // Import your CSS file
import { retrieveUserData, storeUserData } from './DataStorage'; // Import data storage functions

function SignIn({ handleLogin }) {
  const navigate = useNavigate(); // Initialize navigation hook

  // State for form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State for user data retrieved from local storage or defaulting to empty array
  const [usersData, setUsersData] = useState(retrieveUserData().users || []);
  const [loginData, setLoginData] = useState(retrieveUserData().login || []);
  
  // State to track the currently logged-in user
  const [user, setUser] = useState(null);

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Find the user with matching email and password
    const foundUser = usersData.find(
      (user) => user.email === formData.email && user.password === formData.password
    );

    if (foundUser) {
      setUser(foundUser); // Set the logged-in user
      handleLogin(foundUser); // Call the provided login handler
      navigate('/'); // Navigate to the home page
      alert('Login successful');
    } else {
      alert('Lmao wrong email or password. Please try again.');
    }
  };

  // Effect to update local storage whenever user or login data changes
  useEffect(() => {
    storeUserData({ users: usersData, login: loginData });
  }, [usersData, loginData]);

  return (
    <div className="signIn-container">
      <h2>Login</h2>
      <form className="signIn-form" onSubmit={handleSubmit}>
        {/* Email input */}
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
        {/* Password input */}
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
        {/* Submit button */}
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      
      {/* Display user data if logged in */}
      {user && (
        <div className="user-data">
          <h3>Welcome, {user.first_name}!</h3>
          <p>Email: {user.email}</p>
          {/* Display other user data as needed */}
        </div>
      )}
      
      {/* Link to signup page */}
      <p>Don't have an account? <Link to="/signup"><button className="register-button">Register here</button></Link></p>
    </div>
  );
}

export default SignIn;
