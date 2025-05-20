  import React, { useState } from "react";
  import "./ManageProduct.css";
  import AdminNavbar from "../components/AdminNavbar";
  import axios from "axios";

  export default function ManageProduct() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [showViewModal, setShowViewModal] = useState(false);
    const [formData, setFormData] = useState({
      CategoryName: "",
      name: "",
      price: "",
      piecesPerBox: "",
      stock: "",
      description: "",
      img: null,
    });
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]:
          name === "price" || name === "piecesPerBox" || name === "stock"
            ? Number(value)
            : value,
      }));
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://rama-mangoes.onrender.com/admin/product/display"
        );
        setProducts(res.data);
        setShowViewModal(true);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    const handleUpdate = async (e) => {
      e.preventDefault();
      const data = new FormData();

      // Append fields
      data.append("CategoryName", formData.CategoryName);
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("piecesPerBox", formData.piecesPerBox);
      data.append("stock", formData.stock);
      data.append("description", formData.description);
      if (formData.img) data.append("img", formData.img);

      try {
        await axios.put(
          `https://rama-mangoes.onrender.com/admin/product/update/${selectedProductId}`,
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
        await axios.delete(`https://rama-mangoes.onrender.com/admin/product/delete/${id}`);
        alert("Product deleted.");
        fetchProducts();
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete product.");
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();

      // Append all fields
      data.append("CategoryName", formData.CategoryName);
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("piecesPerBox", formData.piecesPerBox);
      data.append("stock", formData.stock);
      data.append("description", formData.description);
      data.append("img", formData.img); // File field

      try {
        const res = await axios.post(
          "https://rama-mangoes.onrender.com/admin/product/add",
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
        CategoryName: "",
        name: "",
        price: "",
        piecesPerBox: "",
        stock: "",
        description: "",
        img: null,
      });
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        img: file,
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
          </div>

          {showAddModal && (
            <div className="manage-product-modal-overlay">
              <div className="manage-product-modal">
                <h2>Add Product</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                  <select
                    name="CategoryName"
                    value={formData.CategoryName}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Choose the category
                    </option>
                    <option value="Hapus/Alphonsa">Hapus</option>
                    <option value="Bitka Hapus">Bitka Hapus</option>
                    <option value="Payri">Payri</option>
                    <option value="Kesar">Kesar</option>
                  </select>

                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                  />

                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="number"
                    name="piecesPerBox"
                    placeholder="Number of Pieces Per Box"
                    value={formData.piecesPerBox}
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

                  <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
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
                  <select
                    name="categoryName"
                    value={formData.CategoryName}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Choose the category
                    </option>
                    <option value="Category A">Category A</option>
                    <option value="Category B">Category B</option>
                    <option value="Category C">Category C</option>
                    <option value="Category D">Category D</option>
                  </select>

                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="number"
                    name="piecesPerBox"
                    placeholder="Number of Pieces Per Box"
                    value={formData.piecesPerBox}
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

                  <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
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
                      <h3>{prod.name}</h3>
                      <p>
                        <strong>Category:</strong> {prod.CategoryName}
                      </p>
                      <p>
                        <strong>Price:</strong> ₹{prod.price}
                      </p>
                      <p>
                        <strong>Stock:</strong> {prod.stock}
                      </p>
                      <p>
                        <strong>Pieces/Box:</strong> {prod.piecesPerBox}
                      </p>
                      <p className="desc">
                        <strong>Description:</strong> {prod.description}
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
        </div>
      </>
    );
  }
