import { useState } from 'react';
import { ChartBarIcon, ArrowUpIcon, ArrowDownIcon, FunnelIcon } from '@heroicons/react/24/outline';

const products = [
  {
    name: 'Enterprise Suite',
    category: 'Software',
    sales: '$1.2M',
    growth: '+14.3%',
    status: 'Trending Up',
    description: 'Complete business management solution',
    icon: '💼',
  },
  {
    name: 'Business Analytics',
    category: 'Analytics',
    sales: '$840K',
    growth: '+23.1%',
    status: 'Trending Up',
    description: 'Data analytics and reporting platform',
    icon: '📊',
  },
  {
    name: 'Security Package',
    category: 'Security',
    sales: '$650K',
    growth: '+8.5%',
    status: 'Stable',
    description: 'Advanced security and protection suite',
    icon: '🔒',
  },
  {
    name: 'Cloud Storage Pro',
    category: 'Storage',
    sales: '$450K',
    growth: '-2.3%',
    status: 'Declining',
    description: 'Enterprise cloud storage solution',
    icon: '☁️',
  },
  {
    name: 'API Services',
    category: 'Development',
    sales: '$380K',
    growth: '+41.2%',
    status: 'Trending Up',
    description: 'API management and integration tools',
    icon: '🔌',
  },
];

const filters = [
  { name: 'All', value: 'all' },
  { name: 'Trending Up', value: 'trending-up' },
  { name: 'Stable', value: 'stable' },
  { name: 'Declining', value: 'declining' },
];

export default function TopProducts() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('sales'); // sales, growth, name

  const filteredProducts = products.filter((product) => {
    if (activeFilter === 'all') return true;
    return product.status.toLowerCase().replace(' ', '-') === activeFilter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'sales') {
      return parseFloat(b.sales.replace(/[^0-9.-]+/g, '')) - parseFloat(a.sales.replace(/[^0-9.-]+/g, ''));
    }
    if (sortBy === 'growth') {
      return parseFloat(b.growth) - parseFloat(a.growth);
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="bg-white shadow-lg rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-2">
            <ChartBarIcon className="h-6 w-6 text-indigo-600" />
            <h3 className="text-lg font-medium leading-6 text-gray-900">Top Products</h3>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-500">Filter by:</span>
            </div>
            <div className="flex space-x-2">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeFilter === filter.value
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-900"
                onClick={() => setSortBy('name')}
              >
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-900"
                onClick={() => setSortBy('sales')}
              >
                Sales
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-900"
                onClick={() => setSortBy('growth')}
              >
                Growth
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedProducts.map((product) => (
              <tr
                key={product.name}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-2xl bg-indigo-100 rounded-lg">
                      {product.icon}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.sales}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`inline-flex items-center text-sm ${
                      product.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {product.growth.startsWith('+') ? (
                      <ArrowUpIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 mr-1" />
                    )}
                    {product.growth}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === 'Trending Up'
                        ? 'bg-green-100 text-green-800'
                        : product.status === 'Stable'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 