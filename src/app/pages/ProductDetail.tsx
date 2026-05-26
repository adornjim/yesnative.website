import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Star, CheckCircle, ChevronRight, ShoppingCart, ShieldCheck, Heart, ArrowLeft, Plus, Minus, Info } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { useCart } from "../context/CartContext";
import { products, Product } from "../data/products";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, updateQuantity, cart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("info");

  // Mock Reviews
  const [reviewsList, setReviewsList] = useState([
    { name: "Suresh Kumar", rating: 5, date: "May 24, 2026", comment: "Outstanding taste! It mixes perfectly with warm milk and is not overly sweet. I feel full and energized." },
    { name: "Meera Nair", rating: 4, date: "May 18, 2026", comment: "My daughter loves this choco malt. Great way to feed kids millets without struggle. Highly recommend!" },
    { name: "Dr. Anand", rating: 5, date: "April 29, 2026", comment: "Excellent nutritional profile. Sprouting finger millet increases calcium bio-availability significantly." }
  ]);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((p) => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.imageFile);
        
        // Check wishlist from localStorage
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setIsWishlisted(storedWishlist.includes(foundProduct.id));
      } else {
        setProduct(null);
      }
    }
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCFA] pt-24">
        <div className="text-center space-y-4">
          <h2 className="text-3xl text-[#2E4D3E]">Product Not Found</h2>
          <p className="text-gray-600">The product you are looking for does not exist.</p>
          <Link to="/shop">
            <Button className="bg-[#2E4D3E] text-white">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Handle Zoom Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.8)"
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center",
      transform: "scale(1)"
    });
  };

  const toggleWishlist = () => {
    const storedWishlist: number[] = JSON.parse(localStorage.getItem("wishlist") || "[]");
    let updatedWishlist: number[];
    
    if (isWishlisted) {
      updatedWishlist = storedWishlist.filter(itemId => itemId !== product.id);
      toast.success("Removed from Wishlist");
    } else {
      updatedWishlist = [...storedWishlist, product.id];
      toast.success("Added to Wishlist!");
    }
    
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    // Add multiple quantities if needed
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    // Clear and add or simply add
    addToCart(product);
    navigate("/checkout");
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) {
      toast.error("Please fill in all fields.");
      return;
    }
    const today = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
    setReviewsList([
      { name: newReview.name, rating: newReview.rating, date: today, comment: newReview.comment },
      ...reviewsList
    ]);
    setNewReview({ name: "", rating: 5, comment: "" });
    toast.success("Review submitted! Thank you for your feedback.");
  };

  // Filter Related Products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FDFCFA] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8 pt-4">
          <Link to="/" className="hover:text-[#2E4D3E] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/shop" className="hover:text-[#2E4D3E] transition-colors">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-400 font-medium">{product.category}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#2E4D3E] font-semibold">{product.name}</span>
        </nav>

        {/* Product Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Image Gallery with Interactive Zoom */}
          <div className="lg:col-span-6 space-y-4">
            <div 
              className="relative w-full h-[400px] sm:h-[500px] bg-gradient-to-br from-[#F5EFE7] to-[#E8DCC8] rounded-3xl overflow-hidden border border-[#2E4D3E]/10 cursor-zoom-in shadow-sm flex items-center justify-center p-8 group"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain rounded-2xl transition-transform duration-200"
                style={zoomStyle}
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-[#2E4D3E]/10 rounded-full px-4 py-1.5 text-xs text-[#2E4D3E] font-semibold shadow-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A55A]" /> 100% Traditional Wellness
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {product.ingredientsImageFile && (
              <div className="flex gap-4">
                <button 
                  onClick={() => setSelectedImage(product.imageFile)}
                  className={`w-24 h-24 rounded-2xl overflow-hidden border-2 bg-gradient-to-br from-[#F5EFE7] to-[#E8DCC8] p-2 flex items-center justify-center transition-all ${
                    selectedImage === product.imageFile ? "border-[#C5A55A] shadow-md scale-105" : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <img src={product.imageFile} alt="Package render" className="max-h-full max-w-full object-contain rounded-lg" />
                </button>
                <button 
                  onClick={() => setSelectedImage(product.ingredientsImageFile!)}
                  className={`w-24 h-24 rounded-2xl overflow-hidden border-2 bg-gradient-to-br from-[#F5EFE7] to-[#E8DCC8] p-2 flex items-center justify-center transition-all ${
                    selectedImage === product.ingredientsImageFile ? "border-[#C5A55A] shadow-md scale-105" : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <img src={product.ingredientsImageFile} alt="Ingredients layout" className="max-h-full max-w-full object-contain rounded-lg" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Product Info Panel */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[#C5A55A] uppercase tracking-wider text-xs font-semibold">{product.category}</span>
              <h1 className="text-3xl sm:text-4xl text-[#2E4D3E] font-bold">{product.name}</h1>
              
              <div className="flex items-center space-x-4 pt-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-[#C5A55A] text-[#C5A55A]" : "text-gray-300"}`} 
                    />
                  ))}
                  <span className="text-sm font-semibold text-gray-700 ml-2">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-400">|</span>
                <span className="text-sm text-gray-600 font-medium">{reviewsList.length} Verified Reviews</span>
              </div>
            </div>

            {/* Price & Weight Badge */}
            <div className="flex items-baseline space-x-4 bg-[#F3F4F0]/50 border border-[#2E4D3E]/5 p-4 rounded-2xl">
              <span className="text-4xl text-[#2E4D3E] font-bold">₹{product.price}</span>
              <span className="text-gray-500 font-medium">/ {product.weight} pack</span>
              <span className="ml-auto bg-[#2E4D3E]/10 text-[#2E4D3E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                In Stock
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed text-base">
              {product.description}
            </p>

            {/* Micro Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-4 border-t border-b border-gray-100 py-6">
              {product.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#2E4D3E] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-800 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Quantity Stepper & Checkout Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-6">
                <span className="text-sm text-gray-600 font-semibold">Quantity</span>
                <div className="flex items-center border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="px-5 py-2 min-w-[3.5rem] text-center font-bold text-[#2E4D3E]">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="p-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Wishlist Button */}
                <button 
                  onClick={toggleWishlist}
                  className={`p-3.5 rounded-xl border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95 ${
                    isWishlisted ? "bg-red-50 text-red-500 border-red-200" : "bg-white text-gray-500 hover:text-[#2E4D3E]"
                  }`}
                  aria-label="Add to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500" : ""}`} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-white hover:bg-gray-50 text-[#2E4D3E] border border-[#2E4D3E] py-7 text-lg rounded-xl flex items-center justify-center gap-2 hover:shadow-md transition-shadow font-semibold"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
                <Button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#2E4D3E] hover:bg-[#1D3228] text-white py-7 text-lg rounded-xl hover:shadow-lg transition-shadow font-semibold"
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Specifications Accordion */}
            <div className="pt-4">
              <Accordion type="single" collapsible className="w-full space-y-2">
                
                <AccordionItem value="ingredients" className="border border-gray-100 bg-[#FDFCFA] rounded-xl px-4 shadow-sm">
                  <AccordionTrigger className="text-[#2E4D3E] font-semibold text-base py-4 hover:text-[#C5A55A] transition-colors">
                    Ingredients list
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pb-4 pt-1">
                    <p className="font-medium mb-3 text-sm text-[#2E4D3E]/80">100% CLEAN LABEL & NATURAL:</p>
                    <p className="text-gray-600 bg-white border border-[#2E4D3E]/5 p-3 rounded-lg">{product.ingredients}</p>
                    {product.ingredientsImageFile && (
                      <button 
                        onClick={() => {
                          setSelectedImage(product.ingredientsImageFile!);
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className="mt-3 text-xs text-[#C5A55A] font-semibold hover:underline flex items-center gap-1.5"
                      >
                        <Info className="w-4 h-4" /> View ingredients macro breakdown chart above
                      </button>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="nutrition" className="border border-gray-100 bg-[#FDFCFA] rounded-xl px-4 shadow-sm">
                  <AccordionTrigger className="text-[#2E4D3E] font-semibold text-base py-4 hover:text-[#C5A55A] transition-colors">
                    Nutritional Information (per 100g)
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-1">
                    <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-inner">
                      <table className="w-full text-sm text-left">
                        <thead>
                          <tr className="bg-[#2E4D3E]/5 text-[#2E4D3E] font-semibold">
                            <th className="px-4 py-2.5">Nutritional Value</th>
                            <th className="px-4 py-2.5 text-right">Quantity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {product.nutrition.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50">
                              <td className="px-4 py-2.5 text-gray-700 font-medium">{item.label}</td>
                              <td className="px-4 py-2.5 text-right font-bold text-[#2E4D3E]">{item.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="promises" className="border border-gray-100 bg-[#FDFCFA] rounded-xl px-4 shadow-sm">
                  <AccordionTrigger className="text-[#2E4D3E] font-semibold text-base py-4 hover:text-[#C5A55A] transition-colors">
                    Our Quality Promise
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-4 pt-1 space-y-2">
                    <p>🌾 <strong>100% Millet Power:</strong> No wheat, corn starch, or cheap thickeners are used in our formulations.</p>
                    <p>🍃 <strong>Zero Preservatives:</strong> We vacuum pack our slow-roasted small batches to retain absolute shelf fresh qualities naturally.</p>
                    <p>🍯 <strong>Earthy Sweeteners:</strong> We use only premium organic unrefined jaggery, date powder, or brown sugar in our sweetened malts.</p>
                  </AccordionContent>
                </AccordionItem>
                
              </Accordion>
            </div>

          </div>
        </div>

        {/* Tab Selection Section for Reviews & Recipes */}
        <div className="border-t border-gray-100 pt-12 mb-16">
          <div className="flex border-b border-gray-200 gap-8 mb-8">
            <button 
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 text-lg font-bold border-b-2 transition-all ${
                activeTab === "reviews" || activeTab === "info" ? "border-[#C5A55A] text-[#2E4D3E]" : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Customer Reviews ({reviewsList.length})
            </button>
            <button 
              onClick={() => setActiveTab("use")}
              className={`pb-4 text-lg font-bold border-b-2 transition-all ${
                activeTab === "use" ? "border-[#C5A55A] text-[#2E4D3E]" : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              How to Prepare
            </button>
          </div>

          {(activeTab === "reviews" || activeTab === "info") && (
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              
              {/* Ratings Summary Card */}
              <div className="lg:col-span-4 bg-[#F3F4F0]/60 border border-[#2E4D3E]/5 p-6 rounded-2xl space-y-4">
                <h3 className="text-xl text-[#2E4D3E] font-bold">Feedback Summary</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-[#2E4D3E]">{product.rating}</span>
                  <span className="text-gray-400">/ 5.0</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 fill-[#C5A55A] text-[#C5A55A]`} />
                  ))}
                </div>
                <p className="text-sm text-gray-600 font-medium">Based on 100% verified customer wellness purchases.</p>
              </div>

              {/* Review List & Form */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Submit New Review */}
                <form onSubmit={handleAddReview} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
                  <h4 className="text-[#2E4D3E] font-bold text-lg">Leave a Review</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Your Name *</label>
                      <input 
                        type="text" 
                        required
                        value={newReview.name}
                        onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your name" 
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-[#C5A55A] focus:ring-1 focus:ring-[#C5A55A] outline-none text-sm bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Rating *</label>
                      <select 
                        value={newReview.rating}
                        onChange={(e) => setNewReview(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-[#C5A55A] outline-none text-sm bg-gray-50/50"
                      >
                        <option value="5">5 Stars — Excellent</option>
                        <option value="4">4 Stars — Very Good</option>
                        <option value="3">3 Stars — Satisfactory</option>
                        <option value="2">2 Stars — Dissatisfactory</option>
                        <option value="1">1 Star — Poor</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Comments *</label>
                    <textarea 
                      required
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                      rows={3} 
                      placeholder="Write your review here..."
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-[#C5A55A] outline-none text-sm bg-gray-50/50"
                    />
                  </div>
                  <Button type="submit" className="bg-[#2E4D3E] hover:bg-[#1D3228] text-white">
                    Submit Review
                  </Button>
                </form>

                {/* List of Reviews */}
                <div className="divide-y divide-gray-100">
                  {reviewsList.map((rev, idx) => (
                    <div key={idx} className="py-6 first:pt-0 last:pb-0 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#2E4D3E]">{rev.name}</span>
                        <span className="text-xs text-gray-400">{rev.date}</span>
                      </div>
                      <div className="flex space-x-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < rev.rating ? "fill-[#C5A55A] text-[#C5A55A]" : "text-gray-200"}`} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed italic">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

          {activeTab === "use" && (
            <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm max-w-3xl mx-auto space-y-6">
              <h3 className="text-2xl text-[#2E4D3E] font-bold">Standard Preparation Guide</h3>
              <p className="text-gray-600">Enjoy the rich traditional taste and health benefits of Yes Native in just 3 quick steps:</p>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#2E4D3E]/10 flex items-center justify-center text-[#2E4D3E] font-bold flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="font-bold text-[#2E4D3E]">Add Mix</h4>
                    <p className="text-sm text-gray-600">Stir 2-3 tablespoons (approximately 20-30g) of our mix into a cup.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#2E4D3E]/10 flex items-center justify-center text-[#2E4D3E] font-bold flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="font-bold text-[#2E4D3E]">Pour warm milk / water</h4>
                    <p className="text-sm text-gray-600">Pour 150ml of warm or cold milk (dairy or plant-based) or water gradually, whisking smoothly to avoid lumps.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#2E4D3E]/10 flex items-center justify-center text-[#2E4D3E] font-bold flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <h4 className="font-bold text-[#2E4D3E]">Enjoy wholesomeness</h4>
                    <p className="text-sm text-gray-600">Mix thoroughly. Add organic sweeteners if desired, sit back, and sip the power of traditional superfoods!</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-16">
            <h2 className="text-2xl sm:text-3xl text-center text-[#2E4D3E] font-bold mb-10">You May Also Like</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <Card key={p.id} className="group border border-gray-100 hover:shadow-xl transition-all duration-300 bg-white rounded-2xl overflow-hidden">
                  <CardContent className="p-6 space-y-4">
                    <Link to={`/shop/${p.id}`} className="block">
                      <div className={`w-full h-48 bg-gradient-to-br ${p.image} rounded-xl overflow-hidden flex items-center justify-center p-6 group-hover:scale-102 transition-transform duration-300`}>
                        <img src={p.imageFile} alt={p.name} className="max-h-full max-w-full object-contain drop-shadow-md" />
                      </div>
                    </Link>
                    <div className="space-y-2">
                      <span className="text-xs text-[#C5A55A] font-bold uppercase tracking-wider">{p.category}</span>
                      <Link to={`/shop/${p.id}`} className="block">
                        <h3 className="text-lg text-[#2E4D3E] font-bold hover:text-[#C5A55A] transition-colors line-clamp-1">{p.name}</h3>
                      </Link>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-lg font-bold text-[#2E4D3E]">₹{p.price}</span>
                        <span className="text-xs text-gray-500 font-medium">{p.weight} pack</span>
                      </div>
                    </div>
                    <Link to={`/shop/${p.id}`} className="block">
                      <Button className="w-full bg-[#2E4D3E]/10 text-[#2E4D3E] hover:bg-[#2E4D3E] hover:text-white rounded-xl shadow-none transition-colors border-0">
                        View Product Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
