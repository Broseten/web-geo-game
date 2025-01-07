import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { MapMarkerData } from "../../data/DataTypes";
import initSocket from "../../Hooks/useSocket";
import { useToast } from "@chakra-ui/react";
import { getSolution } from "../../data/data";
import { global_playerID } from "./ConnectionContext";

interface GameMarkersContextProps {
   markers: MapMarkerData[];
   getPlayerSpentBudget: (playerID: string | undefined) => number;
   getRemainingVotes: () => number;
}

const GameMarkersContext = createContext<GameMarkersContextProps | undefined>(undefined);

export const GameMarkersProvider = ({ children }: { children: ReactNode }) => {
   const [markers, setMarkers] = useState<MapMarkerData[]>([]);
   const toast = useToast();

   const getRemainingVotes = () => {
      // add only votes from the local player
      return markers.reduce((acc, marker) => {
         return acc + marker.votes.reduce((voteAcc, vote) => {
            return vote.playerID === global_playerID ? voteAcc + 1 : voteAcc;
         }, 0);
      }, 0);
   };

   const getPlayerSpentBudget = (playerID: string | undefined): number => {
      return markers.reduce((acc, marker) => {
         // sum the prices of all solutions belonging to that player markers
         const price = marker.ownerPlayerID === playerID ? getSolution(marker.solutionID)?.price : 0;
         return acc + (price ? price : 0);
      }, 0);
   };

   initSocket('marker-added', (marker: MapMarkerData) => {
      setMarkers((current) => [...current, marker]);
   });

   initSocket('marker-error', (msg: string) => {
      // TODO use global error messages instead of marker-error
      toast({
         title: msg,
         status: 'error',
         isClosable: true,
      });
   });

   initSocket('update-marker', (updatedMarker: MapMarkerData) => {
      setMarkers((prevMarkers) =>
         prevMarkers.map((marker) =>
            marker.id === updatedMarker.id ? updatedMarker : marker
         )
      );
   });

   initSocket('set-markers', (newMarkers: MapMarkerData[]) => {
      setMarkers(newMarkers);
   });

   const memoizedMarkers = useMemo(() => markers, [markers]);

   const value = useMemo(() => ({
      markers: memoizedMarkers,
      getPlayerSpentBudget,
      getRemainingVotes,
   }), [
      memoizedMarkers,
   ]);

   return (
      <GameMarkersContext.Provider value={value}>
         {children}
      </GameMarkersContext.Provider>
   );
};

export const useGameMarkers = () => {
   const context = useContext(GameMarkersContext);
   if (!context) {
      throw new Error("useGameMarkers must be used within a GameMarkersProvider");
   }
   return context;
};
