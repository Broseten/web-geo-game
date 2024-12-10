import L, { LatLngExpression } from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { socket } from "../../../main";
import MapInitializer from "./MapInitializer";
import MapMask from "./MapMask";
import MarkersLayer from "./MarkersLayer";

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

   const bounds = polygon.getBounds();
   const polygonCoords = polygon.getLatLngs()[0] as LatLngExpression[];

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
            maxBoundsViscosity={0.8}
         >
            <MapInitializer bounds={bounds} />

            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               minZoom={3}
            />

            <MarkersLayer />

            <MapMask polygonCoords={polygonCoords} />
         </MapContainer>
      </div>
   );
}
