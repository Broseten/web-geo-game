import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Box, Button, Text } from "@chakra-ui/react";
import { Marker, Popup } from "react-leaflet";
import { MapMarkerData } from "../../../data/DataTypes";
import { getSolution } from "../../../data/data";
import { useGameRoom } from "../../Contexts/GameRoomContext";
import { useLocalGameData } from "../../Contexts/LocalGameContext";
import { coordsToString } from "../Voting/MarkerInfoCard";
import { getSolutionImagePath } from '../Game/SolutionInfoCard';

const defaultIcon = L.icon({
   iconSize: [25, 41],
   iconAnchor: [10, 41],
   popupAnchor: [2, -40],
   iconUrl: icon,
   shadowUrl: iconShadow
});

// L.Marker.prototype.options.icon = defaultIcon;

interface MapMarkerProps {
   marker: MapMarkerData;
   voting: boolean;
}

export default function MapMarker({ marker, voting }: MapMarkerProps) {
   const { gameRoomState } = useGameRoom();
   const { setSelectedMarkerID } = useLocalGameData();

   if (gameRoomState === null) {
      console.error("No game room state");
   }

   const solution = getSolution(marker.solutionID);

   const imagePath = getSolutionImagePath(solution?.image);

   const icon = !imagePath ? defaultIcon : L.icon({
      iconUrl: imagePath,
      iconSize: [32, 32],
      iconAnchor: [16, 16], // center
      popupAnchor: [0, -14], // top border
   });

   return (
      <Marker
         icon={icon}
         key={marker.id}
         position={{ lat: marker.coordinates.lat, lng: marker.coordinates.lng }}
         eventHandlers={{
            click: () => {
               if (voting) {
                  setSelectedMarkerID(marker.id);
               }
               // else will automatically show the popup
            },
         }}
      >
         {!voting && (
            <Popup>
               <Box>
                  <Text fontSize="14px" as="b">{solution?.name}</Text>
                  <Text fontSize="12.5px">
                     Location: {
                        coordsToString(marker.coordinates)
                     } <br />
                     Price: €{solution?.price} <br />
                     Placed in round: {marker.roundIndex + 1} <br />
                     Votes count: {marker.votes?.length || 0} <br />
                  </Text>
                  {/* Container for buttons */}
                  <Box display="flex" flexDirection="row" alignItems="flex-end"
                     justifyContent="center" gap={2} mt={3}>
                     <Button colorScheme="gray" size="sm"
                        onClick={() =>
                           setSelectedMarkerID(marker.id)
                        }
                     >
                        Show More Info
                     </Button>
                  </Box>
               </Box>
            </Popup>
         )}
      </Marker>
   );
}
