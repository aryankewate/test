const db = require("../db");

// Generate Invoice & Process Sale
exports.createSale = async (req, res) => {
    const { items, totalAmount, paymentMode, discount, tax, customer } = req.body;

    try {
        const [result] = await db.execute(
            "INSERT INTO sales (total_amount, payment_mode, discount, tax, customer_name, customer_phone) VALUES (?, ?, ?, ?, ?, ?)",
            [totalAmount, paymentMode, discount, tax, customer?.name || null, customer?.phone || null]
        );

        const saleId = result.insertId;

        for (const item of items) {
            await db.execute("UPDATE products SET stock = stock - ? WHERE id = ?", [item.quantity, item.id]);
        }

        res.status(201).json({ message: "Sale recorded successfully", saleId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch Sale Details
exports.getSale = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM sales WHERE id = ?", [req.params.id]);
        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
