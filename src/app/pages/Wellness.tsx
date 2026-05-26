import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Heart, Zap, Baby, Users, Scale, Sparkles, CheckCircle, ArrowRight, ShieldCheck, HelpCircle, X, ShoppingCart, Info, RotateCcw } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useCart } from "../context/CartContext";
import { products, Product } from "../data/products";
import { toast } from "sonner";

export default function Wellness() {
  const [selectedGoal, setSelectedGoal] = useState<string>("all");
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [quizStep, setQuizStep] = useState<number>(1);
  
  // Quiz Answers State
  const [quizAnswers, setQuizAnswers] = useState({
    priority: "", // energy, family, royal
    taste: "",    // chocolate, natural, badam
    focus: ""     // diabetic, calcium, antioxidant
  });
  
  // Recommended Quiz Product match
  const [quizMatch, setQuizMatch] = useState<Product | null>(null);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  const handleGoalSelect = (goalValue: string) => {
    setSelectedGoal(goalValue);
    // Smooth scroll to the products grid
    setTimeout(() => {
      const element = document.getElementById("wellness-products-grid");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleResetFilters = () => {
    setSelectedGoal("all");
  };

  // Run matching algorithm for Quiz
  const calculateQuizMatch = () => {
    const { priority, taste, focus } = quizAnswers;
    let match: Product = products[0]; // Fallback to Black Rice

    if (priority === "royal" || taste === "badam") {
      // Pamcube Badam
      match = products.find(p => p.id === 6) || products[5];
    } else if (priority === "energy") {
      if (focus === "diabetic" || taste === "natural") {
        // Instant Millet Energy Drink Mix (Unsweetened)
        match = products.find(p => p.id === 4) || products[3];
      } else if (taste === "chocolate") {
        // Instant Millet Energy Drink Chocolate
        match = products.find(p => p.id === 3) || products[2];
      } else {
        // Instant Millet Energy Drink Red Banana
        match = products.find(p => p.id === 5) || products[4];
      }
    } else if (priority === "family") {
      if (focus === "calcium" || taste === "chocolate") {
        // Sprouted Ragi Choco Malt
        match = products.find(p => p.id === 2) || products[1];
      } else {
        // Black Rice Choco Drink Mix
        match = products.find(p => p.id === 1) || products[0];
      }
    }

    setQuizMatch(match);
    setQuizStep(4); // Go to results step
  };

  const handleResetQuiz = () => {
    setQuizStep(1);
    setQuizAnswers({ priority: "", taste: "", focus: "" });
    setQuizMatch(null);
  };

  return (
    <div className="w-full bg-[#FDFCFA] dark:bg-[#0E1612] transition-colors duration-300">
      <HeroSection onTakeQuiz={() => setIsQuizOpen(true)} onExplore={() => handleGoalSelect("all")} />
      
      <WellnessCategories onSelectGoal={handleGoalSelect} activeGoal={selectedGoal} />
      
      {/* Dynamic Products Grid Section */}
      <ProductsSection 
        selectedGoal={selectedGoal} 
        onReset={handleResetFilters}
      />
      
      <WhyChooseWellness />
      <HowItWorks />
      <WellnessTips />
      <CallToAction onTakeQuiz={() => setIsQuizOpen(true)} />

      {/* Dynamic Quiz Modal */}
      {isQuizOpen && (
        <QuizModal 
          step={quizStep}
          answers={quizAnswers}
          match={quizMatch}
          setStep={setQuizStep}
          setAnswers={setQuizAnswers}
          onClose={() => setIsQuizOpen(false)}
          onCalculate={calculateQuizMatch}
          onReset={handleResetQuiz}
        />
      )}
    </div>
  );
}

/* HERO SECTION */
function HeroSection({ onTakeQuiz, onExplore }: { onTakeQuiz: () => void; onExplore: () => void }) {
  return (
    <section className="relative py-28 bg-gradient-to-br from-[#2E4D3E] via-[#20362B] to-[#14231B] text-white mt-20 overflow-hidden">
      {/* Decorative backdrop blobs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#C5A55A]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <span className="text-[#C5A55A] uppercase tracking-wider text-xs font-semibold px-3 py-1 bg-white/10 rounded-full backdrop-blur-md">
          Wellness Hub Quiz & Finder
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif max-w-4xl mx-auto leading-tight">
          Find Your Perfect Wellness Solution
        </h1>
        <p className="text-lg md:text-xl text-[#F3F4F0]/80 max-w-2xl mx-auto leading-relaxed">
          Every body has unique nutrition priorities. Complete our interactive quiz or select your goal to receive matching millet-based traditional recommendations.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button 
            onClick={onExplore}
            size="lg" 
            className="bg-[#C5A55A] hover:bg-white text-[#0E1612] px-8 py-6 rounded-xl font-bold transition-all hover:scale-102 hover:shadow-lg shadow-none"
          >
            Explore Catalog
          </Button>
          <Button 
            onClick={onTakeQuiz}
            size="lg" 
            variant="outline" 
            className="border-[#C5A55A] text-[#C5A55A] hover:bg-[#C5A55A] hover:text-[#0E1612] px-8 py-6 rounded-xl font-bold transition-all hover:scale-102 hover:shadow-lg shadow-none"
          >
            <HelpCircle className="w-5 h-5 mr-2" /> Take Wellness Quiz
          </Button>
        </div>
      </div>
    </section>
  );
}

/* WELLNESS CATEGORIES (GOAL CHOICE CARDS) */
interface GoalCategory {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
  count: number;
}

function WellnessCategories({ onSelectGoal, activeGoal }: { onSelectGoal: (goal: string) => void; activeGoal: string }) {
  const categories: GoalCategory[] = [
    {
      id: "Weight Management",
      icon: Scale,
      title: "Weight Management",
      description: "Unsweetened, highly fibrous power-millet blends for natural satiety, low GI, and sugar control.",
      color: "from-orange-400 to-red-500",
      count: 1,
    },
    {
      id: "Daily Energy",
      icon: Zap,
      title: "Daily Energy",
      description: "Clean complex carbohydrates providing high, sustained physical stamina without sugar spikes.",
      color: "from-yellow-400 to-amber-500",
      count: 3,
    },
    {
      id: "Kids Nutrition",
      icon: Baby,
      title: "Kids Nutrition",
      description: "Calcium-rich sprouted grains blended with chocolate that kids love and parents approve.",
      color: "from-purple-400 to-pink-500",
      count: 2,
    },
    {
      id: "Women's Wellness",
      icon: Heart,
      title: "Women's Wellness",
      description: "Sprouted millet mixes packed with natural iron, potassium, and calcium for holistic balance.",
      color: "from-pink-400 to-rose-500",
      count: 2,
    },
    {
      id: "Family Health",
      icon: Users,
      title: "Family Health",
      description: "Complete organic plant-based nutrition mixes providing trace minerals for all age brackets.",
      color: "from-blue-400 to-indigo-500",
      count: 3,
    },
    {
      id: "Natural Nourishment",
      icon: Sparkles,
      title: "Natural Nourishment",
      description: "Pure almonds, genuine Kashmiri saffron, and organic cooling palm sugar crystals.",
      color: "from-green-400 to-emerald-500",
      count: 1,
    },
  ];

  return (
    <section className="py-20 bg-[#F3F4F0]/40 dark:bg-[#15221B]/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl text-[#2E4D3E] dark:text-[#C5A55A] font-bold font-serif">
            Choose Your Wellness Goal
          </h2>
          <p className="text-gray-500 text-sm">
            Select a category card below to see custom product recommendations dynamically tailored to support your wellness journey.
          </p>
        </div>

        {/* Categories Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            const active = activeGoal === category.id;
            return (
              <Card
                key={category.id}
                onClick={() => onSelectGoal(category.id)}
                className={`group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-2 rounded-3xl bg-white dark:bg-[#15221B] ${
                  active 
                    ? "border-[#C5A55A] ring-4 ring-[#C5A55A]/5 scale-102" 
                    : "border-transparent hover:border-[#C5A55A]/40"
                }`}
              >
                <CardContent className="p-0">
                  <div className={`h-32 bg-gradient-to-br ${category.color} relative p-6 flex items-end justify-between text-white`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                    <Icon className="w-14 h-14 relative z-10" />
                    <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold relative z-10">
                      {category.count} {category.count === 1 ? 'Product' : 'Products'}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl text-[#2E4D3E] dark:text-[#FDFCFA] font-bold font-serif">{category.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{category.description}</p>
                    <Button
                      variant="ghost"
                      className={`w-full group-hover:bg-[#2E4D3E] group-hover:text-white dark:group-hover:bg-[#C5A55A] dark:group-hover:text-[#0E1612] py-5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
                        active ? "bg-[#2E4D3E] text-white dark:bg-[#C5A55A] dark:text-[#0E1612]" : "text-[#2E4D3E] dark:text-[#C5A55A] bg-[#2E4D3E]/5"
                      }`}
                    >
                      <span>{active ? "Currently Selected" : "Select & View Matches"}</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* SECTION 3: PRODUCTS DISPLAY WITH DYNAMIC GOALS FILTERING */
function ProductsSection({ selectedGoal, onReset }: { selectedGoal: string; onReset: () => void }) {
  const { addToCart } = useCart();
  
  // Custom logic to filter products based on active wellness goal category
  const getFilteredProducts = () => {
    if (selectedGoal === "all") return products;
    
    switch (selectedGoal) {
      case "Weight Management":
        // Instant Millet Energy Drink Mix (Unsweetened, high fiber)
        return products.filter(p => p.id === 4);
      case "Daily Energy":
        // Instant Millet Energy Drink Chocolate, Mix, Red Banana
        return products.filter(p => p.category === "Energy Drinks");
      case "Kids Nutrition":
        // Sprouted Ragi Choco Malt, Black Rice Choco Drink Mix
        return products.filter(p => p.id === 2 || p.id === 1);
      case "Women's Wellness":
        // Sprouted Ragi Choco Malt (Calcium powerhouse), Black Rice (Iron/Antioxidant)
        return products.filter(p => p.id === 2 || p.id === 1);
      case "Family Health":
        // Black Rice, Sprouted Ragi, Pamcube Badam
        return products.filter(p => p.id === 1 || p.id === 2 || p.id === 6);
      case "Natural Nourishment":
        // Pamcube Badam Mix
        return products.filter(p => p.id === 6);
      default:
        return products;
    }
  };

  const filteredList = getFilteredProducts();

  return (
    <section id="wellness-products-grid" className="py-20 bg-white dark:bg-[#0E1612] scroll-mt-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Active Filter Headline banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-100 dark:border-[#1E3026] pb-6 mb-10">
          <div>
            <span className="text-[10px] text-[#C5A55A] font-bold uppercase tracking-widest block mb-1">Wellness Goal matches</span>
            <h3 className="text-2xl sm:text-3xl text-[#2E4D3E] dark:text-[#C5A55A] font-bold font-serif">
              {selectedGoal === "all" ? "All Wellness Catalog Products" : `Recommended Superfoods for: ${selectedGoal}`}
            </h3>
          </div>
          {selectedGoal !== "all" && (
            <button 
              onClick={onReset}
              className="text-xs font-bold text-[#C5A55A] hover:text-[#2E4D3E] dark:hover:text-white uppercase tracking-widest flex items-center gap-1.5 border border-dashed border-[#C5A55A]/50 px-4 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1B2921]/30 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> View All Products
            </button>
          )}
        </div>

        {/* Dynamic Catalog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredList.map((product) => (
            <Card key={product.id} className="group border border-gray-100 dark:border-[#1E3026] hover:shadow-xl hover:border-gray-200 dark:hover:border-[#2E4D3E]/40 transition-all duration-300 bg-white dark:bg-[#15221B] rounded-3xl overflow-hidden relative flex flex-col justify-between">
              <CardContent className="p-6 space-y-4">
                
                <Link to={`/shop/${product.id}`} className="block">
                  <div className={`w-full h-44 bg-gradient-to-br ${product.image} rounded-2xl p-4 flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:scale-102`}>
                    <img src={product.imageFile} alt={product.name} className="max-h-full max-w-full object-contain drop-shadow-md" />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                  </div>
                </Link>

                <div className="space-y-2">
                  <span className="text-[10px] text-[#C5A55A] font-bold uppercase tracking-wider">{product.category}</span>
                  <Link to={`/shop/${product.id}`} className="block">
                    <h4 className="text-base font-bold text-[#2E4D3E] dark:text-[#FDFCFA] hover:text-[#C5A55A] transition-colors leading-snug line-clamp-1">{product.name}</h4>
                  </Link>
                  
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-xl font-extrabold text-[#2E4D3E] dark:text-[#C5A55A]">₹{product.price}</span>
                    <span className="text-[10px] text-gray-500 font-medium">/ {product.weight}</span>
                  </div>

                  <ul className="space-y-1 pt-1.5 border-t border-gray-50 dark:border-[#1B2921]">
                    {product.benefits.slice(0, 2).map((benefit, bidx) => (
                      <li key={bidx} className="flex items-start text-[11px] text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-3.5 h-3.5 text-[#2E4D3E] dark:text-[#C5A55A] mr-1.5 mt-0.5 flex-shrink-0" />
                        <span className="truncate">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link to={`/shop/${product.id}`} className="flex-1">
                    <Button className="w-full bg-[#2E4D3E]/10 hover:bg-[#2E4D3E] text-[#2E4D3E] hover:text-white rounded-xl text-xs py-3 border-0 transition-colors dark:bg-[#C5A55A]/10 dark:text-[#C5A55A] dark:hover:bg-[#C5A55A] dark:hover:text-[#0E1612]">
                      Details
                    </Button>
                  </Link>
                  <Button
                    className="flex-1 bg-[#2E4D3E] hover:bg-[#1D3228] text-white rounded-xl text-xs py-3 shadow-sm dark:bg-[#C5A55A] dark:text-[#0E1612]"
                    onClick={() => {
                      addToCart(product);
                      toast.success(`${product.name} added to cart!`);
                    }}
                  >
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

/* SECTION 4: WHY CHOOSE WELLNESS NUTRITION */
function WhyChooseWellness() {
  const reasons = [
    {
      title: "Personalized Nutrition",
      description: "Products formulated for specific health goals, not one-size-fits-all",
      icon: "🎯",
    },
    {
      title: "Scientifically Backed",
      description: "Each blend is designed based on nutritional science and Ayurvedic principles",
      icon: "🔬",
    },
    {
      title: "Natural Ingredients",
      description: "Millet-based formulations with no artificial additives or preservatives",
      icon: "🌾",
    },
    {
      title: "Proven Results",
      description: "Thousands of satisfied customers achieving their wellness goals",
      icon: "⭐",
    },
  ];

  return (
    <section className="py-20 bg-[#2E4D3E] text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center mb-12 font-bold font-serif text-[#C5A55A]">
          Why Choose Wellness-Focused Nutrition?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, idx) => (
            <div key={idx} className="text-center space-y-4 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:scale-102 transition-transform">
              <div className="text-5xl mb-4">{reason.icon}</div>
              <h3 className="text-xl font-bold font-serif text-[#C5A55A]">{reason.title}</h3>
              <p className="text-white/80 text-xs leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* SECTION 5: HOW IT WORKS */
function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Identify Your Goal",
      description: "Choose the wellness category that matches your needs",
    },
    {
      number: "2",
      title: "Explore Products",
      description: "Browse products specifically designed for your goal",
    },
    {
      number: "3",
      title: "Start Your Journey",
      description: "Incorporate into your daily routine consistently",
    },
    {
      number: "4",
      title: "Track Progress",
      description: "Monitor your wellness improvements over time",
    },
  ];

  return (
    <section className="py-20 bg-[#FDFCFA] dark:bg-[#0E1612] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center text-[#2E4D3E] dark:text-[#C5A55A] mb-12 font-bold font-serif">
          How It Works
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="text-center space-y-4 relative z-10">
                <div className="w-16 h-16 bg-[#2E4D3E] dark:bg-[#C5A55A] rounded-full mx-auto flex items-center justify-center text-white dark:text-[#0E1612] text-2xl font-bold shadow-md">
                  {step.number}
                </div>
                <h3 className="text-lg text-[#2E4D3E] dark:text-[#FDFCFA] font-bold font-serif">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{step.description}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-[#C5A55A]/30 z-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* SECTION 6: WELLNESS TIPS SUCCESS */
function WellnessTips() {
  const tips = [
    {
      title: "Consistency is Key",
      description: "For best results, incorporate our slow-roasted millet drink mixes into your daily morning routine for at least 3-4 weeks to allow complex fibers to settle.",
    },
    {
      title: "Balanced Diet",
      description: "Combine your Superfoods with a balanced diet rich in whole foods, green vegetables, and local organic traditional grains.",
    },
    {
      title: "Stay Hydrated",
      description: "Drink plenty of water throughout the day. Millets absorb water beautifully and natural fibers thrive on excellent hydration levels.",
    },
    {
      title: "Listen to Your Body",
      description: "Pay attention to how your body responds (increased stamina, lighter digestion, better satiety) and adjust your intake accordingly.",
    },
  ];

  return (
    <section className="py-20 bg-[#F3F4F0]/40 dark:bg-[#15221B]/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center text-[#2E4D3E] dark:text-[#C5A55A] mb-12 font-bold font-serif">
          Wellness Tips for Success
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {tips.map((tip, idx) => (
            <Card key={idx} className="bg-white dark:bg-[#15221B] border border-gray-100 dark:border-[#1E3026] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-base text-[#2E4D3E] dark:text-[#C5A55A] font-bold font-serif mb-2">{tip.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* SECTION 7: FINAL CALL TO ACTION */
function CallToAction({ onTakeQuiz }: { onTakeQuiz: () => void }) {
  return (
    <section className="py-20 bg-gradient-to-br from-[#C5A55A] to-[#A68339] text-[#0E1612] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight">
          Ready to Start Your Wellness Journey?
        </h2>
        <p className="text-lg md:text-xl text-[#0E1612]/80 max-w-2xl mx-auto leading-relaxed">
          Complete our smart interactive wellness quiz to receive immediate custom product matches based on your unique health profile.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            onClick={onTakeQuiz}
            size="lg" 
            className="bg-[#2E4D3E] hover:bg-[#1D3228] text-white px-8 py-6 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
          >
            Take Wellness Quiz
          </Button>
          <Link to="/shop">
            <Button size="lg" variant="outline" className="border-[#2E4D3E] text-[#2E4D3E] hover:bg-[#2E4D3E] hover:text-white px-8 py-6 rounded-xl font-bold transition-all">
              Browse All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* INTERACTIVE QUIZ DIALOG MODAL COMPONENT */
interface QuizModalProps {
  step: number;
  answers: { priority: string; taste: string; focus: string };
  match: Product | null;
  setStep: (s: number) => void;
  setAnswers: React.Dispatch<React.SetStateAction<{ priority: string; taste: string; focus: string }>>;
  onClose: () => void;
  onCalculate: () => void;
  onReset: () => void;
}

function QuizModal({
  step,
  answers,
  match,
  setStep,
  setAnswers,
  onClose,
  onCalculate,
  onReset
}: QuizModalProps) {
  const { addToCart } = useCart();

  const handleSelectPriority = (val: string) => {
    setAnswers(p => ({ ...p, priority: val }));
    setStep(2);
  };

  const handleSelectTaste = (val: string) => {
    setAnswers(p => ({ ...p, taste: val }));
    setStep(3);
  };

  const handleSelectFocus = (val: string) => {
    const updated = { ...answers, focus: val };
    setAnswers(updated);
    // Proceed to calculate
    setTimeout(() => {
      // Trigger calculation
      onCalculate();
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Black backdrop overlay with click out hider */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Container */}
      <Card className="relative w-full max-w-xl bg-white dark:bg-[#15221B] border border-gray-100 dark:border-[#1E3026] rounded-3xl shadow-2xl z-10 overflow-hidden max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 flex flex-col justify-between">
        
        {/* Modal Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors hover:bg-gray-50 dark:hover:bg-[#1B2921] rounded-full z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 bg-[#2E4D3E] text-white relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A55A]/10 rounded-full blur-xl" />
          <h3 className="text-xl font-bold font-serif tracking-wider text-[#C5A55A]">Yes Native Wellness Quiz</h3>
          <p className="text-[11px] text-white/70 mt-1 uppercase tracking-widest font-semibold">Step {step} of 3</p>
        </div>

        {/* Modal Body */}
        <div className="p-8 flex-1 min-h-[300px] flex flex-col justify-center">
          
          {/* STEP 1: WELLNESS GOAL PRIORITY */}
          {step === 1 && (
            <div className="space-y-6 text-center animate-fadeIn">
              <h4 className="text-lg font-bold text-[#2E4D3E] dark:text-[#FDFCFA]">What is your primary wellness goal?</h4>
              <p className="text-xs text-gray-400">Select the option that matches your current health priority.</p>
              
              <div className="flex flex-col gap-3 max-w-sm mx-auto pt-2">
                {[
                  { value: "energy", label: "🏃‍♂️ Daily Energy & Active Stamina", desc: "For athletic workouts, running, or quick breakfast nutrition" },
                  { value: "family", label: "🧒 Pure Family Health & Kids Growth", desc: "Calcium, easy digestion, and child-friendly chocolate malts" },
                  { value: "royal", label: "🌿 Royal Cognition & Cooling Wellness", desc: "Brain nourishment, Kashmiri saffron, palm jaggery, skin glow" }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleSelectPriority(item.value)}
                    className="w-full text-left p-4 border border-gray-100 dark:border-[#1E3026] rounded-2xl hover:border-[#C5A55A] hover:bg-[#C5A55A]/5 dark:hover:bg-[#C5A55A]/5 transition-all space-y-1 shadow-sm bg-[#FDFCFA] dark:bg-[#1B2921]/15"
                  >
                    <span className="font-bold text-sm text-[#2E4D3E] dark:text-[#FDFCFA] block">{item.label}</span>
                    <span className="text-[10px] text-gray-500 block leading-normal">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: TASTE PROFILE PREFERENCE */}
          {step === 2 && (
            <div className="space-y-6 text-center animate-fadeIn">
              <h4 className="text-lg font-bold text-[#2E4D3E] dark:text-[#FDFCFA]">What is your preferred taste profile?</h4>
              <p className="text-xs text-gray-400">Specify what flavors bring you comfort in daily beverages.</p>

              <div className="flex flex-col gap-3 max-w-sm mx-auto pt-2">
                {[
                  { value: "chocolate", label: "🍫 Rich Wholesome Cocoa Chocolate", desc: "Deep chocolate malts made sweet with brown sugar or palm jaggery" },
                  { value: "natural", label: "🌾 Earthy, Natural, and Unsweetened", desc: "Unsweetened multi-millet complex grains slow roasted" },
                  { value: "badam", label: "🥛 Royal Almond & Real Saffron Blend", desc: "Luxurious ground almond flour, cardamoms, saffron strands" }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleSelectTaste(item.value)}
                    className="w-full text-left p-4 border border-gray-100 dark:border-[#1E3026] rounded-2xl hover:border-[#C5A55A] hover:bg-[#C5A55A]/5 dark:hover:bg-[#C5A55A]/5 transition-all space-y-1 shadow-sm bg-[#FDFCFA] dark:bg-[#1B2921]/15"
                  >
                    <span className="font-bold text-sm text-[#2E4D3E] dark:text-[#FDFCFA] block">{item.label}</span>
                    <span className="text-[10px] text-gray-500 block leading-normal">{item.desc}</span>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setStep(1)} 
                className="text-xs text-gray-400 hover:text-[#2E4D3E] font-bold block mx-auto pt-2"
              >
                ← Back to previous question
              </button>
            </div>
          )}

          {/* STEP 3: FOCUS HEALTH SPECIFICS */}
          {step === 3 && (
            <div className="space-y-6 text-center animate-fadeIn">
              <h4 className="text-lg font-bold text-[#2E4D3E] dark:text-[#FDFCFA]">Do you have a specific health focus?</h4>
              <p className="text-xs text-gray-400">Help us identify active mineral priorities for your matching recommendation.</p>

              <div className="flex flex-col gap-3 max-w-sm mx-auto pt-2">
                {[
                  { value: "diabetic", label: "🩺 Sugar Care & Low Glycemic GI", desc: "No sugar spikes, high complex fibers, slow starch release" },
                  { value: "calcium", label: "🦴 Strong Bones & Sprouted Bio-availability", desc: "Excellent calcium density, ragi millets, digestive sprouted grains" },
                  { value: "antioxidant", label: "🍇 High Antioxidants & Clean Label Detox", desc: "Karuppu Kavuni traditional black rice, iron booster" }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleSelectFocus(item.value)}
                    className="w-full text-left p-4 border border-gray-100 dark:border-[#1E3026] rounded-2xl hover:border-[#C5A55A] hover:bg-[#C5A55A]/5 dark:hover:bg-[#C5A55A]/5 transition-all space-y-1 shadow-sm bg-[#FDFCFA] dark:bg-[#1B2921]/15"
                  >
                    <span className="font-bold text-sm text-[#2E4D3E] dark:text-[#FDFCFA] block">{item.label}</span>
                    <span className="text-[10px] text-gray-500 block leading-normal">{item.desc}</span>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setStep(2)} 
                className="text-xs text-gray-400 hover:text-[#2E4D3E] font-bold block mx-auto pt-2"
              >
                ← Back to previous question
              </button>
            </div>
          )}

          {/* STEP 4: QUIZ MATCH RESULTS */}
          {step === 4 && match && (
            <div className="space-y-6 text-center animate-scaleIn">
              <div>
                <span className="text-[10px] text-[#C5A55A] font-bold uppercase tracking-widest block mb-1">Wellness Match recommendation</span>
                <h4 className="text-2xl font-serif text-[#2E4D3E] dark:text-[#C5A55A] font-bold">Your Perfect Match!</h4>
              </div>

              {/* High-Fidelity Match Card */}
              <div className="border border-gray-100 dark:border-[#1E3026] p-5 rounded-3xl bg-[#FDFCFA] dark:bg-[#1B2921]/20 flex flex-col md:flex-row gap-5 items-center max-w-md mx-auto text-left shadow-sm">
                <div className={`w-28 h-28 bg-gradient-to-br ${match.image} rounded-2xl p-2 flex items-center justify-center flex-shrink-0 border border-gray-50`}>
                  <img src={match.imageFile} alt="" className="max-h-full object-contain drop-shadow" />
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <span className="text-[9px] text-[#C5A55A] font-bold uppercase tracking-wider block">{match.category} • {match.weight}</span>
                  <h5 className="font-bold text-sm text-[#2E4D3E] dark:text-[#FDFCFA] leading-tight line-clamp-1">{match.name}</h5>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal line-clamp-2">{match.description}</p>
                  <p className="text-base font-extrabold text-[#2E4D3E] dark:text-[#C5A55A]">₹{match.price}</p>
                </div>
              </div>

              {/* Action buttons inside result */}
              <div className="flex gap-4 max-w-sm mx-auto">
                <button
                  onClick={onReset}
                  className="flex-1 bg-white border border-gray-200 dark:border-[#1E3026] dark:bg-transparent text-gray-600 dark:text-gray-400 py-3.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
                </button>
                <Link to={`/shop/${match.id}`} className="flex-1">
                  <Button 
                    onClick={onClose}
                    className="w-full bg-white hover:bg-gray-50 text-[#2E4D3E] border border-[#2E4D3E] py-5 text-xs rounded-xl font-bold shadow-sm"
                  >
                    View Details
                  </Button>
                </Link>
                <Button
                  className="flex-1 bg-[#2E4D3E] hover:bg-[#1D3228] text-white py-5 text-xs rounded-xl font-bold shadow-sm dark:bg-[#C5A55A] dark:text-[#0E1612]"
                  onClick={() => {
                    addToCart(match);
                    toast.success(`${match.name} added to cart!`);
                    onClose();
                  }}
                >
                  <ShoppingCart className="w-3.5 h-3.5 mr-1" /> Add to Cart
                </Button>
              </div>
            </div>
          )}

        </div>

      </Card>
    </div>
  );
}
