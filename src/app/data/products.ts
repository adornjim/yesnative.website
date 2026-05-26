export interface Product {
  id: number;
  name: string;
  price: number;
  weight: string;
  category: string;
  benefits: string[];
  description: string;
  ingredients: string;
  nutrition: { label: string; value: string }[];
  image: string; // Background gradient fallback or placeholder
  imageFile: string; // The copied asset file name
  ingredientsImageFile?: string; // Suffix ingredients image if exists
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Black Rice Choco Drink Mix",
    price: 349,
    weight: "250g",
    category: "Chocolate Malts",
    benefits: [
      "Rich in Antioxidants",
      "Sustained Natural Energy",
      "Excellent for Digestion & Gut Health",
      "100% Preservative Free & Kid Approved"
    ],
    description: "A nutrient-rich functional health drink mix that marries the power of traditional Karuppu Kavuni (Black Rice) with standard rich cocoa. Deeply rooted in Indian heritage, this drink mix delivers essential dietary fiber and antioxidants to modern, active families. A perfect, clean-label daily cocoa nourishment.",
    ingredients: "Traditional Black Rice (Karuppu Kavuni), Sprouted Finger Millet (Ragi), Premium Organic Cocoa Powder, Raw Brown Sugar, Natural Cardamom.",
    nutrition: [
      { label: "Energy", value: "382 kcal" },
      { label: "Protein", value: "7.8g" },
      { label: "Carbohydrates", value: "76.0g" },
      { label: "Dietary Fiber", value: "5.6g" },
      { label: "Fat", value: "2.1g" },
      { label: "Iron", value: "3.2mg" }
    ],
    image: "from-slate-800 to-indigo-950",
    imageFile: "/images/Black Rice Choco Drink Mix.jpeg",
    ingredientsImageFile: "/images/Black Rice Choco Drink Mix Ingredients.jpeg",
    rating: 4.9,
    reviews: 198
  },
  {
    id: 2,
    name: "Sprouted Ragi Choco Malt",
    price: 299,
    weight: "250g",
    category: "Chocolate Malts",
    benefits: [
      "Extremely Rich in Calcium",
      "Easy Digestion for Toddlers & Kids",
      "Boosts Bone Density & Muscle Growth",
      "100% Sprouted Grains Bio-availability"
    ],
    description: "Our sprouted finger millet (Ragi) chocolate malt is a calcium powerhouse. Sprouting the Ragi locks in more vitamins and multiplies the bio-availability of iron and calcium while breaking down complex starches for ultra-easy digestion. A pure traditional recipe with an elegant chocolate finish.",
    ingredients: "Sprouted Finger Millet (Ragi), Sprouted Pearl Millet, Cocoa Powder, Organic Palm Jaggery, Natural Vanilla extract.",
    nutrition: [
      { label: "Energy", value: "368 kcal" },
      { label: "Calcium", value: "344mg" },
      { label: "Protein", value: "8.2g" },
      { label: "Dietary Fiber", value: "8.5g" },
      { label: "Iron", value: "4.8mg" }
    ],
    image: "from-amber-800 to-amber-950",
    imageFile: "/images/Sprouted Ragi Choco Malt.jpeg",
    ingredientsImageFile: "/images/Sprouted Ragi Choco Malt Ingredients.jpeg",
    rating: 4.8,
    reviews: 156
  },
  {
    id: 3,
    name: "Instant Millet Energy Drink (Chocolate)",
    price: 319,
    weight: "200g",
    category: "Energy Drinks",
    benefits: [
      "Instant Natural Stamina",
      "Clean Sustained Energy without sugar crash",
      "Rich in Minerals like Magnesium",
      "Highly Bio-available Sprouted Millets"
    ],
    description: "A fast-absorbing, functional energy booster formulated with premium sprouted multi-millets and high-grade cocoa. Perfect for physical workouts, busy mornings, or post-run nutrition. Provides clean complex carbohydrates that digest steadily to avoid the spikes and crashes of modern sugary energy drinks.",
    ingredients: "Sprouted Multi-Millets (Finger, Pearl, Foxtail, Kodo), Cocoa Powder, Organic Coconut Sugar, Rock Salt, Natural chocolate flavor.",
    nutrition: [
      { label: "Energy", value: "375 kcal" },
      { label: "Protein", value: "9.1g" },
      { label: "Carbohydrates", value: "78.0g" },
      { label: "Fiber", value: "6.2g" },
      { label: "Magnesium", value: "114mg" }
    ],
    image: "from-amber-600 to-amber-900",
    imageFile: "/images/Instant Millet Energy Drink Chocolate.jpeg",
    ingredientsImageFile: "/images/Instant Millet Energy Drink Chocolate Ingredients.jpeg",
    rating: 4.7,
    reviews: 92
  },
  {
    id: 4,
    name: "Instant Millet Energy Drink Mix",
    price: 299,
    weight: "200g",
    category: "Energy Drinks",
    benefits: [
      "Unsweetened Wholesome Formula",
      "Five Power Millets Blend",
      "Extremely Versatile for cooking/smoothies",
      "Slow Roasted for traditional aroma"
    ],
    description: "Our signature unsweetened energy drink mix blends five robust native millets, carefully roasted using traditional methods to preserve ancient plant nutrients. Free of any sweetening agents, it features an earthy, comforting aroma. Excellent mixed in warm milk, shakes, or stirred into breakfast porridge.",
    ingredients: "Sprouted Finger Millet, Sprouted Pearl Millet, Foxtail Millet, Little Millet, Kodo Millet, Ginger Powder, Cardamom.",
    nutrition: [
      { label: "Energy", value: "360 kcal" },
      { label: "Protein", value: "10.4g" },
      { label: "Carbohydrates", value: "72.0g" },
      { label: "Dietary Fiber", value: "9.8g" },
      { label: "Iron", value: "5.1mg" }
    ],
    image: "from-emerald-700 to-emerald-950",
    imageFile: "/images/Instant Millet Energy Drink Mix.jpeg",
    rating: 4.8,
    reviews: 134
  },
  {
    id: 5,
    name: "Instant Millet Energy Drink (Red Banana)",
    price: 329,
    weight: "200g",
    category: "Energy Drinks",
    benefits: [
      "Natural Red Banana Potassium",
      "Excellent Heart & Muscle Health Support",
      "Rich Fruity Aroma & Traditional Recipe",
      "Highly Digestive Sprouted Millets Base"
    ],
    description: "A gorgeous, traditional nutrient blend that infuses authentic Red Banana powder with sprouted millets. Sourced from the fields of Tamil Nadu, Red Banana is widely prized for its high potassium, vitamin B6, and fiber content. It delivers a rich, naturally sweet banana taste loved by all ages.",
    ingredients: "Natural Red Banana Powder, Sprouted Finger Millet, Sprouted Sorghum, Cardamom, Organic Cane Sugar.",
    nutrition: [
      { label: "Energy", value: "378 kcal" },
      { label: "Potassium", value: "420mg" },
      { label: "Protein", value: "7.2g" },
      { label: "Dietary Fiber", value: "5.8g" },
      { label: "Vitamin B6", value: "0.6mg" }
    ],
    image: "from-rose-800 to-red-950",
    imageFile: "/images/Instant Millet Energy Drink Red Banana.jpeg",
    ingredientsImageFile: "/images/Instant Millet Energy Drink Red Banana Enriched.jpeg",
    rating: 4.9,
    reviews: 143
  },
  {
    id: 6,
    name: "Pamcube Badam Drink Mix",
    price: 379,
    weight: "200g",
    category: "Traditional Mixes",
    benefits: [
      "Real California Almond Flour base",
      "Authentic Kashmiri Saffron & Cardamom",
      "Organic cooling Palm Sugar Cubes (Panakalkandu)",
      "Supports Brain Cognition & Glowing Skin"
    ],
    description: "A luxurious royal Indian wellness mix. Made with pure premium almond flour, whole palm sugar crystals (Panakalkandu) which naturally cool the body, and genuine Kashmiri saffron threads. It offers a warm, soothing traditional badam milk experience that nourishes the brain, eyes, and skin.",
    ingredients: "Premium Ground Almonds, Organic Palm Sugar Cubes (Panakalkandu), Real Kashmiri Saffron Threads, Cardamom, Sprouted White Ragi.",
    nutrition: [
      { label: "Energy", value: "412 kcal" },
      { label: "Protein", value: "12.6g" },
      { label: "Healthy Fats", value: "14.8g" },
      { label: "Vitamin E", value: "6.8mg" },
      { label: "Iron", value: "3.9mg" }
    ],
    image: "from-yellow-600 to-amber-700",
    imageFile: "/images/Pamcube Badam Drink Mix.jpeg",
    rating: 4.7,
    reviews: 87
  }
];
