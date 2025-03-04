import React, { useState } from 'react';
import { ShoppingCart, Trash2, CreditCard, DollarSign, Package, Plus, Receipt, User, Phone } from 'lucide-react';

const POS = () => {
    const [cart, setCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const products = [
        { id: 1, name: "Product A", price: 10, category: "Electronics" },
        { id: 2, name: "Product B", price: 15, category: "Audio" },
        { id: 3, name: "Product C", price: 20, category: "Accessories" }
    ];

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
        
        const invoice = `Invoice\n\nItems:\n${cart.map(item => `${item.name} - $${item.price}`).join("\n")}\n\nTotal: $${getTotal()}\nPayment Method: ${paymentMethod}\nCustomer: ${customerName || "N/A"}\nPhone: ${customerPhone || "N/A"}`;
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
        <div className="flex flex-col md:flex-row h-screen bg-[#111827] text-gray-100">
            {/* Left Panel - Products */}
            <div className="w-full md:w-2/3 p-6 overflow-auto">
                <div className="bg-[#1e293b] rounded-xl shadow-md p-6 h-full">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold text-white flex items-center">
                            <Package className="mr-2 text-[#4ade80]" size={28} />
                            Products
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <div key={product.id} className="bg-[#0f172a] rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="h-40 overflow-hidden">
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <span className="inline-block px-2 py-1 text-xs font-semibold text-[#4ade80] bg-[#064e3b] rounded-full mb-2">
                                        {product.category}
                                    </span>
                                    <h3 className="font-bold text-white text-lg mb-2">{product.name}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-[#4ade80]">${product.price.toFixed(2)}</span>
                                        <button 
                                            onClick={() => addToCart(product)} 
                                            className="flex items-center justify-center bg-[#4ade80] text-[#111827] p-2 rounded-full hover:bg-[#22c55e] transition-colors"
                                        >
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
            <div className="w-full md:w-1/3 p-6 overflow-auto">
                <div className="bg-[#1e293b] rounded-xl shadow-md p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center">
                            <ShoppingCart className="mr-2 text-[#4ade80]" size={24} />
                            Your Cart
                        </h2>
                        <span className="bg-[#0f172a] text-[#4ade80] text-sm font-semibold px-3 py-1 rounded-full">
                            {cart.length} items
                        </span>
                    </div>
                    
                    {cart.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 py-8">
                            <ShoppingCart size={64} className="mb-4 opacity-30" />
                            <p className="text-lg font-medium">Your cart is empty</p>
                            <p className="text-sm">Add some products to proceed to checkout</p>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-auto mb-4">
                            <ul className="space-y-3">
                                {cart.map((item, index) => (
                                    <li key={index} className="flex items-center p-3 bg-[#0f172a] rounded-lg border border-gray-700">
                                        <div className="h-12 w-12 rounded-md overflow-hidden mr-3">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-white">{item.name}</h4>
                                            <p className="text-[#4ade80] font-bold">${item.price.toFixed(2)}</p>
                                        </div>
                                        <button 
                                            onClick={() => removeFromCart(index)} 
                                            className="p-1.5 bg-[#450a0a] text-red-400 rounded-full hover:bg-red-900 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    <div className="border-t border-gray-700 pt-4 mt-auto">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-300 font-medium">Subtotal</span>
                            <span className="text-white font-bold">${getTotal().toFixed(2)}</span>
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
                            <div className="flex space-x-3">
                                <button 
                                    type="button"
                                    onClick={() => setPaymentMethod("Cash")}
                                    className={`flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg border ${
                                        paymentMethod === "Cash" 
                                            ? "bg-[#0f172a] border-[#4ade80] text-[#4ade80]" 
                                            : "border-gray-700 text-gray-300 hover:bg-[#0f172a]"
                                    } transition-colors`}
                                >
                                    <DollarSign size={18} className="mr-2" />
                                    Cash
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setPaymentMethod("Credit")}
                                    className={`flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg border ${
                                        paymentMethod === "Credit" 
                                            ? "bg-[#0f172a] border-[#4ade80] text-[#4ade80]" 
                                            : "border-gray-700 text-gray-300 hover:bg-[#0f172a]"
                                    } transition-colors`}
                                >
                                    <CreditCard size={18} className="mr-2" />
                                    Credit
                                </button>
                            </div>
                        </div>
                        
                        {paymentMethod === "Credit" && (
                            <div className="space-y-3 mb-4 p-4 bg-[#0f172a] rounded-lg border border-gray-700">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Customer Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User size={16} className="text-gray-500" />
                                        </div>
                                        <input 
                                            type="text" 
                                            value={customerName} 
                                            onChange={(e) => setCustomerName(e.target.value)} 
                                            className="w-full pl-10 pr-3 py-2 bg-[#1e293b] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-transparent text-white" 
                                            placeholder="Enter customer name"
                                            required 
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone size={16} className="text-gray-500" />
                                        </div>
                                        <input 
                                            type="text" 
                                            value={customerPhone} 
                                            onChange={(e) => setCustomerPhone(e.target.value)} 
                                            className="w-full pl-10 pr-3 py-2 bg-[#1e293b] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-transparent text-white" 
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
                            className={`w-full flex items-center justify-center py-3 px-4 rounded-lg ${
                                cart.length === 0 
                                    ? "bg-gray-700 cursor-not-allowed" 
                                    : "bg-[#4ade80] hover:bg-[#22c55e] text-[#111827]"
                            } font-medium transition-colors`}
                            disabled={cart.length === 0}
                        >
                            <Receipt className="mr-2" size={20} />
                            Checkout (${getTotal().toFixed(2)})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default POS;



