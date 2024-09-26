import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';

export class ServerSocket {
    // singleton
    public static instance: ServerSocket;
    public io: Server;

    // Master list of all connected users
    public users: { [uid: string]: string };

    // state of the server (test variable)
    private count = 0;

    // array of tuples (number, any)
    private markers: [number, any][] = [];
    private markerIDCounter = 0;

    constructor(server: HttpServer) {
        // assign singleton instance
        ServerSocket.instance = this;
        this.users = {};
        this.io = new Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                // we dont care about security for now
                origin: '*'
            }
        });

        // register listeners on connect
        this.io.on('connect', this.StartListeners);

        // socket.io started
        console.log("Socket IO started");
    }

    StartListeners = (socket: Socket) => {
        // unique socket ID
        console.info('Message received from ' + socket.id);

        // here we can define other custom message handlers

        socket.on('init-count', () => {
            // send data back to the specific client
            socket.emit('init-count-client', this.count);
        });

        socket.on('count', () => {
            this.count += 1;
            this.io.sockets.emit('countClient', this.count);
        });

        socket.on('request-map-markers', () => {
            socket.emit('set-markers', this.markers);
        });

        socket.on('add-marker', (position: any) => {
            this.markerIDCounter += 1;
            let id = this.markerIDCounter;
            let marker: [number, any] = [id, position];
            this.io.sockets.emit('add-marker', marker);
            this.markers.push(marker);
        });

        socket.on('remove-marker', (id: number) => {
            this.markers = this.markers.filter((marker) => marker[0] !== id);
            this.io.sockets.emit('set-markers', this.markers);
        });

        // a custom message handler
        socket.on('handshake', (callback: (uid: string, users: string[]) => void) => {
            console.info('Handshake received from: ' + socket.id);

            const reconnected = Object.values(this.users).includes(socket.id);

            if (reconnected) {
                console.info('This user has reconnected.');

                const uid = this.GetUidFromSocketID(socket.id);
                const users = Object.values(this.users);

                if (uid) {
                    console.info('Sending callback for reconnect ...');
                    callback(uid, users);
                    return;
                }
            }

            const uid = v4();
            this.users[uid] = socket.id;

            const users = Object.values(this.users);
            console.info('Sending callback ...');
            callback(uid, users);

            this.SendMessage(
                'user_connected',
                users.filter((id) => id !== socket.id),
                users
            );
        });

        // default socket.io event for disconnecting a client
        // runs automatically anytime a client disconnects
        socket.on('disconnect', () => {
            console.info('Disconnect received from: ' + socket.id);

            const uid = this.GetUidFromSocketID(socket.id);

            if (uid) {
                delete this.users[uid];

                const users = Object.values(this.users);

                this.SendMessage('user_disconnected', users, socket.id);
            }
        });
    };

    GetUidFromSocketID = (id: string) => {
        return Object.keys(this.users).find((uid) => this.users[uid] === id);
    };

    SendMessage = (name: string, users: string[], payload?: Object) => {
        console.info('Emitting event: ' + name + ' to', users);
        users.forEach((id) => (payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name)));
    };
}
