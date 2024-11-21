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
   const { roomInfo, roundIndex } = useGameRoom();

   {/* Section left of the game map */ }
   return (
      <HStack bg="brand.teal" align="flex.start">

         <PlayModal />

         {roundIndex % 2 === 1 ? <Game /> : <Voting />}

         {/* Adding in the Game Map */}
         <GameMap polygon={new L.Polygon(roomInfo?.polygonLatLngs)} />
      </HStack>
   );
}