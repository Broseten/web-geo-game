// Authors: Vojta Bruza and Grace Houser
// This file pieces together the entire pay screen,
// which includes the left game screen, map, and modals 

import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import initSocket from "../../Hooks/useSocket";
import { socket } from "../../main";
import { useGameRoom } from "../Contexts/GameRoomContext";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import Game from "./Game/Game";
import Voting from "./Voting/Voting";
import GameMap from "./Map/GameMap";
import PlayModal from "./PlayModal";
import L from "leaflet";

interface Play {
   isConnected: boolean;
}

export default function Play({ isConnected }: Play) {
   console.log("connected: " + isConnected);
   const { roomInfo } = useGameRoom();
   const { setCurrentScreen } = useScreenSelection();
   const [testCounter, setTestCounter] = useState(0);

   const isVoting = false;

   initSocket('countClient', (count: number) => setTestCounter(count));
   initSocket('init-count-client', (count: number) => setTestCounter(count));

   useEffect(() => {
      // init the state
      socket.emit('init-count');
   }, []);

   {/* Section left of the game map */ }
   return (
      <HStack bg="brand.teal" align="flex.start">

         <PlayModal />

         {/* TODO - can use isVoting to switch from Game.tsx and Voting.tsx */}
         {/* <Game /> */} {/* <Voting /> */}
         <Voting />

         {/* Adding in the Game Map */}
         <GameMap polygon={new L.Polygon(roomInfo?.polygonLatLngs)} />
      </HStack>
   );
}