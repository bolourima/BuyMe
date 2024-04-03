import React, { ReactNode, useState } from "react";
import { createContext } from "react";
type ThemContextType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};
const iContextState = {
  token: "",
  setToken: () => {},
};
type ChildrenType = {
  children: ReactNode;
};
export const TokenContext = createContext<ThemContextType>(iContextState);
export const Token = ({ children }: ChildrenType) => {
  const [token, setToken] = useState<string>("");
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
