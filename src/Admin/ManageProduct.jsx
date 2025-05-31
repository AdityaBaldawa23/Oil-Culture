import React, { useState } from "react";
import "./ManageProduct.css";
import AdminNavbar from "../components/Admin-Billing/AdminNavbar";
import axios from "axios";

export default function ManageProduct() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeOrderTab, setActiveOrderTab] = useState("pending");
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [formData, setFormData] = useState({
    productCategory: "",
    productName: "",
    productPrice: "",
    productSize: "",
    stock: "",
    productDescription: "",
    productImages: null,
    productRating: "",
    reviewCount: "",
    tags: "",
    isNew: true,
    isBestseller: "",
    originalPrice: "",
    productDiscount: "",
  });

  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        ["productPrice", "productSize", "stock", "reviewCount", "productRating", "originalPrice", "productDiscount"].includes(name)
          ? Number(value)
          : value,
    }));
  };


  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/product/display`
      );
      setProducts(res.data);
      setShowViewModal(true);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/all-orders`
      );
      console.log("Orders API response:", res.data);
      setOrders(res.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      // Call backend API to update order status
      const response = await axios.post(
        `http://localhost:5000/api/update-order-status`,
        { orderId, orderStatus: newStatus }
      );

      if (response.data.success) {
        // Update local state only if API call was successful
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
      } else {
        alert("Failed to update order status: " + response.data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status. Please try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append all fields
    data.append("productCategory", formData.productCategory);
    data.append("productName", formData.productName);
    data.append("productPrice", formData.productPrice);
    data.append("productSize", formData.productSize);
    data.append("stock", formData.stock);
    data.append("productDescription", formData.productDescription);
    data.append("reviewCount", formData.reviewCount || 0);
    data.append("productRating", formData.productRating);
    data.append("tags", formData.tags);
    data.append("isBestseller", formData.isBestseller);
    data.append("originalPrice", formData.originalPrice);
    data.append("productDiscount", formData.productDiscount || 0);
    data.append("isNew", formData.isNew);

    // ✅ If new images are selected, send them
    if (
      formData.productImages &&
      Array.isArray(formData.productImages) &&
      formData.productImages.length > 0 &&
      formData.productImages[0] instanceof File
    ) {
      formData.productImages.forEach((file) => {
        data.append("productImages", file);
      });
    } else {
      // ✅ Send existing image filenames if no new ones selected
      if (formData.productImages) {
        data.append("existingImages", JSON.stringify(formData.productImages));
      }
    }

    try {
      await axios.put(
        `http://localhost:5000/admin/product/update/${selectedProductId}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Product updated successfully!");
      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product.");
    }

    setShowUpdateModal(false);
    resetForm();
  };


  const handleEdit = (prod) => {
    setFormData(prod);
    setSelectedProductId(prod._id);
    setShowUpdateModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(
        `http://localhost:5000/admin/product/delete/${id}`
      );
      alert("Product deleted.");
      fetchProducts();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product.");
    }
  };

  const filteredOrders = orders.filter(
    (order) => order.orderStatus === activeOrderTab
  );


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append all fields
    data.append("productCategory", formData.productCategory);
    data.append("productName", formData.productName);
    data.append("productPrice", formData.productPrice);
    data.append("productSize", formData.productSize);
    data.append("stock", formData.stock);
    data.append("productDescription", formData.productDescription);
    data.append("reviewCount", formData.reviewCount);
    data.append("tags", formData.tags);
    data.append("isBestseller", formData.isBestseller);
    data.append("originalPrice", formData.originalPrice);
    if (formData.productImages && formData.productImages.length > 0) {
      formData.productImages.forEach((file) => {
        data.append("productImages", file);
      });
    }


    try {
      const res = await axios.post(
        `http://localhost:5000/admin/product/add`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Product added successfully!");
      console.log(res);
      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    }

    setShowAddModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      productCategory: "",
      productName: "",
      productPrice: "",
      productSize: "",
      stock: "",
      productDescription: "",
      productImages: null,
      productRating: "",
      reviewCount: "",
      tags: "",
      isNew: true,
      isBestseller: "",
      originalPrice: ""
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      productImages: files,
    }));
  };


  return (
    <>
      <AdminNavbar />
      <div className="container-product">
        <div className="grid1">
          <button className="btn1 add" onClick={() => setShowAddModal(true)}>
            Add Product
          </button>
          <button className="btn1 view" onClick={fetchProducts}>
            View Products
          </button>
          <button
            className="btn1 order"
            onClick={() => {
              fetchOrders();
              setShowOrdersModal(true);
            }}
          >
            View Orders
          </button>
        </div>

        {showAddModal && (
          <div className="manage-product-modal-overlay">
            <div className="manage-product-modal">
              <h2>Add Product</h2>
              <form onSubmit={handleSubmit} className="modal-form">
                <select
                  name="productCategory"
                  value={formData.productCategory}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Choose the category
                  </option>
                  <option value="Cooking Oil">Cooking Oil</option>
                  <option value="Hair Oil">Hair Oil</option>
                  <option value="Massage Oil">Massage Oil</option>
                </select>

                <input
                  type="text"
                  name="productName"
                  placeholder="Product Name"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                />

                <input
                  type="file"
                  name="productImages"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />

                <input
                  type="number"
                  name="productPrice"
                  placeholder="Price"
                  value={formData.productPrice}
                  onChange={handleChange}
                  required
                />

                <input
                  type="number"
                  name="productSize"
                  placeholder="Size of packing in Litres"
                  value={formData.productSize}
                  onChange={handleChange}
                  required
                />

                <input
                  type="number"
                  name="stock"
                  placeholder="Total Stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />

                <input
                  type="number"
                  name="productDiscount"
                  placeholder="Discount on Product"
                  value={formData.productDiscount}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="productRating"
                  placeholder="Rating of Product"
                  value={formData.productRating}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="reviewCount"
                  placeholder="Number of reviews"
                  value={formData.reviewCount}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="tags"
                  placeholder="Tags(eg: Eco-Friendly,Healthy...)"
                  value={formData.tags}
                  onChange={handleChange}
                />

                <select
                  name="isBestseller"
                  value={formData.isBestseller}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Is it a Bestseller??
                  </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>

                <input
                  type="number"
                  name="originalPrice"
                  placeholder="Original Non Discounted Price"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  required
                />

                <textarea
                  name="productDescription"
                  placeholder="Description"
                  value={formData.productDescription}
                  onChange={handleChange}
                />

                <div className="modal-buttons">
                  <button type="submit" className="btn submit">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn cancel"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showUpdateModal && (
          <div className="update-product-modal-overlay">
            <div className="update-product-modal">
              <h2>Update Product</h2>
              <form onSubmit={handleUpdate} className="modal-form">

                <label htmlFor="productCategory">Category</label>
                <select
                  id="productCategory"
                  name="productCategory"
                  value={formData.productCategory}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Choose the category
                  </option>
                  <option value="Cooking Oil">Cooking Oil</option>
                  <option value="Hair Oil">Hair Oil</option>
                  <option value="Massage Oil">Massage Oil</option>
                </select>

                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  placeholder="Product Name"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="image">Product Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />

                <label htmlFor="productPrice">Price</label>
                <input
                  type="number"
                  id="productPrice"
                  name="productPrice"
                  placeholder="Price"
                  value={formData.productPrice}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="productSize">Size of Packing (Litres)</label>
                <input
                  type="number"
                  id="productSize"
                  name="productSize"
                  placeholder="Size of packing in Litres"
                  value={formData.productSize}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="stock">Total Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder="Total Stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="productDiscount">Discount on Product (%)</label>
                <input
                  type="number"
                  id="productDiscount"
                  name="productDiscount"
                  placeholder="Discount on Product"
                  value={formData.productDiscount}
                  onChange={handleChange}
                />

                <label htmlFor="productRating">Rating</label>
                <input
                  type="number"
                  id="productRating"
                  name="productRating"
                  placeholder="Rating of Product"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.productRating}
                  onChange={handleChange}
                />

                <label htmlFor="reviewCount">Number of Reviews</label>
                <input
                  type="number"
                  id="reviewCount"
                  name="reviewCount"
                  placeholder="Number of Reviews"
                  value={formData.reviewCount}
                  onChange={handleChange}
                />

                <label htmlFor="tags">Tags</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="Tags (e.g., Eco-Friendly, Healthy...)"
                  value={formData.tags}
                  onChange={handleChange}
                />

                <label htmlFor="isBestseller">Is it a Bestseller?</label>
                <select
                  id="isBestseller"
                  name="isBestseller"
                  value={formData.isBestseller}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select option
                  </option>
                  <option value="True">Yes</option>
                  <option value="False">No</option>
                </select>

                <label htmlFor="originalPrice">Original Non-Discounted Price</label>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  placeholder="Original Non Discounted Price"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="productDescription">Description</label>
                <textarea
                  id="productDescription"
                  name="productDescription"
                  placeholder="Description"
                  value={formData.productDescription}
                  onChange={handleChange}
                />

                <div className="modal-buttons">
                  <button type="submit" className="btn submit">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn cancel"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


        {showViewModal && (
          <div className="view-products-modal-overlay">
            <div className="view-products-modal">
              <h2>📦 Product List</h2>
              <button
                className="close-btn"
                onClick={() => setShowViewModal(false)}
              >
                ✖
              </button>
              <div className="product-list">
                {products.map((prod) => (
                  <div key={prod._id} className="product-item">
                    <h3>{prod.productName}</h3>
                    <p>
                      <strong>Category:</strong> {prod.productCategory}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{prod.productPrice}
                    </p>
                    <p>
                      <strong>Discount:</strong> ₹{prod.productDiscount}
                    </p>
                    <p>
                      <strong>Stock:</strong> {prod.stock}
                    </p>
                    <p>
                      <strong>Reviews:</strong> {prod.reviewCount}
                    </p>
                    <p>
                      <strong>Rating:</strong> {prod.productRating}
                    </p>
                    <p>
                      <strong>Litre/pack:</strong> {prod.productSize}
                    </p>
                    <p className="desc">
                      <strong>Description:</strong> {prod.productDescription}
                    </p>
                    <p>
                      <strong>Tags:</strong> {prod.tags}
                    </p>
                    <div className="product-actions">
                      <button onClick={() => handleEdit(prod)}>✏️ Edit</button>
                      <button onClick={() => handleDelete(prod._id)}>
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showOrdersModal && (
          <div className="order-modal-overlay">
            <div className="order-modal">
              <h2>📋 All Orders</h2>
              <button
                className="close-btn"
                onClick={() => setShowOrdersModal(false)}
              >
                ✖
              </button>
              <div className="order-tabs">
                {["pending", "delivered", "cancelled"].map((tab) => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeOrderTab === tab ? "active" : ""
                      }`}
                    onClick={() => setActiveOrderTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="orders-list">
                {filteredOrders.length === 0 ? (
                  <p>No {activeOrderTab} orders found.</p>
                ) : (
                  filteredOrders.map((order) => (
                    <div key={order._id} className="order-item">
                      <p>
                        <strong>Order ID:</strong> {order._id}
                      </p>
                      <p>
                        <strong>User:</strong> {order.customerName} ({order.customerEmail})
                      </p>
                      <p>
                        <strong>Phone:</strong> {order.customerPhone}
                      </p>
                      <p>
                        <strong>Address:</strong> {order.address}
                      </p>
                      <p>
                        <strong>Status:</strong> <em>{order.orderStatus}</em>
                      </p>

                      {/* Buttons to change status */}
                      <div className="status-buttons">
                        {["pending", "delivered", "cancelled"].map((statusOption) => (
                          <button
                            key={statusOption}
                            disabled={order.orderStatus === statusOption}
                            onClick={() => handleChangeStatus(order._id, statusOption)}
                            className={`status-btn status-btn-${statusOption} ${order.orderStatus === statusOption ? "active" : ""
                              }`}
                            title={`Mark order as ${statusOption}`}
                          >
                            {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
