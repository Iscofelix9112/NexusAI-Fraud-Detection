import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import {
  Settings, Users, ClipboardList, ShieldX, ToggleLeft, ToggleRight,
  Trash2, PlusCircle, CheckCircle2, XCircle, Clock, AlertTriangle,
  ChevronDown, Lock, Server, Cpu, Wifi
} from 'lucide-react';

const tabs = ['Agent Management', 'System Config', 'Audit Log', 'Blacklist Registry'];

const initialAgents = [
  { id: 'AGT-001', name: 'Kevin Smith',    role: 'Senior Agent', region: 'Lagos North',   status: 'active',    enrolments: 142 },
  { id: 'AGT-002', name: 'Amara Osei',     role: 'Field Agent',  region: 'Accra Central', status: 'active',    enrolments: 89  },
  { id: 'AGT-003', name: 'David Mensah',   role: 'Field Agent',  region: 'Kumasi',        status: 'suspended', enrolments: 34  },
  { id: 'AGT-004', name: 'Ngozi Adeyemi',  role: 'Supervisor',   region: 'Abuja FCT',     status: 'active',    enrolments: 210 },
];

const auditLog = [
  { id: 1, actor: 'Admin',          action: 'Approved enrolment SUB-1002',          time: '2 mins ago',   type: 'success' },
  { id: 2, actor: 'System',         action: 'Auto-flagged SUB-1003 — risk score 95', time: '15 mins ago',  type: 'warning' },
  { id: 3, actor: 'AGT-002',        action: 'Submitted new enrolment SUB-1006',      time: '34 mins ago',  type: 'info'    },
  { id: 4, actor: 'Admin',          action: 'Rejected & blacklisted SUB-1004',       time: '1 hr ago',     type: 'danger'  },
  { id: 5, actor: 'Neural Net',     action: 'Model retrain triggered (Epoch 43)',    time: '2 hrs ago',    type: 'info'    },
  { id: 6, actor: 'AGT-001',        action: 'Submitted new enrolment SUB-1005',      time: '3 hrs ago',    type: 'info'    },
  { id: 7, actor: 'System',         action: 'Database backup completed',              time: '6 hrs ago',    type: 'success' },
];

