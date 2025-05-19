  import React from "react";
  import { useState } from "react";
  import { useCart, useDispatchCart } from "../components/ContextReducer";
  import Modal from "../Modal";
  import "./Cart.css";

  export default function Cart() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [instructions, setInstructions] = useState("");

    let data = useCart();
    let dispatch = useDispatchCart();
    let totalPrice = data.reduce(
      (total, food) => total + food.price * food.quantity,
      0
    );

    const userEmail = localStorage.getItem("userEmail");

  // If user is not logged in
  if (!userEmail) {
    return (
      <div className="mb-5 mt-5 w-100 text-center fs-3 text-danger">
        ⚠️ You must be logged in to use the cart.
        <br />
        <a href="/login" style={{ textDecoration: "underline", color: "blue" }}>
          Click here to Login
        </a>
      </div>
    );
  }

    if (data.length === 0) {
      return (
        <>
          <div className="mb-5 mt-5 w-100 text-center fs-3 text-muted">
            🛒 Your cart is empty!
          </div>
        </>
      );
    }

    const HandleCheckOut = async () => {
      setIsModalOpen(true);
    };

    const handleFinalSubmit = async () => {
      // Validation
      if (!fullName.trim() || !phone.trim() || !address.trim()) {
        alert("Please fill in all the required fields.");
        return;
      }

      if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }

      const userEmail = localStorage.getItem("userEmail");

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
        id: `ORD-${Date.now()}`, // or any unique ID format
        total: totalPrice,
        items: data,
      };

      try {
        const res1 = await fetch("http://localhost:5000/api/orderdata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderDetails),
        });

        const res2 = await fetch("http://localhost:5000/place-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailPayload),
        });

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
        <div className="container mt-5">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <h3 className="text-success mb-4 text-center">
              🛍️ Your Shopping Cart
            </h3>
            <div className="table-responsive">
              <table
                className="table table-striped table-hover align-middle"
                style={{ borderRadius: "80px" }}
              >
                <thead className="table-success fs-5">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Price</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <strong>₹{item.price * item.quantity}</strong>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            dispatch({ type: "REMOVE", index: index });
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-end mt-4">
              <h4 className="text-dark">
                Total: <span className="text-success">₹{totalPrice}</span>
              </h4>
            </div>

            <div className="text-center mt-4">
              <button
                className="btn btn-success btn-lg px-4 shadow-sm rounded-pill"
                onClick={HandleCheckOut}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="custom-modal" style={{ color: "black" }}>
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

            <label className="modal-label">Delivery Address</label>
            <textarea
              className="modal-textarea"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <label className="modal-label">Special Instructions</label>
            <textarea
              className="modal-textarea"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />

            <button className="modal-button" onClick={handleFinalSubmit}>
              Submit Order 🚀
            </button>
          </div>
        </Modal>
      </>
    );
  }
