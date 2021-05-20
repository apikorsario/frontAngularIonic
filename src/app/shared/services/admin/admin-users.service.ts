import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IResponse } from "../../interfaces/responses/response-res";
import { IUserRes } from "../../interfaces/responses/user-res";
import { BaseService } from "../base.service";

@Injectable({
    providedIn: 'root'
})
export class AdminUsersService extends BaseService {

    public $userSelected: EventEmitter<IUserRes>;

    constructor(private http: HttpClient) {
        super('AdminUsers');
        this.$userSelected = new EventEmitter<IUserRes>();
    }

    /**
     * getUsers
     */
    public getUsers(): Observable<IResponse<IUserRes[]>> {
        return this.http.get(this.pathUrl).pipe(
            map(r => r as IResponse<Array<IUserRes>>)
        )
    }

    /**
     * getUserById
     */
    public getUserById(userId: string): Observable<IResponse<IUserRes>> {
        return this.http.get(`${this.pathUrl}${userId}`).pipe(
            map(r => r as IResponse<IUserRes>)
        )
    }

    /**
     * forgotPasswordUser
     */
    public forgotPasswordUser(userId: string, body: { newPassword: string }) {
        return this.http.put(`${this.pathUrl}ForgotPasswordUser/${userId}`, body ).pipe(
            map(r => r as IResponse<null>)
        )
    }
}