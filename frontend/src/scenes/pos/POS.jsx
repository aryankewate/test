import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../../components/ui/table";
import { ShoppingCart, Trash } from "lucide-react";

export default function POS() {
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");

  const addToCart = () => {
    if (product && price) {
      setCart([...cart, { name: product, price: parseFloat(price), quantity: 1 }]);
      setProduct("");
      setPrice("");
    }
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, quantity) => {
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Point of Sale (POS)</h1>
      
      <div className="flex gap-4 mb-4">
        <Input placeholder="Product Name" value={product} onChange={(e) => setProduct(e.target.value)} />
        <Input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Button onClick={addToCart} className="bg-green-500 flex items-center gap-2">
          <ShoppingCart size={16} /> Add to Cart
        </Button>
      </div>
      
      <Card className="bg-gray-800">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
                      className="w-16"
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => removeFromCart(index)}>
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex justify-between items-center mt-4 p-4 border-t border-gray-700">
            <h2 className="text-xl font-semibold">Total: ${totalAmount.toFixed(2)}</h2>
            <Button className="bg-blue-500 text-white px-6 py-2">Checkout</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
