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