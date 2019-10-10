import {Component, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ChatService} from '../../chat-service';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
    nickname: string;

    constructor(private router: Router, private chatService: ChatService) {
    }

    sendNickname() {
        this.chatService.sendNickname(this.nickname);
        this.nickname = '';
    }

    ngOnInit() {
    }

    redirect(pagename: string) {
        this.router.navigateByUrl('/' + pagename);
    }

    isValid(nickname, pagename) {
        if (nickname) {
            this.sendNickname();
            // this.chatService.setUserName(nickname);
            this.redirect(pagename);
        } else {
            alert('invalid nickname');
        }
    }
}
