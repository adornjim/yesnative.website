import { Link, useLocation } from "react-router";
import { Search, ShoppingCart, Menu, X, Heart, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);
  const location = useLocation();
  const { getCartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    
    const checkWishlist = () => {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(stored.length);
    };

    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    checkWishlist();
    checkUser();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Wellness", path: "/wellness" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 bg-white/95 dark:bg-[#0E1612]/95 backdrop-blur-md ${
      isScrolled ? "shadow-md py-0 border-b border-gray-100 dark:border-[#1E3026]" : "shadow-sm py-2"
    }`}>
      {/* Scroll Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-[3px] bg-[#C5A55A] transition-all duration-75 z-50" 
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "h-16" : "h-20"
        }`}>
          {/* Logo Brand with Image */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div 
              className="h-10 sm:h-12 w-10 sm:w-12 bg-[#2E4D3E] dark:bg-[#C5A55A] group-hover:bg-[#C5A55A] dark:group-hover:bg-white transition-all duration-300"
              style={{
                maskImage: "url('/images/logo.png')",
                WebkitMaskImage: "url('/images/logo.png')",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center"
              }}
            />
            <span className="text-xl sm:text-2xl font-bold text-[#2E4D3E] dark:text-[#C5A55A] font-serif group-hover:text-[#C5A55A] dark:group-hover:text-white transition-colors leading-none tracking-tight">
              YES NATIVE
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors duration-300 relative text-sm uppercase tracking-wider font-bold ${
                  location.pathname === link.path
                    ? "text-[#C5A55A] nav-link-active"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#C5A55A] nav-link-underline"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Action Icons */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Wishlist Link */}
            <Link to="/profile" className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-[#2E4D3E] dark:hover:text-[#C5A55A] transition-colors">
              <Heart className="w-5.5 h-5.5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link to="/cart" className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-[#2E4D3E] dark:hover:text-[#C5A55A] transition-colors">
              <ShoppingCart className="w-5.5 h-5.5" />
              {getCartCount() > 0 && (
                <span className="absolute top-0 right-0 bg-[#C5A55A] text-[#0E1612] text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-extrabold">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Profile Link */}
            <Link to="/profile" className="flex items-center transition-colors">
              {user ? (
                <div className="flex items-center gap-2 group/avatar">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full border border-[#C5A55A]/50 group-hover/avatar:border-[#C5A55A] transition-all"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  <div className="w-8 h-8 rounded-full bg-[#2E4D3E] dark:bg-[#C5A55A] text-white dark:text-[#0E1612] flex items-center justify-center font-bold text-xs uppercase border border-white/10 shadow-sm group-hover/avatar:scale-105 transition-all">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span className="hidden lg:inline text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 group-hover/avatar:text-[#C5A55A]">
                    Hi, {user.name.split(" ")[0]}
                  </span>
                </div>
              ) : (
                <div className="p-2 text-gray-700 dark:text-gray-300 hover:text-[#2E4D3E] dark:hover:text-[#C5A55A] transition-colors flex items-center gap-1.5">
                  <User className="w-5.5 h-5.5" />
                  <span className="hidden lg:inline text-xs font-bold uppercase tracking-wider">Login</span>
                </div>
              )}
            </Link>

            {/* Shop Now Button */}
            <Link to="/shop">
              <Button className="bg-[#2E4D3E] hover:bg-[#1D3228] text-white px-5 py-5 text-sm uppercase tracking-wider font-bold rounded-xl shadow-sm dark:bg-[#C5A55A] dark:text-[#0E1612] dark:hover:bg-white transition-all">
                Shop Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden p-2 text-[#2E4D3E] dark:text-[#C5A55A]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#15221B] border-b border-gray-100 dark:border-[#1E3026] shadow-lg transition-colors">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 text-sm uppercase tracking-wider font-bold text-gray-700 dark:text-gray-300 hover:text-[#C5A55A]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <Separator className="bg-gray-100 dark:bg-[#1E3026]" />

            {/* Wishlist Mobile link */}
            <Link
              to="/profile"
              className="flex items-center justify-between py-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-[#C5A55A]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] rounded-full px-2 py-0.5 font-bold">
                  {wishlistCount} items
                </span>
              )}
            </Link>

            {/* Cart Mobile link */}
            <Link
              to="/cart"
              className="flex items-center justify-between py-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-[#C5A55A]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Cart</span>
              {getCartCount() > 0 && (
                <span className="bg-[#C5A55A] text-[#0E1612] text-[10px] rounded-full px-2.5 py-0.5 font-extrabold">
                  {getCartCount()} items
                </span>
              )}
            </Link>

            {/* Profile Mobile link */}
            <Link
              to="/profile"
              className="flex items-center justify-between py-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-[#C5A55A]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>{user ? `Hi, ${user.name}` : "My Account"}</span>
              {user ? (
                <div className="w-6 h-6 rounded-full bg-[#2E4D3E] dark:bg-[#C5A55A] text-white dark:text-[#0E1612] flex items-center justify-center font-bold text-[10px] uppercase">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
              ) : (
                <User className="w-4 h-4 text-gray-400" />
              )}
            </Link>

            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-[#2E4D3E] hover:bg-[#1D3228] text-white py-5 text-sm uppercase tracking-wider font-bold rounded-xl dark:bg-[#C5A55A] dark:text-[#0E1612]">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

