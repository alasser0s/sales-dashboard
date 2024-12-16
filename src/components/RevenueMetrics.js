import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartPieIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const data = [
  { name: 'Enterprise', value: 45, growth: '+15%', amount: '$1.08M' },
  { name: 'Mid-Market', value: 30, growth: '+8%', amount: '$720K' },
  { name: 'Small Business', value: 25, growth: '+12%', amount: '$600K' },
];

const COLORS = ['#4F46E5', '#9333EA', '#EC4899'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="text-gray-600 font-medium mb-2">{data.name}</p>
        <p className="text-sm text-gray-500">Revenue: {data.amount}</p>
        <p className="text-sm text-green-600">Growth: {data.growth}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      {payload.map((entry, index) => (
        <div
          key={entry.value}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: entry.color }} />
            <div>
              <p className="text-sm font-medium text-gray-900">{entry.value}</p>
              <p className="text-xs text-gray-500">{data[index].amount}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-green-600">{data[index].growth}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function RevenueMetrics() {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="h-[400px] w-full">
      <div className="flex items-center space-x-2 mb-6">
        <ChartPieIcon className="h-6 w-6 text-indigo-600" />
        <h3 className="text-lg font-medium leading-6 text-gray-900">Revenue by Segment</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="relative">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke={activeIndex === index ? '#fff' : 'none'}
                    strokeWidth={2}
                    className="transition-all duration-200"
                    style={{
                      transform: `scale(${activeIndex === index ? 1.1 : 1})`,
                      filter: `drop-shadow(0 4px 6px rgba(0, 0, 0, ${activeIndex === index ? 0.2 : 0}))`,
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">$2.4M</p>
              <p className="text-sm text-gray-500">Total Revenue</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <CustomLegend
            payload={data.map((entry, index) => ({
              value: entry.name,
              color: COLORS[index % COLORS.length],
            }))}
          />
        </div>
      </div>
    </div>
  );
} 