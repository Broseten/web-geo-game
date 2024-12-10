import { useToast } from "@chakra-ui/react";
import L, { LatLng, LatLngExpression } from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MapMarkerData } from "../../../data/DataTypes";
import { socket } from "../../../main";
import { useLocalGameData } from "../../Contexts/LocalGameContext";
import MapInitializer from "./MapInitializer";
import MapMarker from "./MapMarker";
import MapMask from "./MapMask";

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
   voting: boolean;
}

export default function GameMap({ polygon, voting }: GameMapProps) {
   if (!polygon) {
      console.error("Error: Polygon is null in GameMap component.");
      return null;
   }
   const toast = useToast();
   const { selectedSolutionID, setSelectedSolutionID } = useLocalGameData();
   const { markers } = useLocalGameData();

   const bounds = polygon.getBounds();
   const polygonCoords = polygon.getLatLngs()[0] as LatLngExpression[];

   useEffect(() => {
      socket.emit('request-map-markers');
   }, []);

   const onMapClicked = (position: LatLng) => {
      if (voting) {
         console.log("Cannot place solution markers while voting.");
         return;
      }
      if (!selectedSolutionID) {
         toast({
            title: "No solution selected",
            status: 'info',
            isClosable: true,
         });
         console.log("No solution selected.");
         return;
      }
      // Add new marker
      let data: MapMarkerData = {
         coordinates: { lat: position.lat, lng: position.lng },
         id: -1,
         solutionID: selectedSolutionID,
         // TODO use locally stored ID instead of directly reading it from the socket
         ownerPlayerID: socket.id!
      }
      // reset selected solution
      setSelectedSolutionID(null);
      socket.emit('add-marker', data);
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
                  voting={voting}
               />
            ))}

            <MapMask polygonCoords={polygonCoords} />
         </MapContainer>
      </div>
   );
}
