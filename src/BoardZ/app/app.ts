import {Component, AfterViewInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {LoginForm} from './components/login/login';
import {Sidebar} from './components/sidebar/sidebar';
import {HeaderComponent} from './components/header/header';
import {Games} from './components/games/games';
import {APP_SERVICES} from './services/all';
import {LoginService} from './services/login.service';

interface AdminLteFix extends Window {
    initAdminLTE():void;
}

declare var window: AdminLteFix;

@Component({
    selector: 'boardz-app',
    providers: APP_SERVICES,
    directives: [ROUTER_DIRECTIVES, Sidebar, HeaderComponent],
    templateUrl: 'app/app.html'
})
@RouteConfig([
    { path: '/login', component: LoginForm, name: 'Login', data: { displayName: 'Login' } },
    { path: '/games/...', component: Games, name: 'Games', data: { displayName: 'Games' }, useAsDefault: true },
])
export class BoardzApp implements AfterViewInit {

    ngAfterViewInit(): any {
        if (window.initAdminLTE) {
            window.initAdminLTE();
        }
    }

    constructor(private _loginService: LoginService) {
    }
}
