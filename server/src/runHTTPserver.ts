import http, { IncomingMessage, ServerResponse } from 'http';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { ServerIO } from './server/ServerIO';
import { ViteDevServer } from 'vite';

export default function runServer() {
    const application = express();

    const httpServer = http.createServer(application);
    const port = process.env.PORT || 1337;

    // Init our Socket server
    // no need to create an instance because we have a singleton instance inside it
    new ServerIO(httpServer);

    /** Log the request */
    application.use((req: Request, res: Response, next: NextFunction) => {
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
    application.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    /** Healthcheck */
    application.get('/ping', (req: Request, res: Response) => {
        return res.status(200).json({ server: 'is alive!' });
    });

    /** User Information */
    application.get('/users', (req: Request, res: Response) => {
        return res.status(200).json({ users: ServerIO.instance.allUsers });
    });
    application.get('/sockets', (req: Request, res: Response) => {
        return res.status(200).json({ sockets: ServerIO.instance.allSockets });
    });

    /** Serve client assets (development or production) */
    if (process.env.NODE_ENV === 'production') {
        console.log(process.cwd());
        // Serve static files from the server/client directory
        application.use(express.static(path.join(__dirname, 'client')));

        // Serve the index.html from the server/client folder for any route
        application.get('*', (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, 'client', 'index.html'));
        });
    } else {
        console.log("using dev environment");
        // In development, forward requests to Vite dev server (set up in client)
        const vite = require('vite');
        vite.createServer({
            server: { middlewareMode: true },
            appType: 'custom'
        }).then((viteServer: ViteDevServer) => {
            application.use(viteServer.middlewares);
        }).catch((err: Error) => {
            console.error('Vite development server failed to start:', err);
        });
    }

    /** Error handling */
    application.use((req: Request, res: Response, next: NextFunction) => {
        const error = new Error('Not found');
        res.status(404).json({
            message: error.message
        });
    });

    /** Listen */
    httpServer.listen(port, () => console.info(`Server is running at http://localhost:${port}/`));
}
