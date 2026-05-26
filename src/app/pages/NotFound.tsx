import { Link } from "react-router";
import { Home, Search } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFE7] via-[#E8DCC8] to-[#D4C4A8] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-2xl">
        <div className="space-y-2">
          <h1 className="text-9xl text-[#2D5016]">404</h1>
          <h2 className="text-4xl text-[#2D5016]">Page Not Found</h2>
          <p className="text-lg text-gray-600">
            Oops! The page you're looking for seems to have wandered off the wellness path.
          </p>
        </div>

        <div className="w-64 h-64 mx-auto bg-gradient-to-br from-[#C89D66] to-[#A67C52] rounded-full flex items-center justify-center">
          <Search className="w-32 h-32 text-white/30" />
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <Link to="/">
            <Button size="lg" className="bg-[#2D5016] hover:bg-[#3D6826]">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link to="/shop">
            <Button size="lg" variant="outline" className="border-[#2D5016] text-[#2D5016] hover:bg-[#2D5016] hover:text-white">
              Browse Products
            </Button>
          </Link>
        </div>

        <div className="pt-8">
          <p className="text-sm text-gray-500">
            Looking for something specific?{" "}
            <Link to="/contact" className="text-[#2D5016] hover:text-[#3D6826] underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
