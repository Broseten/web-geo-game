import { Socket } from 'socket.io';

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

   // Method to update player's attributes
   updateAttributes(role?: string, color?: string, name?: string): void {
      if (role) this.role = role;
      if (color) this.color = color;
      if (name) this.name = name;
   }

   // Method to retrieve player's socket for emitting messages, etc.
   getSocket(): Socket {
      return this.socket;
   }
}
