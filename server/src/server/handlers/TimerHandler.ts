import { Socket } from "socket.io";
import { BaseRoomHandler } from "./BaseRoomHandler";

export class TimerHandler extends BaseRoomHandler {
   private timerSeconds = 0;
   private timerId: NodeJS.Timeout | null = null;
   private onTimeOut: (() => void) | null = null;

   override startListeners(socket: Socket) {
      socket.on('request-timer-update', () => {
         socket.emit('timer-update', this.timerSeconds); // Send current timer to the requesting client
      });
   }

   public startTimer(seconds: number, onTimerEnd: () => void) {
      this.tryStopTimer()
      this.timerSeconds = seconds;
      this.onTimeOut = onTimerEnd;
      this.doTimer();
   }

   public tryStopTimer() {
      if (this.timerId !== null) {
         clearTimeout(this.timerId);
         this.timerId = null;
         this.onTimeOut = null;
      }
   }

   private async doTimer() {
      while (this.timerSeconds > 0) {
         this.io.to(this.roomID).emit('timer-update', this.timerSeconds); // Broadcast to all connected clients
         await this.delay(1000);
         this.timerSeconds--;
      }
      if (this.onTimeOut) this.onTimeOut();
      // this.io.to(this.roomID).emit('timer-complete'); // Notify all clients when the timer ends
   }

   private delay(delay: number) {
      return new Promise<void>((resolve) => {
         this.timerId = setTimeout(resolve, delay);
      });
   }
}
