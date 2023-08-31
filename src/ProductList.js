import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ProductList.css'; //Import the custom CSS for styling

// Define the ProductList component
function ProductList({ products, cart, addToCart, removeFromCart, navigate }) {
  // Filter products to get ranked products with a ranking of 5
    const rankedProducts = products.filter(product => product.ranking === 5)
    return (
        <div>
          {/* Carousel section displaying ranked products */}
          <div className="product-list-carousel">
             {/* Use the Carousel component from the react-responsive-carousel library */}
            <Carousel showThumbs={false} showStatus={false} autoPlay={false}>
              {/* Map over ranked products to display each one in the carousel */}
              {rankedProducts.map((product, index) => (
                <div key={product.product_name} className="product-thumbnails-container">
                  <div className="product-thumbnail">
                    {/* Display the thumbnail image of the product */}
                    <img src={product.product_thumbnail} alt={`${product.product_name} Thumbnail`} />
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
                {/* Lists of all products */}
      <ul className="product-list">
        {/* Map over all products to display each one in a list */}
        {products.map(product => (
          <li key={product.product_name} className="product-card">
            {/* Display the product name */}
            <h3>{product.product_name}</h3>
            {/* Display the product price */}
            <h4>Price: Ksh {product.unit_price}</h4>
             {/* Display the product thumbnail */}
            <img src={product.product_thumbnail} alt={`${product.product_name} Thumbnail`} />
            {/* Display the product ranking */}
            <p>Ranking: {product.ranking}</p>
            {/* Button to navigate to product details page */}
            <button onClick={() => navigate(`/products/${encodeURIComponent(product.product_name)}`)}>
              View Details
            </button>
            {/* Conditional button based on cart status */}
            {cart.some(item => item.product_name === product.product_name) ? (
              <button onClick={() => removeFromCart(product)}>Remove from Cart</button>
            ) : (
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            )}
          </li>
        ))}
      </ul>
    </div>
     )
    }
    
// Export the ProductList component for use in other parts of the application
export default ProductList;