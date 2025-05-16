import React, { useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import "./Card.css";

export default function Card({ item }) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const [hover, setHover] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const HandleAddToCart = async () => {
    let existingItem = data.find(
      (cartItem) =>
        cartItem.id === item._id
    );

    if (existingItem) {
      await dispatch({
        type: "UPDATE",
        id: item._id,
        name: item.name,
        price: item.price,
        quantity: quantity,
      });
    }else{
      await dispatch({
        type: "ADD",
        id: item._id,
        name: item.name,
        price: item.price,
        quantity: quantity,
      });
    }
    console.log(data);
  };

  console.log("Image Source:", item.img);

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
        style={{ height: "180px", overflow: "hidden", position: "relative" }}
      >
        <img
          src={item.img}
          alt={item.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
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
          <div style={{ display: "flex", gap: "8px" }}>
            <select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #dfe6e9",
                backgroundColor: "#f5f6fa",
                fontSize: "0.9rem",
                fontWeight: "500",
                color: "#2d3436",
                cursor: "pointer",
                width: "60px",
              }}
            >
              {Array.from(Array(6), (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            {/* <select
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #dfe6e9",
                backgroundColor: "#f5f6fa",
                fontSize: "0.9rem",
                fontWeight: "500",
                color: "#2d3436",
                cursor: "pointer",
                width: "80px",
              }}
            >
              {item.options &&
                Object.keys(item.options[0])
                  .filter((key) => key !== "_id")
                  .map((key) => (
                    <option key={key} value={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </option>
                  ))}
            </select> */}
          </div>

          <div
            style={{ fontWeight: "700", fontSize: "1.2rem", color: "#6c5ce7" }}
          >
            ₹{item.price * quantity}
          </div>
        </div>

        <button
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            background: hover
              ? "linear-gradient(45deg, #6c5ce7, #a29bfe)"
              : "linear-gradient(45deg, #8e44ad, #6c5ce7)",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: hover
              ? "0 5px 15px rgba(108, 92, 231, 0.4)"
              : "0 2px 10px rgba(108, 92, 231, 0.2)",
          }}
          onClick={HandleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
