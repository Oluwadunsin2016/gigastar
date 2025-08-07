import React from 'react';

const InvestorProfiles = () => {
  // Sample investor profile images
  const investors = [
    'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
  ];

  return (
    <div className="flex items-center space-x-4">
      {/* Profile Images */}
      <div className="flex -space-x-3">
        {investors.map((imageUrl, index) => (
          <div
            key={index}
            className="relative"
          >
            <img
              src={imageUrl}
              alt={`Investor ${index + 1}`}
              className="w-12 h-12 rounded-full border-2 border-white/20 object-cover hover:scale-110 transition-transform duration-200"
            />
            {index === 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
            )}
          </div>
        ))}
      </div>
      
      {/* Stats Text */}
      <div>
        <div className="text-2xl lg:text-3xl font-bold text-white">27,277</div>
        <div className="text-gray-400 text-sm lg:text-base font-medium tracking-wider">
          INVESTOR ACCOUNTS
        </div>
      </div>
    </div>
  );
};

export default InvestorProfiles;