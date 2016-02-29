import {Component, OnInit} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Router} from 'angular2/router';
import {LoginService} from '../../services/login.service';
import {TokenService} from '../../services/token.service';

@Component({
    selector: 'boardz-header',
    directives: [NgClass],
    templateUrl: 'app/components/header/header.html'
})
export class HeaderComponent implements OnInit {
    public loggedIn: boolean = false;
    public currentLocation: string = 'BoardZ!';

    constructor(public loginService: LoginService, 
                private _tokenService: TokenService, 
                private _router: Router) {
        while (this._router.parent) {
            this._router = this._router.parent;
        }

        this._router.subscribe(routeUrl => {
            this._router.recognize(routeUrl).then(instruction => {
                while (instruction.child) {
                    instruction = instruction.child;
                }

                this.currentLocation = instruction.component.routeData.get('displayName');
            });
        });
    }

    ngOnInit(): any {
        this._tokenService.check().subscribe(result => {
            this.loggedIn = result
        });
    }
    
    logout(event): void {
        event.preventDefault();

        this.loginService.logout();
    }
}
