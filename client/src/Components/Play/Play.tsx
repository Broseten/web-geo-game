// Authors: Vojtech Bruza and Grace Houser
// This file pieces together the entire pay screen,
// which includes the left game screen, map, and modals 

import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import L from "leaflet";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { global_app_name } from "../../data/data";
import { ProgressState, RoundStage } from "../../data/DataTypes";
import { useConnection } from "../Contexts/ConnectionContext";
import { useGameRoom } from "../Contexts/GameRoomContext";
import Game from "./Game/Game";
import GameMap from "./Map/GameMap";
import PlayModal from "./PlayModal";
import Voting from "./Voting/Voting";

export default function Play() {
   const { t } = useTranslation();
   const { roomInfo, gameRoomState, isFacilitator } = useGameRoom();
   const { socket, localPlayerID } = useConnection();
   const isFac = useMemo(() => isFacilitator(localPlayerID), [localPlayerID, isFacilitator]);

   const getModalWindowPopup = () => {
      switch (gameRoomState?.round.stageProgress) {
         case ProgressState.NotStarted:
            switch (gameRoomState.round.stage) {
               case RoundStage.Placing:
                  return <PlayModal
                     title={t('game.modal.start.placement.title')}
                     message={[t('game.modal.start.placement.message'), t('game.modal.start.placement.tip'), t('game.modal.start.placement.message2')]}
                     onButtonClick={isFac ? () => { socket.emit('progress-game'); } : undefined} // only pass for facilitator
                     facilitatorButtonText={isFac ? t('game.modal.start.placement.button') : undefined}  // same
                  />;
               case RoundStage.Voting:
                  return <PlayModal
                     title={t('game.modal.start.voting.title')}
                     message={[t('game.modal.start.voting.message'), t('game.modal.start.voting.message2')]}
                     onButtonClick={isFac ? () => { socket.emit('progress-game'); } : undefined} // only pass for facilitator
                     facilitatorButtonText={isFac ? t('game.modal.start.voting.button') : undefined}  // same
                  />;
               default:
                  break;
            }
            break;
         case ProgressState.Finished:
            return <PlayModal
               title={t('game.modal.end.title')}
               message={[t('game.modal.end.message')]}
               onButtonClick={isFac ? () => { socket.emit('progress-game'); } : undefined} // only pass for facilitator
               facilitatorButtonText={isFac ? t('game.modal.end.button') : undefined}  // same
            />;
         default:
            break;
      }
   }
   return (
      <>
         {getModalWindowPopup()}
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
                  fontSize="18px" color="gray.900" fontWeight="bold">
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