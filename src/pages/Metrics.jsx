import React from 'react';
import { Target, AlertTriangle, CheckCircle, Crosshair } from 'lucide-react';

const Metrics = () => {
  const confusionMatrix = {
    tp: 14520, // True Positives (Correctly identified fraud)
    fp: 180,   // False Positives (Incorrectly flagged genuine)
    tn: 135000,// True Negatives (Correctly identified genuine)
    fn: 45     // False Negatives (Missed fraud cases)
  };

  const featureWeights = [
    { name: 'Biometric Profile Distance', weight: 42.5, type: 'Visual' },
    { name: 'Document Hologram Validity Check', weight: 28.3, type: 'Visual' },
    { name: 'NIN Metadata Consistency', weight: 15.2, type: 'Contextual' },
    { name: 'Device & IP Fingerprint', weight: 9.8, type: 'Network' },
    { name: 'Application Velocity', weight: 4.2, type: 'Behavioral' },
  ];

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
          <Target className="w-8 h-8 text-alertemerald" />
          Neural Network Analytics
        </h1>
        <p className="text-slate-400 mt-1">Backend model performance and evaluation metrics</p>
      </header>

      {/* Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 flex flex-col items-center text-center animate-fade-in delay-100">
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Overall Accuracy</h3>
          <span className="text-4xl font-black text-slate-100 flex items-baseline gap-2">
            96.5<span className="text-2xl text-alertemerald">%</span>
          </span>
          <p className="text-alertemerald text-xs mt-2 font-bold">+0.4% from last epoch</p>
        </div>
        <div className="glass-panel p-6 flex flex-col items-center text-center animate-fade-in delay-200">
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">False Positive Rate</h3>
          <span className="text-4xl font-black text-slate-100 flex items-baseline gap-2">
            1.2<span className="text-2xl text-alertcrimson">%</span>
          </span>
          <p className="text-alertemerald text-xs mt-2 font-bold">-0.1% optimization</p>
        </div>
        <div className="glass-panel p-6 flex flex-col items-center text-center animate-fade-in delay-300">
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Precision Recall AUC</h3>
          <span className="text-4xl font-black text-slate-100 flex items-baseline gap-2">
            0.994
          </span>
          <p className="text-slate-400 text-xs mt-2">Area Under Curve</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Animated SVG Chart */}
        <div className="glass-panel p-6 animate-fade-in delay-[400ms] flex flex-col">
          <h2 className="text-xl font-semibold mb-6 text-slate-100">Training Loss vs. Validation Curve</h2>
          <div className="flex-1 relative w-full h-64 bg-crispslate-900/40 rounded-xl border border-crispslate-700/50 p-4">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#334155" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#334155" stopOpacity="0" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
              
              {/* Grid Lines */}
              <line x1="0" y1="25" x2="100" y2="25" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />

              {/* Training Loss Line */}
              <polyline 
                points="0,80 15,40 30,30 45,25 60,20 75,18 90,15 100,14" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="2" 
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-[draw_2s_ease-out_forwards]"
                style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
              />

              {/* Validation Curve Line */}
              <polyline 
                points="0,85 15,50 30,45 45,35 60,32 75,30 90,28 100,27" 
                fill="none" 
                stroke="#818cf8" 
                strokeWidth="2" 
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-[draw_2s_ease-out_0.5s_forwards]"
                style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
              />
            </svg>
            <div className="absolute bottom-2 right-4 flex gap-4 text-xs font-medium">
              <div className="flex items-center gap-1 text-alertemerald"><div className="w-2 h-2 rounded-full bg-alertemerald"></div>Training</div>
              <div className="flex items-center gap-1 text-deepblue-400"><div className="w-2 h-2 rounded-full bg-deepblue-400"></div>Validation</div>
            </div>
            {/* Custom SVG Animation Keyframes inside global CSS or inline */}
            <style>{`
              @keyframes draw {
                to { stroke-dashoffset: 0; }
              }
            `}</style>
          </div>
        </div>

        {/* Confusion Matrix */}
        <div className="glass-panel p-6 animate-fade-in delay-[500ms] flex flex-col">
          <h2 className="text-xl font-semibold mb-6 text-slate-100 flex items-center justify-between">
            <span>Confusion Matrix</span>
            <span className="text-xs bg-crispslate-800 text-slate-400 px-2 py-1 rounded font-mono border border-crispslate-700">Epoch 42</span>
          </h2>
          <div className="flex-1 flex flex-col justify-center">
            
            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-end justify-center pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider"></div>
              <div className="flex items-end justify-center pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Predicted<br/>Fraud</div>
              <div className="flex items-end justify-center pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Predicted<br/>Genuine</div>
              
              <div className="flex items-center justify-end pr-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actual<br/>Fraud</div>
              <div className="bg-alertemerald/10 border border-alertemerald/30 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-alertemerald/5 scale-0 group-hover:scale-100 transition-transform rounded-xl"></div>
                <span className="text-2xl font-black text-alertemerald relative z-10">{confusionMatrix.tp.toLocaleString()}</span>
                <span className="text-xs font-medium text-alertemerald/70 mt-1 uppercase relative z-10">True Positives</span>
              </div>
              <div className="bg-alertcrimson/10 border border-alertcrimson/30 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-alertcrimson/5 scale-0 group-hover:scale-100 transition-transform rounded-xl"></div>
                <span className="text-2xl font-black text-alertcrimson relative z-10">{confusionMatrix.fn.toLocaleString()}</span>
                <span className="text-xs font-medium text-alertcrimson/70 mt-1 uppercase relative z-10">False Negatives</span>
              </div>

              <div className="flex items-center justify-end pr-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actual<br/>Genuine</div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-yellow-500/5 scale-0 group-hover:scale-100 transition-transform rounded-xl"></div>
                <span className="text-2xl font-black text-yellow-500 relative z-10">{confusionMatrix.fp.toLocaleString()}</span>
                <span className="text-xs font-medium text-yellow-500/70 mt-1 uppercase relative z-10">False Positives</span>
              </div>
              <div className="bg-deepblue-500/10 border border-deepblue-500/30 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-deepblue-500/5 scale-0 group-hover:scale-100 transition-transform rounded-xl"></div>
                <span className="text-2xl font-black text-deepblue-400 relative z-10">{confusionMatrix.tn.toLocaleString()}</span>
                <span className="text-xs font-medium text-deepblue-400/70 mt-1 uppercase relative z-10">True Negatives</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Feature Weights Importance Table */}
      <div className="glass-panel p-6 animate-fade-in delay-[600ms]">
        <h2 className="text-xl font-semibold mb-6 text-slate-100">Neural Feature Weights Importance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-crispslate-700/50">
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Feature Parameter</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-32">Type</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right w-24">Impact</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/3">Weight Distribution</th>
              </tr>
            </thead>
            <tbody>
              {featureWeights.map((feature, idx) => (
                <tr key={idx} className="border-b border-crispslate-800/50 hover:bg-crispslate-800/30 transition-colors group">
                  <td className="py-4 px-4">
                    <span className="font-semibold text-slate-200">{feature.name}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-xs px-2 py-1 rounded font-medium border ${
                      feature.type === 'Visual' ? 'bg-deepblue-500/10 text-deepblue-400 border-deepblue-500/20' :
                      feature.type === 'Contextual' ? 'bg-alertemerald/10 text-alertemerald border-alertemerald/20' :
                      feature.type === 'Network' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                      'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    }`}>
                      {feature.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-mono font-bold text-slate-100">{feature.weight.toFixed(1)}%</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-full bg-crispslate-900 rounded-full h-2 overflow-hidden shadow-inner">
                      <div 
                        className={`h-full transition-all duration-1000 ease-out delay-${idx * 100} ${
                          idx === 0 ? 'bg-gradient-to-r from-deepblue-600 to-deepblue-400' :
                          idx === 1 ? 'bg-gradient-to-r from-alertemerald/60 to-alertemerald' :
                          'bg-gradient-to-r from-slate-600 to-slate-400'
                        }`}
                        style={{ width: `${feature.weight}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Metrics;
