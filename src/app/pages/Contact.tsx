import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";

export default function Contact() {
  return (
    <div className="min-h-screen pt-20">
      <HeroSection />
      <ContactForm />
      <ContactInfo />
      <Map />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#2D5016] to-[#3D6826] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl mb-6">Get In Touch</h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto">
          Have questions about our products or wellness goals? We're here to help you on your journey to better health.
        </p>
      </div>
    </section>
  );
}

function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="py-20 bg-[#F5EFE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl text-[#2D5016] mb-6">Send Us a Message</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2 text-[#2D5016]">
                    First Name *
                  </label>
                  <Input
                    required
                    placeholder="Enter your first name"
                    className="bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-[#2D5016]">
                    Last Name *
                  </label>
                  <Input
                    required
                    placeholder="Enter your last name"
                    className="bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-[#2D5016]">
                  Email Address *
                </label>
                <Input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  className="bg-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-[#2D5016]">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="bg-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-[#2D5016]">
                  Subject *
                </label>
                <Input
                  required
                  placeholder="What is your message about?"
                  className="bg-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-[#2D5016]">
                  Message *
                </label>
                <Textarea
                  required
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  className="bg-white"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#2D5016] hover:bg-[#3D6826]"
              >
                Send Message
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl text-[#2D5016] mb-6">Why Contact Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#2D5016] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="text-[#2D5016] mb-1">Product Guidance</h4>
                    <p className="text-gray-600 text-sm">
                      Not sure which product is right for your wellness goals? We'll help you choose.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#2D5016] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="text-[#2D5016] mb-1">Bulk Orders</h4>
                    <p className="text-gray-600 text-sm">
                      Looking to order for your organization or business? Let's discuss special pricing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#2D5016] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="text-[#2D5016] mb-1">Nutritional Information</h4>
                    <p className="text-gray-600 text-sm">
                      Questions about ingredients, allergens, or nutritional content? We're here to help.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#2D5016] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="text-[#2D5016] mb-1">Partnerships</h4>
                    <p className="text-gray-600 text-sm">
                      Interested in retail partnerships or collaborations? We'd love to hear from you.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-[#2D5016] to-[#3D6826] text-white">
              <CardContent className="p-6">
                <MessageCircle className="w-12 h-12 mb-4" />
                <h3 className="text-xl mb-2">Prefer WhatsApp?</h3>
                <p className="text-white/80 mb-4">
                  Chat with us directly on WhatsApp for quick responses
                </p>
                <Button className="bg-white text-[#2D5016] hover:bg-gray-100">
                  Start WhatsApp Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInfo() {
  const contactMethods = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Erode, Tamil Nadu", "Gobichettipalayam, Tamil Nadu"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 98765 43211"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@yesnative.com", "support@yesnative.com"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: Closed"],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center text-[#2D5016] mb-12">Contact Information</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, idx) => (
            <Card key={idx} className="bg-[#F5EFE7]">
              <CardContent className="p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2D5016] rounded-full">
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl text-[#2D5016]">{method.title}</h3>
                <div className="space-y-1">
                  {method.details.map((detail, didx) => (
                    <p key={didx} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Map() {
  return (
    <section className="py-20 bg-[#F5EFE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center text-[#2D5016] mb-12">Find Us</h2>
        <div className="w-full h-96 bg-gradient-to-br from-[#C89D66] to-[#A67C52] rounded-2xl flex items-center justify-center">
          <p className="text-white text-xl">Map Integration Placeholder</p>
        </div>
      </div>
    </section>
  );
}
