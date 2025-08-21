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
    ChevronRight,
    X,
  } from 'lucide-react';
  import { useEffect, useState } from 'react';
  import { Link, useLocation } from 'react-router-dom';
  
  const Sidebar = ({sidebarOpen, setSidebarOpen}) => {
    const [expanded, setExpanded] = useState(true);
    const [activeItem, setActiveItem] = useState('');
    const {pathname} = useLocation();
  
    useEffect(() => {
      const path = pathname.split('/').pop();
      setActiveItem(path);
    }, [pathname]);
    
    const navItems = [
      { id: 'request', label: 'Request', icon: FileText },
      { id: 'product-virality', label: 'Product Virality', icon: TrendingUp },
      { id: 'content-creator-hub', label: 'Content Creator Hub', icon: Users },
      { id: 'influencer', label: 'Influencer', icon: Star },
      { id: 'ambassador', label: 'Ambassador', icon: Award },
      { id: 'go-viral', label: 'Go Viral', icon: Zap },
      { id: 'product-awareness', label: 'Product Awareness', icon: Eye },
      { id: 'sell-product', label: 'Sell a Product/Service', icon: ShoppingCart },
      { id: 'promote-brand', label: 'Promote a Brand', icon: Megaphone },
      { id: 'post-cc-page', label: 'Post on CC Page', icon: BarChart3 }
    ];    
  
    return (
      <>
        {/* Mobile */}
        <div className={`bg-gray-900 md:hidden text-white absolute w-full h-screen flex-shrink-0 flex flex-col transition-all duration-300 z-50 ${sidebarOpen ? 'ml-0' : '-ml-[50rem]'}`}>
          <div className="p-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            {expanded && <h1 className="text-xl font-bold">Brand Dashboard</h1>}
          </div>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id}>
                    <Link
                      to={`/brand/${item.id}`}
                      onClick={() => setSidebarOpen(false)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeItem === item.id
                          ? 'bg-blue-800 text-white'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="flex-1 text-left">{item.label}</span>
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>
          
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                BD
              </div>
              <div>
                <p className="text-sm font-medium">Brand Director</p>
                <p className="text-xs text-gray-400">admin@brand.com</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Desktop */}
        <div className={`bg-gray-900 hidden text-white flex-shrink-0 md:flex flex-col transition-all duration-300 relative ${expanded ? 'w-64' : 'w-16'}`}>
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="bg-gray-800 text-white absolute top-1/2 -right-5 py-4 rounded-r-xl hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className={`size-5 transition-all duration-300 ${expanded ? "rotate-180" : "rotate-0"}`} />
          </button>
          
          <div className="p-4 flex items-center gap-2 border-b border-gray-800">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            {expanded && <h1 className="text-xl font-bold">Brand Dashboard</h1>}
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="relative group">
                    <Link
                      to={`/brand/${item.id}`}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeItem === item.id
                          ? 'bg-blue-800 text-white'
                          : 'text-gray-300 hover:bg-gray-800'
                      } ${expanded ? 'justify-start' : 'justify-center'}`}
                      title={expanded ? '' : item.label}
                    >
                      <Icon className="w-5 h-5" />
                      {expanded && <span className="ml-3 flex-1 text-left">{item.label}</span>}
                    </Link>
                    
                    {/* Tooltip for collapsed state */}
                    {!expanded && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-20">
                        {item.label}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
          
          {expanded && (
            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  BD
                </div>
                <div>
                  <p className="text-sm font-medium">Brand Director</p>
                  <p className="text-xs text-gray-400">admin@brand.com</p>
                </div>
              </div>
            </div>
          )}
          
          {!expanded && (
            <div className="p-4 border-t border-gray-800 flex justify-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                BD
              </div>
            </div>
          )}
        </div>
      </>
    );
  };
  
  export default Sidebar;