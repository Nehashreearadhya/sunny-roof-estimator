
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sun, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect backdrop-blur-lg py-3 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sun className="h-6 w-6 text-solar-yellow animate-pulse-glow" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-solar-blue to-solar-green">
            SolarEstimator
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="font-medium hover:text-primary transition-colors">
            Home
          </a>
          <a href="#how-it-works" className="font-medium hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#benefits" className="font-medium hover:text-primary transition-colors">
            Benefits
          </a>
          <a href="#contact" className="font-medium hover:text-primary transition-colors">
            Contact
          </a>
        </div>

        <div className="hidden md:block">
          <Button className="bg-gradient-to-r from-solar-blue to-solar-green text-white">
            Get Started
          </Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 hover:text-primary focus:outline-none" 
          onClick={toggleMenu}
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
        <div className="md:hidden absolute top-full left-0 right-0 glass-effect px-4 py-4 space-y-4">
          <a 
            href="#home" 
            className="block py-2 font-medium hover:text-primary transition-colors"
            onClick={toggleMenu}
          >
            Home
          </a>
          <a 
            href="#how-it-works" 
            className="block py-2 font-medium hover:text-primary transition-colors"
            onClick={toggleMenu}
          >
            How It Works
          </a>
          <a 
            href="#benefits" 
            className="block py-2 font-medium hover:text-primary transition-colors"
            onClick={toggleMenu}
          >
            Benefits
          </a>
          <a 
            href="#contact" 
            className="block py-2 font-medium hover:text-primary transition-colors"
            onClick={toggleMenu}
          >
            Contact
          </a>
          <Button className="w-full bg-gradient-to-r from-solar-blue to-solar-green text-white">
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
