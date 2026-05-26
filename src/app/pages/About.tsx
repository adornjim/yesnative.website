import { Heart, Leaf, Users, Award, Target, Sprout } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      <HeroSection />
      <OurStory />
      <OurValues />
      <OurProcess />
      <OurTeam />
      <OurCommitment />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#2D5016] to-[#3D6826] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl mb-6">About Yes Native</h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto">
          Bringing the wisdom of traditional nutrition into modern wellness through millet-based superfoods
        </p>
      </div>
    </section>
  );
}

function OurStory() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl text-[#2D5016]">Our Story</h2>
            <p className="text-lg text-gray-700">
              Yes Native was born from a simple observation: while modern health drinks promised nutrition, they were often loaded with refined sugars, artificial additives, and offered little functional benefit.
            </p>
            <p className="text-gray-600">
              Growing up in the agricultural heartland of Erode and Gobichettipalayam in Tamil Nadu, we witnessed firsthand how traditional millet-based nutrition sustained generations. Our grandmothers knew what modern science is only now confirming - that millets are nutritional powerhouses.
            </p>
            <p className="text-gray-600">
              We set out to create a brand that bridges this gap. Yes Native combines time-tested traditional recipes with modern nutritional science, creating functional wellness products that fit seamlessly into contemporary lifestyles.
            </p>
            <p className="text-gray-600">
              Every product we create honors both the farmers who grow these ancient grains and the families who trust us with their daily nutrition.
            </p>
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

function OurValues() {
  const values = [
    {
      icon: Heart,
      title: "Health First",
      description: "Every ingredient is chosen for its nutritional value and functional benefits",
    },
    {
      icon: Leaf,
      title: "Clean & Natural",
      description: "No artificial colors, flavors, or preservatives - ever",
    },
    {
      icon: Users,
      title: "Community Connection",
      description: "Direct partnerships with farmers who share our commitment to quality",
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "Small batch production ensures freshness and consistency",
    },
    {
      icon: Target,
      title: "Functional Wellness",
      description: "Products designed for specific health goals and outcomes",
    },
    {
      icon: Sprout,
      title: "Sustainable Practices",
      description: "Supporting regenerative agriculture and traditional farming methods",
    },
  ];

  return (
    <section className="py-20 bg-[#F5EFE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center text-[#2D5016] mb-12">Our Values</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, idx) => (
            <Card key={idx} className="bg-white">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-[#2D5016] rounded-full flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl text-[#2D5016]">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function OurProcess() {
  const steps = [
    {
      title: "Farmer Partnerships",
      description: "We work directly with trusted farmers in Tamil Nadu who understand the value of quality over quantity. Our relationships are built on fair pricing and mutual respect.",
    },
    {
      title: "Traditional Processing",
      description: "Millets and grains are cleaned and slow-roasted using traditional methods that preserve their nutritional integrity and enhance their natural flavors.",
    },
    {
      title: "Scientific Formulation",
      description: "Each blend is carefully formulated based on nutritional science and Ayurvedic principles to address specific wellness goals.",
    },
    {
      title: "Quality Control",
      description: "Multiple quality checks ensure that every batch meets our stringent standards for purity, nutrition, and taste.",
    },
    {
      title: "Fresh Packaging",
      description: "Small batch production means your products are packed fresh, maintaining maximum nutritional value and flavor.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center text-[#2D5016] mb-12">From Farm to Family</h2>

        <div className="space-y-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#2D5016] rounded-full flex items-center justify-center text-white text-xl">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl text-[#2D5016] mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OurTeam() {
  return (
    <section className="py-20 bg-[#F5EFE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center text-[#2D5016] mb-6">Our Team</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Yes Native is built by a team passionate about nutrition, sustainability, and making traditional wellness accessible to modern families.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Team Member 1", role: "Founder & Nutritionist" },
            { name: "Team Member 2", role: "Operations & Quality" },
            { name: "Team Member 3", role: "Farmer Relations" },
          ].map((member, idx) => (
            <Card key={idx} className="bg-white">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-32 h-32 bg-gradient-to-br from-[#C89D66] to-[#A67C52] rounded-full mx-auto"></div>
                <h3 className="text-xl text-[#2D5016]">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function OurCommitment() {
  return (
    <section className="py-20 bg-[#2D5016] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl">Our Commitment to You</h2>
        <p className="text-xl text-white/90">
          We promise to never compromise on quality, transparency, or the nutritional integrity of our products.
        </p>
        <p className="text-white/80">
          Every product that leaves our facility carries our commitment to your family's health and wellness. We believe that good nutrition should be accessible, delicious, and rooted in the wisdom of generations.
        </p>
      </div>
    </section>
  );
}
