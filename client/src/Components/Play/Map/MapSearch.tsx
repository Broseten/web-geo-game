import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { useGameRoom } from "../../Contexts/GameRoomContext";

// const markerIcon = L.icon({
//    iconUrl: '/images/pin.png',
//    iconSize: [198 / 8, 256 / 8],
//    iconAnchor: [198 / 8 / 2, 256 / 8], // at the bottom center
//    popupAnchor: [0, -256 / 8], // popup above the marker
// });

export default function MapSearch() {
   const map = useMap();
   // to remove the search marker when the room state changes
   const { gameRoomState } = useGameRoom();
   const markerRef = useRef<L.Marker | null>(null);
   const searchControlRef = useRef<L.Control | null>(null);

   useEffect(() => {
      if (searchControlRef.current) return;

      const searchControl = L.Control.geocoder({
         defaultMarkGeocode: false,
         position: "topleft",
      });

      searchControl
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         .on("markgeocode", (e: any) => {
            const { center } = e.geocode;

            // Remove existing marker
            if (markerRef.current) {
               map.removeLayer(markerRef.current);
            }

            markerRef.current = L.marker(center)
               .addTo(map)
               .bindPopup(e.geocode.name)
               .openPopup();

            // Allow double-click to remove the marker
            markerRef.current.on("dblclick", () => {
               map.removeLayer(markerRef.current!);
               markerRef.current = null;
            });

            map.setView(center, map.getZoom() || 13);
         })
         .addTo(map);

      searchControlRef.current = searchControl;

      return () => {
         if (searchControlRef.current) {
            map.removeControl(searchControlRef.current);
            searchControlRef.current = null;
         }
         if (markerRef.current) {
            map.removeLayer(markerRef.current);
            markerRef.current = null;
         }
      };
   }, [map, gameRoomState]);

   return null;
}
