import React, { useState } from 'react';
import './SignUp.css'; //Import the custom CSS file for styling

function SignUp() {
  //States to hold form data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    agreedToTerms: false, //Initializes the checkbox state
  })

  //Event handler for input changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const newValue = type === "checkbox" ? checked : value

    //Updates form data state
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }))
  }

  //Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault()

    //Checks if user agreed to terms and conditions
    if (!formData.agreedToTerms) {
      alert("Please check the terms and conditions.")
      return
    }

    //Checks if passwords match
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
        //Registration successful
        alert("Registration successful. You can now sign in.")
        window.location.href = '/signin' // Navigates to sign-in page
      } else {
        //Registration failed, handle errors here
        alert("Registration failed! Please try again")
      }
    })
    .catch((error) => {
      console.error("Error registering user:", error)
    })
}

  //Renders the sign-up form
  return (
    <div className="signUp-container">
      <h2>Register</h2>
      <form className="signUp-form" onSubmit={handleSubmit}>
        {/* Inputs fields for first name, last name, email, password, and confirm password */}
        {/* Each input field is associated with the corresponding state */}
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
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
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>
        {/* Checkbox for agreeing to terms and conditions */}
        <div className="checkbox-container">
          <input
            type="checkbox"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
          />
          <label className="checkbox-label">I agree to the terms and conditions</label>
        </div>
        {/* Button to submit the form */}
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}

// Export the component
export default SignUp;
