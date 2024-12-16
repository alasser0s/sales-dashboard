import { ArrowUpIcon, ArrowDownIcon, CurrencyDollarIcon, UsersIcon, ChartBarIcon, CreditCardIcon } from '@heroicons/react/24/solid';

const stats = [
  {
    name: 'Total Revenue',
    value: '$2.4M',
    change: '+12.3%',
    changeType: 'positive',
    icon: CurrencyDollarIcon,
    bgColor: 'bg-blue-500',
    trend: [65, 59, 80, 81, 56, 55, 70],
  },
  {
    name: 'Sales Volume',
    value: '12,543',
    change: '+15.1%',
    changeType: 'positive',
    icon: ChartBarIcon,
    bgColor: 'bg-purple-500',
    trend: [40, 35, 60, 75, 45, 75, 80],
  },
  {
    name: 'Conversion Rate',
    value: '24.8%',
    change: '-2.4%',
    changeType: 'negative',
    icon: UsersIcon,
    bgColor: 'bg-pink-500',
    trend: [60, 55, 48, 45, 35, 45, 40],
  },
  {
    name: 'Avg. Deal Size',
    value: '$12,234',
    change: '+8.7%',
    changeType: 'positive',
    icon: CreditCardIcon,
    bgColor: 'bg-green-500',
    trend: [45, 50, 55, 60, 65, 60, 65],
  },
];

export default function DashboardStats({ darkMode }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.name}
          className="relative overflow-hidden rounded-xl bg-white px-4 pt-5 pb-12 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 sm:px-6 sm:pt-6 dark:bg-gray-800"
        >
          <dt>
            <div className={`absolute rounded-md ${item.bgColor} p-3`}>
              <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">{item.name}</p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{item.value}</p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                item.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
            >
              {item.changeType === 'positive' ? (
                <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500 dark:text-green-400" aria-hidden="true" />
              ) : (
                <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500 dark:text-red-400" aria-hidden="true" />
              )}
              <span className="ml-1">{item.change}</span>
            </p>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6 dark:bg-gray-900/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {item.trend.map((value, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        item.changeType === 'positive' 
                          ? 'bg-green-200 dark:bg-green-900' 
                          : 'bg-red-200 dark:bg-red-900'
                      }`}
                      style={{
                        height: `${value}%`,
                        maxHeight: '24px',
                      }}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Last 7 days</div>
              </div>
            </div>
          </dd>
        </div>
      ))}
    </div>
  );
} 