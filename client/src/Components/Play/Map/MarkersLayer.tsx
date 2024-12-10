import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useGameMarkers } from "../../Contexts/GameMarkersContext";
import MapMarker from "./MapMarker";

export default function MarkersLayer() {
   const { markers } = useGameMarkers();
   const map = useMap();

   useEffect(() => {
      if (map) {
         const currentCenter = map.getCenter();
         const currentZoom = map.getZoom();
         // Restore center and zoom after marker update
         map.setView(currentCenter, currentZoom);
      }
   }, [markers, map]);

   return (
      <>
         {markers.map((marker) => (
            <MapMarker
               key={marker.id}
               marker={marker}
            />
         ))}
      </>
   );
}
