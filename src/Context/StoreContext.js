// src/context/StoreContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context
export const StoreContext = createContext();

// Create a provider component
 const StoreContextProvider = ({ children }) => {
  const url = "http://localhost:4000"; // Store the base url


  const contextValue = {
    url,
}

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook to use the StoreContext
// export const useStore = () => {
//   return useContext(StoreContext);
// };
export default StoreContextProvider;
