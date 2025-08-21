import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, showBackButton = true }) => {
  return (
    <div className='bg-red-500 min-h-screen'>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">

      <div className="relative z-10 w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          {showBackButton && (
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          )}
          
          {/* Logo */}
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-white text-2xl font-bold">GigaStar</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          {subtitle && (
            <p className="text-gray-400 text-lg">{subtitle}</p>
          )}
        </div>

        {/* Auth Form Container */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AuthLayout;