import { createContext, useContext, useEffect } from "react";

// Builds a Provider + hook pair around a resource's state. The hook loads the
// data the first time a page uses it, then every page shares the same state.
//   name   used in the error message when the hook is used outside its Provider
//   useValue  hook run inside the Provider; returns the (memoised) context
//             value, which must include `ensureLoaded`
export const createResourceContext = (name, useValue) => {
  const Context = createContext(null);

  const Provider = ({ children }) => {
    return <Context.Provider value={useValue()}>{children}</Context.Provider>;
  };

  const useResource = () => {
    const context = useContext(Context);
    if (!context) throw new Error(`use${name} must be used inside <${name}Provider>`);
    const { ensureLoaded } = context;
    useEffect(() => {
      ensureLoaded();
    }, [ensureLoaded]);
    return context;
  };

  return { Provider, useResource };
};
