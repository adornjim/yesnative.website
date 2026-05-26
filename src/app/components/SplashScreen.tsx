import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Check if splash was already shown in this session
    const hasShown = sessionStorage.getItem("splash_shown");
    if (hasShown) {
      setVisible(false);
      return;
    }

    // Set timers for animations
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000); // Start fade out after 2 seconds

    const removeTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("splash_shown", "true");
    }, 2500); // Completely unmount after 2.5 seconds

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#2E4D3E] via-[#20362B] to-[#0E1612] text-white transition-opacity duration-500 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Radiant Glowing Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A55A]/15 rounded-full blur-3xl" />
      </div>

      {/* Animated Content Wrapper */}
      <div className="flex flex-col items-center space-y-6 relative z-10 text-center px-4">
        <div className="relative flex items-center justify-center p-6 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-2xl animate-[float_4s_ease-in-out_infinite]">
          <div 
            className="w-16 h-16 bg-[#C5A55A] transform rotate-12 transition-transform hover:rotate-45"
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
          <div className="absolute inset-0 border-2 border-dashed border-[#C5A55A]/30 rounded-full animate-[spin_20s_linear_infinite]" />
        </div>

        {/* Shimmering brand name */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#C5A55A] via-white to-[#C5A55A] bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite] leading-none">
            YES NATIVE
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#F3F4F0]/65 font-bold">
            Where Tradition Meets Modern Wellness
          </p>
        </div>

        {/* Traditional Millet motif loader */}
        <div className="flex items-center gap-1.5 pt-4">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C5A55A]/90 animate-[bounce_1.2s_infinite_100ms]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#C5A55A]/60 animate-[bounce_1.2s_infinite_200ms]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#C5A55A]/35 animate-[bounce_1.2s_infinite_300ms]" />
        </div>
      </div>
    </div>
  );
}
