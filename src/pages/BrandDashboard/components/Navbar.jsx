import {
    Menu,
    Search,
    Bell,
    HelpCircle,
    Settings
  } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({setSidebarOpen}) => {
  return (
    <header className="border-b bg-gray-900 backdrop-blur-sm border-gray-800">
    <div className="flex items-center justify-between px-6 py-3">
    <div className="flex-shrink-0">
              <Link to="/profile" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="hidden md:block text-white text-xl font-bold">GigaStar</span>
              </Link>
            </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-600">
          <Search className="w-5 h-5" />
        </button>
        <button className="text-gray-500 hover:text-gray-600 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
        </button>
        <button className="text-gray-500 hover:text-gray-600">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="text-gray-500 hover:text-gray-600">
          <Settings className="w-5 h-5" />
        </button>
        <button 
            onClick={() => setSidebarOpen(true)}
            className="mr-4 md:hidden text-gray-500 hover:text-gray-600"
          >
            <Menu className="w-5 h-5" />
          </button>
      </div>
    </div>
  </header>
  )
}

export default Navbar