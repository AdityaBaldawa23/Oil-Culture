// ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useCart, useDispatchCart } from "./ContextReducer";
import Navbar from "../../components/E-Commerce/Navbar";
import { FaCartPlus } from "react-icons/fa";
import "./ProductDetails.css";

export default function ProductDetails() {
  const location = useLocation();
  const { slug } = useParams();
  const data = useCart();
  const dispatch = useDispatchCart();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [bottleSize, setBottleSize] = useState(1);

  const bottleSizes = [ 
    { label: "200ml", value: 0.2 },
    { label: "500ml", value: 0.5 },
    { label: "1 Litre", value: 1 },
    { label: "2 Litres", value: 2 },
  ];

  const productId = location.state?.productId;
  useEffect(() => {
  if (productId) {
    fetch(`https://oil-culture.onrender.com/admin/product/displayByID/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(console.error);
  } else {
    console.warn("No product ID provided in state");
  }
}, [productId]);

  const HandleAddToCart = async () => {
    const finalQuantity = quantity * bottleSize;
    const productLabel = `${product.productName} (${bottleSize}L)`;

    const existingItem = data.find(
      (cartItem) => cartItem.id === product._id && cartItem.size === bottleSize
    );

    if (existingItem) {
      await dispatch({
        type: "UPDATE",
        id: product._id,
        name: productLabel,
        price: product.productPrice,
        mrp: product.originalPrice,
        quantity: finalQuantity,
        size: bottleSize
      });
      alert("🛒 Cart updated!\n\nWe've adjusted the quantity for this item.");
    } else {
      await dispatch({
        type: "ADD",
        id: product._id,
        name: productLabel,
        price: product.productPrice,
        mrp: product.originalPrice,
        quantity: finalQuantity,
        size: bottleSize
      });
      alert("🎉 Added to Cart!\n\nYour item has been successfully added.");
    }
  };

  const renderStars = (rating) => (
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? "star filled" : "star"}>★</span>
      ))}
      <span className="review-count">({product?.reviewCount || 0})</span>
    </div>
  );

  if (!product) return <div className="loading">Loading...</div>;

  const {
    productName, productPrice, originalPrice, productDiscount,
    productImages, productDescription, productRating, productSize,
    stock, isNew, isBestseller
  } = product;

  const hasDiscount = originalPrice && originalPrice > productPrice;

  return (
    <div className="black-gold-bg">
      <Navbar />
      <div className="product-page">
        <Link to="/shop" className="back-link">← Back to Products</Link>

        <div className="product-container reverse-layout">
          {/* Info Section */}
          <div className="info-section">
            <div className="badge-row">
              {isNew && <span className="badge new">New</span>}
              {isBestseller && <span className="badge bestseller">🔥 Bestseller</span>}
            </div>

            <h1 className="product-title">{productName}</h1>
            {renderStars(productRating)}

            <div className="price-row">
              <span className="price">₹{(productPrice * quantity * bottleSize).toFixed(0)}</span>
              {hasDiscount && (
                <>
                  <span className="original">₹{(originalPrice * quantity * bottleSize).toFixed(0)}</span>
                  <span className="discount">{productDiscount}% OFF</span>
                </>
              )}
            </div>

            <p className="stock">Size: {productSize}L • {stock > 0 ? `Only ${stock} left!` : "Out of Stock"}</p>
            <p className="description">{productDescription}</p>

            <div className="select-group">
              <label>Select Bottle Size:</label>
              <select value={bottleSize} onChange={(e) => setBottleSize(Number(e.target.value))}>
                {bottleSizes.map((s, i) => (
                  <option key={i} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div className="select-group">
              <label>Enter Quantity:</label>
              <div className="quantity-wrapper1">
                <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>−</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                />
                <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
              </div>
            </div>

            <div className="action-buttons1">
              <button className="cart-btn" onClick={HandleAddToCart}>
                <FaCartPlus style={{ marginRight: "8px" }} />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="image-section">
            <img
              className="main-image"
              src={product.productImages[activeImage]}
              alt={productName}
            />
            <div className="thumbnail-row">
              {productImages.map((img, i) => (
                <img
                  key={i}
                  src={product.productImages[i]}
                  className={`thumbnail ${i === activeImage ? "active-thumb" : ""}`}
                  onClick={() => setActiveImage(i)}
                  alt={`thumb-${i}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
