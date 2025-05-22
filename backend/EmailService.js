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

  // User email
  const userMailOptions = {
    from: "Rama Mangoes 🍋 <adityabaldawa23@gmail.com>",
    to: order.customerEmail,
    subject: `🎉 Thank You for Your Order #${order.id}!`,
    text: `
Hi ${order.name},

Thank you for choosing Rama Mangoes! 🥭
Your order has been confirmed and is being prepared with love.

🧾 Order ID: ${order.id}
💰 Total: ₹${order.total}
📦 Items:
${itemsList}

📍 Delivery Address: ${order.address}
📞 Phone: 9423035733

We'll notify you when it's on the way!

Warm regards,  
Team Rama Mangoes
    `.trim(),
  };

  // Admin email
  const adminMailOptions = {
    from: "Order Bot <adityabaldawa23@gmail.com>",
    to: "baldawamahesh01@gmail.com",
    subject: `📦 New Order Received - #${order.id}`,
    text: `
New Order Received!

👤 Name: ${order.name}
📞 Phone: ${order.phone}
✉️ Email: ${order.customerEmail}
📍 Address: ${order.address}

Items:
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
