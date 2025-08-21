import { Search } from 'lucide-react'
import React from 'react'

const ContentCreatorHub = () => {
  return (
    <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">Content Creator Hub</h2>
    <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold">Available Creators</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search creators..." 
            className="pl-10 pr-4 py-2 border border-gray-800 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map(item => (
          <div key={item} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-gray-800 rounded-full mr-3"></div>
              <div>
                <h4 className="font-semibold">Creator Name</h4>
                <p className="text-sm text-gray-500">@username</p>
              </div>
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span>Followers: 125K</span>
              <span>Engagement: 4.8%</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Connect
            </button>
          </div>
        ))}
      </div>
  </div>
  )
}

export default ContentCreatorHub