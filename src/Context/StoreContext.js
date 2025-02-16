// src/context/StoreContext.js
import React, { createContext, useState } from "react";

// Create a context
export const StoreContext = createContext();

// Create a provider component
const StoreContextProvider = ({ children }) => {
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [cvDetails, setCvDetails] = useState([]);
  const [addedEvents, setAddedEvents] = useState([]);
  const [cvStatus, setCvStatus] = useState(null);
  const url = "http://localhost:4000";

  const contextValue = {
    url,
    setSelectedInternship,
    selectedInternship,
    cvDetails,
    setCvDetails,
    cvStatus,
    setCvStatus,
    addedEvents,
    setAddedEvents,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
