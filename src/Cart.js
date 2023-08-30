import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart({ cart, removeFromCart, user }) {
  const [quantities, setQuantities] = useState({})
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    updateTotalPrice()
  }, [cart, quantities])

  const updateQuantity = (product, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product.product_name]: quantity,
    }))
  }

  const updateTotalPrice = () => {
    let total = 0;
    cart.forEach((product) => {
      const quantity = quantities[product.product_name] || 1
      total += product.unit_price * quantity
    })
    setTotalPrice(total)
  }

  return (
    <div className="cart-container">
      <h2 className="cart-header">Cart</h2>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>Your cart is empty.</h3>
        </div>
      ) : (
        <div>
          <ul>
            {cart.map((product) => (
              <li key={product.product_name} className="cart-item">
                <img src={product.product_full_image} alt={`${product.product_name} Full`} />
                <div className="cart-item-details">
                  <h3>{product.product_name}</h3>
                  <p>{product.product_description}</p>
                  <h4>Price: Ksh {product.unit_price}</h4>
                  <p>Ranking: {product.ranking}</p>
                  <div className="quantity-control">
                    <label htmlFor={`quantity-${product.product_name}`}>Quantity:</label>
                    <input
                      type="number"
                      id={`quantity-${product.product_name}`}
                      min={1}
                      value={quantities[product.product_name] || 1}
                      onChange={(e) => updateQuantity(product, parseInt(e.target.value))}
                    />
                  </div>
