const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./db");
const sendOrderEmail = require("./EmailService")
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
mongoDB();

const fooditems = require('./routes/fooditemsRoute');
app.use('/api', fooditems);

const foodCategories = require('./routes/foodCategoryRoute');
app.use('/api', foodCategories);

const loginDetails = require('./routes/createUserRoute');
app.use('/api/login', loginDetails);

const OrderDetails = require("./routes/orderdata");
app.use('/api', OrderDetails);

const FetchUsers = require("./routes/fetchUser");
app.use('/profile', FetchUsers);



//Admin Handling Routes

const ProductManagementRoutes = require("./routes/StockManagementRoute");
app.use('/admin/product', ProductManagementRoutes);

app.use('/uploads', express.static('uploads'));

app.post('/place-order', (req, res) => {
  const order = req.body;

  // Example order data validation (you can enhance this)
  if (!order.name || !order.email || !order.id || !order.total || !order.items) {
    return res.status(400).send({ message: 'Missing order data' });
  }

  // Send email
  sendOrderEmail({
    name: order.name,
    id: order.id,
    total: order.total,
    items: order.items,
    customerEmail: order.email
  });

  // Respond to frontend
  res.status(200).send({ message: 'Order placed successfully, email sent!' });
});

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})
