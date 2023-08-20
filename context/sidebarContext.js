import { createContext, useState } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {

  const [open, setOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ setOpen, open }}>
      {children}
    </SidebarContext.Provider>
  );
};
