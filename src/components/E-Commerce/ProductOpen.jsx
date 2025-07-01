// ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../components/E-Commerce/ContextReducer";
import Navbar from "../../components/E-Commerce/Navbar";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [bottleSize, setBottleSize] = useState(1);

  const bottleSizes = [
    { label: "200ml", value: 0.2 },
    { label: "500ml", value: 0.5 },
    { label: "1 Litre", value: 1 },
    { label: "2 Litres", value: 2 },
  ];

  useEffect(() => {
    fetch(`http://localhost:5000/admin/product/displayByID/6839bceffb0d19b143a460a1`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(console.error);
  }, [id]);

  const handleAddToCart = () => {
    const finalQuantity = quantity * bottleSize;
    addToCart({
      id: product._id,
      name: `${product.productName} (${bottleSize}L)`,
      price: product.productPrice,
      mrp: product.originalPrice,
      quantity: finalQuantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
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
    stock, tags, isNew, isBestseller,
  } = product;

  const hasDiscount = originalPrice && originalPrice > productPrice;

  return (
    <div className="black-gold-bg">
      <Navbar />
      <div className="product-page">
        <Link to="/shopping" className="back-link">← Back to Products</Link>

        <div className="product-container reverse-layout">
          {/* Left: Info */}
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

            <div className="tag-row">
              {tags.map((tag, i) => <span className="tag" key={i}>#{tag}</span>)}
            </div>

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
              <div className="quantity-wrapper">
                <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>−</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                />
                <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="cart-btn" onClick={handleAddToCart}>
                {addedToCart ? "Added to Cart" : "Add to Cart"}
              </button>
              <button className={`wishlist-btn ${isWishlisted ? "active" : ""}`} onClick={() => setIsWishlisted(!isWishlisted)}>
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>
            </div>

            {addedToCart && <p className="added-message">✅ Product added to your cart!</p>}
          </div>

          {/* Right: Images */}
          <div className="image-section">
            <img
              className="main-image"
              src={`http://localhost:5000/uploads/${productImages[activeImage]}`}
              alt={productName}
            />
            <div className="thumbnail-row">
              {productImages.map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost:5000/uploads/${img}`}
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
