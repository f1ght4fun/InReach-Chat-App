import { Action } from './Enums.model'

export class Message {
    constructor(public username: string,  public text: string, public action: Action) {}
}