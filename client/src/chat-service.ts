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

    public sendUsers(users) {
        this.socket.emit('authorization', users);
    }

    public getAuthorName() {
        this.socket.on('new-message', (nickname) => {
            return nickname;
        });
    }

    public sendUserState(value) {
        this.socket.emit('user-state', value);
    }

    public getUserState() {
        return new Observable((observer) => {
            this.socket.on('typing', (userState) => {
                observer.next(userState);
            });
        });
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public getNickname() {
        return new Observable((observer) => {
            this.socket.on('new-nickname', (nickname) => {
                observer.next(nickname);
            });
        });
    }

    public sendNickname(nickname) {
        this.socket.emit('new-nickname', nickname);
    }

    public getMessages = () => {
        return new Observable((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }

    public getUsers = () => {
        return new Observable<string[]>((observer) => {
            this.socket.emit('get-online-users', (users) => {
                observer.next(users);
            });
        });
    }

    public getMessagesHistory = () => {
        return new Observable((observer) => {
            this.socket.on('messages-history', (messagesHistory) => {
                observer.next(messagesHistory);
            });
        });
    }
}
