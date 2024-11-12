import { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MapMask from "./MapMask";
import { socket } from "../../../main";
import initSocket from "../../../Hooks/useSocket";

let DefaultIcon = L.icon({
   iconSize: [25, 41],
   iconAnchor: [10, 41],
   popupAnchor: [2, -40],
   iconUrl: icon,
   shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

interface GameMapProps {
   polygon: L.Polygon | null;
}

function MapInitializer({ bounds, onClick }: { bounds: L.LatLngBounds, onClick: (latlng: LatLngExpression) => void }) {
   const map = useMap();

   useEffect(() => {
      // init the map properly
      if (map) {
         // pan and zoom on the bounds 
         map.fitBounds(bounds);
         // set the min zoom distance according to the bounds
         const zoom = Math.floor(map.getBoundsZoom(bounds));
         map.setMinZoom(zoom);
      }
   }, []);

   useMapEvents({
      // add listeners
      click(e) {
         onClick([e.latlng.lat, e.latlng.lng]);
      }
   });

   return null;
}

export default function GameMap({ polygon }: GameMapProps) {
   if (!polygon) {
      console.error("Error: Polygon is null in GameMap component.");
      return null;
   }

   const bounds = polygon.getBounds();
   const polygonCoords = polygon.getLatLngs()[0] as LatLngExpression[];

   const [markers, setMarkers] = useState<[number, LatLngExpression][]>([]);

   const addMarkerRPC = 'add-marker';
   const setMarkersRPC = 'set-markers';

   initSocket(addMarkerRPC, (marker: [number, LatLngExpression]) => {
      setMarkers((current) => [...current, marker]);
   });
   initSocket(setMarkersRPC, (newMarkers: [number, LatLngExpression][]) => {
      setMarkers(newMarkers);
   });

   useEffect(() => {
      socket.emit('request-map-markers');
   }, []);

   return (
      <div className="gamemap">
         <MapContainer
            center={bounds.getCenter()}
            scrollWheelZoom={true}
            zoom={13}
            style={{ height: "100vh", width: "70vw", margin: "auto" }}
            maxBounds={bounds}
            maxBoundsViscosity={.8}
         >
            <MapInitializer
               bounds={bounds}
               onClick={(position) => {
                  socket.emit('add-marker', position);
               }}
            />

            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               minZoom={4}
            />

            {markers.map((marker) => (
               <Marker key={marker[0]} position={marker[1]}>
                  <Popup>
                     <div style={{ textAlign: 'center' }}>
                        <p>You clicked here! ({marker[1].toString()})</p>
                        <button
                           onClick={() => socket.emit('remove-marker', marker[0])}
                           style={{
                              backgroundColor: '#BF4C50',
                              color: 'white',
                              padding: '5px 10px',
                              border: 'none',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              marginTop: '0px'
                           }}
                        >
                           Delete
                        </button>
                     </div>
                  </Popup>
               </Marker>
            ))}

            <MapMask polygonCoords={polygonCoords} />
         </MapContainer>
      </div>
   );
}
