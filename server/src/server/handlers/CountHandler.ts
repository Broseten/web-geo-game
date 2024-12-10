import { Server, Socket } from "socket.io";
import { BaseHandler } from "./BaseHandler";

export class CountHandler extends BaseHandler {
   // state of the server (test variable)
   private count = 0;

   override startListeners(socket: Socket): void {
      socket.on('init-count', () => {
         // send data back to the specific client
         socket.emit('init-count-client', this.count);
      });

      socket.on('count', () => {
         this.count += 1;
         this.io.socketServer.sockets.emit('countClient', this.count);
      });
   }
}
