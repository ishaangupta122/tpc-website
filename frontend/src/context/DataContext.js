import { createContext, useContext } from "react";

// Provides the shared data store (see dataStore.js). The provider component is
// in DataProvider.jsx; components read data through the hooks in hooks/.
export const DataContext = createContext(null);

export const useDataStore = () => {
  const store = useContext(DataContext);
  if (!store) throw new Error("useDataStore must be used inside <DataProvider>.");
  return store;
};
