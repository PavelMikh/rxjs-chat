import {Component, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ChatService} from '../../chat-service';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
    nickname: string;
    errorMessage = this.chatService.getErrorMessage();

    constructor(private router: Router, private chatService: ChatService) {
    }

    const
    control = new FormControl('1', Validators.pattern('[a-zA-Z_-]*'));

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
            alert(this.errorMessage);
        }
    }
}
