import React, { useState } from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import Modal from "../Modal";
import "./Cart.css";

export default function Cart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [Loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");

  const data = useCart();
  const dispatch = useDispatchCart();
  const totalPrice = data.reduce(
    (total, food) => total + food.price * food.quantity,
    0
  );

  const userEmail = localStorage.getItem("userEmail");

  if (!userEmail) {
    return (
      <div className="unauthenticated-message">
        ⚠️ You must be logged in to use the cart.
        <br />
        <a className="login-link" href="/login">
          Click here to Login
        </a>
      </div>
    );
  }

  if (data.length === 0) {
    return <div className="empty-cart-message">🛒 Your cart is empty!</div>;
  }

  const HandleCheckOut = () => setIsModalOpen(true);

  const handleFinalSubmit = async () => {
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill in all the required fields.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    const orderDetails = {
      email: userEmail,
      OrderData: data,
      Order_Date: new Date().toISOString(),
      fullName,
      phone,
      address,
      instructions,
    };

    const emailPayload = {
      name: fullName,
      email: userEmail,
      id: `ORD-${Date.now()}`,
      total: totalPrice,
      items: data,
      address: address,
    };

    try {
      const res1 = await fetch(
        `https://rama-mangoes.onrender.com/api/orderdata`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderDetails),
        }
      );

      const res2 = await fetch(
        `https://rama-mangoes.onrender.com/place-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailPayload),
        }
      );

      if (res1.ok && res2.ok) {
        dispatch({ type: "DROP" });
        alert("Order placed successfully! Confirmation email sent.");
        setIsModalOpen(false);
        setFullName("");
        setPhone("");
        setAddress("");
        setInstructions("");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Server error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="cart-container">
        <div className="cart-card shadow-lg rounded-4">
          <h3 className="cart-header">🛍️ Your Shopping Cart</h3>

          <div className="table-responsive">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td data-label="#"> {index + 1} </td>
                    <td data-label="Item"> {item.name} </td>
                    <td data-label="Qty"> {item.quantity} </td>
                    <td data-label="Price"> ₹{item.price * item.quantity} </td>
                    <td data-label="Remove">
                      <button
                        className="cart-remove-btn"
                        onClick={() => dispatch({ type: "REMOVE", index })}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-total">
            Total: <span>₹{totalPrice}</span>
          </div>

          <button className="cart-checkout-btn" onClick={HandleCheckOut}>
            Proceed to Checkout
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="custom-modal">
          <h2 className="modal-header">📝 Enter Order Details</h2>

          <label className="modal-label">Full Name</label>
          <input
            className="modal-input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label className="modal-label">Phone Number</label>
          <input
            className="modal-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label className="modal-label">
            Delivery Address(Outside Sangli orders minimum requirement of 5
            dozen)
          </label>
          <select
            className="modal-select"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Delivery Address
            </option>
            <option value="Sangli">Sangli</option>
            <option value="Pune">Pune</option>
            <option value="Nagpur">Nagpur</option>
            <option value="Parli">Parli</option>
            <option value="Parbhani">Parbhani</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>

          <label className="modal-label">Special Instructions</label>
          <textarea
            className="modal-textarea"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />

          {Loading ? (
            <div className="loader-overlay">
              <div className="loader"></div>
              <p
                style={{ marginTop: "20px", fontSize: "1.2rem", color: "#555" }}
              >
                Placing your order...
              </p>
            </div>
          ) : (
            <button className="modal-button" onClick={handleFinalSubmit}>
              Submit Order 🚀
            </button>
          )}
        </div>
      </Modal>
    </>
  );
}
