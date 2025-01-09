// Authors: Vojtech Bruza and Grace Houser
// This file displays a room's lobby 

import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { GameRoomState } from "../../data/DataTypes";
import initSocket from "../../Hooks/useSocket";
import { socket } from "../../main";
import { useGameRoom } from "../Contexts/GameRoomContext";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import UserList from "./UserList";
import { global_playerID } from "../Contexts/ConnectionContext";

export default function Lobby() {
   const { roomID, roomInfo, isFacilitator, setGameRoomState } = useGameRoom();
   const { setCurrentScreen } = useScreenSelection();

   initSocket('start-game', (roomState: GameRoomState) => {
      setGameRoomState(roomState);
      setCurrentScreen("play");
   });

   useEffect(() => {
      socket.emit("request-room-players-info", roomID);
   }, []);

   return (
      <Flex
         direction="column"
         align="center"
         justify="top"
         w="100%"
         h="100%" // ensure it takes full height
         px={4}
      >
         <Text
            pt={10}
            fontSize={{ base: "xl", sm: "4xl" }}
            fontWeight="bold"
            color="primary.500"
            textAlign="center"
         >
            Welcome to the {roomInfo ? roomInfo.name : "unknown"} lobby!
         </Text>
         <Text pb={10} fontSize="md" color="gray.900" textAlign="center">
            {isFacilitator(global_playerID)
               ? "Start the game when all players are ready."
               : "The facilitator will start the game when everyone is ready."}
         </Text>

         {/* User List */}
         <UserList />

         {/* Start Game Button */}
         {isFacilitator(global_playerID) && (
            <Button
               mt={10}
               colorScheme="primary" variant="solid" 
               onClick={() => {
                  socket.emit("progress-game");
               }}
            >
               Play
            </Button>
         )}
      </Flex>
   );
}
