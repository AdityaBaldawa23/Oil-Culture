const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./db");
const sendOrderEmail = require("./EmailService");
const cors = require("cors");
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoDB();

const foodCategories = require("./routes/foodCategoryRoute");
app.use("/api", foodCategories);

const loginDetails = require("./routes/createUserRoute");
app.use("/api/login", loginDetails);

const orderRoutes = require("./routes/orderRoutes.js");
app.use("/api", orderRoutes);

const FetchUsers = require("./routes/fetchUser");
app.use("/profile", FetchUsers);


//Admin Handling Routes

const ProductManagementRoutes = require("./routes/StockManagementRoute");
app.use("/admin/product", ProductManagementRoutes);


const AdminOrders = require("./routes/AdminOrderRoute");
app.use("/admin", AdminOrders);

app.use("/uploads", express.static("uploads"));

app.post("/place-order", (req, res) => {
  const order = req.body;

  // Example order data validation (you can enhance this)
  if (
    !order.name ||
    !order.email ||
    !order.id ||
    !order.total ||
    !order.items
  ) {
    return res.status(400).send({ message: "Missing order data" });
  }

  // Send email
  sendOrderEmail({
    name: order.name,
    id: order.id,
    total: order.total,
    items: order.items,
    customerEmail: order.email,
  });

  // Respond to frontend
  res.status(200).send({ message: "Order placed successfully, email sent!" });
});

//Billing
const addbill = require("./routes/Billing/AddBillRoute");
app.use("/", addbill);

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on all ports`);
});
