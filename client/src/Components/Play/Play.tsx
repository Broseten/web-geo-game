// Authors: Vojtech Bruza and Grace Houser
// This file pieces together the entire pay screen,
// which includes the left game screen, map, and modals 

import { HStack } from "@chakra-ui/react";
import L from "leaflet";
import { ProgressState, RoundStage } from "../../data/DataTypes";
import { useGameRoom } from "../Contexts/GameRoomContext";
import Game from "./Game/Game";
import GameMap from "./Map/GameMap";
import PlayModal from "./PlayModal";
import Voting from "./Voting/Voting";
import { socket } from "../../main";

// TODO get rid of this, instead move it to connection context
interface Play {
   isConnected: boolean;
}

export default function Play({ isConnected }: Play) {
   console.log("connected: " + isConnected);
   const { roomInfo, gameRoomState, isFacilitator } = useGameRoom();

   let isFac = isFacilitator(socket.id);

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
            {gameRoomState?.round.stage === RoundStage.Placing && <Game />}
            {gameRoomState?.round.stage === RoundStage.Voting && <Voting />}

            {/* Adding in the Game Map */}
            <GameMap polygon={new L.Polygon(roomInfo?.polygonLatLngs)} />
         </HStack>
      </>
   );
}