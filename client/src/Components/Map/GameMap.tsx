import { useState, useRef, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MapMask from "./MapMask";
import { socket } from "../../main";
import initSocket from "../../Hooks/useSocket";

// TODO custom icons for different solutions
let DefaultIcon = L.icon({
   iconSize: [25, 41],
   iconAnchor: [10, 41],
   popupAnchor: [2, -40],
   iconUrl: icon,
   shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle clicks and add markers
function ClickHandler({ onClick }: { onClick: (latlng: LatLngExpression) => void }) {
   useMapEvents({
      click(e) {
         onClick([e.latlng.lat, e.latlng.lng]);
      },
   });
   return null;
}

function GameMap() {
   // map bounds (display a "background" around this area)
   const bounds = L.latLngBounds(
      L.latLng(53.261616, -6.496525), // Southwest corner
      L.latLng(53.40118, -6.03441)  // Northeast corner
   );

   const gameMapRef = useRef(null);
   // stores positions of all markers, use setMarkers to set it and notify React to rerender the page
   // TODO maybe make the marker a specific type instead of a tuple
   const [markers, setMarkers] = useState<[number, LatLngExpression][]>([]);
   // TODO useSocket custom hook?

   const addMarkerRPC = 'add-marker';
   const setMarkersRPC = 'set-markers';

   // add a marker
   initSocket(addMarkerRPC, (marker: [number, LatLngExpression]) => { setMarkers((current) => [...current, marker]); });
   // set markers (update or init)
   initSocket(setMarkersRPC, (newMarkers: [number, LatLngExpression][]) => { setMarkers(newMarkers); });

   useEffect(() => {
      // request the initial state
      socket.emit('request-map-markers');
   }, []);

   return (
      <div className="gamemap">
         <MapContainer
            center={[53.3484000, -6.2539000]}
            zoom={13}
            scrollWheelZoom={true}
            ref={gameMapRef}
            style={{ height: "100vh", width: "75vw",
               marginLeft: "auto", 
               marginRight: "auto", 
               marginTop: "auto", 
               marginBottom: "auto"
            }}
            maxBounds={bounds}
            maxBoundsViscosity={1.0} // Enforces bounds restriction
         >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               minZoom={12}
            />

            <ClickHandler onClick={(position) => {
               socket.emit('add-marker', position);
            }
            } />

            {markers.map((marker) => (
               <Marker key={marker[0]} position={marker[1]}>
                  <Popup>
                     <div style={{ textAlign: 'center' }}>
                        <p>You clicked here! ({marker[1].toString()})</p>
                        <button
                           onClick={() => socket.emit('remove-marker', marker[0])}
                           style={{
                              backgroundColor: '#BF4C50', /* Green background */
                              color: 'white', /* White text */
                              padding: '5px 10px', /* Some padding */
                              border: 'none', /* Remove border */
                              borderRadius: '5px', /* Rounded corners */
                              cursor: 'pointer', /* Pointer on hover */
                              marginTop: '0px' /* Space between text and button */
                           }}
                        >
                           Delete
                        </button>
                     </div>
                  </Popup>

               </Marker>
            ))}

            <MapMask bounds={bounds} />
         </MapContainer>
      </div>
   );
}

export default GameMap;
