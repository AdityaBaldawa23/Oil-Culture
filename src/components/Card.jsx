import React, { useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import "./Card.css";

export default function Card({ item }) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const [hover, setHover] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const userEmail = localStorage.getItem("userEmail");
  const isLoggedIn = Boolean(userEmail);
  const HandleAddToCart = async () => {
    if (!isLoggedIn) {
      alert("Please log in to add items to your cart.");
      return;
    }
    let existingItem = data.find((cartItem) => cartItem.id === item._id);

    if (existingItem) {
      await dispatch({
        type: "UPDATE",
        id: item._id,
        name: item.name,
        price: item.price,
        quantity: quantity,
      });
      alert("🛒 Cart updated!\n\nWe've adjusted the quantity for this item.");
    } else {
      await dispatch({
        type: "ADD",
        id: item._id,
        name: item.name,
        price: item.price,
        quantity: quantity,
      });
      alert("🎉 Added to Cart!\n\nYour item has been successfully added.");
    }
  };

  return (
    <div
      className="food-card"
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: hover
          ? "0 15px 30px rgba(72, 52, 212, 0.12)"
          : "0 6px 15px rgba(72, 52, 212, 0.08)",
        transition: "all 0.4s ease",
        transform: hover ? "translateY(-8px)" : "translateY(0)",
        border: "none",
        height: "100%",
        position: "relative",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{ height: "350px", overflow: "hidden", position: "relative" }}
      >
        <img
          src={item.img}
          alt={item.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transition: "transform 0.5s ease",
            transform: hover ? "scale(1.05)" : "scale(1)",
          }}
        />
      </div>

      <div style={{ padding: "16px" }}>
        <h5
          style={{
            fontWeight: "700",
            fontSize: "1.1rem",
            marginBottom: "8px",
            color: "#2d3436",
          }}
        >
          {item.name}
        </h5>

        <h6
          style={{
            fontWeight: "300",
            fontSize: "0.9rem",
            marginBottom: "8px",
            color: "#2d3436",
          }}
        >
          {item.piecesPerBox} per Box
        </h6>

        <p
          style={{
            color: "#636e72",
            fontSize: "0.9rem",
            marginBottom: "16px",
            lineHeight: "1.4",
          }}
        >
          {item.description}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "1rem", color: "red" }}>
              Enter Desired Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #dfe6e9",
                backgroundColor: "#f5f6fa",
                fontSize: "0.9rem",
                fontWeight: "500",
                color: "#2d3436",
                cursor: "pointer",
                width: "100%",
              }}
            />
          </div>

          <div
            style={{
              fontWeight: "700",
              fontSize: "1.2rem",
              color: "#6c5ce7",
              paddingTop: "25px",
            }}
          >
            ₹{item.price * quantity}
          </div>
        </div>
        
        <h6
          style={{
            fontWeight: "300",
            fontSize: "1rem",
            marginBottom: "8px",
            color: "red",
          }}
        >
          Only <span style={{fontWeight: "900", fontSize:"1.3rem"}}>{item.stock}</span> left !!
        </h6>
        
        <button
          disabled={!isLoggedIn}
          onClick={(e) => {
            if (!isLoggedIn) {
              e.preventDefault();
              alert("Please log in to add items to your cart.");
              return;
            }
            HandleAddToCart();
          }}
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            background: !isLoggedIn
              ? "gray"
              : hover
              ? "linear-gradient(135deg, #ff6b00, #ff3d00)"
              : "linear-gradient(45deg, #ff6b00, #ff3d00)",
            color: "white",
            fontWeight: "600",
            cursor: !isLoggedIn ? "not-allowed" : "pointer",
            opacity: !isLoggedIn ? 0.6 : 1,
            transition: "all 0.3s ease",
            boxShadow: hover
              ? "0 5px 15px rgba(108, 92, 231, 0.4)"
              : "0 2px 10px rgba(108, 92, 231, 0.2)",
          }}
        >
          {isLoggedIn ? "Add to Cart" : "Login to Add"}
        </button>
      </div>
    </div>
  );
}
