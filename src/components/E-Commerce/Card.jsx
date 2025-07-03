import React, { useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { useNavigate } from 'react-router-dom';
import "./Card.css";

export default function Card({ item }) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const [bottleSize, setBottleSize] = useState(1);
  const [hover, setHover] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const authToken = localStorage.getItem("authToken");
  const isLoggedIn = Boolean(authToken);
  let navigate = useNavigate();

  const bottleSizes = [
    { label: "200ml", value: 0.2 },
    { label: "500ml", value: 0.5 },
    { label: "1 Litre", value: 1 },
    { label: "2 Litres", value: 2 },
  ];

  const HandleAddToCart = async () => {
    if (!isLoggedIn) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const finalQuantity = quantity * bottleSize;
    const productLabel = `${item.productName} (${bottleSize}L)`;
    const existingItem = data.find(
      (cartItem) => cartItem.id === item._id && cartItem.size === bottleSize
    );

    if (existingItem) {
      await dispatch({
        type: "UPDATE",
        id: item._id,
        name: productLabel,
        price: item.productPrice,
        mrp: item.originalPrice,
        quantity: finalQuantity,
        size: bottleSize
      });
      alert("🛒 Cart updated!\n\nWe've adjusted the quantity for this item.");
    } else {
      await dispatch({
        type: "ADD",
        id: item._id,
        name: productLabel,
        price: item.productPrice,
        mrp: item.originalPrice,
        quantity: finalQuantity,
        size: bottleSize
      });
      alert("🎉 Added to Cart!\n\nYour item has been successfully added.");
    }
  };

  const hasDiscount = item.originalPrice && item.originalPrice > item.productPrice;
  const slugify = (str) =>
    str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  const slug = slugify(item.productName);

  return (
    <div
      className="card-container"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="card-image">
        <img src={item.productImages[0]} alt={item.productName} />
        {item.isNew && <span className="badge new">New</span>}
        {item.isBestseller && <span className="badge bestseller">🔥 Bestseller</span>}
      </div>

      <div className="card-content">
        <h5>{item.productName}</h5>
        {/* <h6>{item.productSize} Litre</h6> */}

        {/* <div className="rating">
          ⭐ {item.productRating.toFixed(1)} ({item.reviewCount} reviews)
        </div> */}

        {/* <p>{item.productDescription}</p> */}

        <div className="tag-list">
          {item.tags.map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
        </div>


        <div className="bottle-size-select">
          <label>Select Bottle Size</label>
          <select value={bottleSize} onChange={(e) => setBottleSize(Number(e.target.value))}>
            {bottleSizes.map((size, idx) => (
              <option key={idx} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>
        <div className="card-controls">

          <div className="quantity-input">
            <label>Enter Desired Quantity</label>
            <div className="quantity-wrapper">
              <button
                className="quantity-btn"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              />
              <button
                className="quantity-btn"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="price-display">
            {hasDiscount ? (
              <>
                <span className="original-price">
                  ₹{(item.originalPrice * quantity * bottleSize).toFixed(0)}
                </span>
                <span className="discounted-price">
                  ₹{(item.productPrice * quantity * bottleSize).toFixed(0)}
                </span>
              </>
            ) : (
              <span className="discounted-price">
                ₹{(item.productPrice * quantity * bottleSize).toFixed(0)}
              </span>
            )}
          </div>

        </div>

        {/* <h6 className="stock-info">
          Only <span>{item.stock}</span> left !!
        </h6> */}

        {isLoggedIn && (
          <button className="add-to-cart" onClick={HandleAddToCart}>
            Add to Cart
          </button>
        )}
        <br />
        <button className="see-more"
          onClick={() =>
            navigate(`/product/${slug}`, {
              state: { productId: item._id }  // Send ID here
            })
          }
        >
          See More
        </button>
      </div>
    </div>
  );
}
