import { createContext, ReactNode, useContext, useState } from "react";
import { global_solutions } from "../../data/data";
import { Solution } from "../../data/DataTypes";

interface LocalGameDataContextProps {
   selectedSolutionID: string | null;
   setSelectedSolutionID: (id: string | null) => void;
   getSelectedSolution: () => Solution | undefined;
}

const LocalGameDataContext = createContext<LocalGameDataContextProps | undefined>(undefined);

export const LocalGameDataProvider = ({ children }: { children: ReactNode }) => {
   const [selectedSolutionID, setSelectedSolutionID] = useState<string | null>(null);

   const getSelectedSolution = () => {
      return selectedSolutionID === null ? undefined : global_solutions.find((sol) => sol.id === selectedSolutionID);
   };

   return (
      <LocalGameDataContext.Provider
         value={{
            selectedSolutionID,
            setSelectedSolutionID,
            getSelectedSolution,
         }}
      >
         {children}
      </LocalGameDataContext.Provider>
   );
};

export const useLocalGameData = () => {
   const context = useContext(LocalGameDataContext);
   if (!context) {
      throw new Error("useLocalGameData must be used within a LocalGameDataContextProvider");
   }
   return context;
};
