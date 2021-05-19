import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { ISignInReq } from "../interfaces/requests/signin-req";
import { ISignUpReq } from "../interfaces/requests/signup-req";
import { BaseService } from "./base.service";
import { Plugins } from "@capacitor/core";
import { from, Subject } from "rxjs";
import { IResponse } from "../interfaces/responses/response-res";

const { Storage } = Plugins;

@Injectable({
    providedIn: 'root'
})

export class AuthService extends BaseService {

    public $isLogged: EventEmitter<boolean>;

    constructor(private http: HttpClient) {
        super('auth');
        this.$isLogged = new EventEmitter();
    }

    /**
     * SignIn
     */
    public SignIn(body: ISignInReq) {
        return this.http.post(`${this.pathUrl}signin`, body).pipe(
            map(r => r as IResponse<string>)
        );
    }

    /**
     * SignUp
     */
    public SignUp(body: ISignUpReq) {
        return this.http.post(`${this.pathUrl}signup`, body).pipe(
            map(r => r as IResponse<any>)
        );
    }

    /**
     * logged
     */
    public async logged(token: string) {
        await Storage.set({ key: 'token', value: token });
        this.$isLogged.emit(true);
    }

    /**
     * isValidToken
     */
    public async isValidToken() {
        let token = (await Storage.get({ key: 'token' })).value;
        try {
            let data = token.split('.')[1];
            let auth: any = JSON.parse(window.atob(data));
            let isValid = auth?.UserId ? true : false;
            return isValid;
        } catch (error) {
            return null;
        }
    }

    /**
     * logOut
     */
    public async logOut() {
        await Storage.remove({ key: 'token' });
    }
}