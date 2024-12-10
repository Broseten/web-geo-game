import { ServerIO } from "server/ServerIO";
import { Socket } from "socket.io";

export class BaseHandler {

   constructor(protected io: ServerIO) {
      this.io = io;
   }

   // 'virtual'
   public startListeners(socket: Socket) {

   }
}

