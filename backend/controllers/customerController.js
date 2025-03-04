const db = require("../db");

// Add Customer (For Credit Payments)
exports.addCustomer = async (req, res) => {
    const { name, phone } = req.body;

    try {
        await db.execute("INSERT INTO customers (name, phone) VALUES (?, ?)", [name, phone]);
        res.status(201).json({ message: "Customer added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch Customer Details
exports.getCustomer = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM customers WHERE id = ?", [req.params.id]);
        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
