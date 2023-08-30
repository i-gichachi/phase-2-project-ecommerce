import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart({ cart, removeFromCart, user }) {
  const [quantities, setQuantities] = useState({})
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    updateTotalPrice()
  }, [cart, quantities])
}