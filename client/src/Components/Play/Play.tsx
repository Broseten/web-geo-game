// Authors: Vojtech Bruza and Grace Houser
// This file pieces together the entire pay screen,
// which includes the left game screen, map, and modals 

import { Box, Divider, Heading, HStack, VStack } from "@chakra-ui/react";
import L from "leaflet";
import { useMemo } from "react";
import { ProgressState, RoundStage } from "../../data/DataTypes";
import { socket } from "../../main";
import { global_playerID } from "../Contexts/ConnectionContext";
import { useGameRoom } from "../Contexts/GameRoomContext";
import Game from "./Game/Game";
import GameMap from "./Map/GameMap";
import PlayModal from "./PlayModal";
import Voting from "./Voting/Voting";
import { global_app_name } from "../../data/data";

export default function Play() {
   const { roomInfo, gameRoomState, isFacilitator } = useGameRoom();
   const isFac = useMemo(() => isFacilitator(global_playerID), [global_playerID, isFacilitator]);

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
         <HStack bg="primary.500" align="flex-start" h="100vh">

            {/* Left Sidebar */}
            <VStack
               align={"top"}
               width={{
                  // TODO make this fullscreen for mobile (base)
                  base: '300px',  // For mobile (sm and below)
                  md: '300px',    // For larger (md and above)
               }}
               flexShrink={0}
            >

               {/* Logo at top */}
               <Heading bg="none" pt="5px" textAlign="center"
                  fontSize="18px" fontFamily="Avenir Next" fontWeight="bold">
                  {global_app_name}
               </Heading>

               {/* Game or voting */}
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
            </VStack>

            {/* Game Map */}
            <Box flex="1" height="100vh">
               <GameMap polygon={new L.Polygon(roomInfo?.polygonLatLngs)} />
            </Box>
         </HStack >
      </>
   );
}