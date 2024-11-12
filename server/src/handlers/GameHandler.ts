import { Socket } from "socket.io";
import { BaseHandler } from "./BaseHandler";

export class GameHandler extends BaseHandler {
   private timerSeconds = 0;
   private timerId: NodeJS.Timeout | null = null;

   override initHandlers(socket: Socket) {
      socket.on('request-timer-update', () => {
         socket.emit('timer-update', this.timerSeconds); // Send current timer to the requesting client
      });

      socket.on('start-timer', (seconds: number) => {
         this.timerSeconds = seconds;
         this.startTimer();
      });
   }

   private startTimer() {
      if (this.timerId !== null) {
         clearTimeout(this.timerId);
         this.timerId = null;
      }
      this.doTimer();
   }

   private async doTimer() {
      while (this.timerSeconds > 0) {
         this.io.emit('timer-update', this.timerSeconds); // Broadcast to all connected clients
         await this.delay(1000);
         this.timerSeconds--;
      }
      this.io.emit('timer-complete'); // Notify all clients when the timer ends
   }

   private delay(delay: number) {
      return new Promise<void>((resolve) => {
         this.timerId = setTimeout(resolve, delay);
      });
   }
}
