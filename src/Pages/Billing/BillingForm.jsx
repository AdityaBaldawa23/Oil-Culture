import React, { useState, useEffect, useRef } from 'react';
import './BillingForm.css';

export default function BillingForm() {
    const [products, setProducts] = useState([{ productId: '', name: '', qty: 1, price: 0, discount: 0 }]);
    const [productList, setProductList] = useState([]);
    const [discount, setDiscount] = useState(0);
    const printRef = useRef();

    // Customer info states
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [address, setAddress] = useState('');

    const total = products.reduce((sum, p) => sum + (p.qty * p.price - p.discount), 0);
    const final = total - discount;

    useEffect(() => {
        fetch('http://localhost:5000/bill/products')
            .then(res => res.json())
            .then(data => setProductList(data))
            .catch(err => console.error('Failed to load products', err));
    }, []);

    const handleProductSelect = (index, productId) => {
        const selected = productList.find(p => p._id === productId);
        const updated = [...products];
        updated[index] = {
            ...updated[index],
            productId,
            name: selected.productName,
            price: selected.productPrice,
            discount: selected.productDiscount || 0,
        };
        setProducts(updated);
    };

    const handleProductChange = (index, field, value) => {
        const updated = [...products];
        updated[index][field] = field === 'name' ? value : Number(value);
        setProducts(updated);
    };

    const addProductRow = () => {
        setProducts([...products, { productId: '', name: '', qty: 1, price: 0, discount: 0 }]);
    };

    const removeProductRow = (index) => {
        const updated = products.filter((_, i) => i !== index);
        setProducts(updated);
    };

    const handleSubmitBill = async () => {
        try {
            const billData = {
                customerName,
                customerPhone,
                customerEmail,
                address,
                paymentType,
                productsBought: products.map(p => ({
                    productId: p.productId,
                    productName: p.name,
                    quantity: p.qty,
                    price: p.price,
                    productDiscount: p.discount
                })),
                orderTotal: total,
                finalAmount: final,
            };

            const res = await fetch('http://localhost:5000/addbill', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(billData)
            });

            const result = await res.json();
            if (result.success) {
                alert('✅ Bill submitted successfully!');
            } else {
                alert('❌ Failed to submit bill');
            }
        } catch (err) {
            console.error('Submit Error:', err);
            alert('⚠️ Error submitting bill');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="desktop-bill-container" ref={printRef}>
            <div className="desktop-letterhead">🧾 Oil Culture Invoice</div>

            <div className="desktop-form-row">
                <input className="desktop-input" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                <input className="desktop-input" placeholder="Phone Number" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
            </div>

            <div className="desktop-form-row">
                <input className="desktop-input" placeholder="Email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
                <input className="desktop-input" placeholder="Payment Type" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} />
            </div>

            <div className="desktop-form-row">
                <input className="desktop-input" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                <input className="desktop-input" type="date" />
            </div>

            <div className="desktop-table-section">
                <h3>🛒 Products Bought</h3>
                <table className="desktop-table">
                    <thead>
                        <tr>
                            <th>Product-ID</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, idx) => (
                            <tr key={idx}>
                                <td>
                                    <select
                                        value={p.productId}
                                        onChange={(e) => handleProductSelect(idx, e.target.value)}
                                    >
                                        <option value="">Select Product</option>
                                        {productList.map(prod => (
                                            <option key={prod._id} value={prod._id}>
                                                {prod.productName} ({prod.productID})
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td><input className="desktop-table-input" value={p.name} readOnly /></td>
                                <td><input className="desktop-table-input" type="number" value={p.qty} onChange={(e) => handleProductChange(idx, 'qty', e.target.value)} /></td>
                                <td><input className="desktop-table-input" type="number" value={p.price} readOnly /></td>
                                <td><input className="desktop-table-input" type="number" value={p.discount} readOnly /></td>
                                <td>{(p.qty * p.price) - p.discount}</td>
                                <td><button className="desktop-remove-button" onClick={() => removeProductRow(idx)}>🗑️</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="desktop-add-button" onClick={addProductRow}>+ Add Product</button>
            </div>

            <div className="desktop-bottom-section">
                <div className="desktop-company-details">
                    <h4>🏢 Company Info</h4>
                    <p>Oil Culture Pvt. Ltd.<br />123, Billing Lane, Commerce City<br />GSTIN: 22AAAAA0000A1Z5</p>
                </div>

                <div className="desktop-summary">
                    <div className="desktop-summary-row">
                        <label>Order Total:</label>
                        <span>{total}</span>
                    </div>
                    <div className="desktop-summary-row">
                        <label>Extra Discount:</label>
                        <input
                            className="desktop-input"
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(Number(e.target.value))}
                        />
                    </div>
                    <div className="desktop-summary-row final">
                        <label>Final Amount:</label>
                        <strong>{final}</strong>
                    </div>
                    <div className="desktop-actions">
                        <button className="desktop-submit-button" onClick={handleSubmitBill}>✅ Submit Bill</button>
                        <button className="desktop-print-button" onClick={handlePrint}>🖨️ Print</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
