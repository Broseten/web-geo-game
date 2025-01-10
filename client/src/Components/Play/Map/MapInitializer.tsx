// Author: Vojtech Bruza
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
      if (!bounds.contains(position)) {
         console.log("Clicked outside the allowed area.");
         return;
      }

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

   useEffect(() => {
      const mapElement = map.getContainer();

      const updateCursor = (e: L.LeafletMouseEvent) => {
         if (selectedSolutionID) {
            const isInsideBounds = bounds.contains(e.latlng);
            if (isInsideBounds) {
               mapElement.style.cursor = "crosshair";
            }
         } else {
            // explicitely reset cursor to default
            mapElement.style.cursor = "";
         }
      };

      map.on("mousemove", updateCursor);

      // Cleanup event listeners
      return () => {
         map.off("mousemove", updateCursor);
         mapElement.style.cursor = "";
      };
      // selectedSolutionID added to the dependency array to dynamically handle changes
   }, [map, bounds, selectedSolutionID]);

   useMapEvents({
      click(e) {
         onMapClicked(e.latlng);
      }
   });

   return null;
}
