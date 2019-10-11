import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../chat-service';
import {Message} from '../message';

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
    message: string;
    messages: Message[] = [];

    constructor(private chatService: ChatService) {
    }

    sendMessage() {
        this.chatService.sendMessage(this.message);
        this.message = '';
    }

    ngOnInit() {
        this.chatService
            .getMessages()
            .subscribe((message: Message) => {
                this.messages.push(message);
            });
    }
}
