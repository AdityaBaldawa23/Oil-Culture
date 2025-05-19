import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderError, setOrderError] = useState(null);
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No auth Token Found");
          return;
        }

        const response = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setError("Failed to fetch user data");
      }
    };

    const fetchMyOrder = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const res = await fetch("http://localhost:5000/api/myOrderData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const response = await res.json();
        setOrderData(response);
      } catch (err) {
        console.error("Error fetching order data:", err);
        setOrderError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchMyOrder();
  }, []);

  const handleSave = () => {
    alert("Profile updated successfully!");
    // Add POST/PUT request logic here
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="sidebar">
          <h2>Hello, {user?.name || "Guest"}</h2>
          <ul>
            <li
              onClick={() => handleSectionClick("profile")}
              className={activeSection === "profile" ? "active" : ""}
            >
              👤 My Profile
            </li>
            <li
              onClick={() => handleSectionClick("orders")}
              className={activeSection === "orders" ? "active" : ""}
            >
              📦 Orders & Returns
            </li>
          </ul>
        </div>

        <div className="content">
          {activeSection === "profile" && (
            <div className="profile-card">
              <h1 className="profile-title">My Profile</h1>
              <div className="profile-fields">
                <label>
                  Name:
                  <input
                    type="text"
                    value={user?.name || ""}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    value={user?.email || ""}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </label>
                <label>
                  Phone:
                  <input
                    type="text"
                    value={user?.phone || ""}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                  />
                </label>
                <label>
                  Address:
                  <textarea
                    value={user?.location || ""}
                    onChange={(e) =>
                      setUser({ ...user, address: e.target.value })
                    }
                  ></textarea>
                </label>
                <button className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeSection === "orders" && (
            <div>
              <h2 className="mb-4 fw-bold">🛒 My Orders</h2>
              {loading ? (
                <div className="text-center fs-5">Loading your orders...</div>
              ) : orderError ? (
                <div className="text-danger text-center fs-5">{orderError}</div>
              ) : orderData?.order_data?.length === 0 ? (
                <div className="text-center fs-5 text-muted">
                  No orders found.
                </div>
              ) : (
                <div className="order-scroll-container">
                  {orderData?.order_data
                    ?.slice()
                    .reverse()
                    .map((order, index) => (
                      <div key={index} className="mb-5">
                        <div className="text-center mb-4">
                          <h5 className="text-uppercase text-secondary">
                            🗓️ Order Date:{" "}
                            {new Date(order.Order_Date).toLocaleDateString()}
                          </h5>
                          {order.fullName && (
                            <p>
                              <strong>Name:</strong> {order.fullName}
                            </p>
                          )}
                          {order.phone && (
                            <p>
                              <strong>Phone:</strong> {order.phone}
                            </p>
                          )}
                          {order.address && (
                            <p>
                              <strong>Address:</strong> {order.address}
                            </p>
                          )}
                          {order.instructions && (
                            <p>
                              <strong>Instructions:</strong>{" "}
                              {order.instructions}
                            </p>
                          )}
                          <hr className="w-50 mx-auto" />
                        </div>

                        <div className="row justify-content-center">
                          {(order.items || []).map((item, subIndex) => (
                            <div
                              key={subIndex}
                              className="col-12 col-md-6 col-lg-4 mb-4 d-flex align-items-stretch"
                            >
                              <div className="card shadow-sm border-0 w-100">
                                <div className="card-body d-flex flex-column">
                                  <h5 className="card-title mb-2">
                                    {item.name}
                                  </h5>
                                  <div className="mb-2 text-muted small">
                                    <span className="me-3">
                                      <strong>Qty:</strong> {item.quantity}
                                    </span>
                                    <span className="me-3">
                                      <strong>Price/item:</strong> ₹{item.price}
                                    </span>
                                  </div>
                                  <div className="mt-auto fs-5 text-end text-primary fw-bold">
                                    ₹{Number(item.price) * item.quantity}/-
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
