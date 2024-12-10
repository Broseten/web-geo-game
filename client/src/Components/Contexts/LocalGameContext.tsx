import { createContext, ReactNode, useContext, useState } from "react";
import { global_solutions } from "../../data/data";
import { MapMarkerData, Solution } from "../../data/DataTypes";
import { useGameRoom } from "./GameRoomContext";

interface LocalGameDataContextProps {
   selectedSolutionID: string | null;
   setSelectedSolutionID: (id: string | null) => void;
   getSelectedSolution: () => Solution | undefined;
   getSolution: (id: string | null) => Solution | undefined;
   selectedMarkerID: number | null;
   setSelectedMarkerID: (id: number | null) => void;
   getSelectedMarker: () => MapMarkerData | undefined;
}

const LocalGameDataContext = createContext<LocalGameDataContextProps | undefined>(undefined);

export const LocalGameDataProvider = ({ children }: { children: ReactNode }) => {
   const { markers } = useGameRoom();
   const [selectedSolutionID, setSelectedSolutionID] = useState<string | null>(null);
   const [selectedMarkerID, setSelectedMarkerID] = useState<number | null>(null);


   const getSelectedSolution = () => {
      return getSolution(selectedSolutionID);
   };

   const getSolution = (solutionID: string | null) => {
      return solutionID === null ? undefined : global_solutions.find((sol) => sol.id === solutionID);
   };

   const getSelectedMarker = () => {
      return selectedMarkerID === null ? undefined : markers.find((mar) => mar.id === selectedMarkerID);
   };

   return (
      <LocalGameDataContext.Provider
         value={{
            selectedSolutionID,
            setSelectedSolutionID,
            getSelectedSolution,
            getSolution,
            selectedMarkerID,
            setSelectedMarkerID,
            getSelectedMarker,
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
