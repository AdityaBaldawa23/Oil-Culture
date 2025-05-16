const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adityabaldawa23@gmail.com",
    pass: "aimj zrmb doyj wcne", // Use an App Password if 2FA is on
  },
});

function sendOrderEmail(order) {
  const itemsList = order.items.map(item => `${item.name} x${item.quantity}`).join(", ");

  const mailOptions = {
    from: "adityabaldawa23@gmail.com",
    to: [order.customerEmail, "aditya.baldawa@walchandsangli.ac.in"],
    subject: `Order Confirmation - Order #${order.id}`,
    text: `
Hi ${order.name},

Thank you for your order!
Order ID: ${order.id}
Total: ₹${order.total}
Items: ${itemsList}

- The Aam Story
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.error(error);
    console.log("Emails sent: " + info.response);
  });
}

module.exports = sendOrderEmail;
