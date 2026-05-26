import { Outlet, useLocation } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import SplashScreen from "./SplashScreen";
import { useEffect, useState } from "react";

export default function Layout() {
  const location = useLocation();
  const [animClass, setAnimClass] = useState("opacity-0");

  useEffect(() => {
    window.scrollTo(0, 0);
    setAnimClass("opacity-0");
    const frame = requestAnimationFrame(() => {
      setAnimClass("opacity-100 transition-opacity duration-500 ease-out");
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFA] dark:bg-[#0E1612] transition-colors duration-300">
      <SplashScreen />
      <Navbar />
      <main className={`flex-1 ${animClass}`}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
