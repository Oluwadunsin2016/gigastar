import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, ArrowLeft } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset
    console.log('Password reset for:', email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <AuthLayout 
        title="Check Your Email" 
        subtitle="We've sent password reset instructions"
        showBackButton={false}
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-green-400" />
          </div>
          
          <div className="space-y-2">
            <p className="text-gray-300">
              We've sent password reset instructions to:
            </p>
            <p className="text-white font-medium">{email}</p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                Try a different email
              </button>
              
              <Link 
                to="/login"
                className="inline-flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your email to receive reset instructions"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105"
        >
          <Send className="w-4 h-4" />
          <span>Send Reset Instructions</span>
        </button>

        <div className="text-center pt-4 border-t border-gray-700">
          <Link 
            to="/login"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;