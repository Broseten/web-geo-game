// Authors: Vojtech Bruza and Grace Houser
// This file displays a room's lobby 

import { Button, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { GameRoomState } from "../../data/DataTypes";
import LocaleSwitcher from "../../i18n/LanguageSwitcher";
import { useConnection } from "../Contexts/ConnectionContext";
import { useGameRoom } from "../Contexts/GameRoomContext";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import HomeButton from "../HomeButton";
import UserList from "./UserList";
import { useTranslation } from "react-i18next";

export default function Lobby() {
   const { t } = useTranslation();
   const { roomID, roomInfo, isFacilitator, setGameRoomState } = useGameRoom();
   const { setCurrentScreen } = useScreenSelection();
   const { socket, useSocketEvent, localPlayerID } = useConnection();

   useSocketEvent('start-game', (roomState: GameRoomState) => {
      setGameRoomState(roomState);
      setCurrentScreen("play");
   });

   useEffect(() => {
      socket.emit("request-room-players-info", roomID);
   }, [roomID, socket]);

   return (
      <Flex
         direction="column"
         align="center"
         justify="top"
         w="100%"
         h="100%" // ensure it takes full height
         px={4}
      >
         <LocaleSwitcher />
         <Text
            pt={10}
            fontSize={{ base: "xl", sm: "4xl" }}
            fontWeight="bold"
            color="primary.500"
            textAlign="center"
         >
            {
               t('lobby.welcome-message', {
                  roomName: roomInfo ? roomInfo.name : 'unknown'
               })
            }
         </Text>
         <Text pb={10} fontSize="md" color="gray.900" textAlign="center">
            {isFacilitator(localPlayerID)
               ? "Start the game when all players are ready."
               : "The facilitator will start the game when everyone is ready."}
         </Text>

         {/* User List */}
         <UserList />

         {/* Start Game Button */}
         {isFacilitator(localPlayerID) && (
            <Button
               mt={10}
               colorScheme="primary" variant="solid"
               onClick={() => {
                  socket.emit("progress-game");
               }}
            >
               {t('generic.button.play')}
            </Button>
         )}

         {/* home button at the top */}
         <HomeButton />
      </Flex>
   );
}
