import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Search, Mail, Menu, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Basic title mapping based on route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Sales Report';
      case '/new': return 'Consumer';
      case '/review': return 'Report';
      case '/metrics': return 'Metrics';
      case '/admin': return 'Settings';
      default: return 'Overview';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-brand-bg text-brand-text dark:bg-deepblue-950 dark:text-slate-200 transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="flex-none px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-crispslate-800 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{getPageTitle()}</h1>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5 font-medium">Friday, October 12th 2025</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 bg-white dark:bg-crispslate-800 rounded-full flex items-center justify-center shadow-sm text-gray-500 dark:text-gray-400 hover:text-brand-green dark:hover:text-brand-lightgreen transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <button className="w-10 h-10 bg-white dark:bg-crispslate-800 rounded-full flex items-center justify-center shadow-sm text-gray-500 dark:text-gray-400 hover:text-brand-green dark:hover:text-brand-lightgreen transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-white dark:bg-crispslate-800 rounded-full flex items-center justify-center shadow-sm text-gray-500 dark:text-gray-400 hover:text-brand-green dark:hover:text-brand-lightgreen transition-colors relative">
              <Mail className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-crispslate-800"></span>
            </button>
            
            <div className="hidden md:flex items-center space-x-3 bg-white dark:bg-crispslate-800 px-2 py-1.5 rounded-full shadow-sm sm:ml-2 border border-gray-100 dark:border-crispslate-700/50 cursor-pointer hover:shadow-md transition-shadow">
              <div className="w-8 h-8 bg-gray-100 dark:bg-crispslate-700 rounded-full flex items-center justify-center overflow-hidden border border-gray-200 dark:border-transparent">
                <User className="w-5 h-5 text-gray-400 dark:text-gray-300 mt-1" />
              </div>
              <div className="text-sm pr-2">
                <p className="font-bold text-gray-800 dark:text-slate-200 leading-tight">Antonio Samuel</p>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Admin Officer</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto animate-fade-in h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
