import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
  // Google loader overlay state
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect to profile
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/profile");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill out all required fields.");
      return;
    }

    // Save email-password mock login
    const userObject = {
      name: isLogin ? "Adorn Jim" : name,
      email: email,
      points: 250,
      avatar: ""
    };
    
    localStorage.setItem("user", JSON.stringify(userObject));
    toast.success("Successfully logged in!");
    
    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };

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
        <div className="text-center mb-8">
          <Link to="/" className="inline-block group">
            <h1 className="text-4xl text-[#2E4D3E] dark:text-[#C5A55A] font-bold font-serif group-hover:text-[#C5A55A] transition-colors leading-none tracking-tight">
              YES NATIVE
            </h1>
          </Link>
          <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mt-2">
            {isLogin ? "Welcome back to traditional wellness" : "Start your wellness journey"}
          </p>
        </div>

        <Card className="bg-white/80 dark:bg-[#15221B]/80 backdrop-blur-md border border-gray-100 dark:border-[#1E3026] rounded-3xl shadow-xl">
          <CardContent className="p-8">
            
            {/* Login / Sign Up Tabs */}
            <div className="flex space-x-2 mb-6">
              <Button
                variant={isLogin ? "default" : "outline"}
                className={`flex-1 rounded-xl text-xs uppercase tracking-wider font-bold ${
                  isLogin 
                    ? "bg-[#2E4D3E] hover:bg-[#1D3228] text-white" 
                    : "border-gray-200 text-gray-500 hover:text-[#2E4D3E]"
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </Button>
              <Button
                variant={!isLogin ? "default" : "outline"}
                className={`flex-1 rounded-xl text-xs uppercase tracking-wider font-bold ${
                  !isLogin 
                    ? "bg-[#2E4D3E] hover:bg-[#1D3228] text-white" 
                    : "border-gray-200 text-gray-500 hover:text-[#2E4D3E]"
                }`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </Button>
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                    Full Name
                  </label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-white dark:bg-[#0E1612] border-gray-200 dark:border-[#1E3026] rounded-xl text-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="pl-10 bg-white dark:bg-[#0E1612] border-gray-200 dark:border-[#1E3026] rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5 flex justify-between">
                  <span>Password</span>
                  {isLogin && (
                    <a href="#" className="text-[10px] text-[#C5A55A] hover:underline uppercase tracking-wider font-bold">
                      Forgot?
                    </a>
                  )}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-white dark:bg-[#0E1612] border-gray-200 dark:border-[#1E3026] rounded-xl text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-[#2E4D3E] focus:ring-[#C5A55A]" />
                    <span className="text-xs text-gray-500">Remember me for 30 days</span>
                  </label>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#2E4D3E] hover:bg-[#1D3228] dark:bg-[#C5A55A] dark:text-[#0E1612] dark:hover:bg-white text-white py-6 text-sm uppercase tracking-wider font-bold rounded-xl shadow-md transition-all"
              >
                {isLogin ? "Login to Wellness" : "Create Wellness Account"}
              </Button>
            </form>

            <div className="my-6">
              <Separator className="dark:bg-[#1E3026]" />
              <div className="relative flex justify-center text-xs -mt-3">
                <span className="px-3 bg-white dark:bg-[#15221B] text-gray-400 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <Button 
              variant="outline" 
              onClick={handleGoogleSignIn}
              className="w-full py-6 rounded-xl border border-gray-200 dark:border-[#1E3026] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1B2921]/30 font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-3 transition-colors"
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
              <span>Sign in with Google</span>
            </Button>

            {!isLogin && (
              <p className="text-[10px] text-gray-400 text-center mt-6 leading-normal">
                By creating an account, you agree to Yes Native's Terms of Service and traditional wellness promises.
              </p>
            )}
          </CardContent>
        </Card>

        <p className="text-center mt-4 text-sm text-gray-500">
          <Link to="/" className="text-[#2E4D3E] dark:text-[#C5A55A] hover:underline font-bold text-xs uppercase tracking-wider">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
