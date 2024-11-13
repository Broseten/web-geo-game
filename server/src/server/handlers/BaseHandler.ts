import { Server, Socket } from "socket.io";

export class BaseHandler {
   io: Server;

   constructor(io: Server) {
      this.io = io;
   }

   // 'virtual'
   public startListeners(socket: Socket) {

   }
}

