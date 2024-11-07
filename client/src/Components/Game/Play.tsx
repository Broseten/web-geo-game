import { HStack } from "@chakra-ui/react";
import { socket } from "../../main";
import GameMap from "../Map/GameMap";
import { useEffect, useState } from "react";
import initSocket from "../../Hooks/useSocket";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import GameModal from "./GameModal";
import Game from "./Game";
import Voting from "../Voting/Voting";

interface Play {
   isConnected: boolean;
}

export default function Play({ isConnected }: Play) {
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

         <GameModal />

         {/* TODO - can use isVoting to switch from Game.tsx and Voting.tsx */}
         {/* <Game /> */} {/* <Voting /> */}
         <Game />

         {/* Adding in the Game Map */}
         <GameMap />
      </HStack>
   );
}