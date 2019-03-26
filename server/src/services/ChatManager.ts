import {Registration} from '../models/Registration.model'
import {Message} from '../models/Message.model'
import * as SocketIO from 'socket.io'
import { message } from 'gulp-typescript/release/utils';
import { Action } from '../models/Enums.model'

export default class ChatManager {
    private clients: Map<string, Registration> = new Map<string, Registration>()
    private history: Array<Message> = new Array<Message>()

    public prepareHandlers = (socket: SocketIO.Socket) : any => {
        const addClient = () => {
            this.clients.set(socket.id, {});
        }

        const removeClient = () => {
            this.clients.delete(socket.id);
        }
        
        const signIn = (username: string, cb: Function) => {
            if (this.validateName(username)) {
                cb(username + ' username is already taken')
                
                return;
            }

            this.clients.set(socket.id, new Registration(username, socket))

            const entry = this.generateEntry(socket.id, Action.Joined);
            this.broadcastMessage(entry)

            cb(null)
        }

        const signOut = (cb: Function) => {
            if (this.getUser(socket.id))
            {
                const entry = this.generateEntry(socket.id, Action.Left);
                this.broadcastMessage(entry)

                removeClient()

                cb(null)
            }
        }

        const onGetHistory = (cb: Function) => {
            cb(this.history.slice(0, 10))
        }

        const onMessage = (message: string) => {
            if (this.getUser(socket.id))
            {
                const entry = this.generateEntry(socket.id, Action.Said, message);

                this.broadcastMessage(entry)
            }
        }

        return {
           addClient,
           removeClient,
           signIn,
           onGetHistory,
           onMessage,
           signOut
        }
    }

    private broadcastMessage = (message: Message) : void => {
        this.clients.forEach(r => {
            if (r.socket)
                r.socket.emit('message', message);
        })
    }

    private generateEntry = (socketId: string, action: Action, message?: string) : Message => {
        const user = this.getUser(socketId);
        let text = ''

        switch(action)
        {
            case Action.Joined:
                text = ' joined the chat'
                break

            case Action.Left: 
                text = ' left the chat'
                break

            case Action.Said: 
                text = message
                break
        }

        const msg = new Message(user.name, text, action)

        this.history.push(msg);

        return msg
    }

    private getUser = (socketId: string) : Registration => {
        return this.clients.get(socketId)
    }

    private validateUser = (socketId: string) : Boolean => {
        return this.clients.has(socketId) && !!this.clients.get(socketId)
    }

    private validateName = (username: string) : string => {
        for (let [key, value] of this.clients.entries())
            if (value && value.name === username)
                return key

        return null
    }
}