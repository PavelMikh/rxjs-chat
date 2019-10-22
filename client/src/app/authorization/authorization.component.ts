import {Component, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ChatService} from '../../chat-service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
    nickname;
    private userForm: FormGroup;
    username = this.chatService.getNickname();
    onlineUsers;

    constructor(private router: Router, private chatService: ChatService) {
    }

    ngOnInit() {
        this.userForm = new FormGroup({
            name: new FormControl(this.nickname, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(16),
                Validators.pattern('[a-zA-Z0-9_-]*')
            ])
        });
    }

    redirect(pagename: string) {
        this.router.navigateByUrl('/' + pagename);
    }

    connectUser(pagename) {
        this.chatService
            .getUsers()
            .subscribe((users: string[]) => {
                this.onlineUsers = users;
                if (this.onlineUsers.indexOf(this.nickname) === -1) {
                    this.onlineUsers.push(this.nickname);
                    this.chatService.sendUsers(this.onlineUsers);
                    this.chatService.sendNickname(this.nickname);
                    this.redirect(pagename);
                } else {
                    alert('user with same name already exist');
                }
            });
    }
}
