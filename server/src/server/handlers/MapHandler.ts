import { MapMarkerData } from "server/DataTypes";
import { Socket } from "socket.io";
import { BaseRoomHandler } from "./BaseRoomHandler";

export class MapHandler extends BaseRoomHandler {
   private markers: MapMarkerData[] = [];
   private markerIDCounter = 0;

   override startListeners(socket: Socket) {
      socket.on('request-map-markers', () => {
         socket.emit('set-markers', this.markers);
      });

      socket.on('add-marker', (newMarker: MapMarkerData) => {
         this.markerIDCounter += 1;
         let id = this.markerIDCounter;
         newMarker.id = id;
         this.io.to(this.roomID).emit('marker-added', newMarker);
         this.markers.push(newMarker);
      });

      socket.on('remove-marker', (id: number) => {
         // TODO allow only owning player
         this.markers = this.markers.filter((marker) => marker.id !== id);
         this.io.to(this.roomID).emit('set-markers', this.markers);
      });
   }
}
