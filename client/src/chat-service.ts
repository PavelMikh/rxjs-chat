import * as io from 'socket.io-client';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    public socket;

    constructor() {
        this.socket = io(this.url);
    }

    private url = 'http://localhost:3000';

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public sendNickname(nickname) {
        this.socket.emit('new-nickname', nickname);
    }

    public getName() {
        return new Observable<string>((observer) => {
            this.socket.on('new-nickname', (nickname) => {
                observer.next(nickname);
            });
        });
    }

    public getMessages = () => {
        return new Observable((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
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
