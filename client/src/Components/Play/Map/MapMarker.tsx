import { Box, Button, Text } from "@chakra-ui/react";
import { Marker, Popup } from "react-leaflet";
import { MapMarkerData } from "../../../data/DataTypes";
import { global_solutions } from "../../../data/data";
import { useGameRoom } from "../../Contexts/GameRoomContext";
import { useLocalGameData } from "../../Contexts/LocalGameContext";

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

   return (
      <Marker
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
                  <Text fontSize="14px" as="b">{global_solutions.find((sol) => sol.id === marker.solutionID)?.name}</Text>
                  {/* Container for buttons */}
                  <Box display="flex" flexDirection="row" alignItems="flex-end"
                     justifyContent="flex-start" gap={2} mt={3}>
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
