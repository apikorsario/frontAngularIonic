import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { ISignInReq } from "../interfaces/requests/signin-req";
import { ISignUpReq } from "../interfaces/requests/signup-req";
import { BaseService } from "./base.service";
import { Plugins } from "@capacitor/core";
import { IResponse } from "../interfaces/responses/response-res";
import { ITokenData } from "../interfaces/token-data";

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
     * logIn
     */
    public async logIn(token: string) {
        await Storage.set({ key: 'token', value: token });
        this.$isLogged.emit(true);
    }

    /**
     * logOut
     */
    public async logOut() {
        await Storage.remove({ key: 'token' });
        this.$isLogged.emit(false);
    }

    /**
     * isLogged
     */
    public async isLogged() {
        return !! await this.getDataToken();
    }

    /**
     * haveRole
     */
    public async haveRole(role: string): Promise<boolean> {
        let data = await this.getDataToken();
        if (!data) return null;
        return this.isString(data.role) ? data.role === role : data.role.includes(role);
    }

    private async getDataToken() {
        let token = (await Storage.get({ key: 'token' })).value;
        try {
            let data = token.split('.')[1];
            return JSON.parse(window.atob(data)) as ITokenData || null;
        } catch (error) {
            return null;
        }
    }

    private isString(value: any): boolean {
        return typeof (value) === 'string'
    }

}