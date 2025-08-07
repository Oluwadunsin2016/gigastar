import React from 'react';
import { ExternalLink } from 'lucide-react';

const StatsCard = ({ className = '' }) => {
  return (
    <div className={`bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800 opacity-60 rounded-2xl p-6 lg:p-8 shadow-2xl backdrop-blur-sm ${className}`}>
      {/* Channel Drops */}
      <div className="text-center mb-8">
        <div className="text-4xl lg:text-5xl font-bold text-white mb-2">32</div>
        <div className="text-purple-200 text-sm lg:text-base font-medium tracking-wider">
          CHANNEL DROPS
        </div>
      </div>
      
      {/* Raised for Creators */}
      <div className="mb-6">
        <div className="text-2xl lg:text-3xl font-bold text-white mb-1">$6,133,701</div>
        <div className="text-purple-200 text-xs lg:text-sm font-medium tracking-wider">
          RAISED FOR CREATORS
        </div>
      </div>
      
      {/* Distributed to Investors */}
      <div className="mb-8">
        <div className="text-2xl lg:text-3xl font-bold text-white mb-1">$740,445</div>
        <div className="text-purple-200 text-xs lg:text-sm font-medium tracking-wider">
          DISTRIBUTED TO INVESTORS
        </div>
      </div>
      
      {/* Explore Drops Button */}
      <button className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105">
        <span>Explore Drops</span>
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
};

export default StatsCard;