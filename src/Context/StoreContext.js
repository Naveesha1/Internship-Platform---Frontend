// src/context/StoreContext.js
import React, { createContext,useState } from 'react';

// Create a context
export const StoreContext = createContext();

// Create a provider component
 const StoreContextProvider = ({ children }) => {

  const [selectedInternship, setSelectedInternship] = useState(null);
  const url = "http://localhost:4000"; // Store the base url

  const contextValue = {
    url,
    setSelectedInternship,
    selectedInternship,
}

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};


export default StoreContextProvider;
