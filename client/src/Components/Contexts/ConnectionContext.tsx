import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { DefaultEventsMap } from "socket.io";
import { io, Socket } from "socket.io-client";
import { v4 } from "uuid";

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
const port = process.env.NODE_ENV !== 'production' ? ':1336' : (window.location.port ? `:${window.location.port}` : '');
export const socketServerURL = `${protocol}://${window.location.hostname}${port}`;

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
      const lastSessionData = sessionStorage.getItem('lastSession');
      if (lastSessionData) {
         const { playerID }: LastSessionData = JSON.parse(lastSessionData);
         // use the v4 id generated previously instead of the socket ID
         setLocalPlayerID(playerID);
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
         setLocalPlayerID(socket.id);
      }
   });

   useSocketEvent('reconnected', () => {
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
