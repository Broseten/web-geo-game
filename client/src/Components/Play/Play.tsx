// Authors: Vojtech Bruza and Grace Houser
// This file pieces together the entire pay screen,
// which includes the left game screen, map, and modals 

import { HStack } from "@chakra-ui/react";
import L from "leaflet";
import { useEffect, useMemo } from "react";
import { ProgressState, RoundStage } from "../../data/DataTypes";
import { socket } from "../../main";
import { useGameRoom } from "../Contexts/GameRoomContext";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import Game from "./Game/Game";
import GameMap from "./Map/GameMap";
import PlayModal from "./PlayModal";
import Voting from "./Voting/Voting";
import { global_playerID } from "../Contexts/ConnectionContext";

export default function Play() {
   const { setCurrentScreen } = useScreenSelection(); // Get the current screen from context
   const { roomInfo, gameRoomState, isFacilitator } = useGameRoom();

   const isFac = useMemo(() => isFacilitator(global_playerID), [global_playerID, isFacilitator]);

   useEffect(() => {
      // switch to the results screen if the game has finished
      if (gameRoomState?.gameState === ProgressState.Finished) {
         setCurrentScreen('end');
      }
   }, [gameRoomState]);

   return (
      <>
         {
            gameRoomState?.round.stageProgress === ProgressState.NotStarted && (
               <PlayModal
                  title="Round Starting"
                  message="The facilitator needs to start the round."
                  onButtonClick={isFac ? () => { socket.emit('progress-game'); } : undefined} // only pass for facilitator
                  facilitatorButtonText={isFac ? "Start Round" : undefined}  // same
               />
            )
         }
         {
            gameRoomState?.round.stageProgress === ProgressState.Finished && (
               <PlayModal
                  title="Round Finished"
                  message="Facilitator needs to progress to the next round."
                  onButtonClick={isFac ? () => { socket.emit('progress-game'); } : undefined} // only pass for facilitator
                  facilitatorButtonText={isFac ? "Next Round" : undefined}  // same
               />
            )
         }
         <HStack bg="brand.teal" align="flex.start">
            {
               gameRoomState?.round.stage === RoundStage.Placing
               &&
               <Game isFacilitator={isFac} />
            }
            {
               gameRoomState?.round.stage === RoundStage.Voting
               &&
               <Voting isFacilitator={isFac} />
            }

            {/* Adding in the Game Map */}
            <GameMap polygon={new L.Polygon(roomInfo?.polygonLatLngs)} />
         </HStack>
      </>
   );
}