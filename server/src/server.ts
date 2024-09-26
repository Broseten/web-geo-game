import http from 'http';
import express from 'express';
import { ServerSocket } from './socket';

export default function runServer() {

    const application = express();

    /** Server Handling */
    const httpServer = http.createServer(application);

    // Init our Socket server
    // no need to create an instance because we have a singleton instance inside it
    new ServerSocket(httpServer);

    /** Log the request */
    application.use((req, res, next) => {
        console.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
        });

        next();
    });

    /** Parse the body of the request */
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    /** Rules of our API */
    application.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Healthcheck */
    application.get('/ping', (req, res, next) => {
        return res.status(200).json({ server: 'is alive!' });
    });

    /** Socket Information */
    application.get('/', (req, res, next) => {
        return res.status(200).json({ users: ServerSocket.instance.users });
    });

    /** Error handling */
    application.use((req, res, next) => {
        const error = new Error('Not found');

        res.status(404).json({
            message: error.message
        });
    });

    /** Listen */
    let port = 1337;
    httpServer.listen(port, () => console.info(`Server is running at http://localhost:${port}/`));
}
