import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IResponse } from "../../interfaces/responses/response-res";
import { BaseService } from "../base.service";

@Injectable({
    providedIn: 'root'
})
export class AdminRoleUserService extends BaseService {

    constructor(private http: HttpClient) {
        super('AdminRoles');
    }

    /**
     * assignRoleToUser
     */
    public addRoleToUser(body: { role: string, userId: string }): Observable<IResponse<null>> {
        return this.http
            .put(`${this.pathUrl}AddRole${body.role}ToUser/${body.userId}`, null)
            .pipe(map(r => r as IResponse<null>))
    }

    /**
     * removeRoleToUser
     */
    public removeRoleToUser(body: { role: string, userId: string }): Observable<IResponse<null>> {
        return this.http
            .delete(`${this.pathUrl}RemoveRole${body.role}ToUser/${body.userId}`)
            .pipe(map(r => r as IResponse<null>))
    }
}