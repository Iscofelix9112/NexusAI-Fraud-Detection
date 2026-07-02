import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

const initialData = [
  { id: 'SUB-1001', name: 'James Doe', status: 'pending', riskScore: 89, flaggedReason: 'Multiple enrolments from same IP', date: '2026-07-01' },
  { id: 'SUB-1002', name: 'Alice Smith', status: 'approved', riskScore: 12, flaggedReason: '', date: '2026-07-01' },
  { id: 'SUB-1003', name: 'John Roe', status: 'pending', riskScore: 95, flaggedReason: 'Face mismatch in KYC', date: '2026-06-30' },
  { id: 'SUB-1004', name: 'Mary Major', status: 'rejected', riskScore: 99, flaggedReason: 'Stolen ID details', date: '2026-06-29' },
  { id: 'SUB-1005', name: 'Richard Miles', status: 'approved', riskScore: 5, flaggedReason: '', date: '2026-06-28' },
];

export const AppProvider = ({ children }) => {
  const [enrolments, setEnrolments] = useState(initialData);

  const approveCase = (id) => {
    setEnrolments(prev => prev.map(enrolment => 
      enrolment.id === id ? { ...enrolment, status: 'approved' } : enrolment
    ));
  };

  const rejectCase = (id) => {
    setEnrolments(prev => prev.map(enrolment => 
      enrolment.id === id ? { ...enrolment, status: 'rejected' } : enrolment
    ));
  };

  const escalateCase = (id) => {
    setEnrolments(prev => prev.map(enrolment => 
      enrolment.id === id ? { ...enrolment, status: 'escalated' } : enrolment
    ));
  };

  const addEnrolment = (data) => {
    const newEnrolment = {
      ...data,
      id: `SUB-${1000 + enrolments.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      status: data.riskScore > 75 ? 'pending' : 'approved',
    };
    setEnrolments([newEnrolment, ...enrolments]);
  };

  const value = {
    enrolments,
    approveCase,
    rejectCase,
    escalateCase,
    addEnrolment
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
