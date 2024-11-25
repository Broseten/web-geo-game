// Authors: Vojtech Bruza and Grace Houser
// This file pieces together the entire pay screen,
// which includes the left game screen, map, and modals 

import { HStack } from "@chakra-ui/react";
import L from "leaflet";
import { RoundStage } from "../../data/DataTypes";
import { useGameRoom } from "../Contexts/GameRoomContext";
import Game from "./Game/Game";
import GameMap from "./Map/GameMap";
import PlayModal from "./PlayModal";
import Voting from "./Voting/Voting";

// TODO get rid of this, instead move it to connection context
interface Play {
   isConnected: boolean;
}

export default function Play({ isConnected }: Play) {
   console.log("connected: " + isConnected);
   const { roomInfo, gameRoomState } = useGameRoom();

   {/* Section left of the game map */ }
   return (
      <HStack bg="brand.teal" align="flex.start">

         <PlayModal />

         {gameRoomState?.round.stage === RoundStage.Placing && <Game />}
         {gameRoomState?.round.stage === RoundStage.Voting && <Voting />}

         {/* Adding in the Game Map */}
         <GameMap polygon={new L.Polygon(roomInfo?.polygonLatLngs)} />
      </HStack>
   );
}