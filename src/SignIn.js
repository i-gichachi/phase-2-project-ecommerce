import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';

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
