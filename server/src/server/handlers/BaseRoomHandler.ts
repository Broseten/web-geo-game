import { Server } from "socket.io";
import { BaseHandler } from "./BaseHandler";

export class BaseRoomHandler extends BaseHandler {
   roomID: string;
   constructor(io: Server, roomID: string) {
      super(io);
      this.roomID = roomID;
   }
}
