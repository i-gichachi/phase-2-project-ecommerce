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
