import { MapMarkerData, Vote } from "server/DataTypes";
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
         this.io.socketServer.to(this.roomID).emit('marker-added', newMarker);
         this.markers.push(newMarker);
      });

      socket.on('remove-marker', (id: number) => {
         // TODO allow only owning player
         this.markers = this.markers.filter((marker) => marker.id !== id);
         this.io.socketServer.to(this.roomID).emit('set-markers', this.markers);
      });

      socket.on('vote', (vote: Vote) => {
         let updatedMarker: MapMarkerData | undefined;
         this.markers = this.markers.map((marker) => {
            if (marker.id === vote.markerID) {
               updatedMarker = {
                  ...marker,
                  // add the new vote to the existing votes
                  // create new array if it does not exist
                  votes: marker.votes ? [...marker.votes, vote] : [vote],
               };
               return updatedMarker; // Return the updated marker
            }
            return marker; // Return unchanged markers
         });
         if (updatedMarker) {
            // Emit updated marker to all clients in the room
            this.io.socketServer.to(this.roomID).emit('update-marker', updatedMarker);
         } else {
            console.error("Could not add vote... Marker does not exist.");
            console.error(vote);
         }
      });
   }
}
