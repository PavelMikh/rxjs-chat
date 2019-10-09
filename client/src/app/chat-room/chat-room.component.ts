import {Component, HostBinding, OnInit} from '@angular/core';
import {ChatService} from '../../chat-service';

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
    message: string;
    messages: string[] = [];

    constructor(private chatService: ChatService) {
    }

    sendMessage() {
        this.chatService.sendMessage(this.message);
        this.message = '';
    }

    ngOnInit() {
        this.chatService
            .getMessages()
            .subscribe((message: string) => {
                this.messages.push(message);
            });
    }

}
