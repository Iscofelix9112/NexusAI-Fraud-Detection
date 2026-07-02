import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Check, X, AlertTriangle, ShieldAlert, UserCheck, Image as ImageIcon, ChevronRight, BrainCircuit, Users } from 'lucide-react';

const FraudReview = () => {
  const { enrolments, approveCase, rejectCase, escalateCase } = useAppContext();
  const [selectedId, setSelectedId] = useState(null);

  const pendingCases = enrolments.filter(e => e.status === 'pending');
  const selectedCase = pendingCases.find(e => e.id === selectedId) || (pendingCases.length > 0 ? pendingCases[0] : null);

  // Update selection if current selection is no longer pending
  React.useEffect(() => {
    if (selectedId && !pendingCases.find(e => e.id === selectedId)) {
      setSelectedId(null);
    }
  }, [pendingCases, selectedId]);

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <header className="mb-4 flex-shrink-0">
        <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
          <ShieldAlert className="text-alertcrimson w-8 h-8" />
          Fraud Case Review Portal
        </h1>
        <p className="text-slate-400 mt-1">Administrative oversight for high-risk anomalies</p>
      </header>

      {pendingCases.length === 0 ? (
        <div className="glass-panel p-12 text-center flex flex-col items-center justify-center animate-fade-in flex-1">
          <div className="w-16 h-16 bg-alertemerald/20 rounded-full flex items-center justify-center mb-4">
            <Check className="text-alertemerald w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold text-slate-200">All clear!</h2>
          <p className="text-slate-400 mt-2">No pending high-risk applications require manual review.</p>
        </div>
      ) : (
        <div className="flex gap-6 flex-1 min-h-0">
          
          {/* Left-hand List Panel */}
          <div className="w-1/3 glass-panel flex flex-col overflow-hidden animate-fade-in">
            <div className="p-4 border-b border-crispslate-700/50 bg-crispslate-900/50 flex justify-between items-center">
              <h2 className="font-semibold text-slate-200">Pending Review</h2>
              <span className="bg-alertcrimson/20 text-alertcrimson text-xs px-2 py-1 rounded font-bold">
                {pendingCases.length} Cases
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {pendingCases.map((caseItem) => (
                <button
                  key={caseItem.id}
                  onClick={() => setSelectedId(caseItem.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex justify-between items-center ${
                    selectedCase?.id === caseItem.id
                      ? 'bg-deepblue-900/40 border-deepblue-500/50 shadow-md'
                      : 'bg-crispslate-800/30 border-transparent hover:bg-crispslate-800/60'
                  }`}
                >
                  <div>
                    <h3 className="font-semibold text-slate-100">{caseItem.name}</h3>
                    <p className="text-sm text-alertcrimson mt-0.5">Risk Score: {caseItem.riskScore}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${selectedCase?.id === caseItem.id ? 'text-deepblue-400' : 'text-slate-500'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right-hand Inspector View */}
          {selectedCase && (
            <div className="flex-1 glass-panel flex flex-col overflow-hidden animate-fade-in delay-100">
              
              <div className="p-6 border-b border-crispslate-700/50 flex justify-between items-start bg-crispslate-900/30">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">{selectedCase.name}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="bg-slate-700/50 text-slate-300 text-xs px-2 py-1 rounded font-mono">
                      {selectedCase.id}
                    </span>
                    <span className="text-slate-400 text-sm">Date: {selectedCase.date}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-4xl font-black text-alertcrimson">{selectedCase.riskScore}</span>
                  <span className="text-xs text-alertcrimson uppercase font-bold tracking-wider">Risk Index</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* Split Visual Comparison Card */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-deepblue-400" />
                    Biometric Comparison
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-crispslate-900/50 border border-crispslate-700/50 rounded-xl p-4 flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden group">
                      <ImageIcon className="w-12 h-12 text-slate-600 mb-2" />
                      <span className="text-slate-400 font-medium">Uploaded ID Document</span>
                      <div className="absolute inset-0 border-2 border-dashed border-deepblue-500/30 rounded-xl m-2 pointer-events-none"></div>
                    </div>
                    <div className="bg-crispslate-900/50 border border-crispslate-700/50 rounded-xl p-4 flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden">
                      <ImageIcon className="w-12 h-12 text-slate-600 mb-2" />
                      <span className="text-slate-400 font-medium">Real-time Liveness Feed</span>
                      <div className="absolute inset-0 bg-alertcrimson/5 rounded-xl m-2 pointer-events-none"></div>
                      <div className="absolute top-4 right-4 flex items-center gap-1 text-alertcrimson text-xs font-bold bg-alertcrimson/10 px-2 py-1 rounded">
                        <AlertTriangle className="w-3 h-3" />
                        Mismatch
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Explanation / Reasoning Block */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-alertcrimson" />
                    Neural Net Explanation
                  </h3>
                  <div className="bg-alertcrimson/5 border border-alertcrimson/20 rounded-xl p-5">
                    <p className="text-slate-200 font-medium mb-4">{selectedCase.flaggedReason}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-crispslate-900/40 rounded border border-crispslate-800">
                        <span className="text-sm text-slate-300">Facial Structure Variance</span>
                        <span className="text-sm font-bold text-alertcrimson">92% Difference</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-crispslate-900/40 rounded border border-crispslate-800">
                        <span className="text-sm text-slate-300">NIN Database Conflict</span>
                        <span className="text-sm font-bold text-alertcrimson">Address Mismatch</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-crispslate-900/40 rounded border border-crispslate-800">
                        <span className="text-sm text-slate-300">IP Geolocation</span>
                        <span className="text-sm font-bold text-yellow-400">Suspicious Origin</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="p-6 border-t border-crispslate-700/50 bg-crispslate-900/80 flex gap-4">
                <button 
                  onClick={() => rejectCase(selectedCase.id)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-alertcrimson hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg shadow-alertcrimson/20 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                  <span>Reject & Blacklist</span>
                </button>
                <button 
                  onClick={() => escalateCase(selectedCase.id)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold rounded-lg shadow-lg shadow-yellow-500/20 transition-all duration-200"
                >
                  <Users className="w-5 h-5" />
                  <span>Escalate to Human</span>
                </button>
                <button 
                  onClick={() => approveCase(selectedCase.id)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-alertemerald/10 text-alertemerald border border-alertemerald/30 hover:bg-alertemerald hover:text-white font-semibold rounded-lg transition-all duration-200"
                >
                  <Check className="w-5 h-5" />
                  <span>Approve Enrolment</span>
                </button>
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FraudReview;
