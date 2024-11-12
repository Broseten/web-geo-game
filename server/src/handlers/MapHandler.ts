import { Server, Socket } from "socket.io";
import { BaseHandler } from "./BaseHandler";

export class MapHandler extends BaseHandler {
   // array of tuples (number, any)
   private markers: [number, any][] = [];
   private markerIDCounter = 0;

   override initHandlers(socket: Socket) {
      socket.on('request-map-markers', () => {
      socket.emit('set-markers', this.markers);
      });

      socket.on('add-marker', (position: any) => {
         this.markerIDCounter += 1;
         let id = this.markerIDCounter;
         let marker: [number, any] = [id, position];
         this.io.sockets.emit('add-marker', marker);
         this.markers.push(marker);
      });

      socket.on('remove-marker', (id: number) => {
         this.markers = this.markers.filter((marker) => marker[0] !== id);
         this.io.sockets.emit('set-markers', this.markers);
      });
   }
}
