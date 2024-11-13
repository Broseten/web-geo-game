import { Socket } from 'socket.io';
import { PlayerData } from 'web-geo-game-shared/dist/DataTypes';

export class Player {
   public data: PlayerData;  // Use PlayerData for the player's data structure
   private socket: Socket;

   constructor(socket: Socket, role: string, color: string, name: string) {
      this.data = {
         id: socket.id,  // Assign socket id as the player ID
         role,            // Set the player's role
         color,           // Set the player's color
         name             // Set the player's name
      };
      this.socket = socket;
   }

   // Method to update player's attributes using the PlayerData interface
   updateAttributes(role?: string, color?: string, name?: string): void {
      if (role) this.data.role = role;   // Update the player's role
      if (color) this.data.color = color; // Update the player's color
      if (name) this.data.name = name;   // Update the player's name
   }

   // Method to retrieve player's socket for emitting messages, etc.
   getSocket(): Socket {
      return this.socket;
   }

   public toJSON() {
      return JSON.stringify(this.data);
   }

   public fromJSON(string: string) {
      this.data = JSON.parse(string);
   }
}
