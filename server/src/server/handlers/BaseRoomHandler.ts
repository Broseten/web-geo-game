import { ServerIO } from "server/ServerIO";
import { BaseHandler } from "./BaseHandler";

export class BaseRoomHandler extends BaseHandler {
   roomID: string;
   constructor(io: ServerIO, roomID: string) {
      super(io);
      this.roomID = roomID;
   }
}
