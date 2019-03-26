import * as SocketIO from 'socket.io'

export class Registration {
    constructor(public name?: string, public socket?: SocketIO.Socket) {}
}