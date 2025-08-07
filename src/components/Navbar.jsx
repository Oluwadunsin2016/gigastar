import React, { useState } from 'react';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  return (
    <nav className="relative bg-black/50 backdrop-blur-sm !border-b !border-white/20 z-50">
      {/* Top Support Bar - Desktop Only */}
      {/* <div className="hidden lg:block bg-black/30 py-2">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">GigaStar.io</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Support Center
          </a>
        </div>
      </div> */}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="text-white text-xl font-bold">GigaStar</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                Content Creator
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                Brands
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                Fans
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                Investors
              </a>
              
              {/* Resources Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-1"
                >
                  <span>Resources</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isResourcesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-700 z-50">
                    <div className="py-2">
                      <a href="#" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                        Documentation
                      </a>
                      <a href="#" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                        Blog
                      </a>
                      <a href="#" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                        Help Center
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
          <Link to="/signup" className="block w-full px-4 py-2 text-green-400 border border-green-400 rounded-lg hover:bg-green-400 hover:text-black transition-all duration-200 text-center">
          Sign Up
              </Link>
         
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 backdrop-blur-sm border-b border-gray-700">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
              Content Creators
            </a>
            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
              Brands
            </a>
            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
             Fans
            </a>
            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
              Investors
            </a>
            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
              Resources
            </a>
            
            <div className="pt-4 space-y-3">
            <Link to="/signup" className="block w-full px-4 py-2 text-green-400 border border-green-400 rounded-lg hover:bg-green-400 hover:text-black transition-all duration-200 text-center">
            Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;