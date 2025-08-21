import { Button, useDisclosure, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react'
import { Plus, TrendingUp, Users, BarChart3, Calendar, Target, DollarSign, Eye, Clock, CheckCircle } from 'lucide-react'
import React from 'react'
import RequestMakingDrawer from '../components/RequestMakingDrawer';

const Request = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  // Sample data for metrics
  const metricsData = [
    { title: 'Pending', value: 8, icon: Clock, color: 'bg-yellow-500', textColor: 'text-yellow-500' },
    { title: 'Under Review', value: 3, icon: Eye, color: 'bg-blue-500', textColor: 'text-blue-500' },
    { title: 'Live Product', value: 5, icon: CheckCircle, color: 'bg-green-500', textColor: 'text-green-500' },
    { title: 'Total Engagement', value: '1.2M', icon: TrendingUp, color: 'bg-purple-500', textColor: 'text-purple-500' }
  ];

  // Sample table data
  const tableData = [
    { id: 1, campaign: 'Summer Collection Launch', status: 'Pending', engagement: '250K', budget: '$5,000', duration: '30 days', target: 'Women 18-35' },
    { id: 2, campaign: 'Product Awareness Campaign', status: 'Under Review', engagement: '120K', budget: '$3,500', duration: '21 days', target: 'Tech Enthusiasts' },
    { id: 3, campaign: 'Holiday Sales Promotion', status: 'Live', engagement: '450K', budget: '$8,000', duration: '45 days', target: 'General Audience' },
    { id: 4, campaign: 'Brand Ambassador Program', status: 'Pending', engagement: '75K', budget: '$10,000', duration: '60 days', target: 'Influencers' },
    { id: 5, campaign: 'Social Media Challenge', status: 'Live', engagement: '890K', budget: '$6,500', duration: '14 days', target: 'Youth 16-25' },
    { id: 6, campaign: 'Product Testing Initiative', status: 'Under Review', engagement: '60K', budget: '$2,000', duration: '30 days', target: 'Early Adopters' }
  ];

  // Sample chart data
  const engagementData = [
    { name: 'Summer Collection', value: 250 },
    { name: 'Product Awareness', value: 120 },
    { name: 'Holiday Sales', value: 450 },
    { name: 'Ambassador Program', value: 75 },
    { name: 'Social Challenge', value: 890 },
    { name: 'Product Testing', value: 60 }
  ];

  const statusData = [
    { name: 'Pending', value: 8, color: '#eab308' },
    { name: 'Under Review', value: 3, color: '#3b82f6' },
    { name: 'Live', value: 5, color: '#22c55e' }
  ];

  // Function to get status badge style
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      case 'Live':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Simple bar chart component
  const BarChart = ({ data, title, height = 200 }) => {
    const maxValue = Math.max(...data.map(item => item.value));
    
    return (
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
        <h3 className="font-semibold text-white mb-4">{title}</h3>
        <div className="space-y-2" style={{ height: `${height}px` }}>
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-32 text-sm text-gray-400 truncate">{item.name}</div>
              <div className="flex-1 ml-2">
                <div 
                  className="h-6 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                >
                  <div className="text-xs text-white flex items-center justify-end h-full px-2">
                    {item.value}K
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Simple pie chart component
  const PieChart = ({ data, title }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let accumulatedPercent = 0;
    
    return (
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
        <h3 className="font-semibold text-white mb-4">{title}</h3>
        <div className="flex items-center">
          <div className="relative w-32 h-32 mr-4">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {data.map((item, index) => {
                const percent = (item.value / total) * 100;
                const startPercent = accumulatedPercent;
                accumulatedPercent += percent;
                
                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="10"
                    strokeDasharray={`${percent} ${100 - percent}`}
                    strokeDashoffset={-startPercent}
                    transform="rotate(-90 50 50)"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold">{total}</span>
            </div>
          </div>
          <div className="space-y-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-400">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className='flex items-center justify-between mb-6'>
        <h2 className="text-xl md:text-2xl font-bold">Requests</h2>
        <Button 
          onPress={onOpen} 
          size='sm' 
          startContent={<Plus size={16} />} 
          className='rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors'
        >
          Make request
        </Button>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metricsData.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-800 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{metric.title}</p>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                </div>
                <div className={`p-3 rounded-full ${metric.color} bg-opacity-10`}>
                  <Icon className={`w-6 h-6 ${metric.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BarChart data={engagementData} title="Engagement by Campaign (K)" />
        <PieChart data={statusData} title="Request Status Distribution" />
      </div>

      {/* Requests Table */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <h3 className="font-semibold text-white">Campaign Requests</h3>
        </div>
        <Table removeWrapper aria-label="Campaign requests table">
          <TableHeader className='bg-slate-800 text-white' >
            <TableColumn>CAMPAIGN</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>ENGAGEMENT</TableColumn>
            <TableColumn>BUDGET</TableColumn>
            <TableColumn>DURATION</TableColumn>
            <TableColumn>TARGET AUDIENCE</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {tableData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">{item.campaign}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <BarChart3 className="w-4 h-4 mr-1 text-blue-400" />
                    <span>{item.engagement}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-green-400" />
                    <span>{item.budget}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-yellow-400" />
                    <span>{item.duration}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1 text-purple-400" />
                    <span>{item.target}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="light" className="text-blue-500">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <RequestMakingDrawer onOpenChange={onOpenChange} isOpen={isOpen} />
    </div>
  );
}

export default Request;