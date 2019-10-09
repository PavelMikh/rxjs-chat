import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
    nickname: string;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    redirect(pagename: string) {
        this.router.navigateByUrl('/' + pagename);
    }

    isValid(nickname, pagename) {
      nickname ? this.redirect(pagename) : alert('invalid nickname');
    }
}
