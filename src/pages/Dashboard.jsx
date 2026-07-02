import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Users, BarChart3, Activity, ShieldAlert } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { enrolments } = useAppContext();
  const { theme } = useTheme();

  // Cards data
  const totalToday = enrolments.length || 619000; 
  
  // Chart data
  const barData = [
    { name: 'Jan', value1: 24000, value2: 12000 },
    { name: 'Feb', value1: 37000, value2: 16000 },
    { name: 'Mar', value1: 24000, value2: 29000 },
    { name: 'Apr', value1: 13000, value2: 8000 },
    { name: 'May', value1: 24000, value2: 38000 },
    { name: 'Jun', value1: 32000, value2: 15000 },
  ];

  const pieData = [
    { name: 'High Risk', value: 2487 },
    { name: 'Medium Risk', value: 1828 },
    { name: 'Low Risk', value: 1463 },
  ];
  const COLORS = ['#064e3b', '#22c55e', '#ef4444']; 
  const darkCOLORS = ['#059669', '#34d399', '#f87171']; // Adjusted for dark mode
  const activeColors = theme === 'dark' ? darkCOLORS : COLORS;

  return (
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Dark Green */}
        <div className="glass-panel p-5 bg-brand-green border-brand-green text-white relative overflow-hidden shadow-md">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="bg-brand-lightgreen text-white text-[10px] font-bold px-2 py-1 rounded-full">+20.9%</span>
          </div>
          <p className="text-xs text-white/80 font-medium mb-1 relative z-10">Total Enrolments</p>
          <div className="flex items-baseline space-x-2 relative z-10">
            <h3 className="text-2xl font-bold">${totalToday.toLocaleString()}</h3>
            <span className="text-[9px] text-white/70 w-16 leading-tight">vs Last Month</span>
          </div>
          {/* Decorative circles */}
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full pointer-events-none" />
          <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />
        </div>

        {/* Card 2 */}
        <StatCard title="Total Reviews" value="1,000" icon={ShieldAlert} change="+10.9%" isPositive={true} />
        {/* Card 3 */}
        <StatCard title="Active Agents" value="2003.67" icon={Activity} change="-10.2%" isPositive={false} />
        {/* Card 4 */}
        <StatCard title="Total Flagged" value="3,000" icon={BarChart3} change="+20.9%" isPositive={true} />
      </div>

      {/* Charts Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
        
        {/* Bar Chart (Left - spans 2 cols) */}
        <div className="glass-panel p-6 lg:col-span-2">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-slate-100">Enrolment Habits</h2>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Track your enrolment habits</p>
            </div>
            <select className="text-xs bg-gray-50 dark:bg-crispslate-900 border border-gray-200 dark:border-crispslate-700 text-gray-600 dark:text-slate-300 rounded-md px-2 py-1 outline-none font-medium">
              <option>This year</option>
            </select>
          </div>
          
          <div className="h-[280px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={6}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 500 }} tickFormatter={(val) => `${val/1000}K`} />
                <Tooltip cursor={{ fill: theme === 'dark' ? '#1e293b' : '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: theme === 'dark' ? '#0f172a' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }} />
                <Bar dataKey="value1" fill={activeColors[0]} radius={[4, 4, 0, 0]} barSize={16} />
                <Bar dataKey="value2" fill={activeColors[1]} radius={[4, 4, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart & Stats (Right - spans 1 col) */}
        <div className="space-y-6">
          <div className="glass-panel p-6 bg-gradient-to-br from-green-50/50 to-emerald-100/30 dark:from-crispslate-800 dark:to-crispslate-800 border-green-100/50 dark:border-crispslate-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-slate-100">Risk Statistic</h2>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Track your risk levels</p>
              </div>
              <select className="text-xs bg-transparent text-gray-600 dark:text-slate-400 outline-none font-medium">
                <option>Today</option>
              </select>
            </div>

            <div className="h-[200px] w-full flex items-center justify-center relative my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={0}
                    outerRadius={90}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={activeColors[index % activeColors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 space-y-3">
              {pieData.map((item, idx) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeColors[idx] }}></div>
                    <span className="text-gray-600 dark:text-slate-300 font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-800 dark:text-slate-100">{item.value.toLocaleString()}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${idx === 2 ? 'bg-red-500 text-white' : 'bg-brand-lightgreen text-white'}`}>
                      {idx === 2 ? '-1.0%' : '+1.9%'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom right mini card (Customer Growth) */}
          <div className="glass-panel p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-sm font-bold text-gray-800 dark:text-slate-100">Regional Growth</h2>
                <p className="text-[10px] text-gray-400 mt-0.5">Track your enrolments by location</p>
              </div>
              <span className="text-[10px] text-gray-400 font-medium">Today</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              {/* Mock bubble chart */}
              <div className="relative w-24 h-24">
                <div className="absolute top-0 left-0 w-14 h-14 bg-brand-green dark:bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">87%</div>
                <div className="absolute bottom-0 right-0 w-12 h-12 bg-brand-lightgreen dark:bg-emerald-400 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm">57%</div>
                <div className="absolute bottom-1 left-2 w-9 h-9 bg-brand-green/80 dark:bg-emerald-600/80 rounded-full flex items-center justify-center text-white text-[9px] font-bold shadow-sm">37%</div>
                <div className="absolute top-1 right-1 w-7 h-7 bg-brand-lightgreen/80 dark:bg-emerald-400/80 rounded-full flex items-center justify-center text-white text-[8px] font-bold shadow-sm">17%</div>
              </div>
              <div className="space-y-3 text-[10px] font-medium text-gray-500 dark:text-slate-400 pr-2">
                 <div className="flex items-center gap-2"><span className="w-3 h-2 rounded-sm bg-brand-green dark:bg-emerald-600"></span>Lagos</div>
                 <div className="flex items-center gap-2"><span className="w-3 h-2 rounded-sm bg-brand-lightgreen dark:bg-emerald-400"></span>Abuja</div>
                 <div className="flex items-center gap-2"><span className="w-3 h-2 rounded-sm bg-blue-500"></span>Kano</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, change, isPositive }) => (
  <div className="glass-panel p-5 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 bg-gray-50 dark:bg-crispslate-900 rounded-xl flex items-center justify-center border border-gray-100 dark:border-crispslate-700">
        <Icon className="w-5 h-5 text-gray-400 dark:text-gray-300" />
      </div>
      <span className={`text-[10px] font-bold px-2 py-1 rounded-full text-white ${isPositive ? 'bg-brand-lightgreen dark:bg-emerald-500' : 'bg-red-500 dark:bg-red-400'}`}>
        {change}
      </span>
    </div>
    <p className="text-xs text-gray-500 dark:text-slate-400 font-medium mb-1">{title}</p>
    <div className="flex items-baseline space-x-2">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{value}</h3>
      <span className="text-[9px] text-gray-400 w-16 leading-tight font-medium">vs Last Month</span>
    </div>
  </div>
);

export default Dashboard;
