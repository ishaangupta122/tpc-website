import { createContext, useContext, useMemo, useRef } from "react";
import { Toast } from "primereact/toast";

const NotificationContext = createContext(null);

// App-wide toast messages: const { success, error } = useNotify();
export const NotificationProvider = ({ children }) => {
  const toast = useRef(null);

  const value = useMemo(
    () => ({
      success: (detail, summary = "Success") =>
        toast.current?.show({ severity: "success", summary, detail, life: 3000 }),
      error: (detail, summary = "Something went wrong") =>
        toast.current?.show({ severity: "error", summary, detail, life: 5000 }),
    }),
    []
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Toast ref={toast} position="top-right" />
    </NotificationContext.Provider>
  );
};

export const useNotify = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotify must be used inside <NotificationProvider>");
  return context;
};
