import React, { createContext, useContext, useState } from 'react';

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [reports, setReports] = useState([
    { index: '215036R', name: 'Ekanayake HGNK', avatar: '/api/placeholder/40/40', month: 'Jan', pdfData: null },
    { index: '215050E', name: 'Ranathilapa ABGT', avatar: '/api/placeholder/40/40', month: 'Feb', pdfData: null },
    { index: '202076T', name: 'Mudiyanse HGTY', avatar: '/api/placeholder/40/40', month: 'Feb', pdfData: null },
  ]);

  const addReport = (report) => {
    setReports(prevReports => [...prevReports, report]);
  };

  const deleteReport = (index) => {
    setReports(prevReports => prevReports.filter(report => report.index !== index));
  };

  return (
    <ReportContext.Provider value={{ reports, addReport, deleteReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = () => useContext(ReportContext);