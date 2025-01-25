// src/context/StoreContext.js
import React, { createContext,useState } from 'react';

// Create a context
export const StoreContext = createContext();

// Create a provider component
 const StoreContextProvider = ({ children }) => {

  const [selectedInternship, setSelectedInternship] = useState(null);
  const [cvDetails,setCvDetails] = useState([]);
  const url = "http://localhost:4000";



  const contextValue = {
    url,
    setSelectedInternship,
    selectedInternship,
    cvDetails,
    setCvDetails,
}

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};


export default StoreContextProvider;
