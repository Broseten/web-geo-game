import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { DefaultEventsMap } from "socket.io";
import { io, Socket } from "socket.io-client";
import { v4 } from "uuid";
import { getStorage } from "../../data/data";

interface ConnectionContextProps {
   isConnected: boolean;
   localPlayerID: string | undefined;
   socket: Socket<DefaultEventsMap, DefaultEventsMap>;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   useSocketEvent: (eventName: string, eventHandler: (data: any) => void) => void;
}

const ConnectionContext = createContext<ConnectionContextProps | undefined>(undefined);

interface LastSessionData {
   playerID: string;
}

const protocol = window.location.protocol === 'https:' ? 'https' : 'http';

let serverPort: string;
if (process.env.NODE_ENV === 'production') {
   // In production: use window.location.port (no port if using domain name), with a colon if present
   const port = window.location.port;
   serverPort = port ? `:${port}` : '';
} else {
   // In development: use import.meta.env.PORT or default to 1336, always with a colon
   const port = import.meta.env.VITE_PORT || '1336';
   serverPort = `:${port}`;
}

export const socketServerURL = `${protocol}://${window.location.hostname}${serverPort}`;

function savePlayerID(id: string) {
   const newSessiondata: LastSessionData = {
      playerID: id
   };
   getStorage().setItem('lastSession', JSON.stringify(newSessiondata));
   return newSessiondata;
}

export const ConnectionProvider = ({ children }: { children: ReactNode }) => {
   const [isConnected, setIsConnected] = useState(false);
   const [localPlayerID, setLocalPlayerID] = useState<string | undefined>(undefined);
   const [socket] = useState<Socket>(io(socketServerURL, { autoConnect: false }));

   useEffect(() => {
      socket.connect();
      return () => {
         socket.disconnect();
      }
   }, [socket]);

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const useSocketEvent = (eventName: string, eventHandler: (data: any) => void) => {
      // well this it not perfect, but simplifies the registration for us at least for now
      useEffect(() => {
         socket.on(eventName, eventHandler);
         return () => {
            // Clean up the event listener on unmount
            socket.off(eventName, eventHandler);
         };
      }, [eventHandler, eventName]); // empty array to execute this only once on refresh
   }

   // on connected
   useSocketEvent('connect', () => {
      setIsConnected(true);

      // load cookie
      const lastSessionData = getStorage().getItem('lastSession');
      if (lastSessionData) {
         let { playerID }: LastSessionData = JSON.parse(lastSessionData);
         if (!playerID) {
            // if for some reason we saved wrong player id on this machine, than try to generate new
            playerID = savePlayerID(v4()).playerID;
         }
         // use the v4 id generated previously instead of the socket ID
         setLocalPlayerID(playerID);
         console.log("reconnecting with:" + playerID);
         socket.emit('reconnect', playerID);
      } else {
         // no session was saved
         // create new session
         // use generated socket id as the permanent player ID
         const newSessiondata: LastSessionData = savePlayerID(socket.id!);
         setLocalPlayerID(newSessiondata.playerID);
      }
   });

   useSocketEvent('reconnected', () => {
      console.log("welcome back");
      // // load cookie
      // const lastRoomData = getStorage().getItem('lastRoom');
      // if (lastRoomData) {
      //    // try joining room
      //    console.log("Rejoining room");
      //    const { lastRoomID } = JSON.parse(lastRoomData);

      //    // Emit reconnect event to the server
      //    socket.emit('join-room', lastRoomID);
      // }
   });

   // on disconnected
   useSocketEvent('disconnect', () => {
      setIsConnected(false);
   });

   return (
      <ConnectionContext.Provider value={{
         isConnected,
         localPlayerID,
         socket,
         useSocketEvent
      }}>
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

