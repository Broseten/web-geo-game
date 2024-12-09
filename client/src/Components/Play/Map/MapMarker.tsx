import { Marker, Popup } from "react-leaflet";
import { MapMarkerData } from "../../../data/DataTypes";
import { global_solutions } from "../../../data/data";
import { socket } from "../../../main";
import { useLocalGameData } from "../../Contexts/LocalGameContext";
import { Button, Box, Text } from "@chakra-ui/react"; // Import Chakra UI Box and Button

interface MapMarkerProps {
   marker: MapMarkerData;
}

export default function MapMarker({ marker }: MapMarkerProps) {
   const { setSelectedSolutionID } = useLocalGameData();

   return (
      <Marker key={marker.id} position={{ lat: marker.coordinates.lat, lng: marker.coordinates.lng }}>
         <Popup>
            <Box>
               <Text as='b'>{global_solutions.find((sol) => sol.id === marker.solutionID)?.name}</Text>

               {/* Container for buttons */}
               <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                  gap={2}
                  p={5}
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
                        onClick={() => socket.emit('remove-marker', marker.id)}
                        colorScheme="red"
                        size="sm"
                     >
                        Delete
                     </Button>
                  )}
               </Box>
            </Box>
         </Popup>
      </Marker>
   );
}
