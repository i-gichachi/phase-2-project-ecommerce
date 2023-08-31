import React, { useState } from 'react';

function SignUp() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    agreedToTerms: false,
  })

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const newValue = type === "checkbox" ? checked : value

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.agreedToTerms) {
      alert("Please check the terms and conditions.")
      return
    }

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match. Please retry again")
      return;
    }

    fetch("https://madukani-server.onrender.com/users", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        alert("Registration successful. You can now sign in.")
        window.location.href = '/signin'
      } else {
        alert("Registration failed! Please try again")
      }
    })
    .catch((error) => {
      console.error("Error registering user:", error)
    })
}
