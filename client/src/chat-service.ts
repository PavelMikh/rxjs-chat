import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor() {
        this.socket = io(this.url);
    }

    public socket;

    private url = 'http://localhost:3000';

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public sendNickname(nickname) {
        this.socket.emit('new-nickname', nickname);
    }

    public getErrorMessage() {
        this.socket.on('error-message', (errorMessage) => {
            return errorMessage;
        });
    }

    public getMessages = () => {
        return new Observable((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }
}
