import React, { useState } from 'react';
import { ShoppingCart, Trash2, CreditCard, Package, Plus, Receipt, User, Phone, Sun, Moon, IndianRupee } from 'lucide-react';

const POS = () => {
    const [cart, setCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(true);
    const products = [
        { id: 1, name: "Apple", price: 10, image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", category: "Fruits" },
        { id: 2, name: "Banana", price: 15, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", category: "Fruits" },
        { id: 3, name: "Orange", price: 20, image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", category: "Fruits" }
    ];

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('light-mode');
    };

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (index) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    const getTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        if (paymentMethod === "Credit" && (!customerName || customerPhone.length !== 10)) {
            alert("Customer name and a valid 10-digit phone number are required for credit payments.");
            return;
        }
        
        const invoice = `Invoice\n\nItems:\n${cart.map(item => `${item.name} - ₹${item.price}`).join("\n")}\n\nTotal: ₹${getTotal()}\nPayment Method: ${paymentMethod}\nCustomer: ${customerName || "N/A"}\nPhone: ${customerPhone || "N/A"}`;
        const blob = new Blob([invoice], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "invoice.txt";
        link.click();

        alert("Checkout complete! Invoice downloaded.");
        setCart([]);
        setCustomerName("");
        setCustomerPhone("");
    };

    return (
        <div className={`container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            {/* Theme Toggle Button */}
            <button onClick={toggleTheme} className="theme-toggle">
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            {/* Left Panel - Products */}
            <div className="products-panel">
                <div className="products-container">
                    <div className="panel-header">
                        <h2 className="panel-title">
                            <Package size={28} />
                            Products
                        </h2>
                    </div>
                    
                    <div className="products-grid">
                        {products.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="product-image">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className="product-details">
                                    <span className="product-category">{product.category}</span>
                                    <h3 className="product-name">{product.name}</h3>
                                    <div className="product-footer">
                                        <span className="product-price">
                                            <IndianRupee size={16} className="rupee-icon" />
                                            {product.price.toFixed(2)}
                                        </span>
                                        <button onClick={() => addToCart(product)} className="add-to-cart">
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Right Panel - Cart & Checkout */}
            <div className="cart-panel">
                <div className="cart-container">
                    <div className="cart-header">
                        <h2 className="cart-title">
                            <ShoppingCart size={24} />
                            Your Cart
                        </h2>
                        <span className="cart-badge">
                            {cart.length} items
                        </span>
                    </div>
                    
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <ShoppingCart size={64} />
                            <p>Your cart is empty</p>
                            <p>Add some products to proceed to checkout</p>
                        </div>
                    ) : (
                        <div className="cart-items">
                            {cart.map((item, index) => (
                                <div key={index} className="cart-item">
                                    <div className="cart-item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="cart-item-details">
                                        <h4 className="cart-item-name">{item.name}</h4>
                                        <p className="cart-item-price">
                                            <IndianRupee size={14} className="rupee-icon" />
                                            {item.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <button onClick={() => removeFromCart(index)} className="remove-item">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <div className="cart-footer">
                        <div className="subtotal">
                            <span className="subtotal-label">Subtotal</span>
                            <span className="subtotal-amount">
                                <IndianRupee size={14} className="rupee-icon" />
                                {getTotal().toFixed(2)}
                            </span>
                        </div>
                        
                        <div className="payment-method">
                            <label className="payment-label">Payment Method</label>
                            <div className="payment-buttons">
                                <button 
                                    type="button"
                                    onClick={() => setPaymentMethod("Cash")}
                                    className={`payment-button ${paymentMethod === "Cash" ? "active" : ""}`}
                                >
                                    <IndianRupee size={18} />
                                    Cash
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setPaymentMethod("Credit")}
                                    className={`payment-button ${paymentMethod === "Credit" ? "active" : ""}`}
                                >
                                    <CreditCard size={18} />
                                    Credit
                                </button>
                            </div>
                        </div>
                        
                        {paymentMethod === "Credit" && (
                            <div className="customer-info">
                                <div className="input-group">
                                    <label className="input-label">Customer Name</label>
                                    <div className="input-wrapper">
                                        <User size={16} className="input-icon" />
                                        <input 
                                            type="text" 
                                            value={customerName} 
                                            onChange={(e) => setCustomerName(e.target.value)} 
                                            className="text-input"
                                            placeholder="Enter customer name"
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Phone Number</label>
                                    <div className="input-wrapper">
                                        <Phone size={16} className="input-icon" />
                                        <input 
                                            type="text" 
                                            value={customerPhone} 
                                            onChange={(e) => setCustomerPhone(e.target.value)} 
                                            className="text-input"
                                            placeholder="10-digit phone number"
                                            pattern="\d{10}" 
                                            required 
                                            maxLength="10" 
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <button 
                            onClick={handleCheckout} 
                            className="checkout-button"
                            disabled={cart.length === 0}
                        >
                            <Receipt size={20} />
                            Checkout (₹{getTotal().toFixed(2)})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default POS;