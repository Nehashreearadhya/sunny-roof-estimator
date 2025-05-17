
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Sun, Menu, X, Home, User, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Check if the link is active
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Dynamic navbar styling based on scroll
  const navbarClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    scrollPosition > 50 
      ? 'py-2 glass-effect backdrop-blur-lg shadow-md'
      : 'py-4 bg-transparent'
  }`;

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <Sun className="h-6 w-6 text-solar-yellow animate-pulse-glow" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-solar-blue to-solar-green">
            Solivolve
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className={`font-medium transition-colors ${
              isActive('/') 
                ? 'text-primary font-semibold' 
                : 'hover:text-primary'
            }`}
          >
            Home
          </Link>
          <a 
            href="/#how-it-works" 
            className="font-medium hover:text-primary transition-colors"
            onClick={closeMenu}
          >
            How It Works
          </a>
          <a 
            href="/#benefits" 
            className="font-medium hover:text-primary transition-colors"
            onClick={closeMenu}
          >
            Benefits
          </a>
          <Link 
            to="/feedback" 
            className={`font-medium transition-colors ${
              isActive('/feedback') 
                ? 'text-primary font-semibold' 
                : 'hover:text-primary'
            }`}
          >
            Feedback
          </Link>
          <a 
            href="/#contact" 
            className="font-medium hover:text-primary transition-colors"
            onClick={closeMenu}
          >
            Contact
          </a>
        </div>

        <div className="hidden md:block">
          <Button className="bg-gradient-to-r from-solar-blue to-solar-green text-white">
            Get Started <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 hover:text-primary focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-effect px-4 py-4 space-y-4 shadow-lg animate-fade-in">
          <Link 
            to="/" 
            className={`block py-2 font-medium hover:text-primary transition-colors ${
              isActive('/') ? 'text-primary font-semibold' : ''
            }`}
            onClick={closeMenu}
          >
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home
            </div>
          </Link>
          <a 
            href="/#how-it-works" 
            className="block py-2 font-medium hover:text-primary transition-colors"
            onClick={closeMenu}
          >
            How It Works
          </a>
          <a 
            href="/#benefits" 
            className="block py-2 font-medium hover:text-primary transition-colors"
            onClick={closeMenu}
          >
            Benefits
          </a>
          <Link 
            to="/feedback" 
            className={`block py-2 font-medium hover:text-primary transition-colors ${
              isActive('/feedback') ? 'text-primary font-semibold' : ''
            }`}
            onClick={closeMenu}
          >
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Feedback
            </div>
          </Link>
          <a 
            href="/#contact" 
            className="block py-2 font-medium hover:text-primary transition-colors"
            onClick={closeMenu}
          >
            Contact
          </a>
          <Button className="w-full bg-gradient-to-r from-solar-blue to-solar-green text-white">
            Get Started <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
