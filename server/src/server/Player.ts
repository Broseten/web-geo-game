import { Socket } from 'socket.io';
import { PlayerData } from '../DataTypes';

export class Player {
   // TODO use player data from the shared project?
   public id: string;
   public role: string;
   public color: string;
   public name: string;
   private socket: Socket;

   constructor(socket: Socket, role: string, color: string, name: string) {
      this.id = socket.id;
      this.role = role;
      this.color = color;
      this.name = name;
      this.socket = socket;
   }

   update(playerData: PlayerData) {
      this.name = playerData.name;
      this.color = playerData.color;
      this.role = playerData.role;
   }

   // Method to retrieve player's socket for emitting messages, etc.
   getSocket(): Socket {
      return this.socket;
   }
}
