import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from '../../chat-service';
import {AuthorizationComponent} from '../authorization/authorization.component';
import {AppComponent} from '../app.component';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
    message: string;
    messages: string[] = [];
    nickName: Observable<unknown> = this.chatService.getUserName();

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
