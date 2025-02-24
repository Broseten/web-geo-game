import { useToast } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getSolution } from "../../data/data";
import { MapMarkerData } from "../../data/DataTypes";
import { useConnection } from "./ConnectionContext";
import { useGameRoom } from "./GameRoomContext";

interface GameMarkersContextProps {
   markers: MapMarkerData[];
   getPlayerSpentBudget: (playerID: string | undefined) => number;
   getRemainingVotes: () => number;
   allPlayersFinishedVoting: boolean;
}

const GameMarkersContext = createContext<GameMarkersContextProps | undefined>(undefined);

export const GameMarkersProvider = ({ children }: { children: ReactNode }) => {
   const [markers, setMarkers] = useState<MapMarkerData[]>([]);
   const toast = useToast();
   const { useSocketEvent, localPlayerID } = useConnection();
   const { roomInfo, gameRoomState, players } = useGameRoom();
   const [allPlayersFinishedVoting, setAllPlayersFinishedVoting] = useState(false);

   const getRemainingVotes = () => {
      // add only votes from the local player
      return markers.reduce((acc, marker) => {
         return acc + marker.votes.reduce((voteAcc, vote) => {
            return vote.playerID === localPlayerID && vote.roundIndex === gameRoomState?.round.index ? voteAcc + 1 : voteAcc;
         }, 0);
      }, 0);
   };

   const getPlayerSpentBudget = (playerID: string | undefined): number => {
      return markers.reduce((acc, marker) => {
         // sum the prices of all solutions belonging to that player markers
         const price = marker.ownerPlayerID === playerID ? getSolution(marker.solutionID)?.price : 0;
         return acc + (price ? price : 0);
      }, 0);
   };

   const checkAllPlayersFinished = () => {
      //  all player votes for the current round
      const playerVotesInRound = markers
         .flatMap(marker => marker.votes.filter(v => v.roundIndex === gameRoomState?.round.index))
         .reduce((voteCounts, vote) => {
            voteCounts[vote.playerID] = (voteCounts[vote.playerID] || 0) + 1;
            return voteCounts;
         }, {} as Record<string, number>);

      // check if each player has more then `maxVotes`
      const allReached = players.length > 0 && players.every(
         p => playerVotesInRound[p.id] >= (roomInfo?.maxVotes || 0)
      );
      return allReached;
   };

   useEffect(() => {
      // check only on marker update (updated votes)
      setAllPlayersFinishedVoting(checkAllPlayersFinished());
   }, [markers]);

   useSocketEvent('marker-added', (marker: MapMarkerData) => {
      setMarkers((current) => [...current, marker]);
   });

   useSocketEvent('marker-error', (msg: string) => {
      // TODO use global error messages instead of marker-error
      toast({
         title: msg,
         status: 'error',
         isClosable: true,
      });
   });

   useSocketEvent('update-marker', (updatedMarker: MapMarkerData) => {
      setMarkers((prevMarkers) =>
         prevMarkers.map((marker) =>
            marker.id === updatedMarker.id ? updatedMarker : marker
         )
      );
   });

   useSocketEvent('set-markers', (newMarkers: MapMarkerData[]) => {
      setMarkers(newMarkers);
   });

   return (
      <GameMarkersContext.Provider value={
         {
            markers,
            getPlayerSpentBudget,
            getRemainingVotes,
            allPlayersFinishedVoting
         }
      }>
         {children}
      </GameMarkersContext.Provider>
   );
};

export const useGameMarkers = () => {
   const context = useContext(GameMarkersContext);
   if (!context) {
      throw new Error("useGameMarkers must be used within a GameMarkersProvider");
   }
   return context;
};
