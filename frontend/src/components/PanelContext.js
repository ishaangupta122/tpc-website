import { createContext } from "react";

// True for anything rendered inside a HomePanel. Loading / error / empty
// states read it to drop their own card (the panel already is one) and to
// fill the panel's remaining height instead of leaving a gap below.
export const PanelContext = createContext(false);
