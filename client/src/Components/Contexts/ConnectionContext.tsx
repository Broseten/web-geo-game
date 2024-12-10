import { createContext, ReactNode, useContext, useState } from "react";
import initSocket from "../../Hooks/useSocket";
import { socket } from "../../main";
import { v4 } from "uuid";

interface ConnectionContextProps {
   isConnected: boolean;
}

const ConnectionContext = createContext<ConnectionContextProps | undefined>(undefined);

export let global_playerID: string | undefined = undefined;

interface LastSessionData {
   playerID: string;
}

export const ConnectionProvider = ({ children }: { children: ReactNode }) => {
   const [isConnected, setIsConnected] = useState(false);

   // on connected
   initSocket('connect', () => {
      setIsConnected(true);

      // load cookie
      const lastSessionData = sessionStorage.getItem('lastSession');
      if (lastSessionData) {
         const { playerID }: LastSessionData = JSON.parse(lastSessionData);
         global_playerID = playerID;
         console.log("reconnecting with:" + playerID);
         socket.emit('reconnect', playerID);
      } else {
         // create new if no saved
         const newSessiondata: LastSessionData = {
            playerID: v4()
         }
         global_playerID = newSessiondata.playerID;
         console.log("Saving session: " + newSessiondata.playerID);
         sessionStorage.setItem('lastSession', JSON.stringify(newSessiondata));
      }
   });

   initSocket('reconnected', () => {
      // load cookie
      const lastRoomData = sessionStorage.getItem('lastRoom');
      if (lastRoomData) {
         // try joining room
         console.log("Rejoining room");
         const { lastRoomID } = JSON.parse(lastRoomData);

         // Emit reconnect event to the server
         socket.emit('join-room', lastRoomID);
      }
   });

   // on disconnected
   initSocket('disconnect', () => {
      setIsConnected(false);
   });

   return (
      <ConnectionContext.Provider value={{ isConnected }}>
         {children}
      </ConnectionContext.Provider>
   );
};

export const useConnection = () => {
   const context = useContext(ConnectionContext);
   if (!context) {
      throw new Error("useConnection must be used within a ConnectionProvider");
   }
   return context;
};
