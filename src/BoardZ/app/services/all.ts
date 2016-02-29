import {ConnectionBackend, XHRBackend} from "angular2/http";
import {provide} from "angular2/core";

import {Configuration} from '../app-config';
import {AuthenticatedHttp} from './authenticated.http';
import {LoginService} from './login.service';
import {GamesService} from './games.service';

export var APP_SERVICES = [
    provide(ConnectionBackend, { useClass: XHRBackend }),
    Configuration,
    AuthenticatedHttp,
    LoginService,
    GamesService
];
