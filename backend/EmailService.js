const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function sendOrderEmail(order) {
  const itemsList = order.items
    .map(item => `• ${item.name} x${item.quantity}`)
    .join("\n");

  // Email to customer
  const userMailOptions = {
    from: "Oil Culture 🌿 <adityabaldawa23@gmail.com>",
    to: order.customerEmail,
    subject: `🛍️ Thank You for Your Order #${order.id} – Oil Culture`,
    text: `
Hi ${order.name},

Thank you for your order at **Oil Culture** – where tradition meets wellness. 🌿✨  
Your premium oils are now being prepared for delivery.

🧾 Order ID: ${order.id}  
💰 Total Amount: ₹${order.total}  
📦 Items Ordered:  
${itemsList}

📍 Shipping Address: ${order.address}  
📞 Contact Number: ${order.phone}

We’ll send you a notification once your package is dispatched.

In wellness,  
**Team Oil Culture**
    `.trim(),
  };

  // Email to admin
  const adminMailOptions = {
    from: "Order Notification Bot <adityabaldawa23@gmail.com>",
    to: "oilculture2023@gmail.com",
    subject: `📥 New Order Received – #${order.id} | Oil Culture`,
    text: `
📦 A new order has been placed on Oil Culture.

👤 Customer: ${order.name}  
📞 Phone: ${order.phone}  
✉️ Email: ${order.customerEmail}  
📍 Address: ${order.address}

🛒 Items:  
${itemsList}

💰 Total: ₹${order.total}  
🆔 Order ID: ${order.id}
    `.trim(),
  };

  // Send both emails
  transporter.sendMail(userMailOptions, (err, info) => {
    if (err) return console.error("User Email Error:", err);
    console.log("User email sent: " + info.response);
  });

  transporter.sendMail(adminMailOptions, (err, info) => {
    if (err) return console.error("Admin Email Error:", err);
    console.log("Admin email sent: " + info.response);
  });
}

module.exports = sendOrderEmail;
