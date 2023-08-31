import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
//Import the SignIn component
import SignIn from './SignIn';
//Import the SignUp component
import SignUp from './SignUp';
//Import the ProductList component
import ProductList from './ProductList';
//Import the ProductDetail component
import ProductDetail from './ProductDetail';
//Import the Cart component
import Cart from './Cart'; 
//Import the Navigation component
import Navigation from './Navigation'; 
//Import the Checkout component
import Checkout from './Checkout';
import './App.css';

function App() {
  //States products, cart, and user
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)
  const [quantities, setQuantities] = useState({})

  //Uses Navigate from react-router-dom
  const navigate = useNavigate()

  //Fetches products from the API on component mount
  useEffect(() => {
    fetch("http://ecommerce.muersolutions.com/api/v1/products")
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error("Error fetching products:", error)
      })
  }, 
  [])
  

  //Adds product to the cart
  const addToCart = product => {
    setCart([...cart, product])
  }

  //Removes product from the cart
  const removeFromCart = productToRemove => {
    const updatedCart = cart.filter(product => product !== productToRemove)
    setCart(updatedCart)
  }

  const handleLogout = () => {
    setUser(null) //Sets user state to null upon logout
  }

  //Defines the clearCart function
  const clearCart = () => {
    setCart([])
  }

  return (
    <div>
      {/* Navigation component with cart count and user info */}
      <Navigation cartCount={cart.length} user={user} handleLogout={handleLogout}/>
      <div className="content">
        <Routes>
          {/* Route for product list */}
          <Route path="/" element={<ProductList products={products} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} navigate={navigate} />} />
          {/* Route for product detail */}
          <Route path="/products/:productName" element={<ProductDetail products={products} addToCart={addToCart} />} />
          {/* Route for cart */}
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} user={user} />} />
          {/* Route for sign in */}
          <Route
            path="/signin"
            element={<SignIn user={user} handleLogin={(userData) => setUser(userData)} />}
          />
          {/* Route for sign up */}
          <Route path="/signup" element={<SignUp />} />
          {/* Route for checkout */}
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                user={user}
                clearCart={clearCart}
                quantities={quantities}
              />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App;