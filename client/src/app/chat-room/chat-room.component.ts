import {Component, DoCheck, OnInit} from '@angular/core';
import {ChatService} from '../../chat-service';
import {Message} from '../message';
import {UserState} from '../user-state';

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, DoCheck {
    message: string;
    messages: Message[] = [];
    username;
    onlineUsers;
    isVisible = false;
    temp: UserState = {usersName: [], state: false};

    constructor(private chatService: ChatService) {
    }

    checkInput(newValue) {
        this.message = newValue;
        this.chatService.sendUserState(newValue);
    }

    checkSomebodyTyping() {
        this.chatService
            .getUserState()
            .subscribe((usersState: UserState) => {
                if (usersState.usersName.includes(this.username)) {
                    usersState.usersName = usersState.usersName.filter((item) => {
                        return item !== this.username;
                    });
                }
                this.temp = usersState;
            });
    }

    getOnlineUsers() {
        return this.chatService
            .getUsers()
            .subscribe((users: string[]) => {
                this.onlineUsers = users;
            });
    }

    toSwitch() {
        if (this.isVisible) {
            this.isVisible = false;
        } else {
            this.isVisible = true;
            this.getOnlineUsers();
        }
    }

    sendMessage() {
        const tmp: Message = {username: this.username, content: this.message};
        this.messages.push(tmp);
        this.chatService.sendMessage(this.message);
        this.message = '';
        this.checkInput(this.message);
    }

    ngOnInit() {
        this.chatService
            .getNickname()
            .subscribe((nickname: string) => {
                this.username = nickname;
            });
        this.chatService
            .getMessagesHistory()
            .subscribe((messagesHistory: Message[]) => {
                this.messages = messagesHistory;
            });
        this.chatService
            .getMessages()
            .subscribe((message: Message) => {
                this.messages.push(message);
            });
    }

    ngDoCheck(): void {
        // проверка изменений списка пользователей онлайн на сервере в реальном времени
        this.getOnlineUsers();
        // проверка пользователей на предмет печатания сообщений в реальном времени
        this.checkSomebodyTyping();
    }
}

