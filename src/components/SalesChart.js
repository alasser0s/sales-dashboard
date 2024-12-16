import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartBarIcon, CalendarIcon } from '@heroicons/react/24/outline';

const data = [
  { month: 'Jan', sales: 4000, target: 4400, profit: 2400 },
  { month: 'Feb', sales: 3000, target: 3800, profit: 1800 },
  { month: 'Mar', sales: 2000, target: 2800, profit: 1200 },
  { month: 'Apr', sales: 2780, target: 2600, profit: 1680 },
  { month: 'May', sales: 1890, target: 2400, profit: 1090 },
  { month: 'Jun', sales: 2390, target: 2800, profit: 1490 },
  { month: 'Jul', sales: 3490, target: 3200, profit: 2090 },
  { month: 'Aug', sales: 4000, target: 3800, profit: 2400 },
  { month: 'Sep', sales: 4500, target: 4000, profit: 2700 },
  { month: 'Oct', sales: 5200, target: 4600, profit: 3120 },
  { month: 'Nov', sales: 5600, target: 5000, profit: 3360 },
  { month: 'Dec', sales: 6100, target: 5400, profit: 3660 },
];

const timeRanges = [
  { name: '1M', label: 'Last Month' },
  { name: '3M', label: 'Last 3 Months' },
  { name: '6M', label: 'Last 6 Months' },
  { name: '1Y', label: 'Last Year' },
];

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 rounded-lg shadow-lg border`}>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium mb-2`}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            <span className="font-medium">{entry.name}: </span>
            ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function SalesChart({ darkMode }) {
  const [timeRange, setTimeRange] = useState('1Y');
  const [hoveredData, setHoveredData] = useState(null);

  const getFilteredData = () => {
    const months = {
      '1M': 1,
      '3M': 3,
      '6M': 6,
      '1Y': 12,
    };
    return data.slice(-months[timeRange]);
  };

  return (
    <div className="h-[500px] w-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ChartBarIcon className={`h-6 w-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
          <h3 className={`text-lg font-medium leading-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Sales Performance
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarIcon className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-1`}>
            {timeRanges.map((range) => (
              <button
                key={range.name}
                onClick={() => setTimeRange(range.name)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                  timeRange === range.name
                    ? darkMode
                      ? 'bg-gray-600 text-white'
                      : 'bg-white text-indigo-600 shadow-sm'
                    : darkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {range.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className={`${darkMode ? 'bg-indigo-900/20' : 'bg-indigo-50'} rounded-lg p-4 transform transition-all duration-200 hover:scale-105`}>
          <div className={`text-sm ${darkMode ? 'text-indigo-300' : 'text-indigo-600'} font-medium mb-1`}>
            Total Sales
          </div>
          <div className={`text-2xl font-semibold ${darkMode ? 'text-indigo-200' : 'text-indigo-900'}`}>
            ${hoveredData ? hoveredData.sales.toLocaleString() : data[data.length - 1].sales.toLocaleString()}
          </div>
        </div>
        <div className={`${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'} rounded-lg p-4 transform transition-all duration-200 hover:scale-105`}>
          <div className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-600'} font-medium mb-1`}>
            Target
          </div>
          <div className={`text-2xl font-semibold ${darkMode ? 'text-purple-200' : 'text-purple-900'}`}>
            ${hoveredData ? hoveredData.target.toLocaleString() : data[data.length - 1].target.toLocaleString()}
          </div>
        </div>
        <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-lg p-4 transform transition-all duration-200 hover:scale-105`}>
          <div className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-600'} font-medium mb-1`}>
            Profit
          </div>
          <div className={`text-2xl font-semibold ${darkMode ? 'text-green-200' : 'text-green-900'}`}>
            ${hoveredData ? hoveredData.profit.toLocaleString() : data[data.length - 1].profit.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={getFilteredData()}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            onMouseMove={(data) => {
              if (data && data.activePayload) {
                setHoveredData(data.activePayload[0].payload);
              }
            }}
            onMouseLeave={() => setHoveredData(null)}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={darkMode ? '#6366F1' : '#4F46E5'} stopOpacity={0.3} />
                <stop offset="95%" stopColor={darkMode ? '#6366F1' : '#4F46E5'} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={darkMode ? '#A855F7' : '#9333EA'} stopOpacity={0.3} />
                <stop offset="95%" stopColor={darkMode ? '#A855F7' : '#9333EA'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              className={darkMode ? 'stroke-gray-700' : 'stroke-gray-200'}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
            <Area
              type="monotone"
              dataKey="sales"
              name="Sales"
              stroke={darkMode ? '#6366F1' : '#4F46E5'}
              strokeWidth={2}
              fill="url(#salesGradient)"
              dot={{ fill: darkMode ? '#6366F1' : '#4F46E5', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: darkMode ? '#6366F1' : '#4F46E5', stroke: darkMode ? '#1F2937' : '#fff', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="target"
              name="Target"
              stroke={darkMode ? '#A855F7' : '#9333EA'}
              strokeWidth={2}
              fill="url(#targetGradient)"
              dot={{ fill: darkMode ? '#A855F7' : '#9333EA', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: darkMode ? '#A855F7' : '#9333EA', stroke: darkMode ? '#1F2937' : '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 