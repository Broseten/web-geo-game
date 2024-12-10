import { useToast } from "@chakra-ui/react";
import { LatLng } from "leaflet";
import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { MapMarkerData, RoundStage } from "../../../data/DataTypes";
import { socket } from "../../../main";
import { useGameRoom } from "../../Contexts/GameRoomContext";
import { useLocalGameData } from "../../Contexts/LocalGameContext";
import { global_playerID } from "../../Contexts/ConnectionContext";

interface MapInitializerProps {
   bounds: L.LatLngBounds;
}

export default function MapInitializer({ bounds }: MapInitializerProps) {
   const { selectedSolutionID, setSelectedSolutionID } = useLocalGameData();
   const { gameRoomState } = useGameRoom();
   const toast = useToast();
   const map = useMap();

   const onMapClicked = (position: LatLng) => {
      if (gameRoomState?.round.stage === RoundStage.Voting) {
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
      if (!gameRoomState) {
         console.error("gameRoomState does not exist.");
         return;
      }
      const roundIndex = gameRoomState.round.index;
      // Add new marker
      let data: MapMarkerData = {
         coordinates: { lat: position.lat, lng: position.lng },
         id: -1,
         solutionID: selectedSolutionID,
         ownerPlayerID: global_playerID!,
         roundIndex: roundIndex,
         votes: [],
      };
      // reset selected solution
      setSelectedSolutionID(null);
      socket.emit('add-marker', data);
   };

   useEffect(() => {
      if (map) {
         map.fitBounds(bounds);
         const zoom = Math.floor(map.getBoundsZoom(bounds));
         map.setMinZoom(zoom);
      }
   }, [bounds]);

   useMapEvents({
      click(e) {
         onMapClicked(e.latlng);
      }
   });

   return null;
}
