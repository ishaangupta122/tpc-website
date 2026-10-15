import ErrorBoundary from "../components/ErrorBoundary";
import { DataProvider } from "../context/DataProvider";

// Everything the app needs above the router, mounted exactly once.
export const AppProviders = ({ children }) => (
  <ErrorBoundary>
    <DataProvider>{children}</DataProvider>
  </ErrorBoundary>
);
