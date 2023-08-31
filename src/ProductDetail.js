import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css'; //Import your custom CSS for styling

function ProductDetail({ products, addToCart }) {
  //Gets the "productName" parameter from the URL
  const { productName } = useParams()

  //States to store the selected product
  const [product, setProduct] = useState(null)

  //Effects to find and set the product based on the "productName" parameter
  useEffect(() => {
    //Finds the product in the "products" array that matches the "productName"
    const productDetail = products.find(p => p.product_name === productName)
    //Sets the found product in the state
    setProduct(productDetail)
  }, 
  [productName, products])

  //If product is still loading, it will show a loading message
  if (!product) {
    return <div className="product-detail loader">Loading...</div>
  }

  //Once the product is loaded, the details will be displayed
  return (
    <div className="product-detail">
      <h2>{product.product_name}</h2>
      <p>{product.product_description}</p>
      <p className="price">Price: Ksh {product.unit_price}</p>
      <img src={product.product_full_image} alt={`${product.product_name} Full`} />
      <p className="ranking">Ranking: {product.ranking}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  )
}

export default ProductDetail;