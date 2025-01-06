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
         // use the v4 id generated previously instead of the socket ID
         global_playerID = playerID;
         console.log("reconnecting with:" + playerID);
         socket.emit('reconnect', playerID);
      } else {
         // no session was saved
         // create new session
         const newSessiondata: LastSessionData = {
            playerID: v4()
         }
         console.log("Saving session: " + newSessiondata.playerID);
         sessionStorage.setItem('lastSession', JSON.stringify(newSessiondata));
         // for now use the assigned socket ID instead of the v4
         global_playerID = socket.id;
      }
   });

   initSocket('reconnected', () => {
      console.log("welcome back");
      // // load cookie
      // const lastRoomData = sessionStorage.getItem('lastRoom');
      // if (lastRoomData) {
      //    // try joining room
      //    console.log("Rejoining room");
      //    const { lastRoomID } = JSON.parse(lastRoomData);

      //    // Emit reconnect event to the server
      //    socket.emit('join-room', lastRoomID);
      // }
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
