import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Star, 
  Award, 
  Zap, 
  Eye, 
  ShoppingCart, 
  Megaphone, 
  FileText,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Search,
  Bell,
  HelpCircle,
  Settings
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

const BrandDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
 


  // const renderContent = () => {
  //   switch(activeItem) {
  //     case 'Request':
  //       return (
  //         <div className="p-6">
  //           <h2 className="text-2xl font-bold mb-6">Campaign Requests</h2>
  //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //             {[1, 2, 3, 4, 5, 6].map(item => (
  //               <div key={item} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
  //                 <h3 className="font-semibold mb-2">Campaign #{item}</h3>
  //                 <p className="text-gray-600 text-sm mb-4">Product launch - Q3 2023</p>
  //                 <div className="flex justify-between items-center">
  //                   <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Pending</span>
  //                   <button className="text-blue-600 text-sm font-medium">View Details</button>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       );
  //     case 'Product Virality':
  //       return (
  //         <div className="p-6">
  //           <h2 className="text-2xl font-bold mb-6">Product Virality Analytics</h2>
  //           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
  //             <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
  //               <p className="text-gray-500">Virality chart visualization</p>
  //             </div>
  //           </div>
  //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  //             <div className="bg-white p-4 rounded-lg shadow-md">
  //               <h3 className="font-semibold mb-2">Shares</h3>
  //               <p className="text-3xl font-bold text-blue-600">1.2K</p>
  //               <p className="text-sm text-gray-500">+12% from last week</p>
  //             </div>
  //             <div className="bg-white p-4 rounded-lg shadow-md">
  //               <h3 className="font-semibold mb-2">Mentions</h3>
  //               <p className="text-3xl font-bold text-green-600">845</p>
  //               <p className="text-sm text-gray-500">+8% from last week</p>
  //             </div>
  //             <div className="bg-white p-4 rounded-lg shadow-md">
  //               <h3 className="font-semibold mb-2">Engagement</h3>
  //               <p className="text-3xl font-bold text-purple-600">24.7%</p>
  //               <p className="text-sm text-gray-500">+3.2% from last week</p>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     case 'Content Creator Hub':
  //       return (
  //         <div className="p-6">
  //           <h2 className="text-2xl font-bold mb-6">Content Creator Hub</h2>
  //           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
  //             <div className="flex justify-between items-center mb-6">
  //               <h3 className="font-semibold">Available Creators</h3>
  //               <div className="relative">
  //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
  //                 <input 
  //                   type="text" 
  //                   placeholder="Search creators..." 
  //                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                 />
  //               </div>
  //             </div>
  //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  //               {[1, 2, 3, 4, 5, 6].map(item => (
  //                 <div key={item} className="border border-gray-200 rounded-lg p-4">
  //                   <div className="flex items-center mb-3">
  //                     <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
  //                     <div>
  //                       <h4 className="font-semibold">Creator Name</h4>
  //                       <p className="text-sm text-gray-500">@username</p>
  //                     </div>
  //                   </div>
  //                   <div className="flex justify-between text-sm mb-3">
  //                     <span>Followers: 125K</span>
  //                     <span>Engagement: 4.8%</span>
  //                   </div>
  //                   <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
  //                     Connect
  //                   </button>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     default:
  //       return (
  //         <div className="p-6">
  //           <h2 className="text-2xl font-bold mb-6">{activeItem}</h2>
  //           <div className="bg-white rounded-lg shadow-md p-6">
  //             <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
  //               <p className="text-gray-500">Content for {activeItem} will be displayed here</p>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //   }
  // };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
    <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
     <Navbar setSidebarOpen={setSidebarOpen} />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-950 text-white py-6 px-4 sm:px-6 lg:px-8">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default BrandDashboard;