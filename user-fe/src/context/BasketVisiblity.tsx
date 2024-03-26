import React, { ReactNode, useState } from "react";
import { createContext } from "react";
type ThemContextType = {
  isBasketVisible: boolean;
  setIsBasketVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const iContextState = {
  isBasketVisible: false,
  setIsBasketVisible: () => {},
};
type ChildrenType = {
  children: ReactNode;
};
export const BasketVisiblityContext =
  createContext<ThemContextType>(iContextState);
export const BasketBarVisiblity = ({ children }: ChildrenType) => {
  const [isBasketVisible, setIsBasketVisible] = useState<true | false>(false);
  return (
    <BasketVisiblityContext.Provider
      value={{ isBasketVisible, setIsBasketVisible }}
    >
      {children}
    </BasketVisiblityContext.Provider>
  );
};
