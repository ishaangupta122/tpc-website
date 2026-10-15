import { useState } from "react";
import { DataContext } from "./DataContext";
import { createDataStore } from "./dataStore";

// Creates the shared cache once for the whole app. The context value never
// changes, so mounting this provider does not re-render anything; components
// subscribe only to the keys they use. Nothing is fetched until a component
// asks for it.
export const DataProvider = ({ children }) => {
  const [store] = useState(createDataStore);
  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
};
