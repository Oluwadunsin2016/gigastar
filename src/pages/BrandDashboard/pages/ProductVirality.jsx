import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const ProductVirality = () => {
  const [timeRange, setTimeRange] = useState('30d');

  // Virality metrics data
  const metricsData = [
    { title: 'Shares', value: '1.2K', change: '+12%', color: 'text-blue-600', icon: '📤' },
    { title: 'Mentions', value: '845', change: '+8%', color: 'text-green-600', icon: '💬' },
    { title: 'Engagement', value: '24.7%', change: '+3.2%', color: 'text-purple-600', icon: '👥' },
    { title: 'Virality Score', value: '7.8/10', change: '+1.2', color: 'text-orange-600', icon: '📈' }
  ];

  // Time series data for line chart
  const timeSeriesData = [
    { day: '1', shares: 800, mentions: 600, engagement: 18.5 },
    { day: '5', shares: 920, mentions: 720, engagement: 20.2 },
    { day: '10', shares: 1050, mentions: 650, engagement: 21.5 },
    { day: '15', shares: 980, mentions: 780, engagement: 22.8 },
    { day: '20', shares: 1100, mentions: 820, engagement: 23.5 },
    { day: '25', shares: 1250, mentions: 790, engagement: 24.2 },
    { day: '30', shares: 1200, mentions: 845, engagement: 24.7 }
  ];

  // Platform distribution data
  const platformData = [
    { name: 'Instagram', value: 35, color: '#E1306C' },
    { name: 'TikTok', value: 28, color: '#000000' },
    { name: 'Twitter', value: 18, color: '#1DA1F2' },
    { name: 'YouTube', value: 12, color: '#FF0000' },
    { name: 'Facebook', value: 7, color: '#4267B2' }
  ];

  // Content performance data
  const contentData = [
    { type: 'Video', engagement: 42, shares: 650 },
    { type: 'Image', engagement: 28, shares: 320 },
    { type: 'Story', engagement: 18, shares: 180 },
    { type: 'Reel', engagement: 35, shares: 540 },
    { type: 'Carousel', engagement: 22, shares: 240 }
  ];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded-lg shadow-lg">
          <p className="text-gray-400">Day {label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-white" style={{ color: entry.color }}>
              {entry.name}: {entry.value}{entry.name === 'engagement' ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom legend for charts
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex justify-center space-x-4 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-3 h-3 mr-2"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm text-gray-400">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Product Virality Analytics</h2>
        <div className="flex space-x-2 mt-4 md:mt-0">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-md text-sm ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metricsData.map((metric, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-300">{metric.title}</h3>
              <span className="text-2xl">{metric.icon}</span>
            </div>
            <div className="flex items-end justify-between">
              <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
              <p className="text-sm text-green-500">{metric.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Virality Trends Over Time</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={renderLegend} />
              <Line
                type="monotone"
                dataKey="shares"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="mentions"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Platform Distribution */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Platform Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Performance */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Content Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="type" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={renderLegend} />
                <Bar dataKey="engagement" fill="#8B5CF6" name="Engagement Rate (%)" />
                <Bar dataKey="shares" fill="#3B82F6" name="Shares" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Performing Content */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Top Performing Content</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Shares
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Reach
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {[
                { content: 'Summer Collection Reveal', platform: 'Instagram', shares: 320, engagement: '12.4%', reach: '125K' },
                { content: 'Product Tutorial', platform: 'YouTube', shares: 285, engagement: '9.8%', reach: '98K' },
                { content: 'Behind the Scenes', platform: 'TikTok', shares: 420, engagement: '15.2%', reach: '210K' },
                { content: 'Customer Testimonial', platform: 'Twitter', shares: 180, engagement: '7.3%', reach: '75K' },
                { content: 'Limited Offer', platform: 'Facebook', shares: 150, engagement: '6.5%', reach: '62K' }
              ].map((item, index) => (
                <tr key={index} className="hover:bg-gray-750">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">
                    {item.content}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                    {item.platform}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-400">
                    {item.shares}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-green-400">
                    {item.engagement}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-purple-400">
                    {item.reach}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductVirality;