import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { MapMarkerData } from "../../data/DataTypes";
import initSocket from "../../Hooks/useSocket";

interface GameMarkersContextProps {
   markers: MapMarkerData[];
}

const GameMarkersContext = createContext<GameMarkersContextProps | undefined>(undefined);

export const GameMarkersProvider = ({ children }: { children: ReactNode }) => {
   const [markers, setMarkers] = useState<MapMarkerData[]>([]);

   initSocket('marker-added', (marker: MapMarkerData) => {
      setMarkers((current) => [...current, marker]);
   });

   initSocket('update-marker', (updatedMarker: MapMarkerData) => {
      console.log(updatedMarker);
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
