import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { IInvoiceRes } from "../interfaces/responses/invoice-res";
import { IResponse } from "../interfaces/responses/response-res";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class InvoiceService extends BaseService {
    constructor(private http: HttpClient) {
        super('invoices');
    }

    /**
     * getInvoices
     */
    public getInvoices() {
        return this.http.get(this.pathUrl).pipe(
            map(r => r as IResponse<Array<IInvoiceRes>>)
        )
    }
}