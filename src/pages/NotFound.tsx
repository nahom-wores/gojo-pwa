/**
 * 404 Not Found Page
 */

import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <div className="relative mb-8">
          <div className="text-[150px] md:text-[200px] font-display font-bold text-primary/10 leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Home className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          Oops! The property you're looking for doesn't exist or has been moved. 
          Let's get you back to finding your perfect home.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="default" className="gap-2 w-full sm:w-auto">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          <Link to="/properties">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4" />
              Browse Properties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
