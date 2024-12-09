import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";

interface MapInitializerProps {
   bounds: L.LatLngBounds;
   onClick: (latlng: LatLng) => void;
}

export default function MapInitializer({ bounds, onClick }: MapInitializerProps) {
   const map = useMap();

   useEffect(() => {
      if (map) {
         map.fitBounds(bounds);
         const zoom = Math.floor(map.getBoundsZoom(bounds));
         map.setMinZoom(zoom);
      }
   }, [bounds]);

   useMapEvents({
      click(e) {
         onClick(e.latlng);
      }
   });

   return null;
}
