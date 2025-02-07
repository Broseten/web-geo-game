import { ServerIO } from "server/ServerIO";
import { BaseHandler } from "./BaseHandler";
import { GameRoom } from "server/GameRoom";

export class BaseRoomHandler extends BaseHandler {
   roomID: string;
   constructor(io: ServerIO, roomID: string) {
      super(io);
      this.roomID = roomID;
   }
   public getRoom(): GameRoom {
      return this.io.roomManager.getRoom(this.roomID)!;
   }
}
