import { createServer, Server } from 'http'
import * as express from 'express'
import * as socketIO from 'socket.io'

import ChatManager from './services/ChatManager'

export default class ChatServer {

    public static readonly PORT:number = 4000;
    private server: Server;
    private io: SocketIO.Server;
    private manager: ChatManager;

    public constructor()
    {
        this.createServer()
        this.setupSocketIO()
        this.start()
    }

    private createServer()
    {
        this.server = createServer(express());
        this.io = socketIO(this.server);
    }

    private setupSocketIO()
    {
        this.manager = new ChatManager()
        this.io.on('connect', (socket: SocketIO.Socket) => {
            console.log(`Connected client ${socket.id} on port ${ChatServer.PORT}`);

            const {
                addClient,
                signIn,
                onGetHistory,
                onMessage,
                signOut,
                removeClient
            } = this.manager.prepareHandlers(socket)

            addClient()

            socket.on('USERNAME_REGISTER', signIn)
                    
            socket.on('USER_GETHISTORY', onGetHistory)

            socket.on('USER_LEAVE', signOut)
          
            socket.on('message', onMessage)
                              
            socket.on('disconnect', function () {
              console.log(`Client ${socket.id} Disconnected...`)
              removeClient()
            })
          
            socket.on('error', function (err) {
              console.log(`Client ${socket.id} error ${err}`)
            })
        });
    }

    private start()
    {
        this.server.listen(ChatServer.PORT, () => {
            console.log('Running server on port %s', ChatServer.PORT);
        });
    }
}