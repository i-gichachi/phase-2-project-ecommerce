// Import React library for creating React components
import React from 'react';
// Import Link component from react-router-dom for navigation
import { Link } from 'react-router-dom';
// Import specific icons from the Font Awesome library
import { FaShoppingCart, FaHome, FaUser } from 'react-icons/fa';
// Import the custom styling for the Navbar
import './Navbar.css';

// Define the Navigation component
function Navigation({ cartCount, user, handleLogout }) {
    return (
        // Create the navigation bar container
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
            {/* Display the shopping cart icon */}
            <FaShoppingCart />
            {/* Display the cart item count if it's greater than 0 */}
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </li>

        {/* Another link to the cart page */}
        <li className="navbar-link-item">
          <Link to="/cart">
            {/* Display the shopping cart icon */}
            <FaShoppingCart />
            {/* Display the cart item count if it's greater than 0 */}
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </li>

        {/* Conditional rendering based on user authentication */}
        <li className="navbar-link-item">
          {user ? (
            <div className="user-info">
              <span>Welcome {user.first_name}!</span>
              {/* Display the user icon */}
              <FaUser className="user-icon" /> 
              {/* Trigger the handleLogout function on button click */}
              <button onClick={handleLogout}>Logout</button>
            </div>
              ) : (
                // If user is not authenticated, display login link
                <Link to="/signin">Login</Link>
              )}
            </li>
          </ul>
        </nav>
      )
    }
    
    // Export the Navigation component for use in other parts of the application
    export default Navigation;

