import { Socket } from "socket.io";
import { BaseRoomHandler } from "./BaseRoomHandler";

export class MapHandler extends BaseRoomHandler {
   // array of tuples (id, position)
   // TODO use position type instead of any
   private markers: [number, any][] = [];
   private markerIDCounter = 0;

   override startListeners(socket: Socket) {
      socket.on('request-map-markers', () => {
         socket.emit('set-markers', this.markers);
      });

      socket.on('add-marker', (position: any) => {
         this.markerIDCounter += 1;
         let id = this.markerIDCounter;
         let marker: [number, any] = [id, position];
         this.io.to(this.roomID).emit('add-marker', marker);
         this.markers.push(marker);
      });

      socket.on('remove-marker', (id: number) => {
         this.markers = this.markers.filter((marker) => marker[0] !== id);
         this.io.to(this.roomID).emit('set-markers', this.markers);
      });
   }
}
