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
}