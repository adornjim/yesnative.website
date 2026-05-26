import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Check, CreditCard, ShieldCheck, ShoppingBag, Truck, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import confetti from "canvas-confetti";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  
  const [step, setStep] = useState<number>(1); // 1: Shipping, 2: Payment, 3: Review
  
  // Shipping Form State
  const [shippingForm, setShippingForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<string>("card"); // card, upi, cod
  const [cardForm, setCardForm] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [cardFlipped, setCardFlipped] = useState<boolean>(false);

  useEffect(() => {
    // If cart is empty, redirect to shop
    if (cart.length === 0 && step < 4) {
      navigate("/shop");
    }
  }, [cart, navigate, step]);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    // Generate order metadata
    const orderId = "YN-" + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    const newOrder = {
      orderId,
      date: orderDate,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageFile: item.imageFile
      })),
      total: Math.round(getCartTotal() * 1.18),
      status: "Pending", // Pending -> Accepted -> Dispatched -> Delivered
      shippingAddress: shippingForm,
      paymentMethod: paymentMethod === "card" ? "Credit Card" : paymentMethod === "upi" ? "UPI QR" : "Cash on Delivery"
    };

    // Save order in localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));

    // Trigger premium confetti burst
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

    // Clear cart and show toast
    clearCart();
    toast.success("Order Placed Successfully!");
    
    // Redirect to profile after a short delay
    setTimeout(() => {
      navigate("/profile", { state: { selectedOrder: orderId } });
    }, 1500);
  };

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.18);
  const total = Math.round(subtotal + tax);

  return (
    <div className="min-h-screen bg-[#FDFCFA] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header */}
        <div className="mb-10 text-center max-w-xl mx-auto space-y-2 pt-4">
          <h1 className="text-3xl sm:text-4xl text-[#2E4D3E] font-bold">Secure Checkout</h1>
          <p className="text-gray-500">Ancient wellness nutrition is just a few secure steps away</p>
        </div>

        {/* Stepper Indicators */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gray-200 -translate-y-1/2 z-0" />
            <div 
              className="absolute left-0 top-1/2 h-[2px] bg-[#2E4D3E] -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
            />

            {[
              { label: "Shipping Details", icon: Truck },
              { label: "Secure Payment", icon: CreditCard },
              { label: "Review & Place", icon: Check }
            ].map((s, idx) => {
              const active = step >= idx + 1;
              const completed = step > idx + 1;
              const Icon = s.icon;
              return (
                <div key={idx} className="flex flex-col items-center relative z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    completed 
                      ? "bg-[#2E4D3E] border-[#2E4D3E] text-white" 
                      : active 
                        ? "bg-[#FDFCFA] border-[#2E4D3E] text-[#2E4D3E] shadow-md ring-4 ring-[#2E4D3E]/10" 
                        : "bg-[#FDFCFA] border-gray-200 text-gray-400"
                  }`}>
                    {completed ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs font-bold mt-2 uppercase tracking-wider ${active ? "text-[#2E4D3E]" : "text-gray-400"}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Details */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="bg-white border border-gray-100 shadow-sm rounded-3xl">
              <CardContent className="p-8">
                
                {/* STEP 1: SHIPPING DETAILS */}
                {step === 1 && (
                  <form onSubmit={handleShippingSubmit} className="space-y-6">
                    <h3 className="text-2xl text-[#2E4D3E] font-bold border-b border-gray-50 pb-4">Shipping Address</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">First Name *</label>
                        <input 
                          type="text" 
                          required
                          value={shippingForm.firstName}
                          onChange={(e) => setShippingForm(p => ({ ...p, firstName: e.target.value }))}
                          placeholder="First name"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#C5A55A] outline-none text-sm bg-gray-50/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Last Name *</label>
                        <input 
                          type="text" 
                          required
                          value={shippingForm.lastName}
                          onChange={(e) => setShippingForm(p => ({ ...p, lastName: e.target.value }))}
                          placeholder="Last name"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#C5A55A] outline-none text-sm bg-gray-50/30"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Email Address *</label>
                        <input 
                          type="email" 
                          required
                          value={shippingForm.email}
                          onChange={(e) => setShippingForm(p => ({ ...p, email: e.target.value }))}
                          placeholder="email@example.com"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#C5A55A] outline-none text-sm bg-gray-50/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Phone Number *</label>
                        <input 
                          type="tel" 
                          required
                          value={shippingForm.phone}
                          onChange={(e) => setShippingForm(p => ({ ...p, phone: e.target.value }))}
                          placeholder="10-digit mobile number"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#C5A55A] outline-none text-sm bg-gray-50/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Street Address *</label>
                      <input 
                        type="text" 
                        required
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm(p => ({ ...p, address: e.target.value }))}
                        placeholder="House number, street name, apartment details"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#C5A55A] outline-none text-sm bg-gray-50/30"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">City *</label>
                        <input 
                          type="text" 
                          required
                          value={shippingForm.city}
                          onChange={(e) => setShippingForm(p => ({ ...p, city: e.target.value }))}
                          placeholder="City"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#C5A55A] outline-none text-sm bg-gray-50/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">State *</label>
                        <input 
                          type="text" 
                          required
                          value={shippingForm.state}
                          onChange={(e) => setShippingForm(p => ({ ...p, state: e.target.value }))}
                          placeholder="State"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#C5A55A] outline-none text-sm bg-gray-50/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">ZIP / Pin Code *</label>
                        <input 
                          type="text" 
                          required
                          value={shippingForm.zipCode}
                          onChange={(e) => setShippingForm(p => ({ ...p, zipCode: e.target.value }))}
                          placeholder="600001"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#C5A55A] outline-none text-sm bg-gray-50/30"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <Button type="submit" className="bg-[#2E4D3E] hover:bg-[#1D3228] text-white px-8 py-6 rounded-xl font-bold">
                        Proceed to Payment
                      </Button>
                    </div>
                  </form>
                )}

                {/* STEP 2: PAYMENT METHOD */}
                {step === 2 && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <h3 className="text-2xl text-[#2E4D3E] font-bold border-b border-gray-50 pb-4">Secure Payment Options</h3>
                    
                    {/* Method Selector */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {[
                        { id: "card", label: "Credit/Debit Card" },
                        { id: "upi", label: "UPI (GPay / PhonePe)" },
                        { id: "cod", label: "Cash on Delivery" }
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id)}
                          className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all font-semibold text-sm ${
                            paymentMethod === m.id 
                              ? "border-[#2E4D3E] bg-[#2E4D3E]/5 text-[#2E4D3E]" 
                              : "border-gray-100 hover:border-gray-200 text-gray-500"
                          }`}
                        >
                          <CreditCard className="w-5 h-5" />
                          {m.label}
                        </button>
                      ))}
                    </div>

                    {/* Conditional Payment UI */}
                    {paymentMethod === "card" && (
                      <div className="grid md:grid-cols-12 gap-8 items-center pt-2">
                        {/* Interactive Card View */}
                        <div className="md:col-span-6 flex justify-center">
                          <div className="relative w-72 h-44 rounded-2xl bg-gradient-to-tr from-[#2E4D3E] via-[#20362B] to-[#14231B] text-white p-6 shadow-xl flex flex-col justify-between overflow-hidden">
                            {/* Gold Brand Accent */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A55A]/10 rounded-full blur-xl" />
                            
                            {!cardFlipped ? (
                              <>
                                <div className="flex justify-between items-start">
                                  <span className="font-serif italic text-sm tracking-wider opacity-95 text-[#C5A55A]">YES NATIVE Gold Card</span>
                                  <div className="w-8 h-6 bg-white/20 rounded-md" />
                                </div>
                                <div className="text-xl font-bold tracking-widest pt-4">
                                  {cardForm.number || "•••• •••• •••• ••••"}
                                </div>
                                <div className="flex justify-between items-end pt-4">
                                  <div>
                                    <div className="text-[9px] uppercase tracking-wider opacity-60">Card Holder</div>
                                    <div className="text-xs uppercase font-medium tracking-wider truncate w-40">{cardForm.name || "YOUR NAME"}</div>
                                  </div>
                                  <div>
                                    <div className="text-[9px] uppercase tracking-wider opacity-60">Expiry</div>
                                    <div className="text-xs font-medium tracking-wider">{cardForm.expiry || "MM/YY"}</div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="w-full h-8 bg-black -mx-6 mt-1" />
                                <div className="flex justify-end items-center gap-3 pt-6">
                                  <span className="text-[9px] uppercase tracking-wider opacity-60">CVV</span>
                                  <div className="bg-white text-gray-800 px-3 py-1.5 rounded font-mono text-sm font-bold shadow-inner">
                                    {cardForm.cvv || "•••"}
                                  </div>
                                </div>
                                <div className="text-[8px] opacity-40 text-center pt-4 leading-none">
                                  This is a secure mock integration. No money will be transacted.
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Card Form Fields */}
                        <div className="md:col-span-6 space-y-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Card Number *</label>
                            <input 
                              type="text" 
                              required
                              maxLength={19}
                              value={cardForm.number}
                              onFocus={() => setCardFlipped(false)}
                              onChange={(e) => {
                                // Formatting Card Number
                                const formatted = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                                setCardForm(p => ({ ...p, number: formatted }));
                              }}
                              placeholder="4111 2222 3333 4444"
                              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-[#C5A55A] outline-none text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Name on Card *</label>
                            <input 
                              type="text" 
                              required
                              value={cardForm.name}
                              onFocus={() => setCardFlipped(false)}
                              onChange={(e) => setCardForm(p => ({ ...p, name: e.target.value }))}
                              placeholder="CARDHOLDER NAME"
                              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-[#C5A55A] outline-none text-sm"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Expiry Date *</label>
                              <input 
                                type="text" 
                                required
                                maxLength={5}
                                value={cardForm.expiry}
                                onFocus={() => setCardFlipped(false)}
                                onChange={(e) => {
                                  // Formatting Expiry
                                  let value = e.target.value.replace(/\D/g, "");
                                  if (value.length > 2) {
                                    value = value.substring(0, 2) + "/" + value.substring(2);
                                  }
                                  setCardForm(p => ({ ...p, expiry: value }));
                                }}
                                placeholder="MM/YY"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-[#C5A55A] outline-none text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">CVV *</label>
                              <input 
                                type="password" 
                                required
                                maxLength={3}
                                value={cardForm.cvv}
                                onFocus={() => setCardFlipped(true)}
                                onBlur={() => setCardFlipped(false)}
                                onChange={(e) => setCardForm(p => ({ ...p, cvv: e.target.value.replace(/\D/g, "") }))}
                                placeholder="•••"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-[#C5A55A] outline-none text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "upi" && (
                      <div className="text-center py-6 space-y-4 max-w-sm mx-auto">
                        <div className="p-4 bg-gray-50 border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-4">
                          {/* QR Code Placeholder */}
                          <div className="w-40 h-40 bg-white border border-gray-200 p-2 rounded-xl flex items-center justify-center relative group">
                            <div className="absolute inset-0 bg-black/40 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                              Mock QR Code
                            </div>
                            <svg className="w-36 h-36 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M3 3h5v5H3V3zM16 3h5v5h-5V3zM3 16h5v5H3v-5zM16 16h5v5h-5v-5z" />
                              <path d="M12 3v18M3 12h18M9 9h6v6H9V9z" />
                            </svg>
                          </div>
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Scan QR with GPay / PhonePe / BHIM</span>
                        </div>
                        <p className="text-xs text-gray-400">Scan QR Code above and proceed to review order.</p>
                      </div>
                    )}

                    {paymentMethod === "cod" && (
                      <div className="p-6 bg-[#F3F4F0]/60 border border-[#2E4D3E]/5 rounded-2xl flex gap-4 items-start max-w-md mx-auto">
                        <CheckCircle2 className="w-6 h-6 text-[#2E4D3E] flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-[#2E4D3E]">Cash on Delivery Selected</h4>
                          <p className="text-sm text-gray-600 mt-1">Pay with cash or digital options directly to the delivery agent upon package arrival.</p>
                        </div>
                      </div>
                    )}

                    <div className="pt-6 flex justify-between border-t border-gray-100">
                      <button 
                        type="button" 
                        onClick={() => setStep(1)}
                        className="text-gray-500 hover:text-[#2E4D3E] font-semibold flex items-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back to Shipping
                      </button>
                      <Button type="submit" className="bg-[#2E4D3E] hover:bg-[#1D3228] text-white px-8 py-6 rounded-xl font-bold">
                        Proceed to Review
                      </Button>
                    </div>
                  </form>
                )}

                {/* STEP 3: ORDER REVIEW */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl text-[#2E4D3E] font-bold border-b border-gray-50 pb-4">Review Your Order</h3>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Shipping Summary */}
                      <div className="space-y-2">
                        <h4 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Shipping Details</h4>
                        <div className="bg-[#FDFCFA] border border-gray-100 p-4 rounded-xl text-sm space-y-1">
                          <p className="font-semibold text-gray-800">{shippingForm.firstName} {shippingForm.lastName}</p>
                          <p className="text-gray-600">{shippingForm.address}</p>
                          <p className="text-gray-600">{shippingForm.city}, {shippingForm.state} - {shippingForm.zipCode}</p>
                          <p className="text-gray-600">📞 {shippingForm.phone}</p>
                        </div>
                      </div>

                      {/* Payment Summary */}
                      <div className="space-y-2">
                        <h4 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Payment Method</h4>
                        <div className="bg-[#FDFCFA] border border-gray-100 p-4 rounded-xl text-sm flex gap-3 items-center">
                          <CheckCircle2 className="w-5 h-5 text-[#2E4D3E]" />
                          <span className="font-semibold text-gray-800 uppercase tracking-wider">
                            {paymentMethod === "card" ? "Credit Card (Mocked)" : paymentMethod === "upi" ? "UPI QR (Mocked)" : "Cash on Delivery"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-2" />

                    {/* Order Verification Checkbox */}
                    <div className="p-4 bg-[#F3F4F0]/60 border border-[#2E4D3E]/5 rounded-2xl flex gap-3 items-start">
                      <ShieldCheck className="w-5 h-5 text-[#C5A55A] mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-600 leading-normal">
                        By placing your order, you agree to Yes Native's Terms of Service and Privacy Policy. All products are backed by our 100% traditional quality guarantee.
                      </p>
                    </div>

                    <div className="pt-6 flex justify-between border-t border-gray-100">
                      <button 
                        type="button" 
                        onClick={() => setStep(2)}
                        className="text-gray-500 hover:text-[#2E4D3E] font-semibold flex items-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back to Payment
                      </button>
                      <Button 
                        onClick={handlePlaceOrder}
                        className="bg-[#2E4D3E] hover:bg-[#1D3228] text-white px-10 py-6 rounded-xl font-bold hover:shadow-lg transition-shadow text-lg"
                      >
                        Place Order
                      </Button>
                    </div>
                  </div>
                )}

              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-4 sticky top-28">
            <Card className="bg-white border border-gray-100 shadow-sm rounded-3xl">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl text-[#2E4D3E] font-bold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#C5A55A]" /> Order Items
                </h3>
                
                {/* List items */}
                <div className="max-h-60 overflow-y-auto divide-y divide-gray-50 pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 py-3 first:pt-0 last:pb-0 items-center">
                      <div className={`w-14 h-14 bg-gradient-to-br ${item.image} rounded-xl p-1 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-50`}>
                        <img src={item.imageFile} alt={item.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-[#2E4D3E] truncate">{item.name}</h4>
                        <p className="text-[10px] text-gray-400 font-medium">{item.category} • {item.weight}</p>
                        <p className="text-xs font-bold text-gray-700 mt-0.5">₹{item.price} <span className="text-[10px] font-normal text-gray-400">x{item.quantity}</span></p>
                      </div>
                      <div className="text-sm font-bold text-[#2E4D3E] text-right">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Subtotals & Taxes */}
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-800">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Shipping</span>
                    <span className="text-green-600 font-bold uppercase text-xs">Free Delivery</span>
                  </div>
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>GST (18% inclusive)</span>
                    <span className="font-semibold text-gray-800">₹{tax}</span>
                  </div>
                </div>

                <Separator />

                {/* Grand Total */}
                <div className="flex justify-between items-baseline">
                  <span className="text-[#2E4D3E] font-bold text-lg">Grand Total</span>
                  <span className="text-[#2E4D3E] font-extrabold text-2xl">
                    ₹{total}
                  </span>
                </div>

                {/* Checkout Promises */}
                <div className="p-4 bg-[#F3F4F0]/60 rounded-2xl border border-[#2E4D3E]/5 space-y-2">
                  <h4 className="text-xs font-bold text-[#2E4D3E] uppercase tracking-wider">Yes Native Promises</h4>
                  <ul className="text-[11px] text-gray-600 space-y-1">
                    <li>✓ Secure 256-bit SSL encrypted checkout</li>
                    <li>✓ 100% organic millet product lineage</li>
                    <li>✓ Zero processing chemicals or preservatives</li>
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
