import { useState, useEffect } from "react";
import { Star, CheckCircle, Filter, ShoppingCart, Search, Heart, ArrowUpDown, X } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useCart } from "../context/CartContext";
import { products, Product } from "../data/products";
import { toast } from "sonner";

export default function Shop() {
  const { addToCart } = useCart();
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  
  // Wishlist State
  const [wishlist, setWishlist] = useState<number[]>([]);
  
  // Search Autocomplete Overlay state
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Load wishlist
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  const toggleWishlist = (productId: number) => {
    let updatedWishlist = [...wishlist];
    if (wishlist.includes(productId)) {
      updatedWishlist = updatedWishlist.filter(id => id !== productId);
      toast.success("Removed from Wishlist");
    } else {
      updatedWishlist.push(productId);
      toast.success("Added to Wishlist!");
    }
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const categories = [
    { value: "all", label: "All Wellness Products" },
    { value: "Chocolate Malts", label: "Chocolate Malts" },
    { value: "Energy Drinks", label: "Energy Drinks" },
    { value: "Traditional Mixes", label: "Traditional Mixes" }
  ];

  // Real-time Autocomplete Suggestions
  const suggestions = searchQuery.trim() === "" 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4);

  // Filter products
  let filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen bg-[#FDFCFA] dark:bg-[#0E1612] pt-24 pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Shop Header Banner */}
        <div className="mb-10 text-center max-w-xl mx-auto space-y-2 pt-4">
          <h1 className="text-3xl sm:text-4xl text-[#2E4D3E] dark:text-[#C5A55A] font-bold">Traditional Wellness Shop</h1>
          <p className="text-gray-500">100% natural, clean label, millet nutrition rooted in Indian traditional heritage</p>
        </div>

        {/* Real-time Search and Autocomplete Overlay */}
        <div className="max-w-xl mx-auto mb-10 relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search millet mix, chocolate malts, badam mixes..."
              className="w-full pl-12 pr-10 py-3.5 border border-gray-200 dark:border-[#1E3026] bg-white dark:bg-[#15221B] text-gray-800 dark:text-white rounded-2xl outline-none focus:border-[#C5A55A] dark:focus:border-[#C5A55A] transition-all text-sm shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setShowSuggestions(false);
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Overlay */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#15221B] border border-gray-100 dark:border-[#1E3026] rounded-2xl shadow-xl z-30 overflow-hidden divide-y divide-gray-50 dark:divide-[#1E3026]">
              {suggestions.map(s => (
                <Link 
                  key={s.id}
                  to={`/shop/${s.id}`}
                  onClick={() => setShowSuggestions(false)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-[#1B2921]/30 transition-colors"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${s.image} rounded-lg flex items-center justify-center p-1 flex-shrink-0`}>
                    <img src={s.imageFile} alt="" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2E4D3E] dark:text-[#FDFCFA]">{s.name}</h4>
                    <p className="text-[10px] text-gray-400 font-medium">{s.category} • ₹{s.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {/* Overlay Clickout Hider */}
          {showSuggestions && <div className="fixed inset-0 z-20" onClick={() => setShowSuggestions(false)} />}
        </div>

        {/* Filter Controls & Sort panel */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 dark:border-[#1E3026] pb-6 mb-8">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold transition-all ${
                  selectedCategory === cat.value
                    ? "bg-[#2E4D3E] dark:bg-[#C5A55A] text-white dark:text-[#0E1612] shadow-sm"
                    : "bg-gray-50 dark:bg-[#1B2921] hover:bg-gray-100 dark:hover:bg-[#2E4D3E]/20 text-gray-600 dark:text-gray-400"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Selector Dropdown */}
          <div className="flex items-center space-x-3 w-full md:w-auto relative z-10">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex-shrink-0">Sort By</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-white dark:bg-[#15221B] border-gray-200 dark:border-[#1E3026] rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300">
                <SelectValue placeholder="Featured" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#15221B]">
                <SelectItem value="featured">Featured Best Sellers</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Dynamic Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const isFav = wishlist.includes(product.id);
            return (
              <Card key={product.id} className="group hover-lift hover:shadow-2xl transition-all duration-300 bg-white dark:bg-[#15221B] border border-gray-100 dark:border-[#1E3026] rounded-3xl overflow-hidden relative flex flex-col">
                
                {/* Wishlist Heart Icon */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 z-10 p-2.5 rounded-full border shadow-sm transition-transform active:scale-90 hover:scale-105 ${
                    isFav 
                      ? "bg-red-50 text-red-500 border-red-100" 
                      : "bg-white/80 backdrop-blur-sm border-gray-100 text-gray-500 hover:text-red-500"
                  }`}
                  aria-label="Add to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFav ? "fill-red-500" : ""}`} />
                </button>

                {/* Product Thumbnail Banner */}
                <Link to={`/shop/${product.id}`} className="block">
                  <div className={`w-full h-52 bg-gradient-to-br ${product.image} p-6 flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:scale-101`}>
                    <img 
                      src={product.imageFile} 
                      alt={product.name} 
                      className="max-h-full max-w-full object-contain drop-shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                  </div>
                </Link>

                {/* Info block */}
                <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] text-[#C5A55A] font-bold uppercase tracking-wider">{product.category}</span>
                    <Link to={`/shop/${product.id}`} className="block">
                      <h3 className="text-lg font-bold text-[#2E4D3E] dark:text-[#FDFCFA] hover:text-[#C5A55A] dark:hover:text-[#C5A55A] transition-colors leading-tight line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(product.rating)
                                ? "fill-[#C5A55A] text-[#C5A55A]"
                                : "text-gray-200 dark:text-[#1E3026]"
                            }`}
                          />
                        ))}
                        <span className="text-xs font-semibold text-gray-500 ml-1">({product.rating})</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-extrabold text-[#2E4D3E] dark:text-[#C5A55A]">₹{product.price}</span>
                        <span className="text-[10px] text-gray-400 block font-medium">/ {product.weight}</span>
                      </div>
                    </div>

                    <ul className="space-y-1.5 pt-2 border-t border-gray-50 dark:border-[#1E3026]">
                      {product.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx} className="flex items-start text-xs text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-3.5 h-3.5 text-[#2E4D3E] dark:text-[#C5A55A] mr-2 mt-0.5 flex-shrink-0" />
                          <span className="truncate">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Link to={`/shop/${product.id}`} className="flex-1">
                      <Button className="w-full bg-[#2E4D3E] hover:bg-[#1D3228] text-white rounded-xl shadow-sm text-xs py-4 font-bold border-0 dark:bg-[#C5A55A] dark:text-[#0E1612]">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl border-[#2E4D3E] dark:border-[#C5A55A] text-[#2E4D3E] dark:text-[#C5A55A] hover:bg-[#2E4D3E] hover:text-white dark:hover:bg-[#C5A55A] dark:hover:text-[#0E1612] text-xs font-bold py-4 shadow-sm"
                      onClick={() => {
                        addToCart(product);
                        toast.success(`${product.name} added to cart!`);
                      }}
                    >
                      <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>

              </Card>
            );
          })}
        </div>

        {/* Fallback Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 space-y-4 max-w-sm mx-auto">
            <p className="text-gray-500 text-lg">No products found matching your active filter criteria.</p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="bg-[#2E4D3E] text-white rounded-xl"
            >
              Reset All Filters
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
