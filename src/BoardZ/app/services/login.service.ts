import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Router} from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {TokenService} from './token.service';
import {Configuration} from '../app-config';
import {TokenData} from '../models/tokendata';

@Injectable()
export class LoginService {
    private _lastLoginUnsuccessful: boolean;

    constructor(private _config: Configuration,
                private _http: Http,
                private _router: Router,
                private _tokenService: TokenService) {
        this._tokenService.check()
            .subscribe((value) => {
                if (!value) this.logout();
            });
    }
    
    public get isAuthenticated(): boolean {
        return this._tokenService.token !== null;
    }

    public get username(): string {
        return this._tokenService.username;
    }

    /**
     * Logout the current user (remove token and navigate to unprotected route)
     */
    public logout(): void {
        this._lastLoginUnsuccessful = false;
        this._tokenService.token = null;

        this._router.navigate(['Login']);
    }

    /**
     * Login the user by her username and password
     * @param username
     * @param password
     * @returns {Subject<TokenData>}
     */
    public login(username: string, password: string): Observable<TokenData> {
        this.logout();

        let body = 'grant_type=password&username=' + username + '&password=' + password,
            options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) });

        return Observable.create((observer)=>{
            this._http.post(this._config.apiEndpoint + 'token', body, options)
                .map(response => <TokenData>response.json())
                .subscribe(
                    (tokenData) =>{
                        this.saveToken(tokenData.access_token);
                        this._tokenService.username = username;

                        let expiryDate = new Date();
                        expiryDate.setSeconds(expiryDate.getSeconds() + tokenData.expires_in);
                        this._tokenService.tokenExpiry = expiryDate;
                        observer.next(tokenData);
                    },
                    (error) => observer.error(error),
                    () => observer.complete()
                );
        });
    }

    public handleError(error: TokenData) {
        this._lastLoginUnsuccessful = true;
    }

    public saveToken(token: string): void {
        this._lastLoginUnsuccessful = false;
        this._tokenService.token = token;
    }
}

