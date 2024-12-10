import { Box, Button, Text } from "@chakra-ui/react";
import { Marker, Popup } from "react-leaflet";
import { MapMarkerData } from "../../../data/DataTypes";
import { global_solutions } from "../../../data/data";
import { socket } from "../../../main";
import { useLocalGameData } from "../../Contexts/LocalGameContext";

interface MapMarkerProps {
   marker: MapMarkerData;
   voting: boolean;
}

export default function MapMarker({ marker, voting }: MapMarkerProps) {
   const { setSelectedSolutionID, setSelectedMarkerID } = useLocalGameData();

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
                  <Text as="b">{global_solutions.find((sol) => sol.id === marker.solutionID)?.name}</Text>

                  {/* Container for buttons */}
                  <Box
                     display="flex"
                     flexDirection="row"
                     alignItems="flex-end"
                     justifyContent="flex-end"
                     gap={2}
                     p={2}
                  >
                     <Button
                        onClick={() => setSelectedSolutionID(marker.solutionID)}
                        colorScheme="gray"
                        size="sm"
                     >
                        Select
                     </Button>

                     {marker.ownerPlayerID === socket.id && (
                        <Button
                           onClick={() => socket.emit("remove-marker", marker.id)}
                           colorScheme="red"
                           size="sm"
                        >
                           Delete
                        </Button>
                     )}
                  </Box>
               </Box>
            </Popup>
         )}
      </Marker>
   );
}
