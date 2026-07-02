import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, UserPlus, ShieldAlert, BarChart3, Activity, Lock } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
  const links = [
    { name: 'Overview',      to: '/',        icon: LayoutDashboard },
    { name: 'New Enrolment', to: '/new',      icon: UserPlus        },
    { name: 'Fraud Review',  to: '/review',   icon: ShieldAlert     },
    { name: 'Metrics',       to: '/metrics',  icon: BarChart3       },
  ];

  const adminLinks = [
    { name: 'Admin Panel',   to: '/admin',    icon: Lock            },
  ];

  return (
    <div className="w-64 h-screen glass border-r border-crispslate-700/50 flex flex-col">
      <div className="p-6 flex items-center space-x-3 border-b border-crispslate-700/50">
        <Activity className="text-alertemerald w-8 h-8" />
        <span className="text-xl font-bold tracking-wider text-slate-100 uppercase">
          Nexus<span className="text-alertemerald">AI</span>
        </span>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              clsx(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-deepblue-600/20 text-deepblue-400 border border-deepblue-500/30'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-crispslate-800'
              )
            }
          >
            <link.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">{link.name}</span>
          </NavLink>
        ))}

        <div className="border-t border-crispslate-700/50 my-3" />

        {adminLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              clsx(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  : 'text-slate-400 hover:text-yellow-300 hover:bg-crispslate-800'
              )
            }
          >
            <link.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">{link.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 m-4 glass-panel flex items-center space-x-3 text-sm">
        <div className="w-2 h-2 rounded-full bg-alertemerald animate-pulse"></div>
        <span className="text-slate-300">System Online</span>
      </div>
    </div>
  );
};

export default Sidebar;
