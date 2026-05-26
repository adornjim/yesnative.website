import { Link } from "react-router";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Footer() {
  return (
    <footer className="bg-[#2E4D3E] dark:bg-[#0E1612] text-white border-t border-[#C5A55A]/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-bold font-serif tracking-wider text-[#C5A55A]">YES NATIVE</h3>
            <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed">
              Traditional wellness for modern living. Sourcing native millet-based functional superfoods rooted in authentic Indian traditional wisdom.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#C5A55A] transition-colors p-1 bg-white/5 rounded-lg hover:bg-white/10">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#C5A55A] transition-colors p-1 bg-white/5 rounded-lg hover:bg-white/10">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#C5A55A] transition-colors p-1 bg-white/5 rounded-lg hover:bg-white/10">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-sm uppercase tracking-wider text-[#C5A55A]">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
              <li>
                <Link to="/shop" className="hover:text-[#C5A55A] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/wellness" className="hover:text-[#C5A55A] transition-colors">
                  Wellness Goals
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#C5A55A] transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-[#C5A55A] transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-sm uppercase tracking-wider text-[#C5A55A]">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
              <li>
                <Link to="/about" className="hover:text-[#C5A55A] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C5A55A] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C5A55A] transition-colors">
                  Quality Promise
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C5A55A] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-sm uppercase tracking-wider text-[#C5A55A]">Contact Info</h4>
            <ul className="space-y-3 text-sm text-gray-300 dark:text-gray-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#C5A55A]" />
                <span>Erode & Gobichettipalayam, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#C5A55A]" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#C5A55A]" />
                <span>hello@yesnative.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-sm uppercase tracking-wider text-[#C5A55A]">Newsletter</h4>
            <p className="text-sm text-gray-300 dark:text-gray-400 mb-3">
              Subscribe for wellness tips, millet recipe benefits, and special launch offers.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#C5A55A] focus:ring-1 focus:ring-[#C5A55A]"
              />
              <Button className="bg-[#C5A55A] hover:bg-[#B5954E] text-[#2E4D3E] font-bold uppercase tracking-wider text-xs py-5 rounded-xl transition-all">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400 dark:text-gray-500">
          <p>&copy; 2026 Yes Native. All rights reserved. Traditional Wellness for Modern Living.</p>
        </div>
      </div>
    </footer>
  );
}

