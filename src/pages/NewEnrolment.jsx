import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { Camera, UploadCloud, BrainCircuit, ShieldAlert, CheckCircle, RefreshCcw, X, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stages = [
  "Verifying NIN Text Context...",
  "Running Facial Match & Liveness Analysis...",
  "Calculating Neural Weights..."
];

const NewEnrolment = () => {
  const { addEnrolment } = useAppContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    nin: '',
    phone: '',
    agentId: ''
  });

  const [status, setStatus] = useState('idle'); // idle, analyzing, complete
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [riskScore, setRiskScore] = useState(0);

  // File upload state
  const [idFile, setIdFile] = useState(null);
  const [idPreview, setIdPreview] = useState(null);
  const [portraitFile, setPortraitFile] = useState(null);
  const [portraitPreview, setPortraitPreview] = useState(null);
  const [idDragging, setIdDragging] = useState(false);
  const [portraitDragging, setPortraitDragging] = useState(false);

  const idInputRef = useRef(null);
  const portraitInputRef = useRef(null);

  const handleIdFile = (file) => {
    if (!file) return;
    setIdFile(file);
    const url = URL.createObjectURL(file);
    setIdPreview(url);
  };

  const handlePortraitFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setPortraitFile(file);
    const url = URL.createObjectURL(file);
    setPortraitPreview(url);
  };

  const clearIdFile = (e) => {
    e.stopPropagation();
    setIdFile(null);
    setIdPreview(null);
    if (idInputRef.current) idInputRef.current.value = '';
  };

  const clearPortraitFile = (e) => {
    e.stopPropagation();
    setPortraitFile(null);
    setPortraitPreview(null);
    if (portraitInputRef.current) portraitInputRef.current.value = '';
  };

  useEffect(() => {
    let progressInterval;
    let stageTimeout;

    if (status === 'analyzing') {
      let currentProgress = 0;
      progressInterval = setInterval(() => {
        currentProgress += 1;
        setProgress(Math.min(currentProgress, 100));
        
        if (currentProgress === 33) setStageIndex(1);
        if (currentProgress === 66) setStageIndex(2);
        
        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          
          // Generate mock score based on data (or random)
          // Let's force a high score if NIN starts with '999' for testing, otherwise random
          const isHighRisk = formData.nin.startsWith('999') || Math.random() > 0.6;
          const score = isHighRisk ? (0.8 + Math.random() * 0.19) : (Math.random() * 0.4);
          
          setRiskScore(score);
          setStatus('complete');
          
          addEnrolment({
            name: formData.name,
            idNumber: formData.nin,
            riskScore: Math.floor(score * 100),
            flaggedReason: score >= 0.8 ? 'Facial mismatch and NIN anomaly detected' : ''
          });
        }
      }, 50); // 50ms per 1% = 5 seconds total
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stageTimeout);
    };
  }, [status, formData, addEnrolment]);

  const handleAnalyze = (e) => {
    e.preventDefault();
    setStatus('analyzing');
    setStageIndex(0);
    setProgress(0);
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({ name: '', nin: '', phone: '', agentId: '' });
    setIdFile(null);
    setIdPreview(null);
    setPortraitFile(null);
    setPortraitPreview(null);
  };

  const gaugeCircumference = 2 * Math.PI * 45;
  const strokeDashoffset = gaugeCircumference - (riskScore * gaugeCircumference);
  const isHighRisk = riskScore >= 0.8;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
          <BrainCircuit className="text-deepblue-400 w-8 h-8" />
          Enrolment Terminal
        </h1>
        <p className="text-slate-400 mt-1">Field agent interface for subscriber registration and AI analysis</p>
      </header>

      {status === 'idle' && (
        <form onSubmit={handleAnalyze} className="glass-panel p-8 animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-200 border-b border-crispslate-700/50 pb-4">Demographics</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <input 
                type="text" required
                className="w-full bg-crispslate-900/50 border border-crispslate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-deepblue-500 focus:ring-1 focus:ring-deepblue-500 transition-colors"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">National Identification Number (NIN)</label>
              <input 
                type="text" required
                className="w-full bg-crispslate-900/50 border border-crispslate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-deepblue-500 focus:ring-1 focus:ring-deepblue-500 transition-colors"
                value={formData.nin} onChange={e => setFormData({...formData, nin: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                <input 
                  type="tel" required
                  className="w-full bg-crispslate-900/50 border border-crispslate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-deepblue-500 focus:ring-1 focus:ring-deepblue-500 transition-colors"
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Agent ID</label>
                <input 
                  type="text" required
                  className="w-full bg-crispslate-900/50 border border-crispslate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-deepblue-500 focus:ring-1 focus:ring-deepblue-500 transition-colors"
                  value={formData.agentId} onChange={e => setFormData({...formData, agentId: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-200 border-b border-crispslate-700/50 pb-4">Biometric & Document Capture</h2>
            
            {/* ID Document Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">ID Document Upload</label>
              <input
                ref={idInputRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={e => handleIdFile(e.target.files[0])}
              />
              <div
                onClick={() => idInputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setIdDragging(true); }}
                onDragLeave={() => setIdDragging(false)}
                onDrop={e => { e.preventDefault(); setIdDragging(false); handleIdFile(e.dataTransfer.files[0]); }}
                className={`border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer relative overflow-hidden
                  ${ idDragging ? 'border-deepblue-400 bg-deepblue-500/10' : idFile ? 'border-alertemerald/50 bg-alertemerald/5' : 'border-crispslate-600 hover:border-deepblue-500/60 hover:bg-crispslate-800/30' }`}
              >
                {idPreview ? (
                  <div className="relative p-3 flex flex-col items-center">
                    {idFile?.type?.startsWith('image/') ? (
                      <img src={idPreview} alt="ID Document" className="max-h-36 rounded-lg object-contain border border-crispslate-700" />
                    ) : (
                      <div className="flex items-center gap-3 py-4">
                        <FileText className="w-10 h-10 text-deepblue-400" />
                        <span className="text-sm text-slate-200 font-medium">{idFile?.name}</span>
                      </div>
                    )}
                    <p className="text-xs text-alertemerald mt-2 font-semibold">✓ Document uploaded</p>
                    <button
                      type="button"
                      onClick={clearIdFile}
                      className="absolute top-2 right-2 bg-alertcrimson/80 hover:bg-alertcrimson text-white rounded-full p-1 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="p-8 flex flex-col items-center justify-center text-center group">
                    <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-deepblue-400 transition-colors mb-3" />
                    <p className="text-sm font-medium text-slate-300">Click or drag & drop to upload</p>
                    <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, PDF</p>
                  </div>
                )}
              </div>
            </div>

            {/* Liveness Portrait Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Liveness Portrait / Face Check</label>
              <input
                ref={portraitInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => handlePortraitFile(e.target.files[0])}
              />
              <div
                onClick={() => portraitInputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setPortraitDragging(true); }}
                onDragLeave={() => setPortraitDragging(false)}
                onDrop={e => { e.preventDefault(); setPortraitDragging(false); handlePortraitFile(e.dataTransfer.files[0]); }}
                className={`border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer relative overflow-hidden
                  ${ portraitDragging ? 'border-deepblue-400 bg-deepblue-500/10' : portraitFile ? 'border-alertemerald/50 bg-alertemerald/5' : 'border-crispslate-600 hover:border-deepblue-500/60 hover:bg-crispslate-800/30' }`}
              >
                {portraitPreview ? (
                  <div className="relative p-3 flex flex-col items-center">
                    <img src={portraitPreview} alt="Liveness Portrait" className="max-h-36 rounded-lg object-contain border border-crispslate-700" />
                    <p className="text-xs text-alertemerald mt-2 font-semibold">✓ Portrait captured</p>
                    <button
                      type="button"
                      onClick={clearPortraitFile}
                      className="absolute top-2 right-2 bg-alertcrimson/80 hover:bg-alertcrimson text-white rounded-full p-1 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="p-8 flex flex-col items-center justify-center text-center group">
                    <Camera className="w-10 h-10 text-slate-400 group-hover:text-deepblue-400 transition-colors mb-3" />
                    <p className="text-sm font-medium text-slate-300">Click or drag & drop a photo</p>
                    <p className="text-xs text-slate-500 mt-1">Ensure face is well-lit — JPG, PNG only</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 mt-4 pt-6 border-t border-crispslate-700/50">
            <button 
              type="submit"
              className="w-full bg-deepblue-600 hover:bg-deepblue-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all duration-300 flex items-center justify-center space-x-3 text-lg"
            >
              <BrainCircuit className="w-6 h-6" />
              <span>Analyze Enrolment</span>
            </button>
          </div>
        </form>
      )}

      {status === 'analyzing' && (
        <div className="glass-panel p-12 flex flex-col items-center justify-center animate-fade-in text-center min-h-[400px]">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-4 border-deepblue-900 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-deepblue-400 rounded-full border-t-transparent animate-spin"></div>
            <BrainCircuit className="w-10 h-10 text-deepblue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Neural Analysis in Progress</h2>
          <p className="text-deepblue-400 font-mono text-sm mb-8 h-6">{stages[stageIndex]}</p>

          <div className="w-full max-w-md bg-crispslate-900 rounded-full h-3 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-deepblue-600 to-deepblue-400 h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-slate-500 text-xs mt-3">{progress}% complete</p>
        </div>
      )}

      {status === 'complete' && (
        <div className="glass-panel p-8 animate-fade-in flex flex-col items-center max-w-2xl mx-auto">
          {isHighRisk && (
            <div className="w-full bg-alertcrimson/10 border-2 border-alertcrimson text-alertcrimson px-6 py-4 rounded-xl flex items-center space-x-4 mb-8 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <ShieldAlert className="w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">AGGRESSIVE FRAUD ALERT</h3>
                <p className="text-sm font-medium">Critical anomalies detected. Application flagged for manual investigation.</p>
              </div>
            </div>
          )}

          {!isHighRisk && (
            <div className="w-full bg-alertemerald/10 border-2 border-alertemerald/50 text-alertemerald px-6 py-4 rounded-xl flex items-center space-x-4 mb-8">
              <CheckCircle className="w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">CLEARANCE GRANTED</h3>
                <p className="text-sm font-medium">No significant fraud patterns detected in neural analysis.</p>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center gap-12 mb-8">
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Background Circle */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="10" />
                {/* Foreground Progress Circle */}
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke={isHighRisk ? '#ef4444' : '#10b981'} 
                  strokeWidth="10"
                  strokeDasharray={gaugeCircumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className={`text-4xl font-bold ${isHighRisk ? 'text-alertcrimson' : 'text-alertemerald'}`}>
                  {(riskScore * 100).toFixed(1)}
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">Risk Index</span>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300 flex-1">
              <div className="flex justify-between border-b border-crispslate-700/50 pb-2">
                <span>Applicant:</span>
                <span className="font-medium text-slate-100">{formData.name}</span>
              </div>
              <div className="flex justify-between border-b border-crispslate-700/50 pb-2">
                <span>NIN Match:</span>
                <span className={`font-medium ${isHighRisk ? 'text-alertcrimson' : 'text-alertemerald'}`}>
                  {isHighRisk ? '64% (Failed)' : '98.5% (Verified)'}
                </span>
              </div>
              <div className="flex justify-between border-b border-crispslate-700/50 pb-2">
                <span>Liveness Check:</span>
                <span className={`font-medium ${isHighRisk ? 'text-alertcrimson' : 'text-alertemerald'}`}>
                  {isHighRisk ? 'Anomalous Depth' : 'Confirmed'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 w-full">
            <button 
              onClick={() => navigate('/review')}
              className="flex-1 bg-crispslate-800 hover:bg-crispslate-700 text-slate-200 font-medium py-3 rounded-lg transition-colors border border-crispslate-600"
            >
              View in Review Portal
            </button>
            <button 
              onClick={handleReset}
              className="flex-1 bg-deepblue-600 hover:bg-deepblue-500 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-deepblue-600/20"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Next Enrolment</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewEnrolment;
