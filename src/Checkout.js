import React, { useState } from 'react';
import './Checkout.css'; //Import your custom CSS for styling

function Checkout({ cart, user, quantities, clearCart }) {
  //List of counties for delivery
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
  
  //State variables for managing user county and payment status
  const [selectedCounty, setSelectedCounty] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")

  //Calculates the delivery fee based on the address
  const deliveryFee = selectedCounty.toLowerCase() === "nairobi" ? 200 : 400

  //State variable to track whether the receipt should be shown
  const [showReceipt, setShowReceipt] = useState(false)

  //Handles the Receipt process
  const handleReceipt = () => {
    if (!selectedCounty || !selectedPaymentMethod) {
      alert("Please add the delivery address and select a payment method.")
      return
    }
    //Shows the receipt
    setShowReceipt(true)
  }

  //Calculates the total payment including cart total and delivery fee
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

    //Handles confirming the receipt and clearing the cart
    const handleConfirmReceipt = () => {
    //Clears the cart
    clearCart()
    //Reset showReceipt to hide the receipt
    setShowReceipt(false)
  }

  //Checks if the user is logged in
  if (!user) {
    return <div className="checkout-container">You must be logged in to proceed with checkout.</div>
  }
  
  //Renders the checkout form and receipt
  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form className="delivery-form">
      <label htmlFor="county" className="form-label">Select Delivery County:</label>
        <select
          id="county"
          className="form-input"
          value={selectedCounty}
          onChange={(event) => setSelectedCounty(event.target.value)}
        >
          <option value="">Select County</option>
          {countiesList.map((county) => (
            <option key={county} value={county}>
              {county}
            </option>
          ))}
        </select>
      </form>
      <div className="payment-methods">
        <p className="payment-label">Select Payment Method:</p>
        <label className="payment-option">
          <input
            type="radio"
            value="cash"
            checked={selectedPaymentMethod === "cash"}
            onChange={() => setSelectedPaymentMethod("cash")}
          />
          Cash on Delivery
        </label>
        <label className="payment-option">
          <input
            type="radio"
            value="bank"
            checked={selectedPaymentMethod === "bank"}
            onChange={() => setSelectedPaymentMethod("bank")}
          />
          Bank Transfer
        </label>
      </div>
      <button className="show-receipt-button" onClick={handleReceipt}>
        Show Receipt
      </button>
      {showReceipt && ( //Conditionally render the receipt container 
        <div className="receipt-container">
          {generateOrderReceipt()}
          {/* Confirm Receipt Button */}
          <button className="confirm-receipt-button" onClick={handleConfirmReceipt}>
            OK
          </button>
        </div>
      )}
    </div>
  )
}

export default Checkout;
