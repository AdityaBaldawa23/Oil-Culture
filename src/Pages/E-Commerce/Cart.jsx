import React, { useState } from "react";
import { useCart, useDispatchCart } from "../../components/E-Commerce/ContextReducer";
import Modal from "../../Modal";
import "./Cart.css";

export default function Cart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setcustomerName] = useState("");
  const [Loading, setLoading] = useState(false);
  const [customerPhone, setcustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");

  const data = useCart();
  const productsBought = data.map(item => ({
    productId: item.id,
    productName: item.name,
    price: item.price,
    quantity: item.quantity,
    productDiscount: item.mrp ? item.mrp - item.price : 0
  }));


  const dispatch = useDispatchCart();
  const totalPrice = data.reduce(
    (total, food) => total + food.price * food.quantity,
    0
  );

  const authToken = localStorage.getItem("authToken");
  const userEmail = localStorage.getItem("userEmail")

  if (!authToken) {
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
    if (!customerName.trim() || !customerPhone.trim() || !address.trim()) {
      alert("Please fill in all the required fields.");
      return;
    }

    if (!/^\d{10}$/.test(customerPhone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    const orderDetails = {
      customerEmail: userEmail,
      productsBought,
      orderDate: new Date().toISOString(),
      customerName,
      customerPhone,
      address,
      instructions,
      totalPrice
    };

    const emailPayload = {
      name: customerName,
      email: userEmail,
      id: `ORD-${Date.now()}`,
      total: totalPrice,
      items: data,
      address: address,
    };

    try {
      const res1 = await fetch(
        `http://localhost:5000/api/orderdata`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderDetails),
        },
        console.log(orderDetails),
      );

      const res2 = await fetch(
        `http://localhost:5000/place-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailPayload),
        }
      );

      if (res1.ok && res2.ok) {
        dispatch({ type: "DROP" });
        alert("🎉 Thank you for your order!\n\nYour order has been placed successfully, and a confirmation email has been sent to your inbox.\n\nWe appreciate your support!");

        setIsModalOpen(false);
        setcustomerName("");
        setcustomerPhone("");
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
                  <th>MRP</th>
                  <th>Final Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td data-label="#"> {index + 1} </td>
                    <td data-label="Item"> {item.name} </td>
                    <td data-label="Qty"> {item.quantity} </td>
                    <td data-label="MRP">₹{item.mrp * item.quantity}</td>
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
            value={customerName}
            onChange={(e) => setcustomerName(e.target.value)}
            required
          />

          <label className="modal-label">Phone Number</label>
          <input
            className="modal-input"
            value={customerPhone}
            onChange={(e) => setcustomerPhone(e.target.value)}
            required
          />

          <label className="modal-label">
            Delivery Address
          </label>
          <textarea
            className="modal-textarea"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>

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
