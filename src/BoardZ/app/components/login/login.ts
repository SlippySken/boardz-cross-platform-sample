import {Component} from 'angular2/core';
import {Router, CanDeactivate, ComponentInstruction} from 'angular2/router';

import {LoginService} from '../../services/login.service';

@Component({
    templateUrl: 'app/components/login/login.html'
})
export class LoginForm implements CanDeactivate {
    private _userName: string;
    private _password: string;

    public _hasError: boolean = false;

    constructor(private _router: Router,
                private _loginService: LoginService) {
    }

    ngOnInit(): any {
    }

    public doLogin(evt): void {
        evt.preventDefault();
        
        this._loginService.login(this._userName, this._password)
            .subscribe(
                () => {
                    this.setError(false);
                    this._router.navigate(['Games'])
                },
                () => {
                    this.setError(true);
                }
            );
    }

    setError(value: boolean) {
        this._hasError = value;
    }

    routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
        return !this._hasError && this._loginService.isAuthenticated;
    }
}
