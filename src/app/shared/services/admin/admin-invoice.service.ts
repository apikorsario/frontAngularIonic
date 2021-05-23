import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { IInvoiceReq } from "../../interfaces/requests/invoice-req";
import { IInvoiceRes } from "../../interfaces/responses/invoice-res";
import { IResponse } from "../../interfaces/responses/response-res";
import { BaseService } from "../base.service";

@Injectable({
    providedIn: 'root'
})
export class AdminInvoiceService extends BaseService {
    constructor(private http: HttpClient) {
        super('AdminInvoices');
    }

    /**
     * getInvoices
     */
    public getInvoices() {
        return this.http.get(this.pathUrl).pipe(
            map(r => r as IResponse<Array<IInvoiceRes>>)
        )
    }

    /**
     * getInvoiceById
     */
    public getInvoiceById(invoiceId: string) {
        return this.http.get(`${this.pathUrl}${invoiceId}`).pipe(
            map(r => r as IResponse<IInvoiceRes>)
        )
    }

    /**
     * createInvoice
     */
    public createInvoice(body:IInvoiceReq) {
        return this.http.post(this.pathUrl, body).pipe(
            map(r => r as IResponse<null>)
        )
    }
}