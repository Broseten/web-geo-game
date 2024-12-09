import L, { LatLng, LatLngExpression } from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import initSocket from "../../../Hooks/useSocket";
import { MapMarkerData } from "../../../data/DataTypes";
import { socket } from "../../../main";
import { useLocalGameData } from "../../Contexts/LocalGameContext";
import MapMarker from "./MapMarker";
import MapMask from "./MapMask";
import MapInitializer from "./MapInitializer";

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

export default function GameMap({ polygon }: GameMapProps) {
   if (!polygon) {
      console.error("Error: Polygon is null in GameMap component.");
      return null;
   }
   const { selectedSolutionID, setSelectedSolutionID } = useLocalGameData();
   const bounds = polygon.getBounds();
   const polygonCoords = polygon.getLatLngs()[0] as LatLngExpression[];

   const [markers, setMarkers] = useState<MapMarkerData[]>([]);

   initSocket('marker-added', (marker: MapMarkerData) => {
      setMarkers((current) => [...current, marker]);
   });

   initSocket('set-markers', (newMarkers: MapMarkerData[]) => {
      setMarkers(newMarkers);
   });

   useEffect(() => {
      socket.emit('request-map-markers');
   }, []);

   const onMapClicked = (position: LatLng) => {
      if (selectedSolutionID) {
         let data: MapMarkerData = {
            coordinates: { lat: position.lat, lng: position.lng },
            id: -1,
            solutionID: selectedSolutionID,
            // TODO use locally stored ID instead of directly reading it from the socket
            ownerPlayerID: socket.id!
         }
         setSelectedSolutionID(null);
         socket.emit('add-marker', data);
      }
      else {
         console.error("No solution selected");
      }
   }

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
               onClick={onMapClicked}
            />

            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               minZoom={3}
            />

            {markers.map((marker) => (
               <MapMarker
                  key={marker.id}
                  marker={marker}
               />
            ))}

            <MapMask polygonCoords={polygonCoords} />
         </MapContainer>
      </div>
   );
}
