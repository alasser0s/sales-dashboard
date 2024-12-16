import { useState, useEffect, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CogIcon,
  ShoppingCartIcon,
  DocumentChartBarIcon,
  UserIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  SunIcon,
  MoonIcon,
  BellIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  KeyIcon,
  PaintBrushIcon,
  GlobeAltIcon,
  BellAlertIcon,
} from '@heroicons/react/24/outline';
import DashboardStats from './components/DashboardStats';
import SalesChart from './components/SalesChart';
import TopProducts from './components/TopProducts';
import RevenueMetrics from './components/RevenueMetrics';

const navigation = [
  { 
    name: 'Dashboard', 
    icon: ChartBarIcon, 
    current: true,
    children: [] 
  },
  { 
    name: 'Sales', 
    icon: CurrencyDollarIcon, 
    current: false,
    children: [
      { name: 'Orders', icon: ShoppingCartIcon, description: 'View and manage orders' },
      { name: 'Transactions', icon: DocumentChartBarIcon, description: 'Track all transactions' },
      { name: 'Invoices', icon: DocumentChartBarIcon, description: 'Manage customer invoices' },
      { name: 'Quotations', icon: DocumentChartBarIcon, description: 'Create and track quotes' },
    ]
  },
  { 
    name: 'Customers', 
    icon: UserGroupIcon, 
    current: false,
    children: [
      { name: 'Directory', icon: UserIcon, description: 'View all customers' },
      { name: 'Companies', icon: BuildingOfficeIcon, description: 'Manage business accounts' },
      { name: 'Support', icon: PhoneIcon, description: 'Customer support cases' },
      { name: 'Feedback', icon: ChatBubbleLeftIcon, description: 'Customer reviews and feedback' },
    ]
  },
  { 
    name: 'Settings', 
    icon: CogIcon, 
    current: false,
    children: [
      { name: 'Account', icon: UserCircleIcon, description: 'Manage your account settings' },
      { name: 'Security', icon: KeyIcon, description: 'Password and authentication' },
      { name: 'Appearance', icon: PaintBrushIcon, description: 'Customize your dashboard' },
      { name: 'Notifications', icon: BellAlertIcon, description: 'Configure alert preferences' },
      { name: 'Language', icon: GlobeAltIcon, description: 'Change language and region' },
    ]
  },
];

const userNavigation = [
  { name: 'Your Profile', icon: UserCircleIcon, description: 'View and edit your profile' },
  { name: 'Settings', icon: Cog6ToothIcon, description: 'Manage your preferences' },
  { name: 'Notifications', icon: BellIcon, description: '3 unread notifications' },
  { name: 'Sign out', icon: ArrowRightOnRectangleIcon, description: 'Log out of your account' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSection = (sectionName) => {
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  const renderNavigation = (isMobile = false) => (
    <nav className={`${isMobile ? 'mt-4' : 'mt-8'} flex-1 space-y-1 px-3`}>
      {navigation.map((item) => (
        <div key={item.name}>
          <button
            onClick={() => toggleSection(item.name)}
            className={classNames(
              item.current
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-200'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white',
              'group w-full flex items-center rounded-md px-2 py-2 text-sm font-medium'
            )}
          >
            <item.icon
              className={classNames(
                item.current ? 'text-indigo-600 dark:text-indigo-200' : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300',
                'mr-3 h-6 w-6 flex-shrink-0'
              )}
            />
            <span className="flex-1 text-left">{item.name}</span>
            {item.children.length > 0 && (
              <svg
                className={classNames(
                  expandedSection === item.name ? 'rotate-90' : '',
                  'ml-3 h-5 w-5 transform transition-colors duration-150 ease-in-out'
                )}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          {item.children.length > 0 && expandedSection === item.name && (
            <div className="mt-1 space-y-1">
              {item.children.map((child) => (
                <button
                  key={child.name}
                  className="group w-full flex items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <child.icon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{child.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{child.description}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gray-50 dark:bg-gray-900`}>
      {/* Sidebar for mobile */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white dark:bg-gray-800">
          <div className="flex h-16 items-center justify-between px-4">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Sales Dashboard</span>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          {renderNavigation(true)}
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white lg:pt-4 dark:lg:bg-gray-800 dark:lg:border-gray-700">
        <div className="flex flex-shrink-0 items-center justify-between px-6">
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Sales Dashboard</span>
        </div>
        {renderNavigation()}
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden dark:border-gray-700 dark:text-gray-300"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <h1 className="text-2xl font-semibold text-gray-900 my-auto dark:text-white">Dashboard Overview</h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <button
                onClick={toggleDarkMode}
                className="rounded-full bg-gray-100 p-2 text-gray-600 hover:text-gray-900 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:hover:text-white"
              >
                {darkMode ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </button>
              <button className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none dark:bg-gray-700 dark:text-gray-300">
                <span className="sr-only">View notifications</span>
                <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center dark:bg-indigo-900">
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-200">3</span>
                </div>
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="flex rounded-full bg-indigo-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500">
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">JD</span>
                  </div>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700">
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300">Signed in as</p>
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">john.doe@example.com</p>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                              )}
                            >
                              <div className="flex items-center">
                                <item.icon className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                                <div>
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
                                </div>
                              </div>
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 pb-8">
          <div className="bg-white shadow-sm dark:bg-gray-800">
            <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
              <div className="py-6 md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center">
                    <div>
                      <div className="flex items-center">
                        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9 dark:text-white">
                          Good morning, John
                        </h1>
                      </div>
                      <dl className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
                        <dt className="sr-only">Date</dt>
                        <dd className="flex items-center text-sm text-gray-500 font-medium dark:text-gray-400">
                          {new Date().toLocaleDateString('en-US', { 
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              {/* Stats Section */}
              <div className="mb-8">
                <DashboardStats darkMode={darkMode} />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-6 dark:bg-gray-800 dark:ring-gray-700">
                  <SalesChart darkMode={darkMode} />
                </div>
                <div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-6 dark:bg-gray-800 dark:ring-gray-700">
                  <RevenueMetrics darkMode={darkMode} />
                </div>
              </div>

              {/* Products Section */}
              <div className="mt-8">
                <TopProducts darkMode={darkMode} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
