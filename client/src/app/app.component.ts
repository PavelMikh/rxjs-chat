import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationComponent} from './authorization/authorization.component';
import {ChatService} from '../chat-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ChatService]
})
export class AppComponent {

    constructor(router: Router, private chatService: ChatService) {
        router.navigateByUrl('/authorization');
    }
}
