import React, { useState } from 'react';

function Checkout({ cart, user, quantities, clearCart }) {
  const countiesList = [
    "Nairobi",
    "Mombasa",
    "Kwale",
    "Kilifi",
    "Tana River",
    "Lamu",
    "Taita-Taveta",
    "Garissa",
    "Wajir",
    "Mandera",
    "Marsabit",
    "Isiolo",
    "Meru",
    "Tharaka-Nithi",
    "Embu",
    "Kitui",
    "Machakos",
    "Makueni",
    "Nyandarua",
    "Nyeri",
    "Kirinyaga",
    "Murang'a",
    "Kiambu",
    "Turkana",
    "West Pokot",
    "Samburu",
    "Trans Nzoia",
    "Uasin Gishu",
    "Elgeyo-Marakwet",
    "Nandi",
    "Baringo",
    "Laikipia",
    "Nakuru",
    "Narok",
    "Kajiado",
    "Kericho",
    "Bomet",
    "Kakamega",
    "Vihiga",
    "Bungoma",
    "Busia",
    "Siaya",
    "Kisumu",
    "Homa Bay",
    "Migori",
    "Kisii",
    "Nyamira",
  ]
  
  const [selectedCounty, setSelectedCounty] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const deliveryFee = selectedCounty.toLowerCase() === "nairobi" ? 200 : 400
  const [showReceipt, setShowReceipt] = useState(false)

  const handleReceipt = () => {
    if (!selectedCounty || !selectedPaymentMethod) {
      alert("Please add the delivery address and select a payment method.")
      return
    }
    setShowReceipt(true)
  }


  const calculateTotalPayment = () => {
    const cartTotal = cart.reduce((total, product) => {
      const quantity = quantities[product.product_name] || 1
      return total + product.unit_price * quantity
    }, 0)
    return cartTotal + deliveryFee
  }
  
  const generateOrderReceipt = () => {
    const totalPayment = calculateTotalPayment()

    return (
      <div className="order-receipt">
        <h3>Order Receipt</h3>
        <p className="receipt-item">Delivery Address: {selectedCounty}</p>
        <p className="receipt-item">Payment Method: {selectedPaymentMethod}</p>
        <p className="receipt-item">Delivery Fee: Ksh {deliveryFee}</p>
        <p className="receipt-item">Product Delivery: Within 7 business days</p>
        <p className="receipt-item">Order Details:</p>
        <ul className="order-details">
          {cart.map((product) => (
            <li key={product.product_name} className="receipt-item">
              {product.product_name} (Quantity: {quantities[product.product_name] || 1}) - Ksh {product.unit_price}
            </li>
          ))}
        </ul>
        <p className="receipt-total">Total Payment: Ksh {totalPayment.toFixed(2)}</p>
        <p className="receipt-message">Thank you for shopping with us and please come again!</p>
      </div>
        )
    }

    const handleConfirmReceipt = () => {
    clearCart()
    setShowReceipt(false)
  }

  if (!user) {
    return <div className="checkout-container">You must be logged in to proceed with checkout.</div>
  }
}