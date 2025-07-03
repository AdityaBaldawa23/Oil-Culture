import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import Navbar from "../../components/E-Commerce/Navbar";

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

        const response = await axios.get(`https://oil-culture.onrender.com/profile`, {
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
        const customerEmail = localStorage.getItem("userEmail");
        const res = await fetch(`https://oil-culture.onrender.com/api/myOrderData`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customerEmail }),
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="sidebar-wrapper">
          <button
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-expanded={sidebarOpen}
            aria-controls="sidebar-menu"
          >
            {sidebarOpen ? "✖ Close Menu" : "☰ Menu"}
          </button>

          <nav
            id="sidebar-menu"
            className={`sidebar ${sidebarOpen ? "open" : ""}`}
          >
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
          </nav>
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
              </div>
            </div>
          )}

          {activeSection === "orders" && (
            <div>
              <h1>🛒 My Orders</h1>
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
                  {orderData?.order_data?.slice().reverse().map((order, index) => (
                    <div key={index} className="mb-5">
                      <div className="text-center mb-4">
                        <h5 className="text-uppercase">
                          🗓️ Order Date:{" "}
                          {new Date(order.orderDate).toLocaleDateString()}
                        </h5>
                        {order.customerName && (
                          <p><strong>Name:</strong> {order.customerName}</p>
                        )}
                        {order.customerPhone && (
                          <p><strong>Phone:</strong> {order.customerPhone}</p>
                        )}
                        {order.address && (
                          <p><strong>Address:</strong> {order.address}</p>
                        )}
                        <hr className="w-50 mx-auto" />
                      </div>

                      <div className="row justify-content-center">
                        {(order.productsBought || []).map((item, subIndex) => (
                          <div
                            key={subIndex}
                            className="col-12 col-md-6 col-lg-4 mb-4 d-flex align-items-stretch"
                          >
                            <div className="product-card w-100">
                              <h4>{item.productName}</h4>
                              <div className="product-details">
                                <span><strong>Qty:</strong> {item.quantity} </span><br />
                                <span><strong>Price/item:</strong> ₹{item.price}</span>
                              </div>
                              <div className="product-total">
                                <span><strong>Grand Total: </strong>₹{item.price * item.quantity}/-</span>
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
