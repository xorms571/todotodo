import { createContext, useContext, useState } from "react";
interface HeightContextType {
  height: number;
  setHeight: (height: number) => void;
}
const HeightContext = createContext<HeightContextType | undefined>(undefined);
export const HeightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [height, setHeight] = useState<number>(100);
  return (
    <HeightContext.Provider value={{ height, setHeight }}>
      {children}
    </HeightContext.Provider>
  );
};
export const useHeight = () => {
  const context = useContext(HeightContext);
  if (!context) {
    throw new Error("useHeight must be used within a HeightProvider");
  }
  return context;
};
