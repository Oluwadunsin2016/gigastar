import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserDropdown = ({setIsMenuOpen}) => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
    setIsOpen(false)
  }

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between space-x-2 text-gray-300 hover:text-white transition-colors cursor-pointer w-full md:w-auto"
      >
        <div className='flex items-center space-x-2'>
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700 border-2 border-gray-600">
          {user.profileImage ? (
            <img 
              src={user.profileImage} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </div>
        <div className="md:hidden">
              <p className="text-sm capitalize font-medium text-white truncate">
                {user.fullName || user.companyName}
              </p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
     {isOpen && (
        <div className="md:hidden absolute bottom-full right-0 mb-2 w-48 bg-gray-950 rounded-lg shadow-xl border border-gray-800 z-50">
          <div className="py-2">
            <Link
              to="/profile"
              onClick={handleClose}
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="hidden md:block absolute top-full right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-700 z-50">
          <div className="py-2">
            <div className="px-4 py-2 border-b border-gray-700">
              <p className="text-sm font-medium text-white truncate">
                {user.fullName || user.companyName}
              </p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
            
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;