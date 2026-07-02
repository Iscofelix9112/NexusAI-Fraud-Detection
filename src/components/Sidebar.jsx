import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ShieldAlert, BarChart3, Settings, HelpCircle, MessageSquare } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuSections = [
    {
      title: 'MENU',
      links: [
        { name: 'Dashboard', to: '/', icon: LayoutDashboard },
        { name: 'Report',    to: '/review', icon: ShieldAlert },
        { name: 'Consumer',  to: '/new', icon: Users },
      ]
    },
    {
      title: 'FINANCIAL',
      links: [
        { name: 'Metrics', to: '/metrics', icon: BarChart3 },
      ]
    },
    {
      title: 'TOOLS',
      links: [
        { name: 'Settings', to: '/admin', icon: Settings },
        { name: 'Feedback', to: '#', icon: MessageSquare },
        { name: 'Help',     to: '#', icon: HelpCircle },
      ]
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={clsx(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-crispslate-900 border-r border-gray-100 dark:border-crispslate-800 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center space-x-2 border-b border-transparent">
          <div className="w-auto px-3 h-8 bg-black dark:bg-white rounded-lg text-white dark:text-black font-bold flex items-center justify-center text-sm tracking-wide">boards</div>
        </div>
        
        <nav className="flex-1 py-4 px-4 overflow-y-auto space-y-6">
          {menuSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="px-4 text-[10px] font-bold text-gray-400 dark:text-slate-500 tracking-widest mb-3 uppercase">{section.title}</h3>
              <div className="space-y-1">
                {section.links.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      clsx(
                        'flex items-center space-x-3 px-4 py-2.5 rounded-full transition-all duration-200 group text-sm font-medium',
                        isActive && link.to !== '#'
                          ? 'bg-brand-green text-white shadow-md'
                          : 'text-gray-500 dark:text-slate-400 hover:text-brand-green dark:hover:text-brand-lightgreen hover:bg-gray-50 dark:hover:bg-crispslate-800'
                      )
                    }
                  >
                    <link.icon className={clsx("w-5 h-5", link.to === '#' && "opacity-50")} />
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Upgrade Pro Card */}
        <div className="p-4">
          <div className="bg-black dark:bg-crispslate-800 text-white rounded-2xl p-5 relative overflow-hidden shadow-lg border dark:border-crispslate-700/50">
            <div className="relative z-10">
              <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center mb-3">
                <span className="font-serif italic font-bold">L</span>
              </div>
              <h4 className="font-semibold text-lg mb-1">Upgrade Pro</h4>
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-4">Discover the benefit of an upgraded account</p>
              <button className="w-full bg-brand-green hover:bg-brand-green/90 text-white text-sm font-medium py-2 rounded-xl transition-colors">
                Upgrade $560
              </button>
            </div>
            {/* Background pattern */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 border border-gray-700/50 dark:border-crispslate-700 rounded-full opacity-50 pointer-events-none" />
            <div className="absolute -left-6 top-8 w-16 h-16 border border-gray-700/50 dark:border-crispslate-700 rounded-full opacity-50 pointer-events-none" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
