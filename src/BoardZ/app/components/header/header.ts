import {Component, OnInit} from 'angular2/core';
import {NgClass} from 'angular2/common';

import {LoginService} from '../../services/login.service';
import {TokenService} from '../../services/token.service';

@Component({
    selector: 'boardz-header',
    directives: [NgClass],
    templateUrl: 'app/components/header/header.html'
})
export class HeaderComponent implements OnInit {
    public loggedIn: boolean = false;

    constructor(public loginService: LoginService, 
                private _tokenService: TokenService) {
    }

    ngOnInit(): any {
        this._tokenService.check().subscribe(result => {
            this.loggedIn = result
        });
    }
    
    public logout(event): void {
        event.preventDefault();

        this.loginService.logout();
    }
}
