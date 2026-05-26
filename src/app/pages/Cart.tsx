import { Link } from "react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useCart } from "../context/CartContext";
import { Separator } from "../components/ui/separator";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-[#F5EFE7] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl text-[#2D5016] mb-2">Shopping Cart</h1>
            <p className="text-gray-600">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          <Button
            variant="outline"
            onClick={clearCart}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className={`w-24 h-24 bg-gradient-to-br ${item.image} rounded-lg flex-shrink-0`}></div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg text-[#2D5016] mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                      <p className="text-xl text-[#2D5016]">₹{item.price}</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="px-4 py-2 min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <p className="text-lg text-[#2D5016] font-medium">
                          ₹{item.price * item.quantity}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-white sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl text-[#2D5016]">Order Summary</h2>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (18% GST)</span>
                    <span>₹{Math.round(getCartTotal() * 0.18)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-xl">
                  <span className="text-[#2D5016]">Total</span>
                  <span className="text-[#2E4D3E] font-extrabold">
                    ₹{Math.round(getCartTotal() * 1.18)}
                  </span>
                </div>

                <Link to="/checkout" className="block w-full">
                  <Button className="w-full bg-[#2E4D3E] hover:bg-[#1D3228] text-white py-6 text-lg rounded-xl font-bold">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link to="/shop">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>

                <div className="mt-6 p-4 bg-[#F5EFE7] rounded-lg space-y-2">
                  <h3 className="text-sm text-[#2D5016]">Order Benefits</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Free shipping on all orders</li>
                    <li>✓ 100% quality guarantee</li>
                    <li>✓ Easy returns within 7 days</li>
                    <li>✓ Secure payment options</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="min-h-screen bg-[#F5EFE7] pt-24 pb-16 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md px-4">
        <div className="w-32 h-32 bg-gradient-to-br from-[#C89D66] to-[#A67C52] rounded-full mx-auto flex items-center justify-center">
          <ShoppingBag className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-3xl text-[#2D5016]">Your Cart is Empty</h1>
        <p className="text-gray-600">
          Looks like you haven't added any wellness products yet. Start shopping to fill your cart with healthy choices!
        </p>
        <Link to="/shop">
          <Button size="lg" className="bg-[#2D5016] hover:bg-[#3D6826]">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Browse Products
          </Button>
        </Link>
      </div>
    </div>
  );
}
