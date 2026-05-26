import { Link } from "react-router";
import { CheckCircle, Leaf, ShieldCheck, Heart, Zap, Users, Star, ChevronRight, ShoppingCart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export default function Home() {
  return (
    <div className="w-full">
      <AnnouncementBar />
      <HeroSection />
      <WhyYesNative />
      <WellnessGoals />
      <FeaturedProducts />
      <ComparisonSection />
      <BrandStory />
      <HowItsMade />
      <Testimonials />
      <LifestyleGallery />
      <FAQ />
      <FinalCTA />
    </div>
  );
}

function AnnouncementBar() {
  return (
    <div className="bg-[#2D5016] text-white py-3 text-center text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <p>Traditional Wellness for Modern Living • Clean Label Millet Nutrition • No Artificial Colors or Preservatives</p>
      </div>
    </div>
  );
}

function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#F5EFE7] via-[#E8DCC8] to-[#D4C4A8] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#2D5016] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C89D66] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 transition-all duration-1000 ease-out transform ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <p className="text-[#C89D66] uppercase tracking-wider text-sm font-semibold tracking-widest">Rooted in Tradition</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#2D5016] leading-tight font-bold">
              Functional Superfoods Built for Modern Lifestyles
            </h1>
            <p className="text-lg text-gray-700 max-w-lg">
              Millet-based wellness mixes designed for energy, gut health, women's wellness, and healthier daily nutrition.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/shop">
                <Button size="lg" className="bg-[#2D5016] hover:bg-[#3D6826] text-white px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                  Shop Products
                </Button>
              </Link>
              <Link to="/wellness">
                <Button size="lg" variant="outline" className="border-[#2D5016] text-[#2D5016] hover:bg-[#2D5016] hover:text-white px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5">
                  Explore Wellness
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#2D5016]/10">
              {[
                { icon: Leaf, text: "Millet Powered" },
                { icon: ShieldCheck, text: "No Preservatives" },
                { icon: Heart, text: "Traditional Ingredients" },
                { icon: Users, text: "Family Nutrition" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-sm hover:scale-105 transition-transform duration-200">
                  <item.icon className="w-5 h-5 text-[#2D5016]" />
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ease-out transform ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <div className="relative z-10 flex justify-center items-center space-x-4">
              <div className="space-y-4">
                <ProductFloat name="Black Rice Choco Malt" delay="0s" />
                <ProductFloat name="SlimSure Lite" delay="0.2s" />
              </div>
              <div className="mt-12">
                <ProductFloat name="Palm Cube Badam Mix" delay="0.4s" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductFloat({ name, delay }: { name: string; delay: string }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-2xl p-6 w-48 hover:scale-105 transition-transform"
      style={{ animation: `float 3s ease-in-out infinite ${delay}` }}
    >
      <div className="w-full h-32 bg-gradient-to-br from-[#C89D66] to-[#A67C52] rounded-lg mb-3"></div>
      <p className="text-sm text-center text-gray-800">{name}</p>
    </div>
  );
}

function WhyYesNative() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const features = [
    {
      icon: ShieldCheck,
      title: "Clean Label",
      description: "No artificial colors or preservatives",
    },
    {
      icon: Leaf,
      title: "Traditional Grains",
      description: "Millets & ancient nutrition",
    },
    {
      icon: Heart,
      title: "Functional Wellness",
      description: "Products designed for specific health goals",
    },
    {
      icon: Star,
      title: "Small Batch Crafted",
      description: "Fresh and quality controlled",
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-white overflow-hidden">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal ${isVisible ? "animate-in" : ""}`}>
        <h2 className="text-3xl md:text-4xl text-center text-[#2D5016] mb-12 font-bold">Why YES NATIVE?</h2>
        <div className={`grid md:grid-cols-4 gap-8 stagger-container ${isVisible ? "animate-in" : ""}`}>
          {features.map((feature, idx) => (
            <div key={idx} className="text-center space-y-4 stagger-item hover-lift p-6 rounded-2xl bg-[#F5EFE7]/30 border border-[#2D5016]/5">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F5EFE7] rounded-full transition-transform duration-300 hover:rotate-12">
                <feature.icon className="w-8 h-8 text-[#2D5016]" />
              </div>
              <h3 className="text-xl text-[#2D5016] font-semibold">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WellnessGoals() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.05 });
  const goals = [
    { title: "Weight Management", product: "SlimSure Lite", color: "from-orange-400 to-red-500" },
    { title: "Daily Energy", product: "Millet Energy Drink", color: "from-yellow-400 to-orange-500" },
    { title: "Kids Nutrition", product: "Sprouted Ragi Choco Malt", color: "from-purple-400 to-pink-500" },
    { title: "Women's Wellness", product: "Hormonal Wellness Mix", color: "from-pink-400 to-rose-500" },
    { title: "Family Health", product: "Black Rice Choco Malt", color: "from-blue-400 to-indigo-500" },
    { title: "Natural Nourishment", product: "Palm Cube Badam Mix", color: "from-green-400 to-teal-500" },
  ];

  return (
    <section ref={ref} className="py-20 bg-[#F5EFE7] overflow-hidden">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal ${isVisible ? "animate-in" : ""}`}>
        <h2 className="text-3xl md:text-4xl text-center text-[#2D5016] mb-4 font-bold">What Are You Looking For?</h2>
        <p className="text-center text-gray-600 mb-12">Choose your wellness goal and discover the perfect product</p>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-container ${isVisible ? "animate-in" : ""}`}>
          {goals.map((goal, idx) => (
            <Card key={idx} className="group hover-lift hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden stagger-item border-0">
              <CardContent className="p-0">
                <div className={`h-40 bg-gradient-to-br ${goal.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl mb-1 font-bold">{goal.title}</h3>
                    <p className="text-sm opacity-90">{goal.product}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-0 translate-x-4">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <Link to="/wellness">
                    <Button variant="outline" className="w-full group-hover:bg-[#2D5016] group-hover:text-white transition-colors duration-300 border-[#2D5016] text-[#2D5016]">
                      View Product <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/wellness">
            <Button size="lg" className="bg-[#2D5016] hover:bg-[#3D6826] text-white px-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              View All Wellness Goals
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}function FeaturedProducts() {
  const { addToCart } = useCart();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.05 });

  const bestSellers = products.slice(0, 4);

  return (
    <section ref={ref} className="py-20 bg-white overflow-hidden">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal ${isVisible ? "animate-in" : ""}`}>
        <h2 className="text-3xl md:text-4xl text-center text-[#2E4D3E] mb-12 font-bold font-serif">Best Sellers</h2>

        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-container ${isVisible ? "animate-in" : ""}`}>
          {bestSellers.map((product) => (
            <Card key={product.id} className="group hover-lift hover:shadow-2xl transition-all duration-300 stagger-item border border-gray-100 bg-[#FDFCFA] rounded-2xl overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <Link to={`/shop/${product.id}`} className="block">
                  <div className={`w-full h-48 bg-gradient-to-br ${product.image} rounded-xl relative overflow-hidden flex items-center justify-center p-6 transition-all duration-300 group-hover:scale-[1.02] border border-gray-50`}>
                    <img 
                      src={product.imageFile} 
                      alt={product.name} 
                      className="max-h-full max-w-full object-contain drop-shadow-md"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
                  </div>
                </Link>

                <div className="space-y-2">
                  <p className="text-[10px] text-[#C5A55A] font-bold uppercase tracking-wider">{product.category}</p>
                  <Link to={`/shop/${product.id}`}>
                    <h3 className="text-lg text-[#2E4D3E] font-bold hover:text-[#C5A55A] transition-colors line-clamp-1">{product.name}</h3>
                  </Link>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-[#C5A55A] text-[#C5A55A]" : "text-gray-300"}`} />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                    </div>
                    <span className="text-lg font-bold text-[#2E4D3E]">₹{product.price}</span>
                  </div>

                  <ul className="space-y-1.5 pt-2 border-t border-gray-100">
                    {product.benefits.slice(0, 3).map((benefit, bidx) => (
                      <li key={bidx} className="flex items-start text-xs text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 text-[#2E4D3E] mr-2 mt-0.5 flex-shrink-0" />
                        <span className="truncate">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Link to={`/shop/${product.id}`} className="flex-1">
                    <Button className="w-full bg-[#2E4D3E] hover:bg-[#1D3228] text-white rounded-xl shadow-sm text-xs py-4 font-bold border-0">
                      View details
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="flex-1 rounded-xl border-[#2E4D3E] text-[#2E4D3E] hover:bg-[#2E4D3E] hover:text-white text-xs font-bold py-4 shadow-sm"
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
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const comparisons = [
    { regular: "Refined sugar", yesNative: "Natural ingredients" },
    { regular: "Artificial additives", yesNative: "Clean-label" },
    { regular: "Low fiber", yesNative: "Millet-rich" },
    { regular: "Empty calories", yesNative: "Functional nutrition" },
    { regular: "Generic formulas", yesNative: "Wellness-focused blends" },
  ];

  return (
    <section className="py-20 bg-[#2D5016] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center mb-12">Why Switch from Conventional Health Drinks?</h2>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl mb-6 text-center">Regular Health Drinks</h3>
              <div className="space-y-4">
                {comparisons.map((comp, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-red-300">
                    <div className="w-6 h-6 rounded-full bg-red-500/30 flex items-center justify-center flex-shrink-0">✗</div>
                    <span>{comp.regular}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl mb-6 text-center">YES NATIVE</h3>
              <div className="space-y-4">
                {comparisons.map((comp, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-green-300">
                    <div className="w-6 h-6 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0">✓</div>
                    <span>{comp.yesNative}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="py-20 bg-[#F5EFE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl text-[#2D5016]">From Traditional Grains to Modern Wellness</h2>
            <p className="text-lg text-gray-700">
              Rooted in the agricultural heartland of Erode and Gobichettipalayam in Tamil Nadu, Yes Native brings together generations of traditional nutrition knowledge with modern wellness science.
            </p>
            <p className="text-gray-600">
              We work directly with trusted farmers who understand the value of millets and ancient grains. Every product is a testament to our commitment to clean, functional nutrition that fits seamlessly into modern lifestyles.
            </p>
            <Link to="/about">
              <Button className="bg-[#2D5016] hover:bg-[#3D6826]">
                Read Our Story
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="h-64 bg-gradient-to-br from-[#C89D66] to-[#A67C52] rounded-2xl"></div>
            <div className="h-64 bg-gradient-to-br from-[#2D5016] to-[#3D6826] rounded-2xl mt-8"></div>
            <div className="h-64 bg-gradient-to-br from-[#E8DCC8] to-[#D4C4A8] rounded-2xl -mt-8"></div>
            <div className="h-64 bg-gradient-to-br from-[#A67C52] to-[#8B6849] rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItsMade() {
  const steps = [
    { number: "01", title: "Sourced from trusted farms", description: "Direct partnerships with quality-focused farmers" },
    { number: "02", title: "Carefully cleaned", description: "Multiple quality checks and gentle processing" },
    { number: "03", title: "Slow roasted", description: "Traditional methods to preserve nutrition" },
    { number: "04", title: "Nutritionally blended", description: "Science-backed formulations for wellness goals" },
    { number: "05", title: "Packed fresh", description: "Small batches ensure maximum freshness" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center text-[#2D5016] mb-12">How It's Made</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center space-y-3">
              <div className="text-4xl text-[#C89D66] opacity-50">{step.number}</div>
              <div className="w-16 h-16 bg-[#2D5016] rounded-full mx-auto flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-base text-[#2D5016]">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.05 });
  const testimonials = [
    { name: "Priya S.", text: "Perfect breakfast replacement. I feel energized throughout the morning!" },
    { name: "Rajesh K.", text: "My kids stopped drinking sugary health drinks. They love the taste and I love the nutrition." },
    { name: "Ananya M.", text: "Feels traditional but modern. Exactly what I was looking for." },
  ];

  return (
    <section ref={ref} className="py-20 bg-[#F5EFE7] overflow-hidden">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal ${isVisible ? "animate-in" : ""}`}>
        <h2 className="text-3xl md:text-4xl text-center text-[#2D5016] mb-12 font-bold">What Our Customers Say</h2>

        <div className={`grid md:grid-cols-3 gap-8 stagger-container ${isVisible ? "animate-in" : ""}`}>
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="bg-white hover-lift hover:shadow-2xl transition-all duration-300 stagger-item border-0">
              <CardContent className="p-6 space-y-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C89D66] text-[#C89D66]" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
                <p className="text-sm text-[#2D5016] font-semibold">— {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function LifestyleGallery() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center text-[#2D5016] mb-12">Daily Wellness Lifestyle</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="aspect-square bg-gradient-to-br from-[#C89D66] to-[#A67C52] rounded-lg hover:scale-105 transition-transform cursor-pointer"></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.05 });
  const faqs = [
    { q: "How do I consume the products?", a: "Mix 2-3 tablespoons with warm or cold milk/water. Can also be added to smoothies or porridge." },
    { q: "Are they suitable for children?", a: "Yes! Our products are designed for the whole family, with specific formulations for children's nutrition." },
    { q: "Are preservatives added?", a: "Absolutely not. We use only natural ingredients with no artificial colors, flavors, or preservatives." },
    { q: "Is refined sugar used?", a: "No. We use natural sweeteners like jaggery and dates where needed." },
    { q: "What is the shelf life?", a: "Our products have a shelf life of 6 months from the date of manufacture when stored properly." },
    { q: "How should I store the products?", a: "Store in a cool, dry place away from direct sunlight. Refrigeration is not required." },
  ];

  return (
    <section ref={ref} className="py-20 bg-[#F5EFE7] overflow-hidden">
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal ${isVisible ? "animate-in" : ""}`}>
        <h2 className="text-3xl md:text-4xl text-center text-[#2D5016] mb-12 font-bold">Frequently Asked Questions</h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="bg-white rounded-lg px-6 border-0 shadow-sm transition-all duration-300 hover:shadow-md">
              <AccordionTrigger className="text-left text-[#2D5016] hover:text-[#3D6826] font-medium py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#2D5016] to-[#3D6826] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl">Bring Traditional Wellness Back Into Everyday Life</h2>
        <p className="text-xl text-white/90">Start your journey to better health with millet-based nutrition</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/shop">
            <Button size="lg" className="bg-white text-[#2D5016] hover:bg-gray-100 px-8">
              Shop Now
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#2D5016] px-8">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
