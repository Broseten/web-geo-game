// just a placeholder file for now...will be probably saved on the server instead

import { createContext, useContext, useState, ReactNode } from "react";
import L from "leaflet";

interface PolygonContextProps {
  polygon: L.Polygon | null;
  setPolygon: (polygon: L.Polygon) => void;
}

const PolygonContext = createContext<PolygonContextProps | undefined>(undefined);

export const PolygonProvider = ({ children }: { children: ReactNode }) => {
  const [polygon, setPolygon] = useState<L.Polygon | null>(null);

  return (
    <PolygonContext.Provider value={{ polygon, setPolygon }}>
      {children}
    </PolygonContext.Provider>
  );
};

export const usePolygon = () => {
  const context = useContext(PolygonContext);
  if (!context) {
    throw new Error("usePolygon must be used within a PolygonProvider");
  }
  return context;
};
