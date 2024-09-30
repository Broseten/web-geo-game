import { useEffect } from "react";
import { socket } from "../main";

// well this it not perfect, but simplifies the registration for us at least for now
export default function initSocket(eventName: string, eventHandler: (data: any) => void) {
   useEffect(() => {
      socket.on(eventName, eventHandler);
      return () => {
         // Clean up the event listener on unmount
         socket.off(eventName, eventHandler);
      };
   }, []); // empty array to execute this only once on refresh
}