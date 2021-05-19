import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { IChangePasswordReq } from "../interfaces/requests/change-password-req";
import { IResponse } from "../interfaces/responses/response-res";
import { IUserRes } from "../interfaces/responses/user-res";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})

export class UserService extends BaseService {

    constructor(private http:HttpClient) {
        super('users')
    }

    /**
     * getProfile
     */
    public getProfile() {
        return this.http.get(`${this.pathUrl}profile`).pipe(
            map(r => r as IResponse<IUserRes>)
        )
    }

    /**
     * changePassword
     */
    public changePassword(body: IChangePasswordReq) {
        return this.http.put(`${this.pathUrl}ChangePassword`, body).pipe(
            map(r => r as IResponse<null>)
        )
    }
}