const Admin = () => {
  const { enrolments } = useAppContext();
  const [activeTab, setActiveTab] = useState(0);
  const [agents, setAgents] = useState(initialAgents);
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [newAgent, setNewAgent] = useState({ name: '', role: 'Field Agent', region: '' });

  // System config state
  const [config, setConfig] = useState({
    riskThreshold: 75,
    autoReject: false,
    livenessCheck: true,
    ninVerification: true,
    alertEmails: true,
    maintenanceMode: false,
  });

  const blacklisted = enrolments.filter(e => e.status === 'rejected');

  const toggleAgentStatus = (id) => {
    setAgents(prev => prev.map(a =>
      a.id === id ? { ...a, status: a.status === 'active' ? 'suspended' : 'active' } : a
    ));
  };

  const removeAgent = (id) => {
    setAgents(prev => prev.filter(a => a.id !== id));
  };

  const addAgent = () => {
    if (!newAgent.name || !newAgent.region) return;
    setAgents(prev => [...prev, {
      id: `AGT-00${prev.length + 1}`,
      name: newAgent.name,
      role: newAgent.role,
      region: newAgent.region,
      status: 'active',
      enrolments: 0,
    }]);
    setNewAgent({ name: '', role: 'Field Agent', region: '' });
    setShowAddAgent(false);
  };

  const Toggle = ({ value, onChange }) => (
    <button onClick={() => onChange(!value)} className="flex-shrink-0">
      {value
        ? <ToggleRight className="w-8 h-8 text-alertemerald" />
        : <ToggleLeft className="w-8 h-8 text-slate-600" />
      }
    </button>
  );

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
          <Lock className="w-8 h-8 text-yellow-400" />
          Admin Panel
        </h1>
        <p className="text-slate-400 mt-1">System administration, agent management &amp; audit controls</p>
      </header>

      {/* System Health Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
        {[
          { icon: Server, label: 'API Server',      value: 'Operational', color: 'text-alertemerald' },
          { icon: Cpu,    label: 'Neural Net Node',  value: 'Running',     color: 'text-alertemerald' },
          { icon: Wifi,   label: 'NIN API Gateway', value: 'Healthy',     color: 'text-alertemerald' },
          { icon: Clock,  label: 'Last Sync',        value: '2 mins ago',  color: 'text-slate-300'    },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="glass-panel px-4 py-3 flex items-center gap-3">
            <Icon className={`w-5 h-5 ${color}`} />
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
              <p className={`text-sm font-semibold ${color}`}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 bg-crispslate-900/60 rounded-xl p-1 border border-crispslate-700/50">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === i
                ? 'bg-deepblue-600/30 text-deepblue-300 border border-deepblue-500/30 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── AGENT MANAGEMENT ── */}
      {activeTab === 0 && (
        <div className="glass-panel p-6 animate-fade-in space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-deepblue-400" /> Field Agents
            </h2>
            <button
              onClick={() => setShowAddAgent(v => !v)}
              className="flex items-center gap-2 bg-deepblue-600 hover:bg-deepblue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <PlusCircle className="w-4 h-4" /> Add Agent
            </button>
          </div>

          {showAddAgent && (
            <div className="bg-crispslate-900/60 border border-deepblue-500/30 rounded-xl p-4 grid grid-cols-1 md:grid-cols-4 gap-3 animate-fade-in mb-4">
              <input
                placeholder="Full Name"
                className="bg-crispslate-800 border border-crispslate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-deepblue-500"
                value={newAgent.name} onChange={e => setNewAgent({ ...newAgent, name: e.target.value })}
              />
              <select
                className="bg-crispslate-800 border border-crispslate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-deepblue-500"
                value={newAgent.role} onChange={e => setNewAgent({ ...newAgent, role: e.target.value })}
              >
                <option>Field Agent</option>
                <option>Senior Agent</option>
                <option>Supervisor</option>
              </select>
              <input
                placeholder="Region"
                className="bg-crispslate-800 border border-crispslate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-deepblue-500"
                value={newAgent.region} onChange={e => setNewAgent({ ...newAgent, region: e.target.value })}
              />
              <button
                onClick={addAgent}
                className="bg-alertemerald/20 hover:bg-alertemerald/30 text-alertemerald border border-alertemerald/30 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
              >
                Save Agent
              </button>
            </div>
          )}

          <div className="overflow-x-auto rounded-xl border border-crispslate-700/50">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-crispslate-900/60 border-b border-crispslate-700/50">
                  <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Agent</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Region</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Enrolments</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent, idx) => (
                  <tr key={agent.id} className="border-b border-crispslate-800/50 hover:bg-crispslate-800/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-deepblue-700/40 border border-deepblue-500/30 flex items-center justify-center text-deepblue-300 font-bold text-sm">
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-100 text-sm">{agent.name}</p>
                          <p className="text-xs text-slate-500 font-mono">{agent.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-300">{agent.role}</td>
                    <td className="py-3 px-4 text-sm text-slate-400">{agent.region}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-sm font-bold text-slate-200">{agent.enrolments}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs px-2 py-1 rounded font-bold ${
                        agent.status === 'active'
                          ? 'bg-alertemerald/10 text-alertemerald border border-alertemerald/20'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {agent.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => toggleAgentStatus(agent.id)}
                          title={agent.status === 'active' ? 'Suspend Agent' : 'Activate Agent'}
                          className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
                            agent.status === 'active'
                              ? 'text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/10'
                              : 'text-alertemerald border-alertemerald/30 hover:bg-alertemerald/10'
                          }`}
                        >
                          {agent.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                        <button
                          onClick={() => removeAgent(agent.id)}
                          className="text-slate-500 hover:text-alertcrimson transition-colors"
                          title="Remove Agent"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── SYSTEM CONFIG ── */}
      {activeTab === 1 && (
        <div className="glass-panel p-6 animate-fade-in space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <Settings className="w-5 h-5 text-deepblue-400" /> System Configuration
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-crispslate-900/40 rounded-xl border border-crispslate-800">
              <div>
                <p className="font-semibold text-slate-200">Risk Score Threshold</p>
                <p className="text-xs text-slate-400 mt-0.5">Applications above this score are auto-flagged for review</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range" min="50" max="99" step="1"
                  value={config.riskThreshold}
                  onChange={e => setConfig({ ...config, riskThreshold: Number(e.target.value) })}
                  className="w-32 accent-deepblue-500"
                />
                <span className="text-deepblue-400 font-black text-lg w-8 text-right">{config.riskThreshold}</span>
              </div>
            </div>

            {[
              { key: 'autoReject',      label: 'Auto-Reject High Risk',      desc: 'Automatically reject applications with risk score ≥ 95' },
              { key: 'livenessCheck',   label: 'Liveness Check Required',    desc: 'Enforce facial liveness detection on all enrolments' },
              { key: 'ninVerification', label: 'NIN Verification Active',    desc: 'Cross-check NIN against the national identity database' },
              { key: 'alertEmails',     label: 'Email Alerts on Flag',       desc: 'Send supervisor email when a new fraud case is flagged' },
              { key: 'maintenanceMode', label: 'Maintenance Mode',           desc: 'Block all new enrolments during scheduled downtime' },
            ].map(({ key, label, desc }) => (
              <div key={key} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                key === 'maintenanceMode' && config.maintenanceMode
                  ? 'bg-alertcrimson/5 border-alertcrimson/20'
                  : 'bg-crispslate-900/40 border-crispslate-800'
              }`}>
                <div>
                  <p className="font-semibold text-slate-200">{label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                </div>
                <Toggle value={config[key]} onChange={v => setConfig({ ...config, [key]: v })} />
              </div>
            ))}
          </div>

          <button className="w-full mt-4 bg-deepblue-600 hover:bg-deepblue-500 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-deepblue-600/20">
            Save Configuration
          </button>
        </div>
      )}

      {/* ── AUDIT LOG ── */}
      {activeTab === 2 && (
        <div className="glass-panel p-6 animate-fade-in">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
            <ClipboardList className="w-5 h-5 text-deepblue-400" /> System Audit Log
          </h2>
          <div className="space-y-3">
            {auditLog.map(entry => (
              <div key={entry.id} className="flex items-start gap-4 p-4 bg-crispslate-900/40 rounded-xl border border-crispslate-800 hover:bg-crispslate-800/40 transition-colors">
                <div className={`mt-0.5 p-1.5 rounded-lg flex-shrink-0 ${
                  entry.type === 'success' ? 'bg-alertemerald/10 text-alertemerald' :
                  entry.type === 'danger'  ? 'bg-alertcrimson/10 text-alertcrimson' :
                  entry.type === 'warning' ? 'bg-yellow-500/10 text-yellow-400' :
                                             'bg-deepblue-500/10 text-deepblue-400'
                }`}>
                  {entry.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> :
                   entry.type === 'danger'  ? <XCircle className="w-4 h-4" /> :
                   entry.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                                              <Clock className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-200">{entry.action}</p>
                  <p className="text-xs text-slate-500 mt-1 font-mono">Actor: {entry.actor}</p>
                </div>
                <span className="text-xs text-slate-500 whitespace-nowrap">{entry.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── BLACKLIST REGISTRY ── */}
      {activeTab === 3 && (
        <div className="glass-panel p-6 animate-fade-in">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
            <ShieldX className="w-5 h-5 text-alertcrimson" /> Blacklist Registry
            <span className="ml-auto text-xs bg-alertcrimson/20 text-alertcrimson px-2 py-1 rounded font-bold border border-alertcrimson/20">
              {blacklisted.length} Entries
            </span>
          </h2>
          {blacklisted.length === 0 ? (
            <div className="text-center py-12 text-slate-400">No blacklisted subscribers on record.</div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-crispslate-700/50">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-crispslate-900/60 border-b border-crispslate-700/50">
                    <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">ID</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Name</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Risk Score</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Reason</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {blacklisted.map(sub => (
                    <tr key={sub.id} className="border-b border-crispslate-800/50 hover:bg-crispslate-800/30 transition-colors">
                      <td className="py-3 px-4 font-mono text-xs text-slate-400">{sub.id}</td>
                      <td className="py-3 px-4 font-semibold text-slate-200">{sub.name}</td>
                      <td className="py-3 px-4">
                        <span className="text-alertcrimson font-black">{sub.riskScore}</span>
                        <span className="text-slate-500 text-xs">/100</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-400 max-w-xs truncate">
                        {sub.flaggedReason || '—'}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-500">{sub.date}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="bg-alertcrimson/10 text-alertcrimson border border-alertcrimson/20 text-xs px-2 py-1 rounded font-bold">
                          BLACKLISTED
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
