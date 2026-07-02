import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Users, ShieldAlert, Cpu, Zap, Activity, Clock } from 'lucide-react';

const Dashboard = () => {
  const { enrolments } = useAppContext();

  const totalToday = enrolments.length;
  const flagged = enrolments.filter(e => e.status === 'pending' || e.status === 'rejected').length;
  const automationRate = totalToday > 0 ? (((totalToday - flagged) / totalToday) * 100).toFixed(1) : 100;
  
  // Mock recent activity feed
  const recentActivity = [
    { id: 1, agent: 'Agent K. Smith', action: 'Captured biometric data', status: 'success', time: '2 mins ago' },
    { id: 2, agent: 'System Alert', action: 'Flagged ID mismatch', status: 'warning', time: '15 mins ago' },
    { id: 3, agent: 'Agent M. Johnson', action: 'Submitted KYC documents', status: 'success', time: '34 mins ago' },
    { id: 4, agent: 'Neural Net', action: 'Blocked anomalous IP source', status: 'danger', time: '1 hr ago' },
  ];

  // Mock bar chart data (heights in percentage)
  const chartBars = [
    { label: '00:00', value: 20 },
    { label: '04:00', value: 35 },
    { label: '08:00', value: 65 },
    { label: '12:00', value: 90 },
    { label: '16:00', value: 75 },
    { label: '20:00', value: 45 },
    { label: '24:00', value: 30 },
  ];

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Overview</h1>
        <p className="text-slate-400 mt-1">High-impact operational metrics and system status</p>
      </header>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Enrollments Today" value={totalToday} icon={Users} color="text-deepblue-400" bg="bg-deepblue-500/20" delay="delay-100" />
        <StatCard title="Flagged Applications" value={flagged} icon={ShieldAlert} color="text-alertcrimson" bg="bg-alertcrimson/20" delay="delay-200" />
        <StatCard title="System Automation Rate" value={`${automationRate}%`} icon={Cpu} color="text-alertemerald" bg="bg-alertemerald/20" delay="delay-300" />
        <StatCard title="Avg Processing Speed" value="1.2s" subValue="Target: < 2.0s" icon={Zap} color="text-yellow-400" bg="bg-yellow-400/20" delay="delay-[400ms]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Trend Graph */}
        <div className="glass-panel p-6 lg:col-span-2 animate-fade-in delay-200 flex flex-col">
          <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-deepblue-400" />
            <span>Fraud Patterns Over Last 24 Hours</span>
          </h2>
          <div className="flex-1 flex items-end justify-between space-x-2 mt-4 pt-4 border-t border-crispslate-700/50">
            {chartBars.map((bar, index) => (
              <div key={index} className="flex flex-col items-center flex-1 group">
                <div className="w-full relative h-48 bg-crispslate-900/50 rounded-t-md overflow-hidden flex items-end">
                  <div 
                    className="w-full bg-gradient-to-t from-alertcrimson to-alertcrimson/40 rounded-t-md transition-all duration-500 group-hover:brightness-125"
                    style={{ height: `${bar.value}%` }}
                  ></div>
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-crispslate-800 text-xs px-2 py-1 rounded border border-crispslate-700 pointer-events-none">
                    {bar.value} cases
                  </div>
                </div>
                <span className="text-xs text-slate-400 mt-3 font-medium">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="glass-panel p-6 animate-fade-in delay-300 flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-alertemerald" />
            <span>Recent Agent Activity</span>
          </h2>
          <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-crispslate-900/40 border border-crispslate-800/50 hover:bg-crispslate-800/60 transition-colors">
                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                  activity.status === 'success' ? 'bg-alertemerald' :
                  activity.status === 'warning' ? 'bg-yellow-400' : 'bg-alertcrimson'
                }`} />
                <div>
                  <p className="text-sm font-medium text-slate-200">{activity.agent}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{activity.action}</p>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-2 block">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subValue, icon: Icon, color, bg, delay }) => (
  <div className={`glass-panel p-6 flex items-center space-x-4 animate-fade-in ${delay}`}>
    <div className={`p-4 rounded-xl ${bg}`}>
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
    <div>
      <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</p>
      <div className="flex items-baseline space-x-2 mt-1">
        <h3 className="text-3xl font-bold text-slate-100">{value}</h3>
        {subValue && <span className="text-xs text-slate-400 font-medium">{subValue}</span>}
      </div>
    </div>
  </div>
);

export default Dashboard;
