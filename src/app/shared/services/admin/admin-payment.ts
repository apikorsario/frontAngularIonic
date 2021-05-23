import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { IPaymentRes } from "../../interfaces/responses/payment-res";
import { IResponse } from "../../interfaces/responses/response-res";
import { BaseService } from "../base.service";

@Injectable({
    providedIn: 'root'
})
export class AdminPaymentService extends BaseService {
    constructor(private http: HttpClient) {
        super('AdminPayments');
    }

    /**
     * getPayments
     */
    public getPayments() {
        return this.http.get(this.pathUrl).pipe(
            map(r => r as IResponse<Array<IPaymentRes>>)
        )
    }

    /**
     * createPayment
     */
    public createPayment(methodName: string) {
        return this.http.post(this.pathUrl, { methodName }).pipe(
            map(r => r as IResponse<null>)
        )
    }
}