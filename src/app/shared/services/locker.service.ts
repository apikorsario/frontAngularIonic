import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { ILockerDetailReq } from "../interfaces/requests/locker-detail-req";
import { ILockerRes } from "../interfaces/responses/locker-res";
import { IResponse } from "../interfaces/responses/response-res";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class LockerService extends BaseService {

    constructor(private http: HttpClient) {
        super('lockers')
    }

    /**
     * getLocker
     */
    public getLocker() {
        return this.http.get(this.pathUrl).pipe(
            map(r => r as IResponse<ILockerRes>)
        )
    }

    /**
     * addDetailsToLocker
     */
    public addDetailsToLocker(body: ILockerDetailReq) {
        return this.http.put(`${this.pathUrl}AddDetailsToLocker`, body).pipe(
            map(r => r as IResponse<null>)
        )
    }

    /**
     * removeDetailsToLocker
     */
    public removeDetailsToLocker(body: ILockerDetailReq) {
        return this.http.put(`${this.pathUrl}RemoveDetailsToLocker`, body).pipe(
            map(r => r as IResponse<null>)
        )
    }
}