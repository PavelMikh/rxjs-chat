import * as io from 'socket.io-client';
import {Observable, of} from 'rxjs';
import {AuthorizationComponent} from './app/authorization/authorization.component';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private url = 'http://localhost:3000';
    private socket;

    // private userName: string = JSON.parse(this.getMessages).;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public sendNickname(nickname) {
        this.socket.emit('new-nickname', nickname);
    }

    public getMessages = () => {
        return new Observable((observer) => {
            this.socket.on('new-message', (Object) => {
                observer.next(Object.message);
            });
        });
    }

    public getUserName = () => {
        return new Observable((observer) => {
            this.socket.on('new-message', (Object) => {
                observer.next(Object.name);
            });
        });
    }

    // public getUserName(): string {
    //     return this.userName;
    // }
    //
    // public setUserName(value: string) {
    //     this.userName = value;
    // }
}
