import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ProductList.css'; //Import the custom CSS for styling

function ProductList({ products, cart, addToCart, removeFromCart, navigate }) {
    const rankedProducts = products.filter(product => product.ranking === 5)
    return (
        <div>
          {/* Carousel section displaying ranked products */}
          <div className="product-list-carousel">
            <Carousel showThumbs={false} showStatus={false} autoPlay={false}>
              {rankedProducts.map((product, index) => (
                <div key={product.product_name} className="product-thumbnails-container">
                  <div className="product-thumbnail">
                    <img src={product.product_thumbnail} alt={`${product.product_name} Thumbnail`} />
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
                {/* Lists of all products */}
      <ul className="product-list">
        {products.map(product => (
          <li key={product.product_name} className="product-card">
            <h3>{product.product_name}</h3>
            <h4>Price: Ksh {product.unit_price}</h4>
            <img src={product.product_thumbnail} alt={`${product.product_name} Thumbnail`} />
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

export default ProductList;