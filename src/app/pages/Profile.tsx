import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { User, MapPin, Heart, ShoppingBag, Moon, Sun, Settings, Clock, ArrowRight, ShieldCheck, ClipboardList, CheckCircle2, LogOut } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { useCart } from "../context/CartContext";
import { products, Product } from "../data/products";
import { toast } from "sonner";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageFile: string;
}

interface Order {
  orderId: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string; // Pending, Accepted, Dispatched, Delivered
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: string;
}

export default function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [activeTab, setActiveTab] = useState<string>("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);
  
  // Theme Toggle State
  const [theme, setTheme] = useState<string>("light");

  // Mock User Address State
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      tag: "Home Address",
      name: "Adorn Jim",
      street: "123, Traditional Wellness Avenue, Erode",
      cityState: "Erode, Tamil Nadu",
      zip: "638001",
      phone: "+91 98765 43210",
      default: true
    },
    {
      id: 2,
      tag: "Office Address",
      name: "Adorn Jim",
      street: "Block B, Tech Wellness Hub, Gobichettipalayam",
      cityState: "Gobichettipalayam, Tamil Nadu",
      zip: "638452",
      phone: "+91 98765 43211",
      default: false
    }
  ]);

  // Load state from localStorage on load
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("Please login to access your profile");
      navigate("/login");
      return;
    }
    
    try {
      setUser(JSON.parse(storedUser));
    } catch (e) {
      setUser(null);
    }

    // Theme setup
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Load orders
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);

    // If an order ID was passed from Checkout, set it as selected
    const stateOrderVal = location.state?.selectedOrder;
    if (stateOrderVal && storedOrders.length > 0) {
      const matched = storedOrders.find((o: Order) => o.orderId === stateOrderVal);
      if (matched) {
        setSelectedOrder(matched);
        setActiveTab("orders");
      }
    } else if (storedOrders.length > 0) {
      setSelectedOrder(storedOrders[0]);
    }

    // Load wishlist
    loadWishlist();
  }, [location, navigate]);

  const loadWishlist = () => {
    const storedWishlistIds: number[] = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const matchedProducts = products.filter(p => storedWishlistIds.includes(p.id));
    setWishlistItems(matchedProducts);
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      toast.success("Earthy Dark Mode Activated");
    } else {
      document.documentElement.classList.remove("dark");
      toast.success("Light Wellness Mode Activated");
    }
  };

  const handleRemoveFromWishlist = (productId: number) => {
    const storedWishlistIds: number[] = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const updated = storedWishlistIds.filter(id => id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    loadWishlist();
    toast.success("Removed from Wishlist");
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Address features mocked successfully!");
  };

  // Get order progress timeline index
  const getStatusIndex = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return 0;
      case "accepted": return 1;
      case "dispatched": return 2;
      case "delivered": return 3;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFA] dark:bg-[#0E1612] pt-24 pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Banner */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-12 pt-4">
          
          {/* Left Column: Loyalty Card Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-gradient-to-br from-[#2E4D3E] via-[#20362B] to-[#14231B] text-[#FDFCFA] border-0 rounded-3xl overflow-hidden shadow-lg relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A55A]/10 rounded-full blur-2xl group-hover:bg-[#C5A55A]/15 transition-all duration-300" />
              <CardContent className="p-8 space-y-6">
                
                {/* User Avatar details */}
                <div className="flex items-center gap-4">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-16 h-16 rounded-full border border-[#C5A55A]/50 shadow-md object-cover bg-white"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  {(!user || !user.avatar) && (
                    <div className="w-16 h-16 rounded-full bg-[#F3F4F0]/20 backdrop-blur-md flex items-center justify-center text-[#C5A55A] text-2xl font-bold border border-[#C5A55A]/30">
                      {user ? user.name.split(" ").map(n => n[0]).join("") : "AJ"}
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-bold tracking-wider">{user ? user.name : "Adorn Jim"}</h2>
                    <p className="text-xs text-[#C5A55A] font-semibold uppercase tracking-wider">{user ? user.email : "Native Wellness Member"}</p>
                  </div>
                </div>

                {/* Loyalty Tier Details */}
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/5 space-y-3">
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="opacity-80">Wellness Points</span>
                    <span className="font-extrabold text-lg text-[#C5A55A]">
                      {orders.length * 150 + 100} PTS
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#C5A55A] rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, (orders.length * 15) + 30)}%` }}
                    />
                  </div>
                  <p className="text-[10px] opacity-60 italic text-center">Unlock Gold Tier at 1000 points</p>
                </div>

                {/* Tab Links */}
                <div className="flex flex-col gap-2 pt-2 text-sm">
                  {[
                    { id: "orders", label: "My Orders", icon: ShoppingBag },
                    { id: "wishlist", label: "My Wishlist", icon: Heart },
                    { id: "addresses", label: "Saved Addresses", icon: MapPin },
                    { id: "settings", label: "Account Options", icon: Settings }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
                          activeTab === tab.id 
                            ? "bg-[#C5A55A] text-[#0E1612] shadow-md scale-102" 
                            : "hover:bg-white/5 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <Separator className="bg-white/10" />

                {/* Light/Dark Toggle */}
                <button
                  onClick={handleToggleTheme}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs font-bold uppercase tracking-wider text-[#C5A55A]"
                >
                  <span className="flex items-center gap-2 text-white">
                    {theme === "light" ? <Sun className="w-4 h-4 text-[#C5A55A]" /> : <Moon className="w-4 h-4 text-[#C5A55A]" />}
                    Theme Toggle
                  </span>
                  <span>{theme === "light" ? "Light" : "Dark"}</span>
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    toast.success("Successfully logged out from wellness path");
                    navigate("/login");
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 mt-3 rounded-xl bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 transition-all text-xs font-bold uppercase tracking-wider text-red-200"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  Sign Out
                </button>

              </CardContent>
            </Card>
          </div>

          {/* Right Column: Tab View Contents */}
          <div className="lg:col-span-8">
            <Card className="bg-white dark:bg-[#15221B] border border-gray-100 dark:border-[#1E3026] shadow-sm rounded-3xl min-h-[500px]">
              <CardContent className="p-8">
                
                {/* TAB 1: ORDERS */}
                {activeTab === "orders" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl text-[#2E4D3E] dark:text-[#C5A55A] font-bold border-b border-gray-50 dark:border-[#1E3026] pb-4 flex items-center gap-2">
                      <ShoppingBag className="w-6 h-6 text-[#C5A55A]" /> Your Orders History
                    </h3>

                    {orders.length === 0 ? (
                      <div className="text-center py-16 space-y-4 max-w-sm mx-auto">
                        <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-[#1B2921] flex items-center justify-center mx-auto">
                          <ClipboardList className="w-10 h-10 text-gray-400 dark:text-[#8EA096]" />
                        </div>
                        <h4 className="text-lg font-bold text-[#2E4D3E] dark:text-[#FDFCFA]">No Orders Found</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Place an order at Checkout to track your native nutrition delivery.</p>
                        <Link to="/shop">
                          <Button className="bg-[#2E4D3E] dark:bg-[#C5A55A] text-white dark:text-[#0E1612] hover:opacity-90 rounded-xl">Shop Products</Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-12 gap-8">
                        
                        {/* Orders List List */}
                        <div className="md:col-span-5 space-y-3 max-h-[450px] overflow-y-auto pr-2 divide-y divide-gray-50 dark:divide-[#1B2921]">
                          {orders.map((o) => (
                            <button
                              key={o.orderId}
                              onClick={() => setSelectedOrder(o)}
                              className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-1.5 ${
                                selectedOrder?.orderId === o.orderId
                                  ? "border-[#C5A55A] bg-[#2E4D3E]/5 dark:bg-[#C5A55A]/5 shadow-sm"
                                  : "border-gray-100 dark:border-[#1B2921] hover:border-gray-200 dark:hover:border-[#2E4D3E]"
                              }`}
                            >
                              <div className="flex justify-between items-baseline">
                                <span className="font-bold text-xs text-[#2E4D3E] dark:text-[#C5A55A]">{o.orderId}</span>
                                <span className="text-[10px] text-gray-400">{o.date}</span>
                              </div>
                              <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                                {o.items.length} {o.items.length === 1 ? 'product' : 'products'} • ₹{o.total}
                              </div>
                              <div className="flex justify-between items-center mt-1">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                  o.status === "Delivered" 
                                    ? "bg-green-100 text-green-700" 
                                    : "bg-[#C5A55A]/20 text-[#2E4D3E] dark:text-[#C5A55A]"
                                }`}>
                                  {o.status}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-[#C5A55A]" />
                              </div>
                            </button>
                          ))}
                        </div>

                        {/* Order Timeline Tracking Details */}
                        {selectedOrder && (
                          <div className="md:col-span-7 bg-gray-50/50 dark:bg-[#1B2921]/40 border border-gray-100 dark:border-[#1E3026] p-6 rounded-2xl space-y-6">
                            <div className="flex justify-between items-start border-b border-gray-100 dark:border-[#1E3026] pb-3">
                              <div>
                                <h4 className="font-extrabold text-sm text-[#2E4D3E] dark:text-[#C5A55A]">{selectedOrder.orderId}</h4>
                                <p className="text-[10px] text-gray-400">Placed on {selectedOrder.date}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-extrabold text-sm text-[#2E4D3E] dark:text-[#FDFCFA]">₹{selectedOrder.total}</p>
                                <p className="text-[10px] text-gray-400">{selectedOrder.paymentMethod}</p>
                              </div>
                            </div>

                            {/* Dynamic Vertical Delivery Timeline */}
                            <div className="space-y-4 pt-2">
                              <h5 className="font-bold text-xs uppercase tracking-wider text-gray-400">Delivery Status Progress</h5>
                              
                              <div className="relative pl-6 space-y-6">
                                <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-200 dark:bg-[#1E3026]" />
                                <div 
                                  className="absolute left-[7px] top-2 w-[2px] bg-[#2E4D3E] dark:bg-[#C5A55A] transition-all duration-500" 
                                  style={{ height: `${getStatusIndex(selectedOrder.status) * 33}%` }}
                                />

                                {[
                                  { label: "Order Placed & Confirmed", desc: "We received your millet order, packing soon" },
                                  { label: "Payment Confirmed & Accepted", desc: "Indian Traditional recipe ingredients allocated" },
                                  { label: "Slow Roasted & Dispatched", desc: "Fresh batch roasted and handed to transport" },
                                  { label: "Arrived & Delivered", desc: "Traditional wellness brought back into everyday life" }
                                ].map((step, idx) => {
                                  const completed = getStatusIndex(selectedOrder.status) >= idx;
                                  return (
                                    <div key={idx} className="relative flex gap-4">
                                      <div className={`absolute -left-[23px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                                        completed 
                                          ? "bg-[#2E4D3E] dark:bg-[#C5A55A] border-[#2E4D3E] dark:border-[#C5A55A]" 
                                          : "bg-white dark:bg-[#15221B] border-gray-200 dark:border-[#1E3026]"
                                      }`}>
                                        {completed && <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-[#0E1612]" />}
                                      </div>
                                      <div>
                                        <h6 className={`text-xs font-bold ${completed ? "text-[#2E4D3E] dark:text-[#C5A55A]" : "text-gray-400"}`}>
                                          {step.label}
                                        </h6>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 leading-normal">{step.desc}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Order items lists inside details */}
                            <div className="border-t border-gray-100 dark:border-[#1E3026] pt-4 space-y-2">
                              <h5 className="font-bold text-xs uppercase tracking-wider text-gray-400">Order Items</h5>
                              <div className="divide-y divide-gray-50 dark:divide-[#1E3026]">
                                {selectedOrder.items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center py-2 text-xs">
                                    <div className="flex gap-2.5 items-center">
                                      <div className="w-8 h-8 rounded bg-gray-100 dark:bg-[#1B2921] p-0.5 flex items-center justify-center flex-shrink-0">
                                        <img src={item.imageFile} alt="" className="max-h-full object-contain" />
                                      </div>
                                      <div>
                                        <span className="font-bold text-[#2E4D3E] dark:text-[#FDFCFA]">{item.name}</span>
                                        <span className="text-gray-400 text-[10px] ml-2">x{item.quantity}</span>
                                      </div>
                                    </div>
                                    <span className="font-bold text-[#2E4D3E] dark:text-[#C5A55A]">₹{item.price * item.quantity}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: WISHLIST */}
                {activeTab === "wishlist" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl text-[#2E4D3E] dark:text-[#C5A55A] font-bold border-b border-gray-50 dark:border-[#1E3026] pb-4 flex items-center gap-2">
                      <Heart className="w-6 h-6 text-[#C5A55A] fill-[#C5A55A]" /> Your Wishlist Favorites
                    </h3>

                    {wishlistItems.length === 0 ? (
                      <div className="text-center py-16 space-y-4 max-w-sm mx-auto">
                        <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-[#1B2921] flex items-center justify-center mx-auto">
                          <Heart className="w-10 h-10 text-gray-300 dark:text-[#8EA096]" />
                        </div>
                        <h4 className="text-lg font-bold text-[#2E4D3E] dark:text-[#FDFCFA]">Your wishlist is empty</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Bookmark your favorite superfoods to quickly shop them later.</p>
                        <Link to="/shop">
                          <Button className="bg-[#2E4D3E] dark:bg-[#C5A55A] text-white dark:text-[#0E1612] rounded-xl">View Products</Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-6">
                        {wishlistItems.map((item) => (
                          <div key={item.id} className="border border-gray-100 dark:border-[#1E3026] bg-[#FDFCFA] dark:bg-[#1B2921]/20 p-4 rounded-2xl shadow-sm flex gap-4 items-center relative group">
                            
                            {/* Product Image */}
                            <div className={`w-20 h-20 bg-gradient-to-br ${item.image} rounded-xl p-1.5 flex items-center justify-center flex-shrink-0`}>
                              <img src={item.imageFile} alt="" className="max-h-full max-w-full object-contain" />
                            </div>

                            {/* Product Info details */}
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] text-[#C5A55A] font-bold uppercase tracking-wider">{item.category}</span>
                              <Link to={`/shop/${item.id}`} className="block">
                                <h4 className="font-bold text-sm text-[#2E4D3E] dark:text-[#FDFCFA] truncate hover:text-[#C5A55A] transition-colors">{item.name}</h4>
                              </Link>
                              <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-1">₹{item.price}</p>
                            </div>

                            {/* Quick Add To Cart or Remove icons */}
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => {
                                  addToCart(item);
                                  toast.success("Added to Cart!");
                                }}
                                className="p-2 bg-[#2E4D3E] text-white rounded-xl shadow-sm hover:scale-105 transition-transform"
                                aria-label="Add to cart"
                              >
                                <ShoppingCart className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRemoveFromWishlist(item.id)}
                                className="p-2 text-red-500 bg-red-50 dark:bg-red-500/10 rounded-xl hover:scale-105 transition-transform"
                                aria-label="Delete"
                              >
                                ✕
                              </button>
                            </div>

                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 3: ADDRESSES */}
                {activeTab === "addresses" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl text-[#2E4D3E] dark:text-[#C5A55A] font-bold border-b border-gray-50 dark:border-[#1E3026] pb-4 flex items-center gap-2">
                      <MapPin className="w-6 h-6 text-[#C5A55A]" /> Your Saved Addresses
                    </h3>

                    {/* Address List Grid */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      {addresses.map((addr) => (
                        <div key={addr.id} className="border border-gray-100 dark:border-[#1E3026] p-5 rounded-2xl space-y-3 relative bg-[#FDFCFA] dark:bg-[#1B2921]/10">
                          {addr.default && (
                            <span className="absolute top-4 right-4 bg-[#2E4D3E]/10 dark:bg-[#C5A55A]/20 text-[#2E4D3E] dark:text-[#C5A55A] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                              Default Billing
                            </span>
                          )}
                          <h4 className="font-bold text-xs uppercase text-gray-400 tracking-wider">{addr.tag}</h4>
                          <div className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                            <p className="font-bold text-sm text-[#2E4D3E] dark:text-[#FDFCFA]">{addr.name}</p>
                            <p>{addr.street}</p>
                            <p>{addr.cityState} - {addr.zip}</p>
                            <p className="pt-1.5">📞 {addr.phone}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="dark:bg-[#1E3026]" />

                    {/* Add Address Form */}
                    <form onSubmit={handleAddAddress} className="space-y-4 border border-dashed border-gray-200 dark:border-[#1E3026] p-6 rounded-2xl max-w-lg">
                      <h4 className="font-bold text-sm text-[#2E4D3E] dark:text-[#FDFCFA]">Create New Address</h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          placeholder="Recipient Full Name" 
                          className="px-3 py-2 text-xs border border-gray-200 dark:border-[#1E3026] dark:bg-[#15221B] rounded-lg outline-none text-gray-700 dark:text-gray-300"
                        />
                        <input 
                          type="text" 
                          placeholder="Phone Number" 
                          className="px-3 py-2 text-xs border border-gray-200 dark:border-[#1E3026] dark:bg-[#15221B] rounded-lg outline-none text-gray-700 dark:text-gray-300"
                        />
                      </div>

                      <input 
                        type="text" 
                        placeholder="Street Address, Area" 
                        className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-[#1E3026] dark:bg-[#15221B] rounded-lg outline-none text-gray-700 dark:text-gray-300"
                      />

                      <div className="grid grid-cols-3 gap-2">
                        <input type="text" placeholder="City" className="px-3 py-2 text-xs border border-gray-200 dark:border-[#1E3026] dark:bg-[#15221B] rounded-lg outline-none" />
                        <input type="text" placeholder="State" className="px-3 py-2 text-xs border border-gray-200 dark:border-[#1E3026] dark:bg-[#15221B] rounded-lg outline-none" />
                        <input type="text" placeholder="ZIP Code" className="px-3 py-2 text-xs border border-gray-200 dark:border-[#1E3026] dark:bg-[#15221B] rounded-lg outline-none" />
                      </div>

                      <Button type="submit" className="bg-[#2E4D3E] dark:bg-[#C5A55A] text-white dark:text-[#0E1612] py-4 text-xs font-bold rounded-lg shadow-none">
                        Save Address
                      </Button>
                    </form>
                  </div>
                )}

                {/* TAB 4: SETTINGS */}
                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl text-[#2E4D3E] dark:text-[#C5A55A] font-bold border-b border-gray-50 dark:border-[#1E3026] pb-4 flex items-center gap-2">
                      <Settings className="w-6 h-6 text-[#C5A55A]" /> Account Settings
                    </h3>

                    <div className="space-y-4 max-w-md">
                      <div className="flex justify-between items-center border border-gray-100 dark:border-[#1E3026] p-4 rounded-xl">
                        <div>
                          <h4 className="font-bold text-sm text-[#2E4D3E] dark:text-[#FDFCFA]">Newsletter Subscriptions</h4>
                          <p className="text-[10px] text-gray-400">Receive organic wellness tips & millet recipes.</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded border-gray-200 text-[#2E4D3E] focus:ring-[#C5A55A]" />
                      </div>

                      <div className="flex justify-between items-center border border-gray-100 dark:border-[#1E3026] p-4 rounded-xl">
                        <div>
                          <h4 className="font-bold text-sm text-[#2E4D3E] dark:text-[#FDFCFA]">WhatsApp Instant Notifications</h4>
                          <p className="text-[10px] text-gray-400">Get shipping updates directly to WhatsApp.</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded border-gray-200 text-[#2E4D3E] focus:ring-[#C5A55A]" />
                      </div>

                      <div className="p-4 bg-[#F3F4F0]/60 dark:bg-[#1B2921]/30 border border-[#2E4D3E]/5 dark:border-[#C5A55A]/5 rounded-2xl flex gap-3 items-start">
                        <ShieldCheck className="w-5 h-5 text-[#C5A55A] mt-0.5 flex-shrink-0" />
                        <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-normal">
                          Your profile is fully secure and linked to your local storage data. No external servers are logging your shopping coordinates.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
