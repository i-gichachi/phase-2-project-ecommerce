import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaUser } from 'react-icons/fa';
import './Navbar.css';

function Navigation({ cartCount, user, handleLogout }) {
    return (
      <nav className="navbar">
        <h1 className="navbar-title">Madukani App</h1>
        <ul className="navbar-links">
          <li className="navbar-link-item">
            <Link to="/">
              <FaHome />
            </Link>
          </li>
          <li className="navbar-link-item">
          <Link to="/cart">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </li>

export default Navigation;  