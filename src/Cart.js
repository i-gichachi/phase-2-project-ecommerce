import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart({ cart, removeFromCart, user }) {
  //States to manage quantities of products in the cart
  const [quantities, setQuantities] = useState({})
  //States to manage the total price of the items in the cart
  const [totalPrice, setTotalPrice] = useState(0)

  //This effects runs whenever the cart items or quantities change
  useEffect(() => {
    updateTotalPrice() //Calculates the total price based on quantities
  }, [cart, quantities])

  //Function to update the quantity of a product in the cart
  const updateQuantity = (product, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product.product_name]: quantity,
    }))
  }

  //Function to calculate and update the total price of items in the cart
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
            {/* Loops through each product in the cart */}
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
                    {/* Input to update the quantity of the product */}
                    <input
                      type="number"
                      id={`quantity-${product.product_name}`}
                      min={1}
                      value={quantities[product.product_name] || 1}
                      onChange={(e) => updateQuantity(product, parseInt(e.target.value))}
                    />
                  </div>
                  {/* Button to remove the product from the cart */}
                  <button onClick={() => removeFromCart(product)}>Remove from Cart</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            {/* Display the total price of items in the cart */}
            <p>Total Price: Ksh {totalPrice.toFixed(2)}</p>
            {user ? (
              <Link
                to={{
                  pathname: '/checkout',
                  state: { quantities }, //Passes quantities directly to the checkout page
                }}
              >
                <button>Checkout</button>
              </Link>
            ) : (
              <p>Login to proceed to checkout.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart;

