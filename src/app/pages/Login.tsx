import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  
  // Google loader overlay state
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect to profile
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/profile");
    }
  }, [navigate]);

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    
    // Simulate secure Google auth handshake
    setTimeout(() => {
      const userObject = {
        name: "Adorn Jim",
        email: "adorn.jim@gmail.com",
        avatar: "https://lh3.googleusercontent.com/a/default-user", // Google user avatar placeholder
        points: 250
      };
      
      localStorage.setItem("user", JSON.stringify(userObject));
      setIsGoogleLoading(false);
      toast.success("Successfully signed in with Google!");
      
      navigate("/profile");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFE7] via-[#E8DCC8] to-[#D4C4A8] dark:from-[#0E1612] dark:via-[#15221B] dark:to-[#0B120E] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Loading Overlay */}
      {isGoogleLoading && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center text-white space-y-4 animate-fadeIn">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-[#C5A55A]/30 border-t-[#C5A55A] rounded-full animate-spin" />
            <svg className="absolute w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#C5A55A]">Connecting Google Secure Auth...</p>
          <p className="text-xs text-white/50">Please do not close this window</p>
        </div>
      )}

      <div className="max-w-md w-full relative z-10 pt-8">
        
        <Card className="bg-white/85 dark:bg-[#15221B]/90 backdrop-blur-md border border-gray-100 dark:border-[#1E3026] rounded-[2.5rem] shadow-2xl overflow-hidden">
          {/* Card Header design */}
          <div className="bg-[#2E4D3E] dark:bg-[#0E1612] py-10 px-8 text-center border-b border-gray-100/5 dark:border-[#1E3026] relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A55A]/5 rounded-full blur-3xl pointer-events-none" />
            <Link to="/" className="inline-block group mb-4">
              <div 
                className="h-16 w-16 mx-auto bg-white dark:bg-[#C5A55A] group-hover:bg-[#C5A55A] dark:group-hover:bg-white transition-all duration-300"
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
            </Link>
            <h1 className="text-2xl text-white dark:text-[#C5A55A] font-bold font-serif tracking-widest leading-none">
              YES NATIVE
            </h1>
            <p className="text-gray-300 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2">
              Where Tradition Meets Modern Wellness
            </p>
          </div>

          <CardContent className="p-10 text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-[#2E4D3E] dark:text-[#FDFCFA]">Access Your Wellness Path</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                Sign in securely with Google to track your millet nutrition orders, access quiz recommendations, and check loyalty points.
              </p>
            </div>

            {/* Google Sign In Button */}
            <div className="pt-2">
              <Button 
                variant="outline" 
                onClick={handleGoogleSignIn}
                className="w-full py-7 rounded-2xl border border-gray-200 dark:border-[#1E3026] bg-white dark:bg-[#0E1612]/50 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1B2921] font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-3 transition-all hover:scale-[1.02] duration-200"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </Button>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-[#1E3026] flex items-center justify-center gap-2 text-gray-400 dark:text-gray-500">
              <ShieldCheck className="w-4 h-4 text-[#C5A55A]" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Authorized Secure Sign-In</span>
            </div>

            <p className="text-[9px] text-gray-400 dark:text-gray-500 leading-normal max-w-xs mx-auto">
              By connecting, you agree to Yes Native's wellness terms of service and organic nutrition privacy agreements.
            </p>
          </CardContent>
        </Card>

        <p className="text-center mt-6">
          <Link to="/" className="text-[#2E4D3E] dark:text-[#C5A55A] hover:underline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
